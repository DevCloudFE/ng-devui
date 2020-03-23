import {
    Directive,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[dModalContentHost]',
})
export class ModalContentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}

@Directive({
    selector: '[dModalContainerHost]',
})
export class ModalContainerDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
