import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-design-color-demo',
  templateUrl: './design-color-demo.component.html',
})
export class DesignColorDemoComponent implements OnInit, OnDestroy {
  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.design-color.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-color.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [{ dAnchorLink: 'color', value: values.color }];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
