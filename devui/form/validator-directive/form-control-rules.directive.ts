import { Directive, Input, Self, OnChanges, SimpleChanges, Host, Optional } from '@angular/core';
import { Output, SkipSelf, ComponentFactoryResolver, ElementRef, ComponentRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl, AbstractControlDirective, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ValidationErrors, ControlContainer } from '@angular/forms';
import { Observable, fromEvent, merge, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { PopoverComponent } from 'ng-devui/popover';
import { FormItemComponent } from '../form-item.component';
import { DAsyncValidateRule, dDefaultValidators, DFormControlStatus, DValidateErrorStatus } from './validate.type';
import { DValidateRule, DValidateRules, DValidationErrorStrategy, ruleReservedWords } from './validate.type';
import { I18nInterface, I18nService } from 'ng-devui/i18n';

@Directive()
export abstract class DAbstractControlRuleDirective implements OnChanges {

  /* mode is _cd.control */
  public readonly _cd: AbstractControlDirective; // model is _cd.control

  /* parent dValidateRuleDirective */
  private _parent: DAbstractControlRuleDirective;

  /* rules */
  private _rules: DValidateRules;

  /* 统一设置错误抛出策略 */
  private _errorStrategy: DValidationErrorStrategy = 'dirty'; // 统一设置错误抛出策略

  /* rules map */
  private _messageOpts: {[key: string]: DValidateRule | DAsyncValidateRule};

  /* 是否已经注册监听 */
  private _registered = false;

  public readonly errors: { [key: string]: any } | null;

  private _errorMessage: string = null;

  /* status warning */
  private _warning: boolean;

  /* 内置国际化text */
  private i18nFormText: I18nInterface['form'];
  private i18nSubscription: Subscription;

  public get errorMessage() {
    return (this._cd && this._cd.control.invalid) ?
      (this._errorMessage || this._rules && (this._rules as {message: string}).message) : null;
  }

  public set errorMessage(msg: string) {
    if (this._cd && this._cd.control.invalid) {
      this._errorMessage = msg;
    } else {
      this._errorMessage = null;
    }
  }

  @Output() dRulesStatusChange = new EventEmitter<DValidateErrorStatus>();

  constructor(
    cd: AbstractControlDirective,
    parent: DAbstractControlRuleDirective,
    i18n: I18nService
    ) {
    this._cd = cd;
    this._parent = parent;
    this.i18nFormText = i18n.getI18nText().form;
    this.i18nSubscription = i18n.langChange().subscribe((data) => {
      this.i18nFormText = data.form;
    });
  }

  get isReady() {
    return this._cd.control ? !(this._cd.control.invalid || this._cd.control.pending) : true;
  }

  get pending() {
    return this._cd.control ? this._cd.control.pending : true;
  }

  /* 包含继承自父级的rule */
  get fullRules(): DValidateRules {
    const keysCanInherit = ['messageShowType', 'errorStrategy', 'messageToView', 'updateOn', 'popPosition'];
    const resRules = { ...this._rules };
    keysCanInherit.forEach(key => {
      if (this._parent && this._parent.fullRules) {
        resRules[key] = resRules[key] || this._parent.fullRules[key];
      }
    });

    return resRules;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('rules' in changes && !this._rules) { // TODO：提供外部调用可手动更新rule方法
      this._rules = changes['rules'].currentValue;
      this.setupOrUpdateRules();
    }

    if (!this._registered) {
      this._registerOnStatusChange();
    }
  }


  public setupOrUpdateRules(): void {
    // TODO：校验rules规则是否合法
    this._transformRulesAndUpdateToModel();
    this._setUpdateStrategy();
  }
  private _transformRulesAndUpdateToModel(): void {
    this._messageOpts = {};
    if (!Array.isArray(this._rules)) {
      if (this._rules.validators) {
        const validators: ValidatorFn[] = this._transformValidatorsToFnArray(this._rules.validators) as ValidatorFn[];
        this._updateValidators(validators);
      }
      if (this._rules.asyncValidators) {
        const asyncValidators: AsyncValidatorFn[] =
          this._transformValidatorsToFnArray(this._rules.asyncValidators, true) as AsyncValidatorFn[];
        this._updateAsyncValidators(asyncValidators);
      }
    } else {
      const validators: ValidatorFn[] = this._transformValidatorsToFnArray(this._rules) as ValidatorFn[];
      this._updateValidators(validators);
    }
    this._updateValueAndValidity();
  }

  private _transformValidatorsToFnArray
  (validators: DValidateRule[] | DAsyncValidateRule[], async = false):  ValidatorFn[] | AsyncValidatorFn[] {
    const resultFns = [];
    validators.forEach((validatorRule: DValidateRule) => {
      // TODO: 提供可全局统一注册方法
      const validatorId: string = this._autoGetIdFromRule(validatorRule);
      let validator = null;

      if (!validatorId) {
        // TODO：抛出错误
      }

      if (validatorId in dDefaultValidators) {
        validator = this._generateValidatorFnFromDefault(validatorId, validatorRule[validatorId]);
      } else {
        if (typeof validatorRule[validatorId] === 'string') {
          validator = validatorRule.validator;
        } else {
          validator = validatorRule[validatorId];
        }
        if (!validatorRule.isNgValidator) {
          if (!async) {
            validator = this._transformRuleToNgValidator(validatorId, validator, validatorRule.message);
          } else {
            validator = this._transformRuleToNgAsyncValidator(validatorId, validator, validatorRule.message);
          }
        }
      }

      if (validator) {
        resultFns.push(validator);
        this._messageOpts[validatorId] = validatorRule;
      }
      // else {
      //   // TODO: 抛出错误
      // }
    });
    return resultFns as (AsyncValidatorFn[] | ValidatorFn[]);
  }

  private _findNgValidatorInDefault(validatorRule: DValidateRule) {
    for (const key in dDefaultValidators) {
      if (validatorRule.hasOwnProperty(key)) {
        return {id: key, ngValidator: this._generateValidatorFnFromDefault(key, validatorRule[key])};
      }
    }
    return null;
  }

  private _generateValidatorFnFromDefault(key, value) {
    if (typeof value === 'boolean' && value) {  // boolean无需再执行函数进行传值
      return dDefaultValidators[key];
    } else if (typeof value !== 'boolean') {
      return dDefaultValidators[key](value);
    }
    return null;
  }

  private _transformRuleToNgValidator(id, validatorFn, message) {
    return (control: AbstractControl): ValidationErrors|null => {
      const res = validatorFn(control.value);
      return this._transValidatorResultToNgError(id, res, message);
    };
  }

  private _transformRuleToNgAsyncValidator(id, validator, message) {
    return (control: AbstractControl): Observable<ValidationErrors|null> => {
      return (validator(control.value) as Observable<boolean>).pipe(
        map((res) => {
          return this._transValidatorResultToNgError(id, res, message);
        })
      );
    };
  }

  private _transValidatorResultToNgError(id: string, res: boolean | string | null, message: string) {
    let error = null;
    if (typeof res === 'boolean' && !res) {
      error = {};
      error[id] = message;
    } else if (typeof res === 'string') {
      error = {};
      error[id] = res;
    }
    return error;
  }

  private _autoGetIdFromRule(rule: DValidateRule | DAsyncValidateRule) {
    for (const key in rule) {
      if (!(key in ruleReservedWords)) {
        return key;
      }
    }
    return rule.id || null;
  }

  // TODO: 考虑自定义函数返回多种key场景
  get dClassError() {
    if (this._errorStrategy === 'dirty') {
      return this._cd.control ? this._cd.control.invalid && this._cd.control.dirty : false;
    } else {
      return this._cd.control ? this._cd.control.invalid : false;
    }
  }

  get showError() {
    return this.dClassError;
  }

  get showStatus() {
    if (this._errorStrategy === 'dirty') {
      return this._cd.control ? this._cd.control.dirty : false;
    } else {
      return true;
    }
  }

  get dClassSuccess() { // COMMENT: 暂不默认提供
    if (this._rules['errorStrategy'] === 'dirty') {
      return this._cd.control ? this._cd.control.valid && this._cd.control.dirty : false;
    } else if (!this._rules['errorStrategy']) {
      return false;
    } else {
      return this._cd.control ? this._cd.control.valid : false;
    }
  }

  get dClassWarning() {
    return this._warning ? true : false;
  }

  get invalid() {
    return this._cd.control ? this._cd.control.invalid : false;
  }

  private _registerOnStatusChange() {
    if (this._cd && this._cd.control) {
      this._cd.control.statusChanges.subscribe((status) => {
        this._parseErrors(this._cd.control.errors);
        this._updateParent();  // update error message to parent directive
        this.updateStatusAndMessageToView(status);
      });
      this._registered = true;
    }
  }

  private _parseErrors(errors: {[key: string]: any}): void {
    if (!errors) {
      this._errorMessage = null;
    } else {
      /* if a rule did not have a message, we will try to get a message from errors by id */
      const { resId, resRule } = this._getARuleByErrors(errors);
      this._errorStrategy = this._getErrorStrategy(resRule);
      this._errorMessage = resRule &&
        (
          resRule.message || this._getMessageFormErrorsById(errors, resId) || this._getDefaultErrorMessage(resRule, resId)
          || (this._rules as {message: string}).message
        );
    }

    this.dRulesStatusChange.emit({
      showError: this.showError,
      errorMessage: this._errorMessage,
      errors: errors
    });
  }

  private _getDefaultErrorMessage(rule, id) {
    return rule && rule[id] && this.i18nFormText[id] && this.i18nFormText[id](rule[id]);
  }

  private _getErrorStrategy(rule?) {
    return rule && rule.errorStrategy || this._rules['errorStrategy'] || 'dirty';
  }

  private _getMessageFormErrorsById(errors: {[key: string]: any}, id: string): string | null {
    if (errors[id] && typeof errors[id] === 'string') {
      return errors[id];
    } else {
      return null;
    }
  }

  private _getARuleByErrors(errors: {[key: string]: any}) {
    // TODO：处理errors为null
    let resId: string;
    let resRule = null;
    for (const key of Object.keys(errors)) {
      if (this._messageOpts[key]) {
        if (resRule) {
          const priority = resRule.priority || 0;
          if (this._messageOpts[key].priority && this._messageOpts[key].priority > priority) {
            resId = key;
            resRule = this._messageOpts[key];
          }
        } else {
          resId = key;
          resRule = this._messageOpts[key];
        }
      }
    }
    return { resId: resId, resRule: resRule };
  }

  _updateParent() {
    if (this._parent) {
      // TODO
    }
  }

  private _setUpdateStrategy(): void {
    if (!Array.isArray(this._rules) &&
    typeof this._rules === 'object' &&
    this._rules.updateOn) {
      (this._cd.control as any)._updateOn = this._rules.updateOn;
    }
  }

  public _updateValueAndValidity() {
    if (this._cd && this._cd.control) {
      this._cd.control.updateValueAndValidity();
    }
  }

  private _updateValidators(newValidator: ValidatorFn|ValidatorFn[]|null): void {
    if (this._cd && this._cd.control) {
      this._cd.control.setValidators(newValidator);
    }
  }

  private _updateAsyncValidators(newValidator: AsyncValidatorFn|AsyncValidatorFn[]|null): void {
    if (this._cd && this._cd.control) {
      this._cd.control.setAsyncValidators(newValidator);
    }
  }

  abstract updateStatusAndMessageToView(status: any): void;
}

const dControlErrorStatusHost = {
  '[class.devui-error]': 'dClassError',
  '[class.devui-success]': 'dClassSuccess',
  '[class.devui-warning]': 'dClassWarning',
};

@Directive({
  selector: `[dValidateRules][formGroupName],[dValidateRules][formArrayName],[dValidateRules][ngModelGroup],
          [dValidateRules][formGroup],[dValidateRules]form:not([ngNoForm]),[dValidateRules][ngForm]`,
  // tslint:disable-next-line: no-host-metadata-property
  host: dControlErrorStatusHost,
  exportAs: 'dValidateRules'
})

export class DFormGroupRuleDirective extends DAbstractControlRuleDirective implements OnChanges {
  @Input('dValidateRules') rules: DValidateRules;
  @Output() dRulesStatusChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Self() cd: ControlContainer,
    @Optional() @Host() @SkipSelf() parentDir: DFormGroupRuleDirective,
    i18n: I18nService
  ) {
    super(cd, parentDir, i18n);
  }

  setErrorMessageByChild(msg: string) {
    if (!this.errorMessage) {
      this.errorMessage = msg;
    }
  }

  updateStatusAndMessageToView(status: any): void {
    // do nothing
  }
}

