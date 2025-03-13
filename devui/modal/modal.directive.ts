import {
  Directive,
  ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[dModalContentHost]',
    standalone: false
})
export class ModalContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Directive({
    selector: '[dModalContainerHost]',
    standalone: false
})
export class ModalContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
