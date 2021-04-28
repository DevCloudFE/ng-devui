import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Routes } from '@angular/router';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ComponentDataService } from './component.data.service';
import { routesConfig } from './component.route';
import { resolveRoutesConfig } from './resolve-routes-config.service';
@Component({
  selector: 'cd-app-content', // tslint:disable-line
  templateUrl: './app-content.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppContentComponent implements OnInit, OnDestroy {
  routes: Routes = [];
  componentsData = [];
  sideMenuList = [
    {path: 'overview', name: '组件总览', linkType: 'routerLink' },
    {path: 'get-start', name: '快速开始', linkType: 'routerLink' },
    {path: 'theme-guide', name: '主题化使用指南', linkType: 'routerLink' },
    {path: 'global-config', name: '全局设置', linkType: 'routerLink' },
  ];
  clickSub: Subscription = new Subscription();
  // @ViewChild('dSearch', { static: true }) dSearch: SearchComponent;
  componentsDataDisplay = [];
  constructor(private translate: TranslateService, private comDataService: ComponentDataService) {
    this.componentsDataDisplay = resolveRoutesConfig(localStorage.getItem('lang') || 'zh-cn', routesConfig);
    this.comDataService.comData = this.componentsDataDisplay;
    this.generateSideMenuList(localStorage.getItem('lang') || 'zh-cn');
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.componentsDataDisplay = resolveRoutesConfig(localStorage.getItem('lang'), routesConfig);
      this.comDataService.comData = this.componentsDataDisplay;

      const values = this.translate.instant('public');
      this.generateSideMenuList(values);
    });
  }
  ngOnInit(): void {
  }

  generateSideMenuList(values) {
    this.sideMenuList[0].name = values['overview']?.title;
    this.sideMenuList[1].name = values['start'];
    this.sideMenuList[2].name = values['themeDoc'];
    this.sideMenuList[3].name = values['globalDoc'];
  }

  ngOnDestroy(): void {
    if (this.clickSub) {
      this.clickSub.unsubscribe();
    }
  }
}