@Directive({
  selector: '[dValidateRules][formControlName],[dValidateRules][ngModel],[dValidateRules][formControl]',
  // tslint:disable-next-line: no-host-metadata-property
  host: dControlErrorStatusHost,
  exportAs: 'dValidateRules'
})

export class DFormControlRuleDirective extends DAbstractControlRuleDirective implements OnInit, OnChanges, OnDestroy {
  @Input('dValidateRules') rules: DValidateRules;
  @Output() dRulesStatusChange: EventEmitter<any> = new EventEmitter<any>();

  popoverComponentRef: ComponentRef<PopoverComponent>;
  private destroy$ = new Subject();
  popMessage: string;  // 最终显示的message

  get showType() {
    return (this.fullRules as {messageShowType: string}).messageShowType || 'popover';
  }

  get popPosition() {
    return (this.fullRules as {popPosition: any}).popPosition || ['right', 'bottom'];
  }

  constructor(
    @Self() cd: NgControl,
    @Optional() @Host() private dFormItem: FormItemComponent,
    @Optional() @Host() @SkipSelf() parentDir: DFormGroupRuleDirective,
    i18n: I18nService,
    public triggerElementRef: ElementRef,
    private overlayContainerRef: OverlayContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(cd, parentDir, i18n);
  }

