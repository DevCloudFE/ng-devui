import { Directive, HostBinding, Input } from '@angular/core';
import { AccordionBase, AccordionOptions } from './accordion.type';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class AccordionBaseComponent<T extends AccordionBase> {
  @Input() item: any | T;
  @Input() deepth = 0;
  @Input() parent: any | T;

  @HostBinding('class.disabled')
  get disabled() {
    return this.item && this.item[this.accordion.disabledKey];
  }
  @HostBinding('attr.title')
  public get title() {
    return this.item && this.item[this.accordion.titleKey];
  }
  @HostBinding('style.textIndent')
  get textIndent() {
    return this.deepth * 20 + 'px';
  }

  constructor(protected accordion: AccordionOptions) { }
}
