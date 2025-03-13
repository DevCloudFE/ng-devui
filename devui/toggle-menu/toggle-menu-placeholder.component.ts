import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'd-toggle-menu-placeholder',
    template: `
    <ng-container *ngIf="isTemplate; else defaultTemplate"></ng-container>
    <ng-template #defaultTemplate
      ><span class="devui-placeholder">{{ placeholder }}</span></ng-template
    >
  `,
    styleUrls: [`./toggle-menu-placeholder.component.scss`],
    standalone: false
})
export class ToggleMenuPlaceholderComponent {
  @Input() placeholder: TemplateRef<any> | string;
  get isTemplate() {
    return this.placeholder && typeof this.placeholder !== 'string';
  }
}
