import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { cloneDeep } from 'lodash-es';
import { environment } from 'src/environments/environment';
import { ComponentDataService } from './component.data.service';
import { filterData } from './resolve-routes-config.service';

@Component({
  selector: 'd-components-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class ComponentsOverviewComponent implements OnInit, OnDestroy {
  srcPrefix = 'assets';
  imgPrefix = '';
  componentsDataDisplay = [];
  componentsData = [];
  overviewText: any = {};
  themeService;
  darkMode = '';
  // 使用如下个数的元素来占位，用于将flex布局为space-between时的元素顶到前面去，形成类似grid布局的效果
  // 使用14个是因为将页面缩放至最小25%时,一行最多元素为15个,14个刚好可以将只有一个的元素顶到左边界处
  flexPlaceHolder = 14;
  flexPlaceHolders: Array<any>;

  scopeList: Array<string> | string = [
    'navSprite',
    'form',
    'categorySearch',
    'modal',
    'toast',
    'dataTable',
    'readTip'
  ];

  constructor(private translate: TranslateService, private router: Router, private comDataService: ComponentDataService) {
    this.comDataService.getComData().subscribe(value => this.componentsData = value);
    this.componentsDataDisplay = cloneDeep(this.componentsData);
    this.overviewText = this.translate.instant('public').overview;
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.componentsDataDisplay = cloneDeep(this.componentsData);
      const values = this.translate.instant('public');
      this.overviewText = values.overview;
    });
  }

  ngOnInit() {
    this.setPrefix();
    this.initScopeList();
    this.setDarkMode();

    this.flexPlaceHolders = new Array(this.flexPlaceHolder).fill(0);
  }

  setPrefix() {
    if (environment.production) {
      this.srcPrefix = 'components/assets';
    }
    this.imgPrefix = './' + this.srcPrefix + '/overview/';
  }

  initScopeList() {
    let scopeList;
    if (typeof this.scopeList === 'string') {
      scopeList = this.scopeList.toLocaleLowerCase().match(/\* \*\*.+\:\*\*/g);
    } else if (Array.isArray(this.scopeList)) {
      scopeList = this.scopeList.map(scope => scope.toLocaleLowerCase());
    } else {
      scopeList = [];
    }
    this.scopeList = Array.from(new Set(scopeList.map(scope => scope.replace(/(\W|_|[0-9])*/g, ''))));
  }

  setDarkMode() {
    if (window['devuiThemeService']) {
      this.themeService = window['devuiThemeService'];
      if (window['devuiCurrentTheme']) {
        this.darkMode = window['devuiCurrentTheme'] === 'devui-dark-theme' ? '-dark' : '';
      }
      if (this.themeService.eventBus) {
        this.themeService.eventBus.add('themeChanged', this.themeChange);
      }
    }
  }

  themeChange = () => {
    this.darkMode = window['devuiCurrentTheme'] === 'devui-dark-theme' ? '-dark' : '';
  }

  searchComponent(event) {
    this.componentsDataDisplay = filterData(event, this.componentsData);
  }

  jumpToComponent(link) {
    this.router.navigate(['components', 'zh-cn', link]);
  }

  ngOnDestroy() {
    if (this.themeService) {
      if (this.themeService.eventBus) {
        this.themeService.eventBus.remove('themeChanged', this.themeChange);
      }
    }
  }
}
