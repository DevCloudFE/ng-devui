import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'ng-devui/theme';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-animation',
  templateUrl: './animation.component.html',
})
export class AnimationComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  subs: Subscription = new Subscription();
  animation = [];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    if (typeof window !== undefined) {
      this.setI18n();
    }
  }

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-animation.AnimationDemo.instance').subscribe((res) => {
        this.setValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-animation.AnimationDemo.instance');
        this.setValues(values);
      })
    );
  }

  setValues(values) {
    this.animation = [
      { name: '$devui-animation-duration-slow', value: '300ms', description: values.animation['devui-animation-duration-slow'] },
      { name: '$devui-animation-duration-base', value: '200ms', description: values.animation['devui-animation-duration-base'] },
      { name: '$devui-animation-duration-fast', value: '100ms', description: values.animation['devui-animation-duration-fast'] },
      {
        name: '$devui-animation-ease-out', value: 'cubic-bezier(0.16, 0.75, 0.5, 1)',
        description: values.animation['devui-animation-ease-out']
      },
      {
        name: '$devui-animation-ease-in-out', value: 'cubic-bezier(0.5, 0.05, 0.5, 0.95)',
        description: values.animation['devui-animation-ease-in-out']
      },
      {
        name: '$devui-animation-ease-in', value: 'cubic-bezier(0.5, 0, 0.84, 0.25)',
        description: values.animation['devui-animation-ease-in']
      },
      {
        name: '$devui-animation-ease-in-out-smooth', value: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        description: values.animation['devui-animation-ease-in-out-smooth']
      },
      {
        name: '$devui-animation-linear', value: 'cubic-bezier(0, 0, 1, 1)',
        description: values.animation['devui-animation-linear']
      }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