  ngOnInit(): void {
    this._registerFocusChange();
  }

  _registerFocusChange() {
    merge(
      fromEvent(this.triggerElementRef.nativeElement, 'focusin'),
      fromEvent(this.triggerElementRef.nativeElement, 'focusout')
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe((event: Event) => {
      if (event.type === 'focusin') {
        this.showPopMessage();
      }
      if (event.type === 'focusout') {
        this.hidePopMessage();
      }
    });
  }

  _updateFormContainer(status, message: string): void {
    if (this.dFormItem) {
      this.dFormItem.updateFeedback(status, message);
    }
  }

  _updatePopMessage(status: DFormControlStatus, message: string): void {
    this.popMessage = status === 'error' ? message : null; // 暂不提供除errorMessage外提示
    if (this.popoverComponentRef) {
      this.popoverComponentRef.instance.content = message;
      setTimeout(() => { // TODO: popover使用onPush后，可去除当前setTimeout
        if (this.popoverComponentRef) {
          this.popoverComponentRef.instance.updatePositionAndDetectChange();
        }
      });
    }
  }

  updateStatusAndMessageToView(status: any): void {
    let controlStatus = null, message = null;
    if (this.showStatus) {
      [controlStatus, message] = this.getFormControlStatusAndMessage(status);
    }

    if (this.showType === 'popover') {
      this._updatePopMessage(controlStatus, message);
      this._updateFormContainer(controlStatus, null);
    } else if (this.showType === 'text') {
      this._updateFormContainer(controlStatus, message);
    }
  }

  getFormControlStatusAndMessage(ngStatus: any) {
    let status = null;
    let message = null;
    if (ngStatus === 'INVALID') {
      status = 'error';
      message = this.errorMessage;
    } else if (ngStatus === 'PENDING') {
      status = 'pending';
    } else if (ngStatus === 'VALID') {
      status = 'success';
    }
    return [status, message];
  }

  createPopover(type: 'error' | 'warning', content: string) {
    this.popoverComponentRef = this.overlayContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(PopoverComponent)
    );
    Object.assign(this.popoverComponentRef.instance, {
      content: content,
      triggerElementRef: this.triggerElementRef,
      position: this.popPosition,
      popType: type,
      popMaxWidth: 200,
      appendToBody: true,
      zIndex: 1060
    });
  }

  public showPopMessage() {
    this.showPop('error', this.popMessage);
    if (this.popMessage) {
      this._updateFormContainer(null, null);
    }
  }

  public hidePopMessage() {
    this.hidePop();
    if (this.popMessage) {
      this._updateFormContainer(this.showError ? 'error' : null, null);
    }
  }

  showPop(type, message) {
    this.hidePop();
    this.createPopover(type, message);
  }

  hidePop() {
    if (this.popoverComponentRef) {
      this.destroyPop();
    }
  }

  destroyPop() {
    if (this.popoverComponentRef) {
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyPop();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
