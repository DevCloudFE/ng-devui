import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  polyfills = [];

  constructor(private translate: TranslateService) {}
  ngOnInit() {
    this.subs.add(
      this.translate.get('components.polyfill.basicDemo').subscribe((res) => {
        this.setDescription(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.polyfill.basicDemo');
        this.setDescription(values);
      })
    );
  }

  setDescription(values) {
    this.polyfills = [
      { name: 'Element.prototype.remove', license: 'MIT', size: '0.4KB', browser: 'IE', description: values['remove'] },
      {
        name: 'Element.prototype.matches', license: 'MIT', size: '0.4KB', browser: 'ALL', description: values['matches']
      },
      { name: 'Element.prototype.closest', license: 'MIT', size: '0.2KB', browser: 'IE', description: values['closest']
      },
      { name: 'Event', license: 'MIT', size: '5.9KB', browser: '--', description: values['event'] },
      { name: 'NodeList.prototype.forEach', license: 'MIT', size: '0.05KB', browser: 'IE', description: values['forEach'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
