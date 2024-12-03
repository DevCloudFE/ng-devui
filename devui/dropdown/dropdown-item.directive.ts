import { Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[dDropDownMenuItem]',
  exportAs: 'd-dropdown-menu-item',
})
export class DropDownMenuItemDirective implements OnChanges {
  @Input() disabled = false;
  @HostBinding('class.devui-dropdown-item') itemClass = true;

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled) {
      if (this.disabled) {
        this.render.setStyle(this.el.nativeElement, 'pointer-events', 'none');
      } else {
        this.render.removeStyle(this.el.nativeElement, 'pointer-events');
      }
    }
  }
}
