import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { cloneDeep } from 'lodash-es';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DevuiCommonsService } from '../devui-commons.service';

@Component({
  selector: 'd-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sideMenuList;
  @Input() linkType = 'routerLink';
  @Input() text = {
    new: 'New',
    sunset: 'Sunset'
  };
  _navData;
  private _currentUrl: string = '';
  private destroy$: Subject<void> = new Subject();
  componentsDataDisplay;

  @Input() set navData(data) {
    this._navData = data;
    this.componentsDataDisplay = data;
  }

  get navData() {
    return this._navData;
  }

  constructor(private commonsService: DevuiCommonsService, private router: Router, private ele: ElementRef) { }

  ngOnInit(): void {
    this._currentUrl = this.router.url;
    this.commonsService.on<any>('searchEvent').subscribe(term => {
      this.filterData(term);
    });
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        const destUrl = (event as NavigationEnd).urlAfterRedirects;
        if (this._currentUrl.endsWith('overview')) {
          setTimeout(() => {
            const activeItem: HTMLElement = this.ele.nativeElement.querySelector('.devui-router-active');
            if (activeItem) {
              activeItem.scrollIntoView({ block: 'center' });
            }
          });
        }
        this._currentUrl = destUrl;
      });
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterData(event): void {
    this.componentsDataDisplay = cloneDeep(this.navData).filter(catalog => {
      catalog.children = catalog.children.filter(item => {
        return item.title.toLowerCase().includes(event.toLowerCase());
      });
      return catalog.children.length;
    });
  }
}
