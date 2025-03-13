import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'd-button-design',
    templateUrl: './button-design.component.html',
    styleUrls: ['./button-design.component.scss'],
    standalone: false
})

export class ButtonDesignComponent implements OnInit {
  structureImgSrc;
  useImgSrc;
  sizeList = [];
  buttonList = [];
  layoutList = [];
  primaryLeft = [];
  primaryRight = [];
  structureList = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.structureImgSrc = environment.deployPrefix + 'assets/design/button/structure.png';
    this.useImgSrc = environment.deployPrefix + 'assets/design/button/use.png';
    this.subs.add(
      this.translate.get('components.button.design').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.button.design');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.sizeList = values['how-to-use']['size-list'];
    this.buttonList = values['button-list'];
    this.layoutList = values.layout.layoutStrategies;
    this.primaryLeft = values.layout.primaryLeft;
    this.primaryRight = values.layout.primaryRight;
    this.structureList = values.structure.descList;
  }

  getImgSrc(src) {
    return environment.deployPrefix + src;
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
