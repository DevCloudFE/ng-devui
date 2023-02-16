import { Directive, HostBinding, Input } from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';

@Directive({
  selector: '[dTextInput]',
  exportAs: 'dTextInput',
})
export class TextDirective {
  @Input() @HostBinding('class.error') error: boolean;
  @Input() size = '';
  @Input() @WithConfig() styleType = 'default';

  @HostBinding('class.devui-textinput-lg')
  get large() {
    return this.size === 'lg';
  }

  @HostBinding('class.devui-textinput-sm')
  get small() {
    return this.size === 'sm';
  }

  @HostBinding('class.devui-gray-style')
  get gray() {
    return this.styleType === 'gray';
  }

  constructor(private devConfigService: DevConfigService) {}
}
