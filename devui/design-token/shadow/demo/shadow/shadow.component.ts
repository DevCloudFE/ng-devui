import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.scss']
})
export class ShadowComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  shadows = [];
  oldShadows = [];

  activeTab = 'curShadow';

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.setI18n();
  }

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-shadow.shadowDemo.instance').subscribe((res) => {
        this.setValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-shadow.shadowDemo.instance');
        this.setValues(values);
      })
    );
  }

  setValues(values) {
    this.shadows = [
      { name: '$devui-shadow-length-base', value: '0 1px 4px 0', description: values.shadows['devui-shadow-length-base'] },
      { name: '$devui-shadow-length-slide-left', value: '-2px 0 8px 0', description: values.shadows['devui-shadow-length-slide-left'] },
      { name: '$devui-shadow-length-slide-right', value: '2px 0 8px 0', description: values.shadows['devui-shadow-length-slide-right'] },
      { name: '$devui-shadow-length-connected-overlay', value: '0 2px 8px 0', description: values.shadows['devui-shadow-length-connected-overlay'] },
      { name: '$devui-shadow-length-hover', value: '0 4px 16px 0', description: values.shadows['devui-shadow-length-hover'] },
      { name: '$devui-shadow-length-feedback-overlay', value: '0 4px 16px 0', description: values.shadows['devui-shadow-length-feedback-overlay'] },
      { name: '$devui-shadow-length-fullscreen-overlay', value: '0 8px 40px 0', description: values.shadows['devui-shadow-length-fullscreen-overlay'] },
    ];

    this.oldShadows = [
      { name: '$hwc-shadow-1', newName: '$devui-shadow-length-base $devui-light-shadow',
        value: '0 1px 3px 0 rbga(0, 0, 0, 0.1)', description: values.oldShadows['hwc-shadow-1'] },
      { name: '$hwc-shadow-2', newName: '$devui-shadow-length-connected-overlay $devui-shadow',
        value: '0 2px 5px 0 rgba(0, 0, 0, 0.2)', description: values.oldShadows['hwc-shadow-2'] },
      { name: '$hwc-shadow-3', newName: '$devui-shadow-length-feedback-overlay $devui-shadow',
        value: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', description: values.oldShadows['hwc-shadow-3'] },
      { name: '$hwc-shadow-4', newName: '$devui-shadow-length-hover $devui-shadow',
        value: '0 2px 8px 0 rgba(94, 124, 224, 0.3)', description: values.oldShadows['hwc-shadow-4'] },
      { name: '$hwc-shadow-5', newName: '$devui-shadow-length-connected-overlay $devui-light-shadow',
        value: '0 0 6px 0 rgba(0, 0, 0, 0.1)', description: values.oldShadows['hwc-shadow-5'] },
      { name: '$hwc-shadow-6', newName: '$devui-shadow-length-base $devui-light-shadow',
        value: '0 8px 6px -4px rgba(199, 54, 54, 0.4)', description: values.oldShadows['hwc-shadow-6'] },
      { name: '$hwc-shadow-7', newName: '$devui-shadow-length-fullscreen-overlay $devui-light-shadow',
        value: '0 10px 40px 0 rgba(0, 0, 0, 0.1)', description: values.oldShadows['hwc-shadow-7'] },
      { name: '$hwc-shadow-8', newName: '$devui-shadow-length-base $devui-light-shadow',
        value: '0 1px 2px 0 rgba(57, 71, 166, 0.5)', description: values.oldShadows['hwc-shadow-8'] },
      { name: '$hwc-shadow-error', newName: '$devui-shadow-length-base $devui-danger',
        value: '0 1px 3px 0 rgba(199, 54, 54, 0.25)', description: values.oldShadows['hwc-shadow-error'] },
      { name: '$hwc-shadow-warn', newName: '$devui-shadow-length-base $devui-warning',
        value: ' 0 1px 3px 0 rgba(204, 100, 20, 0.25)', description: values.oldShadows['hwc-shadow-warn'] },
      { name: '$hwc-shadow-prompt', newName: '$devui-shadow-length-base $devui-info',
        value: '0 1px 3px 0 rgba(70, 94, 184, 0.25)', description: values.oldShadows['hwc-shadow-prompt'] },
      { name: '$hwc-shadow-success', newName: '$devui-shadow-length-base $devui-success',
        value: '0 1px 3px 0 rgba(39, 176, 128, 0.25)', description: values.oldShadows['hwc-shadow-success'] },
      { name: '$hwc-shadow-dark', newName: '$devui-shadow-length-feedback-overlay $devui-shadow',
        value: '0 5px 8px 0 rgba(70, 77, 110, 0.25)', description: values.oldShadows['hwc-shadow-dark'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
