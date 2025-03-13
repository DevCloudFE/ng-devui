import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dEditorHost]',
    standalone: false
})
export class EditorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
