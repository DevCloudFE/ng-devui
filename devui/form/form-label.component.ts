import {
    Component,
    ElementRef,
    Renderer2,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';


  @Component({
    selector: 'd-form-label',
    templateUrl: './form-label.component.html',
    styleUrls: ['./form-label.component.scss'],
    preserveWhitespaces: false,
  })
  export class FormLabelComponent {
    @Input() required = false;
    @Input() hasHelp = false;
    @Input() helpTips = '';

    constructor(elementRef: ElementRef,
      renderer: Renderer2) {
        renderer.addClass(elementRef.nativeElement, 'devui-form-label');
    }

  }
