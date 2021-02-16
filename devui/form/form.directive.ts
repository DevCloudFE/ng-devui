import { ContentChildren, Directive, EventEmitter, HostBinding, Input, Optional, Output, QueryList, Self } from '@angular/core';
import { AbstractControl, AbstractControlDirective, ControlContainer, NgForm } from '@angular/forms';
import { filter, startWith, take } from 'rxjs/operators';
import { DFormControlRuleDirective, DFormGroupRuleDirective } from './validator-directive/form-control-rules.directive';

export enum FormLayout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Columns = 'columns',
}

@Directive({
  selector: '[dForm]',
  exportAs: 'dForm',
})
export class FormDirective {
  @Input() layout = FormLayout.Horizontal;
  @Input() labelSize: 'sm' | '' | 'lg' = '';

  /**
   * @deprecated Use dHasFeedback to replace, No longer support for label
   */
  @Input() dFeedbackType: 'label' | 'control';

  @Input() dHasFeedback = false;

  @Output() dSubmit = new EventEmitter();

  public readonly _cd: AbstractControlDirective;
  public readonly _dValidateRuleDir: DFormGroupRuleDirective;
  @ContentChildren(DFormControlRuleDirective, { descendants: true }) childrenCtrDirs: QueryList<DFormControlRuleDirective>;

  @HostBinding('class.devui-form-horizontal')
  get layoutHorizontal() {
    return this.layout === FormLayout.Horizontal;
  }

  @HostBinding('class.devui-form-vertical')
  get layoutVertical() {
    return this.layout === FormLayout.Vertical;
  }

  @HostBinding('class.devui-form-columns')
  get layoutColumns() {
    return this.layout === FormLayout.Columns;
  }

  @HostBinding('class.devui-form-lg')
  get labelSizeLg() {
    return this.labelSize === 'lg';
  }

  @HostBinding('class.devui-form-sm')
  get labelSizeSm() {
    return this.labelSize === 'sm';
  }

  updateOnSubmit($event?, data?: any) {
    this._operateAllControl(this._cd.control, (cd: AbstractControl) => {
      cd.markAsDirty();
      cd.updateValueAndValidity();
    });

    /* emit event should after validate */
    this._cd.control.statusChanges
      .pipe(
        startWith(this._cd.control.status),
        filter((status) => {
          return status !== 'PENDING';
        }),
        take(1)
      )
      .subscribe(() => {
        if (this._cd) {
          (this._cd as NgForm).onSubmit($event); // TODO: 需触发原生form表单的submit方法
          if (this._dValidateRuleDir) {
            this.dSubmit.emit({
              valid: this._dValidateRuleDir.isReady,
              directive: this._dValidateRuleDir,
              data: data
            });
          } else {
            this.dSubmit.emit({
              valid: this._cd.valid,
              directive: this._cd,
              data: data
            });
          }
        }

        if (this.childrenCtrDirs) {
          for (const validateDir of this.childrenCtrDirs) {
            if (validateDir.invalid && validateDir.showType === 'popover') {
              validateDir.showPopMessage(); // TODO: 表单类组件需要实现focus方法，若无focus，将无法正常blur
              break;
            }
          }
        }
      });
  }

  updateOnReset() {
    if (this._cd) {
      (this._cd as NgForm).onReset(); // TODO: 需触发原生form表单的reset方法
    }
    this._operateAllControl(this._cd.control, (cd: AbstractControl) => {
      cd.markAsPristine();
      cd.updateValueAndValidity();
    });
  }

  private _operateAllControl(control: AbstractControl, operatorFn: (control: AbstractControl) => void) {
    if (control) {
      operatorFn(control);
      const controls = (control as any).controls;
      if (controls) {
        for (const key of Object.keys(controls)) {
          this._operateAllControl(controls[key], operatorFn);
        }
      }
    }
  }

  constructor(@Optional() @Self() cd: ControlContainer, @Optional() @Self() dValidateRuleDir: DFormGroupRuleDirective) {
    this._cd = cd;
    this._dValidateRuleDir = dValidateRuleDir;
  }
}
