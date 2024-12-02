import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-datepicker-pro-demo',
  templateUrl: './datepicker-pro-demo.component.html',
})
export class DatepickerProDemoComponent implements OnInit, OnDestroy {
  BasicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic-datepicker-pro.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic-datepicker-pro.component.ts?raw') },
  ];

  showTimeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./show-time/show-time-picker.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./show-time/show-time-picker.component.ts?raw') },
  ];

  markedTypeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./marked-type/marked-type.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./marked-type/marked-type.component.ts?raw') },
  ];

  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./template/datepicker-template.component.html?raw') },
    { title: 'SCSS', language: 'css', code: require('./template/datepicker-template.component.scss?raw') },
    { title: 'TS', language: 'typescript', code: require('./template/datepicker-template.component.ts?raw') },
  ];

  monthYearSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./month-year-picker/month-year-picker.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./month-year-picker/month-year-picker.component.ts?raw') },
  ];

  rangeTypeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./range-type/range-type-picker.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./range-type/range-type-picker.component.ts?raw') },
  ];

  rangeTemplateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./range-template/range-template.component.html?raw') },
    { title: 'SCSS', language: 'css', code: require('./range-template/range-template.component.scss?raw') },
    { title: 'TS', language: 'typescript', code: require('./range-template/range-template.component.ts?raw') },
  ];

  hostTemplateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./host-template/datepicker-host-template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./host-template/datepicker-host-template.component.ts?raw') },
  ];

  DatepickerProDemoStaticPanel: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./static-panel/datepicker-pro-static-panel.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./static-panel/datepicker-pro-static-panel.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./static-panel/datepicker-pro-static-panel.component.scss?raw') },
  ];

  SelectDatepickerProDemo: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./select-type/select-type.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./select-type/select-type.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./select-type/select-type.component.scss?raw') },
  ];

  DatepickerProDemoTabType: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./tab-type/datepicker-pro-tab-type.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./tab-type/datepicker-pro-tab-type.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./tab-type/datepicker-pro-tab-type.component.scss?raw') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.datepicker-pro.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.datepicker-pro.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'date-marked', value: values['mark-type'] },
      { dAnchorLink: 'show-time', value: values['show-time'] },
      { dAnchorLink: 'template', value: values.template },
      { dAnchorLink: 'monthYear', value: values.monthYear },
      { dAnchorLink: 'range-picker', value: values.rangePicker },
      { dAnchorLink: 'range-template', value: values.rangeTemplate },
      { dAnchorLink: 'host-template', value: values['host-template'] },
      { dAnchorLink: 'datepicker-pro-static-panel', value: values['datepicker-pro-static-panel'] },
      { dAnchorLink: 'select-type', value: values['select-type'] },
      { dAnchorLink: 'datepicker-pro-tab-type', value: values['tab-typeDemo'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
