import {
    Component,
    Renderer2,
    OnInit,
    ElementRef,
  } from '@angular/core';


  @Component({
    selector: 'd-form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.scss']
  })
  export class FormControlComponent implements OnInit {

    constructor(elementRef: ElementRef,
        renderer: Renderer2
        ) {
          renderer.addClass(elementRef.nativeElement, 'devui-form-controls');
    }

    ngOnInit() {

    }
  }
