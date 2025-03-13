import { ChangeDetectorRef, Component, ContentChild, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControlComponent } from './form-control.component';
import { FormLabelComponent } from './form-label.component';
import { DFormControlStatus } from './validator-directive/validate.type';

@Component({
    selector: 'd-form-item',
    template: ` <ng-content></ng-content> `,
    styleUrls: ['./form-item.component.scss'],
    preserveWhitespaces: false,
    standalone: false
})
export class FormItemComponent implements OnInit {
  @HostBinding('class.devui-form-has-error-msg') _hasErrorMsg = false;

  /**
   * @deprecated Use dHasFeedback to replace, No longer support for label
   */
  @Input() dFeedbackType: 'label' | 'control';

  @Input() dHasFeedback = false;

  @ContentChild(FormControlComponent) controlInstance: FormControlComponent;
  @ContentChild(FormLabelComponent) labelInstance: FormLabelComponent;

  constructor(elementRef: ElementRef, renderer: Renderer2, private cdr: ChangeDetectorRef) {
    // FIXME: 循环依赖，打包后将不可用：FormItemComponent -> FormDirective -> DFormControlRuleDirective -> FormItemComponent
    // @Optional() @Host() @SkipSelf() private _dForm: FormDirective,

    renderer.addClass(elementRef.nativeElement, 'devui-form-item');
  }

  ngOnInit() {}

  updateFeedback(status: DFormControlStatus | null, updateMessage: string): void {
    this._hasErrorMsg = !!updateMessage;

    const feedbackType = this.dFeedbackType;
    if (feedbackType === 'label' && this.labelInstance) {
      this.labelInstance.updateFeedbackStatus(status);
    } else if ((feedbackType === 'control' || this.dHasFeedback) && this.controlInstance) {
      this.controlInstance.updateFeedbackStatus(status);
    }

    if (this.controlInstance) {
      this.controlInstance.updateErrorMessage(updateMessage);
    }

    this.cdr.detectChanges();
  }
}
