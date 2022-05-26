import { Component, Input, TemplateRef } from '@angular/core';
@Component({
  selector: 'd-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() icon: string | TemplateRef<any>;
  @Input() operable = false;
  @Input() disabled = false;
  @Input() rotate: number;
  get template() {
    return this.icon instanceof TemplateRef ? this.icon : null;
  }

}
