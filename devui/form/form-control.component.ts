import {
  Component,
  Renderer2,
  OnInit,
  ElementRef,
  Input,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'd-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  preserveWhitespaces: false,
})
export class FormControlComponent implements OnInit {
  @Input() extraInfo: string | TemplateRef<any>;
  get extraInfoTemplate() {
    return this.extraInfo instanceof TemplateRef ? this.extraInfo : null;
  }

  errorMessage: string;
  feedbackStatus: 'error' | null;

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    private cdr: ChangeDetectorRef,
  ) {
    renderer.addClass(elementRef.nativeElement, 'devui-form-controls');
  }

  ngOnInit() {

  }

  public updateErrorMessage(message: string) {
    this.errorMessage = message;
    this.cdr.detectChanges();
  }

  public updateFeedbackStatus(status: 'error' | null): void {
    this.feedbackStatus = status;
    this.cdr.detectChanges();
  }
}
