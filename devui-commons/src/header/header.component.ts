import { Component, ContentChildren, HostListener, Input, OnInit, QueryList } from '@angular/core';
import { DevuiCommonsService } from '../devui-commons.service';
import { LogoComponent } from './logo/logo.component';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { I18nUtil } from '../i18n/i18n.util';

@Component({
  selector: 'd-common-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showShadow = false;
  @Input() isFixed = false;
  @Input() showGitStar = true;
  @Input() hasMaxWidth = true;
  @Input() showSlideButton = true;
  @Input() showSearch = false;
  @Input() showAvatar = false;
  @Input() repoName = 'ng-devui';

  repoLink: SafeResourceUrl;

  @ContentChildren(LogoComponent) subLogo: QueryList<LogoComponent> = new QueryList<LogoComponent>();

  collapseMenuActive = false;
  showSlideMenu = true;
  curLanguage: string;
  searchPlaceholder: string;

  @Input() userAvatar;


  @HostListener('window:resize')
  resize(): void {
    this.showSlideMenu = document.body.clientWidth < 1280 ? false : true;
    this.setSlideBarStyle();
  }

  constructor(private commonsService: DevuiCommonsService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.curLanguage = I18nUtil.getCurrentLanguage();
    this.commonsService.on('languageEvent').subscribe(term => this.changeLanguage(term));
    this.searchPlaceholder = this.curLanguage === 'zh-cn' ? '请输入你想查找的组件' : 'Enter the component';
    this.showSlideMenu = document.body.clientWidth < 1024 ? false : true;
    this.setSlideBarStyle();
    this.repoLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://ghbtns.com/github-btn.html?user=DevCloudFE&repo=${this.repoName}&type=star&count=true`);
  }

  onSearch(term): void {
    this.commonsService.broadcast('searchEvent', term);

    if (term) {
      this.clickSlideMenu(true);
    }
  }

  toggleMenu($event): void {
    this.collapseMenuActive = !this.collapseMenuActive;
  }

  clickSlideMenu(showMenu?: boolean): void {
    this.showSlideMenu = typeof showMenu === 'boolean' ? showMenu : !this.showSlideMenu;
    this.setSlideBarStyle();
  }

  setSlideBarStyle(): void {
    const ele = document.querySelector('.sidebar-wrapper');
    if (ele) {
      ele.setAttribute('style', `max-width: ${ this.showSlideMenu ? '320px' : '0'}`);
    }
  }

  changeLanguage(lang): void {
    this.curLanguage = lang;
    this.searchPlaceholder = this.curLanguage === 'zh-cn' ? '请输入你想查找的组件' : 'Enter the component';
  }
}
