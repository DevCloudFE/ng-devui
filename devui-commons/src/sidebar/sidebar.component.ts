import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { cloneDeep } from 'lodash-es';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DevuiCommonsService } from '../devui-commons.service';
import { I18nUtil } from '../i18n/i18n.util';
import { LinkMap } from '../constant';

interface navItem {
  name: string;
  path: string;
  linkType: string;
  newChang?: boolean;
  sunset?: boolean;
}

interface GroupOptions {
  link?: string;
  enType?: string;
  name?: string;
  lowerName?: string;
  folderName?: string;
  nodisplay?: boolean;
  title?: string;
  [key: string]: any;
}

interface ComponentsOption {
  title?: string;
  children?: GroupOptions;
  open?: boolean;
  nodisplay?: boolean;
  link?: string;
  newChange?: boolean;
  sunset?: boolean;
  description?: string;
  lowerName?: string;
  folderName?: string;
  name?: string;
}

@Component({
  selector: 'd-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sideMenuList: navItem[] = [];
  @Input() linkType = 'routerLink';
  @Input() text = {
    new: 'New',
    sunset: 'Sunset',
  };
  @Input() showSearch = true;
  @Input() showVersions = true;
  @Input() showChangelog = true;
  @Input() versionOptions: any[] = [];
  _navData: ComponentsOption[] = [];
  private _currentUrl: string = '';
  private destroy$: Subject<void> = new Subject();
  componentsDataDisplay: ComponentsOption[] = [];
  document: Document;
  showSlideMenu = true;
  searchPlaceholder: string;
  curLanguage: string;
  changelogLink: string;
  @Input() set navData(data) {
    this._navData = data;
    this.componentsDataDisplay = data;
  }
  rotateDegrees = 0;
  docLinkMap = {
    'opensource': LinkMap.versionRelease,
  };
  get navData() {
    return this._navData;
  }
  currentOption!: any;
  linkDefaultTarget: string;
  constructor(private commonsService: DevuiCommonsService, private router: Router, private ele: ElementRef) {}

  ngOnInit(): void {
    this.curLanguage = I18nUtil.getCurrentLanguage();
    this._currentUrl = this.router.url;
    this.searchPlaceholder = this.curLanguage === 'zh-cn' ? '搜索' : 'Search';
    this.commonsService.on<any>('searchEvent').subscribe((term) => {
      this.filterData(term);
    });
    this.changelogLink = this.docLinkMap.opensource;
    if(this.showVersions){
      this.currentOption = this.versionOptions[0];
    }
    this.linkDefaultTarget = this.linkType === 'routerLink' ? '_self' : '_blank';
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

  filterData(event: any): void {
    this.componentsDataDisplay = cloneDeep(this.navData).filter((catalog: ComponentsOption) => {
      catalog.children = catalog.children?.filter((item: GroupOptions) => {
        return item.title?.toLowerCase().includes(event.toLowerCase());
      });
      return catalog.children?.length;
    });
  }

  onSearch(term): void {
    this.commonsService.broadcast('searchEvent', term);
  }

  clickSlideMenu(showMenu?: boolean): void {
    this.showSlideMenu = typeof showMenu === 'boolean' ? showMenu : !this.showSlideMenu;
    this.setSlideBarStyle();
  }

  setSlideBarStyle(): void {
    const ele = this.document.querySelector('.sidebar-wrapper');
    if (ele) {
      ele.setAttribute('style', `max-width: ${this.showSlideMenu ? '320px' : '0'}`);
    }
  }

  onToggle(event) {
    this.rotateDegrees = event ? 180 : 0;
  }

  handleResetPage() {
    window.scrollTo(0, 0);
  }
}
