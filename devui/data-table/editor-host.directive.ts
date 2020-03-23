import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dEditorHost]',
})
export class EditorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
