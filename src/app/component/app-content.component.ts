import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { VERSION } from '../../../devui/version';
import { ComponentDataService } from './component.data.service';
import { routesConfig } from './component.route';
import { resolveRoutesConfig } from './resolve-routes-config.service';
import { newScopeList, sunsetScopeList } from './scope-list';
@Component({
  selector: 'd-app-content',
  templateUrl: './app-content.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppContentComponent implements OnDestroy, OnInit {
  routes: Routes = [];
  componentsData = [];
  sideMenuList = [
    { path: 'overview', name: '组件总览', linkType: 'routerLink' },
    { path: 'get-start', name: '快速开始', linkType: 'routerLink' },
    { path: 'theme-guide', name: '主题化使用指南', linkType: 'routerLink' },
    { path: 'global-config', name: '全局设置', linkType: 'routerLink' },
  ];
  clickSub: Subscription = new Subscription();
  // @ViewChild('dSearch', { static: true }) dSearch: SearchComponent;
  componentsDataDisplay = [];
  componentsText: any = {};
  overviewText: any = {};
  text: any;
  version: string;
  versionOptions = [ ];

  constructor(private translate: TranslateService, private comDataService: ComponentDataService) {
    this.setI18n();
    this.resolveRoutesConfig();
    this.generateSideMenuList(localStorage.getItem('lang') || 'zh-cn');
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.setI18n();
      this.resolveRoutesConfig();

      const values = this.translate.instant('public');
      this.generateSideMenuList(values);
    });
  }
  ngOnInit(): void {
    this.version = VERSION.full;
    const versionArr = this.version.split('.');
    this.versionOptions = [
      { name: this.version, link: '/components/get-start', target: '_self' },
      { name: '16.2.0', link: '/16.2.0/', target: '_self' },
      { name: '15.1.0', link: '/15.1.0/', target: '_self' },
      { name: '14.1.0', link: '/14.1.0/', target: '_self' },
      { name: '13.3.0', link: '/13.3.0/', target: '_self' },
      { name: '12.3.0', link: '/12.3.0/', target: '_self' },
      { name: '11.4.0', link: '/11.4.0/', target: '_self' },
      { name: '10.2.0', link: '/10.2.0/', target: '_self' },
      { name: '9.3.0', link: '/9.3.0/', target: '_self' },
      { name: '8.2.0', link: '/8.2.0/', target: '_self' }
    ];
  }

  setI18n() {
    this.componentsText = this.translate.instant('components');
    this.overviewText = this.translate.instant('public').overview;
    this.text = {
      new: this.overviewText?.newChange,
      sunset: this.overviewText?.sunset,
    };
  }

  setDescription() {
    this.componentsDataDisplay.forEach((componentsGroup) => {
      componentsGroup.children.forEach((component) => {
        const name = component.name.replace(' ', '').toLocaleLowerCase();
        for (const key in this.componentsText) {
          if (key.replace(/\-/g, '').toLocaleLowerCase() === name) {
            component.description = this.componentsText[key].description.replace(/。/g, '');
            break;
          }
        }
      });
    });
  }

  resolveRoutesConfig() {
    this.componentsDataDisplay = resolveRoutesConfig(localStorage.getItem('lang') || 'zh-cn', routesConfig);

    this.setDescription();

    const newScopes = this.getScopList(newScopeList);
    const sunsetScopes = this.getScopList(sunsetScopeList);
    this.componentsDataDisplay.forEach((componentsGroup) => {
      componentsGroup.children.forEach((component) => {
        if (newScopes.includes(component.lowerName)) {
          component.newChange = true;
        }
        if (sunsetScopes.includes(component.lowerName)) {
          component.sunset = true;
        }
      });
    });

    this.comDataService.comData = this.componentsDataDisplay;
  }

  getScopList(list) {
    let scopeList;
    if (typeof list === 'string') {
      scopeList = list.toLocaleLowerCase().match(/\* \*\*.+\:\*\*/g);
    } else if (Array.isArray(list)) {
      scopeList = list.map((scope) => scope.toLocaleLowerCase());
    } else {
      scopeList = [];
    }
    return Array.from(new Set(scopeList.map((scope) => scope.replace(/(\W|_|[0-9])*/g, ''))));
  }

  generateSideMenuList(values: any) {
    this.sideMenuList[0].name = values.overview?.title;
    this.sideMenuList[1].name = values.start;
    this.sideMenuList[2].name = values.themeDoc;
    this.sideMenuList[3].name = values.globalDoc;
  }

  ngOnDestroy(): void {
    if (this.clickSub) {
      this.clickSub.unsubscribe();
    }
  }
}
