import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-border-radius',
  templateUrl: './border-radius.component.html'
})
export class BorderRadiusComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  borderRadius = [];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.setI18n();
  }

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-border-radius.cornerDemo.instance').subscribe((res) => {
        this.setValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-border-radius.cornerDemo.instance');
        this.setValues(values);
      })
    );
  }

  setValues(values) {
    this.borderRadius = [
      { name: '$devui-border-radius', value: '2px', description: values.borderRadius['devui-border-radius'] },
      { name: '$devui-border-radius-feedback', value: '4px', description: values.borderRadius['devui-border-radius-feedback'] },
      { name: '$devui-border-radius-card', value: '6px', description: values.borderRadius['devui-border-radius-card'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
