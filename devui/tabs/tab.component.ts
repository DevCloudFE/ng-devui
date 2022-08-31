import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { TabContentDirective } from './tab-content.directive';
import { TabTitleDirective } from './tab-title.directive';

@Component({
  selector: 'd-tab',
  template: `<ng-template #innerContent><ng-content></ng-content></ng-template>`,
  preserveWhitespaces: false,
})
export class TabComponent {
  /**
   * @deprecated
   * 用id替代
   */
  @Input() set tabId(value) {
    this.id = value;
  }
  @Input() id: number | string;
  @Input() title: string;
  @Input() disabled = false;
  /**
   * @deprecated
   * 内容直接写在标签内
   */
  @ContentChild(TabContentDirective) contentTpl: TabContentDirective;
  @ContentChild(TabTitleDirective) titleTpl: TabTitleDirective;
  @ViewChild('innerContent', { static: true }) innerContent: TemplateRef<any>;
}
