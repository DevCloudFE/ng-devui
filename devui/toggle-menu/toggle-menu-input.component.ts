import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-toggle-menu-input',
  templateUrl: './toggle-menu-input.component.html',
  styleUrls: [`./toggle-menu-input.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleMenuInputComponent {
  @Input() value: any;
  @Input() inputValue: any;
  @Input() inputWidth: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() filterKey: string;
  @Input() isDisabledCustomTemplate = false;
  @Input() customTemplate: TemplateRef<any>;
  @HostBinding('style.width')
  get width() {
    return this.inputWidth || 'inherit';
  }
}
