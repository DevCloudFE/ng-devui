import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Inject, ChangeDetectorRef } from '@angular/core';
import { DevuiCommonsService } from '../../devui-commons.service';
import { I18nUtil } from '../../i18n/i18n.util';
import { componentSvg, designSvg, ecologySvg, logoSvg, vueDevUISvg } from './icon';
import { LinkMap } from 'devui-commons/src/constant';

@Component({
  selector: "d-header-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  @Input() menuList = [];
  @Input() selectedItem = {};
  @Output() menuEvent = new EventEmitter<string>();
  curLanguage: string;
  document: Document;
  header: Element;
  showMobileMenu = false;
  mediaQuery;

  commonMenuList = [
    {
      name: "设计",
      enName: "DevUI Design",
      href: "/design-cn/start",
      target: "_self",
      icon: designSvg,
    },
    {
      name: "组件",
      enName: "Components",
      href: "/components/get-start",
      icon: componentSvg,
    },
    {
      name: "生态",
      enName: "Ecology",
      icon: ecologySvg,
      open: true,
      children: [
        {
          name: "Vue DevUI",
          description: "基于 Vue3 框架及 DevUI Design 设计风格的跨端组件库",
          enDescription:
            "Cross-End component library based on Vue3 and DevUI design style",
          enName: "Vue DevUI",
          href: LinkMap.vueDevuiLink,
          icon: vueDevUISvg,
          menuName: "vue",
        },
        {
          name: "DevUI Admin",
          enName: "DevUI Admin",
          description: "DevUI Admin",
          enDescription: "DevUI Admin",
          href: "/admin-page/home",
          icon: logoSvg,
          menuName: "admin",
        },
        {
          name: "DevUI 图标库",
          enName: "DevUI Assets",
          description: "DevUI 设计风格图标合集",
          enDescription: "DevUI design style icon collection",
          href: `/icon/ruleResource`,
          icon: logoSvg,
          menuName: "icon",
        },
      ],
    },
  ];


  constructor(
    private commonsService: DevuiCommonsService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
  }

  ngOnInit(): void {
    this.mediaQuery = window.matchMedia('(max-width: 767px)');
    this.mediaQuery.addListener(this.handleScreenChange);
    this.handleScreenChange(this.mediaQuery);
    this.curLanguage = I18nUtil.getCurrentLanguage();
    this.header = this.document.querySelector(".header-wapper");
    this.commonsService
      .on("languageEvent")
      .subscribe((term) => this.changeLanguage(term));
    if (!this.menuList.length) {
      this.menuList = this.commonMenuList;
    }
    const pathName = window.location.pathname;
    for (let i = 0; i < this.menuList.length; i++) {
      if (this.menuList[i].href === pathName) {
        this.selectedItem = this.menuList[i];
      }
    }
  }

  handleScreenChange = (e) => {
    if (e.matches) {
      this.showMobileMenu = true;
    } else {
      this.showMobileMenu = false;
    }
    this.cdr.detectChanges();
  }

  onSelect(item): void {
    if (item.target === "_self") {
      this.selectedItem = item;
    }
    this.menuChange(item.name);
  }

  menuChange(value: string): void {
    this.menuEvent.emit(value);
  }

  changeLanguage(lang): void {
    this.curLanguage = lang;
  }
}
