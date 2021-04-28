import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-font',
  templateUrl: './font.component.html',
  styleUrls: ['./font.component.scss']
})
export class FontComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  fonts = [];

  oldFonts = [];

  activeTab = 'curFont';

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.setI18n();
  }

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-font.fontDemo.instance').subscribe((res) => {
        this.setValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-font.fontDemo.instance');
        this.setValues(values);
      })
    );
  }

  setValues(values) {
    this.fonts = [
      { name: '$devui-font-size-data-overview', value: '24px', description: values.fonts['devui-font-size-data-overview'] },
      { name: '$devui-font-size-price', value: '20px', description: values.fonts['devui-font-size-price'] },
      { name: '$devui-font-size-modal-title', value: '18px', description: values.fonts['devui-font-size-modal-title'] },
      { name: '$devui-font-size-page-title', value: '16px', description: values.fonts['devui-font-size-page-title'] },
      { name: '$devui-font-size-card-title', value: '14px', description: values.fonts['devui-font-size-card-title'] },
      { name: '$devui-font-size', value: '12px', description: values.fonts['devui-font-size'] },
      { name: '$devui-font-size-icon', value: '16px', description: values.fonts['devui-font-size-icon'] },
      { name: '$devui-font-size-sm', value: '12px', description: values.fonts['devui-font-size-sm'] },
      { name: '$devui-font-size-md', value: '12px', description: values.fonts['devui-font-size-md'] },
      { name: '$devui-font-size-lg', value: '14px', description: values.fonts['devui-font-size-lg'] },
      { name: '$devui-font-title-weight', value: 'bold', description: values.fonts['devui-font-title-weight'] },
      { name: '$devui-font-content-weight', value: 'normal', description: values.fonts['devui-font-content-weight'] },
      { name: '$devui-line-height-base', value: '1.5', description: values.fonts['devui-line-height-base'] },
    ];

    this.oldFonts = [
      { name: '$font-size-modal-title', newName: '$devui-font-size-modal-title', value: '18px', description: values.oldFonts['font-size-modal-title'] },
      { name: '$font-size-primary', newName: '$devui-font-size-page-title', value: '16px', description: values.oldFonts['font-size-primary'] },
      { name: '$font-size-secondary-card-title', newName: '$devui-font-size-card-title', value: '14px', description: values.oldFonts['font-size-secondary-card-title'] },
      { name: '$font-size-base', value: '12px', newName: '$devui-font-size', description: values.oldFonts['font-size-base'] },
      { name: '$font-title-weight', value: 'bold', newName: '$devui-font-title-weight', description: values.oldFonts['font-title-weight'] },
      { name: '$font-content-weight', value: 'normal', newName: '$devui-font-content-weight', description: values.oldFonts['font-content-weight'] },
      { name: '$line-height-base', value: '1.5', newName: '$devui-line-height-base', description: values.oldFonts['line-height-base'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
