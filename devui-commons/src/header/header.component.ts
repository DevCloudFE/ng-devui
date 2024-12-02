import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, HostListener, Inject, Input, isDevMode, OnInit, QueryList, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DevuiCommonsService } from '../devui-commons.service';
import { I18nUtil } from '../i18n/i18n.util';
import { LogoComponent } from './logo/logo.component';
import { LinkMap } from '../constant';

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
  @Input() repoName = 'ng-devui';

  repoLink!: SafeResourceUrl;
  githubLink;
  gitcodeLink = LinkMap.gitcodeLink;

  @ContentChildren(LogoComponent) subLogo: QueryList<LogoComponent> = new QueryList<LogoComponent>();

  collapseMenuActive = false;
  showSlideMenu = true;
  curLanguage: string = 'zh-cn';
  searchPlaceholder: string = '';
  document: Document;

  MIN_WIDTH = 1279;
  showExpandButton = false;
  showCollapseButton = false;
  showHamburger = false;
  showMobileHeader = false;
  isHomePage = false;
  mediaQuery;


  @HostListener('window:resize')
  resize(): void {
    this.showSlideMenu = this.document.body.clientWidth < this.MIN_WIDTH ? false : true;
    this.showExpandButton = this.document.body.clientWidth < this.MIN_WIDTH ? true : false;
    this.showCollapseButton = false;
    this.setSlideBarStyle();
  }

  constructor(
    private commonsService: DevuiCommonsService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any,
  ) {
    this.document = this.doc;
  }

  ngOnInit(): void {
    this.curLanguage = I18nUtil.getCurrentLanguage();
    this.commonsService.on<string>('languageEvent').subscribe(term => this.changeLanguage(term));
    this.searchPlaceholder = this.curLanguage === 'zh-cn' ? '请输入你想查找的组件' : 'Enter the component';
    this.showSlideMenu = this.document.body.clientWidth < this.MIN_WIDTH ? false : true;
    this.showExpandButton = this.document.body.clientWidth < this.MIN_WIDTH ? true : false;
    this.setSlideBarStyle();
    this.repoLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://ghbtns.com/github-btn.html?user=DevCloudFE&repo=${this.repoName}&type=star&count=true`);
    this.githubLink = `https://github.com/DevCloudFE/${this.repoName}`;
    this.isHomePage = window.location.pathname.split('/')[1] === 'home' ? true : false;
    this.mediaQuery = window.matchMedia('(max-width: 767px)');
    this.mediaQuery.addListener(this.handleScreenChange);
    this.handleScreenChange(this.mediaQuery);
  }

  handleScreenChange = (e) => {
    if (e.matches) {
      this.showMobileHeader = true;
    } else {
      this.showMobileHeader = false;
    }
    this.cdr.detectChanges();
  }

  onSearch(term): void {
    this.commonsService.broadcast('searchEvent', term);

    if (term) {
      this.clickSlideMenu(true);
    }
  }

  toggleMenu(): void {
    this.collapseMenuActive = !this.collapseMenuActive;
  }

  clickSlideMenu(showMenu?: boolean): void {
    if(showMenu){
      this.showCollapseButton = true;
      this.showExpandButton = false;
    } else {
      this.showCollapseButton = false;
      this.showExpandButton = true;
    }
    this.cdr.detectChanges();

    this.showSlideMenu = typeof showMenu === 'boolean' ? showMenu : !this.showSlideMenu;
    this.setSlideBarStyle(true);
  }

  setSlideBarStyle(isClick?: Boolean): void {
    const ele = this.document.querySelector('.sidebar-wrapper');
    const searchEle = this.document.querySelector('.sidebar-search-container');
    const footerEle = this.document.querySelector('.sidebar-footer')
    if (ele) {
      searchEle.setAttribute('style', `display: ${ this.showSlideMenu ? 'block': 'none'} !important; max-width: ${ this.showSlideMenu ? '230px' : '0'}`);
      footerEle.setAttribute('style', `display: ${ this.showSlideMenu ? 'flex': 'none'} !important; max-width: ${ this.showSlideMenu ? '249px' : '0'}`);
      if(isClick) {
        ele.setAttribute('style', `max-width: ${ this.showSlideMenu ? '250px' : '0'}; padding: ${ this.showSlideMenu ? '0 8px 38px 8px' : '0'}; border-right: 1px solid var(--devui-dividing-line, #dfe1e6)`);
      } else {
        ele.setAttribute('style', `max-width: ${ this.showSlideMenu ? '320px' : '0'}`);
      }
    }
  }

  changeLanguage(lang: string): void {
    this.curLanguage = lang;
    this.searchPlaceholder = this.curLanguage === 'zh-cn' ? '请输入你想查找的组件' : 'Enter the component';
  }

  toggleHamburger(event) {
    this.showHamburger = !this.showHamburger;
    this.cdr.detectChanges();
  }
}
