import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'd-form-operation',
  template: '<ng-content></ng-content>',
  styles: [
    `
      .devui-form-horizontal :host.devui-form-operation {
        display: block;
        margin-left: 96px;
      }
      .devui-form-vertical :host.devui-form-operation {
        display: block;
      }
      .devui-form-columns :host.devui-form-operation {
        display: block;
        padding: 8px 0;
      }
    `,
  ],
})
export class FormOperationComponent implements OnInit {
  constructor(elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'devui-form-operation');
  }

  ngOnInit() {}
}
