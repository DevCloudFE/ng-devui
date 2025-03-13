import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-quadrant-diagram-demo',
    templateUrl: './quadrant-diagram-demo.component.html',
    standalone: false
})

export class QuadrantDiagramDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') }
  ];
  configSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./config/config.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./config/config.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./config/config.component.scss?raw') }
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.quadrant-diagram.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.quadrant-diagram.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'custom-quadrant', value: values['custom-quadrant'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
