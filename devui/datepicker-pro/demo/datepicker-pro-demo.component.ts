import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-datepicker-pro-demo',
  templateUrl: './datepicker-pro-demo.component.html',
})
export class DatepickerProDemoComponent implements OnInit, OnDestroy {
  BasicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic-datepicker-pro.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic-datepicker-pro.component.ts') },
  ];

  showTimeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./show-time/show-time-picker.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./show-time/show-time-picker.component.ts') },
  ];

  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./template/datepicker-template.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./template/datepicker-template.component.scss') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./template/datepicker-template.component.ts') },
  ];

  monthYearSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./month-year-picker/month-year-picker.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./month-year-picker/month-year-picker.component.ts') },
  ];

  rangeTypeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./range-type/range-type-picker.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./range-type/range-type-picker.component.ts') },
  ];

  rangeTemplateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./range-template/range-template.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./range-template/range-template.component.scss') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./range-template/range-template.component.ts') },
  ];

  hostTemplateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./host-template/datepicker-host-template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./host-template/datepicker-host-template.component.ts') },
  ];

  DatepickerProDemoStaticPanel: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./static-panel/datepicker-pro-static-panel.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./static-panel/datepicker-pro-static-panel.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./static-panel/datepicker-pro-static-panel.component.scss') },
  ];

  SelectDatepickerProDemo: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./select-type/select-type.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./select-type/select-type.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./select-type/select-type.component.scss') },
  ];

  DatepickerProDemoTabType: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./tab-type/datepicker-pro-tab-type.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./tab-type/datepicker-pro-tab-type.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./tab-type/datepicker-pro-tab-type.component.scss') },
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
      { dAnchorLink: 'show-time', value: values['show-time'] },
      { dAnchorLink: 'template', value: values['template'] },
      { dAnchorLink: 'monthYear', value: values['monthYear'] },
      { dAnchorLink: 'range-picker', value: values['rangePicker'] },
      { dAnchorLink: 'range-template', value: values['rangeTemplate'] },
      { dAnchorLink: 'host-template', value: values['host-template']  },
      { dAnchorLink: 'datepicker-pro-static-panel', value: values['datepicker-pro-static-panel']},
      { dAnchorLink: 'select-type', value: values['select-type']  },
      { dAnchorLink: 'datepicker-pro-tab-type', value: values['tab-typeDemo']}
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
