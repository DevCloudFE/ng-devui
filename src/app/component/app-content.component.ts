import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  Renderer2,
  NgZone,
} from '@angular/core';

import {
  Routes
} from '@angular/router';
import { groupBy, map } from 'lodash-es';
import { routesConfig } from './component.route';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'cd-app-content', // tslint:disable-line
  templateUrl: './app-content.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppContentComponent implements OnInit, OnDestroy {
  type = '通用';
  types = ['通用'];
  routes: Routes = [];
  groupedRoutes: any;
  componentsData = [];
  clickSub: Subscription = new Subscription();

  constructor(private renderer2: Renderer2, private ngZone: NgZone) {
    const routesWithData = map(routesConfig, (route) => {
      if (!route.data) {
        route.data = {};
      }
      return route;
    });
    const groupedRoutesObj = groupBy(routesWithData,
      (route) => {
        return (route as any).data.type || '通用';
      });
    this.groupedRoutes = [];
    for (const key in groupedRoutesObj) {
      if (key) {
        const group = groupedRoutesObj[key].map((item) => {
          if (item.data.name) {
            return {
              title: item.data.name + ' ' + item.data.cnName,
              link: item.path,
            }
          } else {
            return {};
          }
        }
        ).filter((item) => Object.keys(item).length !== 0)
          .sort(function (s1, s2) {
            s1 = (s1.title).toUpperCase();
            s2 = (s2.title).toUpperCase();
            if (s1 < s2) {
              return -1;
            }
            if (s1 > s2) {
              return 1;
            }
            return 0;
          });
        this.componentsData.push({ title: key, children: group, open: true });
      }
    }
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

  ngOnDestroy(): void {
    if (this.clickSub) {
      this.clickSub.unsubscribe();
    }
  }
}

