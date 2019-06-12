import {
    Directive,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[aveModalContentHost]',
})
export class ModalContentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}

@Directive({
    selector: '[aveModalContainerHost]',
})
export class ModalContainerDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
