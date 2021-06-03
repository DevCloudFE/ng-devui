import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { cloneDeep } from 'lodash-es';
import { environment } from 'src/environments/environment';
import { ComponentDataService } from './component.data.service';
import { componentMap } from './component.map';
import { filterData } from './resolve-routes-config.service';

@Component({
  selector: 'd-components-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class ComponentsOverviewComponent implements OnInit, OnDestroy {
  srcPrefix = environment.deployPrefix + 'assets';
  imgPrefix = '';
  componentsLooking = [];
  componentsSuggest = [];
  componentsDataDisplay = [];
  componentsData = [];
  overviewText: any = {};
  themeService;
  darkMode = '';
  totalNumComponents: number;
  // 使用如下个数的元素来占位，用于将flex布局为space-between时的元素顶到前面去，形成类似grid布局的效果
  // 使用14个是因为将页面缩放至最小25%时,一行最多元素为15个,14个刚好可以将只有一个的元素顶到左边界处
  flexPlaceHolder = 14;
  flexPlaceHolders: Array<any>;

  suggestScopeList: Array<string> = [
    'categorySearch',
    'datePickerPro',
    'gantt',
    'quadrantDiagram',
    'navSprite',
    'dataTable'
  ];
  newScopeList: Array<string> | string = [
    'categorySearch',
    'dataTable',
    'drawer',
    'timeAxis',
    'search',
    'upload',
    'quadrantDiagram',
    'tree',
    'datePicker'
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
    this.calNumberOfComponents();
    this.setPrefix();
    this.initScopeList();
    this.setTheme();
    this.setComponentsSuggest();

    this.flexPlaceHolders = new Array(this.flexPlaceHolder).fill(0);
  }

  calNumberOfComponents() {
    this.totalNumComponents = 0;
    this.componentsData.map(components => {
      this.totalNumComponents = this.totalNumComponents + components.children.length;
    });
  }

  setPrefix() {
    this.imgPrefix = './' + this.srcPrefix + '/overview/';
  }

  initScopeList() {
    let scopeList;
    if (typeof this.newScopeList === 'string') {
      scopeList = this.newScopeList.toLocaleLowerCase().match(/\* \*\*.+\:\*\*/g);
    } else if (Array.isArray(this.newScopeList)) {
      scopeList = this.newScopeList.map(scope => scope.toLocaleLowerCase());
    } else {
      scopeList = [];
    }
    this.newScopeList = Array.from(new Set(scopeList.map(scope => scope.replace(/(\W|_|[0-9])*/g, ''))));
  }

  setTheme() {
    if (window['devuiThemeService']) {
      this.themeService = window['devuiThemeService'];
      if (window['devuiCurrentTheme']) {
        this.themeChange();
      }
      if (this.themeService.eventBus) {
        this.themeService.eventBus.add('themeChanged', this.themeChange);
      }
    }
  }

  setComponentsSuggest() {
    this.componentsSuggest = [];
    this.componentsData.map(cmpList => {
      cmpList.children.map(cmp => {
        if (this.suggestScopeList.find(scope => scope.toLocaleLowerCase() === cmp.lowerName)) {
          this.componentsSuggest.push(cloneDeep(cmp));
        }
      });
    });
  }

  themeChange = () => {
    if (window['devuiCurrentTheme'] === 'devui-dark-theme') {
      this.darkMode = '-dark';
    } else {
      this.darkMode = '';
    }
  }

  searchComponent(event) {
    this.componentsDataDisplay = filterData(event, this.componentsData);
    this.componentsLooking = [];
    if (!this.componentsDataDisplay || !this.componentsDataDisplay.length) {
      const res = componentMap.find(cmp => {
        return cmp.matches.find(child => {
          return child.includes(event);
        });
      });
      if (res) {
        this.componentsData.map(cmpList => {
          cmpList.children.map(cmp => {
            if (res.name.includes(cmp.lowerName)) {
              this.componentsLooking.unshift(cloneDeep(cmp));
            }
          });
        });
      }
    }
  }

  jumpToComponent(link) {
    this.router.navigate(['components', 'zh-cn', link]);
  }

  imgError(event) {
    const img = event.srcElement;
    img.src = this.imgPrefix + 'default.png';
    img.onerror = null;
  }

  ngOnDestroy() {
    if (this.themeService) {
      if (this.themeService.eventBus) {
        this.themeService.eventBus.remove('themeChanged', this.themeChange);
      }
    }
  }
}
