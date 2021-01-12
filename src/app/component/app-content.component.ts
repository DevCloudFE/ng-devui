import {
  Component,
  NgZone, OnDestroy, OnInit,
  Renderer2,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import { Routes } from '@angular/router';
import { SearchComponent } from 'ng-devui';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { cloneDeep, groupBy, map } from 'lodash-es';
import { fromEvent, Subscription } from 'rxjs';
import { routesConfig } from './component.route';
@Component({
  selector: 'cd-app-content', // tslint:disable-line
  templateUrl: './app-content.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppContentComponent implements OnInit, OnDestroy {
  routes: Routes = [];
  componentsData = [];
  clickSub: Subscription = new Subscription();
  componentsDataDisplay = [];
  constructor(private renderer2: Renderer2, private ngZone: NgZone, private translate: TranslateService) {
    this.generateSideBar(localStorage.getItem('lang'));
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.generateSideBar(localStorage.getItem('lang'));
    });
  }
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const menuLink = document.querySelector('#menuLink');
      const wrapper = menuLink.parentNode;
      const containerNode = document.querySelector('.app-container');
      const sideBarNode = wrapper.querySelector('.sidebar');
      this.clickSub.add(fromEvent(menuLink, 'click').subscribe(e => {
        if (menuLink.classList.contains('active')) {
          this.renderer2.removeClass(menuLink, 'active');
          this.renderer2.removeClass(wrapper, 'active');
        } else {
          this.renderer2.addClass(menuLink, 'active');
          this.renderer2.addClass(wrapper, 'active');
        }
      }));
      this.clickSub.add(fromEvent(containerNode, 'click').subscribe(e => {
        if (menuLink.classList.contains('active') && !(<any>sideBarNode).contains(e.target) && !(<any>menuLink).contains(e.target)) {
          this.renderer2.removeClass(menuLink, 'active');
          this.renderer2.removeClass(wrapper, 'active');
        }
      }));
    });
  }

  onSearch(event) {
    this.componentsDataDisplay = cloneDeep(this.componentsData).filter(catalog => {
      catalog.children = catalog.children.filter(item => {
        return item.title.toLowerCase().includes(event.toLowerCase());
      });
      return catalog.children.length;
    });
  }

  generateSideBar(lang) {
    this.componentsData = [];
    const routesWithData = map(routesConfig, (route) => {
      if (!route.data) {
        route.data = {};
      }
      return route;
    });
    const groupedRoutesObj = groupBy(routesWithData,
      (route) => {
        if (lang === 'en-us') {
          return (route as any).data.enType || 'General';
        }
        return (route as any).data.type || '通用';
      });
    for (const key in groupedRoutesObj) {
      if (key) {
        const group = groupedRoutesObj[key].map((item) => {
          if (item.data.name) {
            if (lang === 'en-us') {
              return {
                title: item.data.name,
                link: item.path,
              };
            }
            return {
              title: item.data.name + ' ' + item.data.cnName,
              link: item.path,
            };
          } else {
            return {};
          }
        }
        ).filter((item) => Object.keys(item).length !== 0)
          .sort(function (s1, s2) {
            const prev = (s1.title).toUpperCase();
            const next = (s2.title).toUpperCase();
            if (prev < next) {
              return -1;
            }
            if (prev > next) {
              return 1;
            }
            return 0;
          });
        this.componentsData.push({ title: key, children: group, open: true });
      }
    }
    this.onSearch('');
  }

  ngOnDestroy(): void {
    if (this.clickSub) {
      this.clickSub.unsubscribe();
    }
  }
}
