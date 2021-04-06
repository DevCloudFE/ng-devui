import { Component, ContentChildren, HostListener, Input, OnInit, QueryList } from '@angular/core';
import { DevuiCommonsService } from '../devui-commons.service';
import { LogoComponent } from './logo/logo.component';

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

  @ContentChildren(LogoComponent) subLogo: QueryList<LogoComponent> = new QueryList<LogoComponent>();

  collapseMenuActive = false;
  showSlideMenu = true;
  curLanguage: string;
  searchPlaceholder: string;

  @Input() userAvatar;


  @HostListener('window:resize')
  resize() {
    this.showSlideMenu = document.body.clientWidth < 1024 ? false : true;
    this.setSlideBarStyle();
  }

  constructor(private commonsService: DevuiCommonsService) {
  }

  ngOnInit() {
    this.curLanguage = localStorage.getItem('lang') || 'zh-cn';
    this.commonsService.on('languageEvent').subscribe(term => this.changeLanguage(term));
    this.searchPlaceholder = this.curLanguage === 'zh-cn' ? '请输入你想查找的组件' : 'Enter the component';
    this.showSlideMenu = document.body.clientWidth < 1024 ? false : true;
    this.setSlideBarStyle();
  }

  onSearch(term) {
    this.commonsService.broadcast('searchEvent', term);
  }

  toggleMenu($event): void {
    this.collapseMenuActive = !this.collapseMenuActive;
  }

  clickSlideMenu($event) {
    this.showSlideMenu = !this.showSlideMenu;
    this.setSlideBarStyle();
  }

  setSlideBarStyle() {
    const ele = document.querySelector('.sidebar-wrapper');
    if (ele) {
      ele.setAttribute('style', `max-width: ${ this.showSlideMenu ? '260px' : '0'}`);
    }
  }

  changeLanguage(lang) {
    this.curLanguage = lang;
    this.searchPlaceholder = this.curLanguage === 'zh-cn' ? '请输入你想查找的组件' : 'Enter the component';
  }

}
