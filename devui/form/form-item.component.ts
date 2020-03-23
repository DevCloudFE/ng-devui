import {
    Component,
    Renderer2,
    OnInit,
    ElementRef,
  } from '@angular/core';

  @Component({
    selector: 'd-form-item',
    template: `
    <ng-content></ng-content>
    `,
    styleUrls: ['./form-item.component.scss'],
  })
  export class FormItemComponent implements OnInit {

    constructor(
        elementRef: ElementRef,
        renderer: Renderer2) {
        renderer.addClass(elementRef.nativeElement, 'devui-form-item');
    }

    ngOnInit() {

    }
  }
