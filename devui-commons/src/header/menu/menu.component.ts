import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DevuiCommonsService } from '../../devui-commons.service';
import { I18nUtil } from '../../i18n/i18n.util';
import { componentSvg, designSvg, ecologySvg, logoSvg, vueDevUISvg } from './icon';

interface menuItem {
  name?: string;
  enName?: string;
  description?: string;
  enDescription?: string;
  href?: string;
  target?: string;
  children?: menuItem[];
  icon?: string;
  menuName?: string;
}

@Component({
  selector: 'd-header-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() menuList: menuItem[] = [];
  @Input() selectedItem = {};
  @Output() menuEvent = new EventEmitter<string>();
  curLanguage!: string;
  document: Document;
  header: Element;

  docLinkMap = {
    opensource: ''
  };

  constructor(private commonsService: DevuiCommonsService, private router: Router, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  ngOnInit(): void {
    this.header = this.document.querySelector('.header-wapper');
    this.curLanguage = I18nUtil.getCurrentLanguage();
    const websiteType = window.location.pathname.split('/')[1];
    if (!this.menuList.length) {
      this.menuList = [
        {
          name: '设计',
          enName: 'DevUI Design',
          href: '/design-cn/start',
          target: '_self',
          icon: designSvg,
          menuName: 'docs'
        },
        {
          name: '组件',
          enName: 'Components',
          href: '/components/get-start',
          icon: componentSvg,
          menuName: 'components'
        },
        {
          name: '生态',
          enName: 'Ecology',
          icon: ecologySvg,
          children: [
            {
              children: [
                {
                  name: 'Vue DevUI',
                  description: '基于 Vue3 框架及 DevUI Design 设计风格的跨端组件库',
                  enDescription: 'Cross-End component library based on Vue3 and DevUI design style',
                  enName: 'Vue DevUI',
                  href: 'https://vue-devui.github.io/',
                  icon: vueDevUISvg,
                  menuName: 'vue'
                },
                {
                  name: 'DevUI Admin',
                  enName: 'DevUI Admin',
                  description: 'DevUI Admin',
                  enDescription: 'DevUI Admin',
                  href: '/admin-page/home',
                  icon: logoSvg,
                  menuName: 'admin'
                },
                {
                  name: 'DevUI 图标库',
                  enName: 'DevUI Assets',
                  description: 'DevUI 设计风格图标合集',
                  enDescription: 'DevUI design style icon collection',
                  href: `/icon/ruleResource`,
                  icon: logoSvg,
                  menuName: 'icon'
                },
              ],
            },
          ],
        },
      ];
      this.commonsService.on('languageEvent').subscribe((term) => {
        this.menuList[1].href = `/components/${term}/overview`;
      });
    }
    this.commonsService.on<string>('languageEvent').subscribe((term) => this.changeLanguage(term));
    if (typeof window !== 'undefined') {
      const pathName = window.location.pathname.split('/')[1];
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].menuName === pathName) {
          this.selectedItem = this.menuList[i];
        }
      }
    }
  }

  onSelect(item: menuItem): void {
    if (item.target === '_self') {
      this.selectedItem = item;
    }
    this.menuChange(item.name);
  }

  menuChange(value: string): void {
    this.menuEvent.emit(value);
  }

  changeLanguage(lang: string): void {
    this.curLanguage = lang;
  }
  navigateTo(path) {
    this.router.navigate(path);
  }
}