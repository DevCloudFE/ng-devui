import { Directive, Input, Self, OnChanges, SimpleChanges, Host, Optional } from '@angular/core';
import { Output, SkipSelf, ComponentFactoryResolver, ElementRef, ComponentRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl, AbstractControlDirective, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ValidationErrors, ControlContainer } from '@angular/forms';
import { Observable, fromEvent, merge, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { PopoverComponent } from 'ng-devui/popover';
import { FormItemComponent } from '../form-item.component';
import { DAsyncValidateRule, dDefaultValidators, DValidateErrorStatus } from './validate.type';
import { DValidateRule, DValidateRules, DValidationErrorStrategy, ruleReservedWords } from './validate.type';

export abstract class DAbstractControlRule implements OnChanges {

  /* mode is _cd.control */
  public readonly _cd: AbstractControlDirective; // model is _cd.control

  /* parent dValidateRuleDirective */
  private _parent: DFormGroupRuleDirective;

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

  constructor(cd: AbstractControlDirective, parent: DFormGroupRuleDirective) {
    this._cd = cd;
    this._parent = parent;
  }

  get isReady() {
    return this._cd.control ? !(this._cd.control.invalid || this._cd.control.pending) : true;
  }

  /* 包含继承自父级的rule */
  get fullRules(): DValidateRules {
    const keysCanInherit = ['messageShowType', 'errorStrategy', 'messageToView', 'updateOn'];
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
    // TODO：差一个rules规则方法
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
      // TODO: 如果是全局注册怎么办？如果是要传参数怎么办？  解法：全局提供一个注册函数，我们自己再来封装一下
      const validatorId: string = this._autoGetIdFromRule(validatorRule);
      let validator = null;

      if (!validatorId) {
        // 抛错
      }

      if (validatorId in dDefaultValidators) {
        validator = this._generateValidatorFnFromDefault(validatorId, validatorRule[validatorId]);
      } else {
        if (typeof validatorRule[validatorId] === 'string') {
          validator = validatorRule.validator;
        } else {
          validator = validatorRule[validatorId];
        }
        if (!validatorRule.isNgValidator) { // 如果ng校验器
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

  // TODO: 这里有一个问题：如果我的自定义函数想要返回多个key，咋办，如果是想要返回多个key，那么一定是angular的自定义验证器，先不管此种情况吧。后续如果真有诉求，进行扩展
  // TODO: 如果
  // TODO: 通过service去注册全局，如：@Host() @Optional() public noAnimation?: NzNoAnimationDirective
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

  get dClassSuccess() { // COMMENT: 默认不提供success样式显示
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
      });
      this._registered = true;
    }
  }

  private _parseErrors(errors: {[key: string]: any}): void {
    if (!errors) {
      this._errorMessage = null;
      this.updateMessageToView(null);
    } else {
      /* if a rule did not have a message, we will try to get a message from errors by id */
      const { resId, resRule } = this._getARuleByErrors(errors);
      this._errorStrategy = this._getErrorStrategy(resRule);
      this._errorMessage = resRule &&
        (
          resRule.message || this._getMessageFormErrorsById(errors, resId) ||
          (this._rules as {message: string}).message
        );
      if (this.dClassError) {
        this.updateMessageToView(this._errorMessage);
      } else {
        this.updateMessageToView(null);
      }
    }

    this.dRulesStatusChange.emit({
      showError: this.showError,
      errorMessage: this._errorMessage,
      errors: errors
    });
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
    // 差一个error是否是null的判断
    let resId: string;
    let resRule = null;
    for (const key of Object.keys(errors)) {
      // TODO: 这里的错误信息，我都要维护哪些呢  1. 肯定有一个当前策略下需要显示的一个具体的message  2. 当前的所有错误信息我需要emit给用户
      // 3. 我需要组织一个所有错误么，按照我自己的格式？
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
      // TODO: 这个的更新逻辑有一些问题，可能最终不是我们需要的
      // this._parent.setErrorMessageByChild(this._errorMessage);
      // this._parent._updateParent();
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

  abstract updateMessageToView(message: string): void;
}

const dControlErrorStatusHost = {
  '[class.devui-error]': 'dClassError',
  '[class.devui-success]': 'dClassSuccess',
  '[class.devui-warning]': 'dClassWarning',
};

@Directive({
  selector: `[dValidateRules][formGroupName],[dValidateRules][formArrayName],[dValidateRules][ngModelGroup],
          [dValidateRules][formGroup],[dValidateRules]form:not([ngNoForm]),[dValidateRules][ngForm]`,
  host: dControlErrorStatusHost,
  exportAs: 'dValidateRules'
})

export class DFormGroupRuleDirective extends DAbstractControlRule implements OnChanges {
  @Input('dValidateRules') rules: DValidateRules;
  @Output() dRulesStatusChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Self() cd: ControlContainer,
    @Optional() @Host() @SkipSelf() parentDir: DFormGroupRuleDirective,
  ) {
    super(cd, parentDir);
  }

  setErrorMessageByChild(msg: string) {
    if (!this.errorMessage) {
      this.errorMessage = msg;
    }
  }

  updateMessageToView(message: string): void {
    // do nothing
  }
}

@Directive({
  selector: '[dValidateRules][formControlName],[dValidateRules][ngModel],[dValidateRules][formControl]',
  host: dControlErrorStatusHost,
  exportAs: 'dValidateRules'
})

export class DFormControlRuleDirective extends DAbstractControlRule implements OnInit, OnChanges, OnDestroy {
  @Input('dValidateRules') rules: DValidateRules;
  @Output() dRulesStatusChange: EventEmitter<any> = new EventEmitter<any>();

  popoverComponentRef: ComponentRef<PopoverComponent>;
  private destroy$ = new Subject();
  popMessage: string;  // 最终显示的message

  get showType() {
    return (this.fullRules as {messageShowType: string}).messageShowType || 'popover';
    // return (this.rules as {messageShowType: string}).messageShowType || 'text';
  }

  constructor(
    @Self() cd: NgControl,
    @Optional() @Host() private dFormItem: FormItemComponent,
    @Optional() @Host() @SkipSelf() parentDir: DFormGroupRuleDirective,
    public triggerElementRef: ElementRef,
    private overlayContainerRef: OverlayContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(cd, parentDir);
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
    if (this.dFormItem) {  // 这里我需要一个默认的更新，默认更新为通过overlay添加类似tooltip的形式
      this.dFormItem.updateFeedback(status, message);
    }
  }

  _updatePopMessage(message: string): void {
    this.popMessage = message;
    if (this.popoverComponentRef) {
      this.popoverComponentRef.instance.content = message;
      setTimeout(() => { // TODO: popover使用onPush后，可去除当前setTimeout
        if (this.popoverComponentRef) {
          this.popoverComponentRef.instance.updatePositionAndDetectChange();
        }
      });
    }
  }

  updateMessageToView(message: string): void {
    // TODO: 这里还是需要有一个状态记录值，否则国际化切换后，如果需要刷新就尴尬了
    // If update type dynamic, We do not plan to support TODO: 待交互类型明确后开放
    if (this.showType === 'popover') {
      this._updatePopMessage(message);
      if (!this.popoverComponentRef) { // 若已经有popover，则不再更新显示图标
        this._updateFormContainer(this.showError ? 'error' : null, null);
      }
    } else if (this.showType === 'text') {
      this._updateFormContainer(this.showError ? 'error' : null, message);
    }
  }

  createPopover(type: 'error' | 'warning', content: string) {
    this.popoverComponentRef = this.overlayContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(PopoverComponent)
    );
    Object.assign(this.popoverComponentRef.instance, {
      content: content,
      triggerElementRef: this.triggerElementRef,
      position: ['right', 'bottom'],
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
