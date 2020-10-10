import {
    Component,
    ElementRef,
    Renderer2,
    Input,
    ChangeDetectorRef
  } from '@angular/core';


  @Component({
    selector: 'd-form-label',
    templateUrl: './form-label.component.html',
    styleUrls: ['./form-label.component.scss'],
    preserveWhitespaces: false
  })
  export class FormLabelComponent {
    @Input() required = false;
    @Input() hasHelp = false;
    @Input() helpTips = '';

    feedbackStatus: 'error' | null = null;

    constructor(
      private cdr: ChangeDetectorRef,
      elementRef: ElementRef,
      renderer: Renderer2
    ) {
      renderer.addClass(elementRef.nativeElement, 'devui-form-label');
    }

    public updateFeedbackStatus(status: 'error' | null): void {
      this.feedbackStatus = status;
      this.cdr.detectChanges();
    }
  }
