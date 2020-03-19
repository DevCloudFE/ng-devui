import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[dSortable]'
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class SortableDirective {
    @Input('dSortable')  dSortDirection = 'v';
    @HostBinding('attr.d-sortable') dSortable = true;
    constructor(public el: ElementRef) {}
}
