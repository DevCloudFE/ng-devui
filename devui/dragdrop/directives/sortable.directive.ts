import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[aveSortable]'
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class SortableDirective {
    @Input('aveSortable')  aveSortDirection = 'v';
    @HostBinding('attr.ave-sortable') aveSortable = true;
    constructor(public el: ElementRef) {}
}
