import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ToggleMenuListItem } from './toggle-menu.type';

@Component({
  selector: 'd-toggle-menu-label',
  templateUrl: './toggle-menu-label.component.html',
  styleUrls: [`./toggle-menu-label.component.scss`],
})
export class ToggleMenuLabelComponent {
  @Input() mode: 'normal' | 'scroll-y' | 'multiple-line' | string;
  @Input() multiItems: Array<ToggleMenuListItem> = [];
  @Input() disabled = false;
  @Input() maxWidth: string;
  @Input() maxHeight: string;
  @Input() optionDisabledKey = '';
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() valueParser: (item: any) => any;
  @Output() removeChange = new EventEmitter<any>();

  trackByOptionPointer(index, item) {
    return item.option;
  }

  removeItem(item, event, index) {
    this.removeChange.emit({ ...item, event, index });
  }
}
