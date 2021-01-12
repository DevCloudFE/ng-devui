import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2, TemplateRef
} from '@angular/core';
import { DFormControlStatus } from './validator-directive/validate.type';

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
  @Input() feedbackStatus: DFormControlStatus | null;

  @HostBinding('class.devui-form-control-has-feedback') get status() {
    return !!this.feedbackStatus;
  }

  /**
   * @desc Compatible with z-index of components that include dropdown menu, will be remove.
   *
   */
  @HostBinding('class.devui-control-has-open-dropdown') get dropdownOpen() {
    return !!this.elementRef.nativeElement.querySelector('.devui-dropdown-origin-open');
  }

  constructor(
    private elementRef: ElementRef,
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

  public updateFeedbackStatus(status: DFormControlStatus | null): void {
    this.feedbackStatus = status;
    this.cdr.detectChanges();
  }
}
