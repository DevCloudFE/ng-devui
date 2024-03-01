import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input, Renderer2, TemplateRef
} from '@angular/core';
import { DFormControlStatus } from './validator-directive/validate.type';

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
  @Input() customHelpTipTemplate: TemplateRef<any>;

  feedbackStatus: DFormControlStatus | null = null;

  @HostBinding('class.devui-form-label-has-feedback') get status() {
    return this.feedbackStatus !== null;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'devui-form-label');
  }

  public updateFeedbackStatus(status: DFormControlStatus | null): void {
    this.feedbackStatus = status;
    this.cdr.detectChanges();
  }
}
