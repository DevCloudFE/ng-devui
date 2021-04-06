import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[dTextInput]',
  exportAs: 'dTextInput',
})
export class TextDirective {
  @Input() @HostBinding('class.error') error: boolean;
  @Input() size = '';

  @HostBinding('class.devui-textinput-lg')
  get large() {
    return this.size === 'lg';
  }

  @HostBinding('class.devui-textinput-sm')
  get small() {
    return this.size === 'sm';
  }

  constructor() { }

}
