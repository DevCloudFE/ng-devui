import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[dShapeIconHoverable]',
    standalone: false
})
export class ShapeIconHoverableDirective{
  @HostBinding('class.devui-shape-icon')
  getStyle() {
    return true;
  }
}

