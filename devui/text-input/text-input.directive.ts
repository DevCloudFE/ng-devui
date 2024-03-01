import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';

@Directive({
  selector: '[dTextInput]',
  exportAs: 'dTextInput',
})
export class TextDirective {
  @Input() @HostBinding('class.error') error: boolean;
  @Input() size = '';
  @Input() @WithConfig() styleType = 'default';
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }

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

  @HostBinding('attr.title')
  get showTitle() {
    const dom = this.el?.nativeElement;
    return dom?.disabled ? dom.value ?? '' : '';
  }

  constructor(private el: ElementRef, private devConfigService: DevConfigService) {}
}
