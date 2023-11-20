import { TemplateRef } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DValidators } from './validators';

/* pristine: 抛出error包括pristine状态
 ** dirty: 抛出error需在dirty状态
 */
export type DValidationErrorStrategy = 'pristine' | 'dirty';

export type DFormControlStatus = 'error' | 'pending' | 'success';

// DForm ValidatorFn
export type DValidatorFn = (value: any) => boolean | string | { [key: string]: string } | null;

// DForm AsyncValidatorFn
export type DAsyncValidatorFn = (value: any) => Observable<boolean | string | { [key: string]: string } | null>;

/* id: 自定义验证器必须具有（也可不必）
 ** validator: 自定义验证器必须传入，可支持函数与正则类型，函数必须返回true或false
 ** 其他key：必须是已注册key
 ** priority: error抛出的优先级，同时错误，值越大越优先抛出，值相同，后注册先抛出
 ** COMMENT: 我们这里将提供warning状态，warning状态不会向上传递，不会加入实际校验器中，在所有校验器校验完成后进行校验，若有错则不再进行校验，若无错，则进行校验。
 ** warning若为异步校验器，只更新当前devui-pending状态，不更新全局
 */
export interface DValidateRule {
  id?: string;
  validator?: DValidatorFn | ValidatorFn;
  message?: string | { [key: string]: string } | TemplateRef<any>;
  errorStrategy?: DValidationErrorStrategy;
  priority?: number;
  isNgValidator?: boolean;
  validateLevel?: 'error' | 'warning'; // 校验级别
  [id: string]: boolean | number | string |
  { [key: string]: string } | RegExp | DValidatorFn | ValidatorFn | undefined | TemplateRef<any>; // 万能key
}
export interface DAsyncValidateRule {
  id?: string;
  validator?: DAsyncValidatorFn | AsyncValidatorFn;
  message?: string | { [key: string]: string } | TemplateRef<any>;
  errorStrategy?: DValidationErrorStrategy;
  priority?: number;
  isNgValidator?: boolean;
  validateLevel?: 'error' | 'warning'; // 校验级别
  [id: string]:
  | boolean
  | number
  | string
  | { [key: string]: string }
  | RegExp
  | DAsyncValidatorFn
  | AsyncValidatorFn
  | undefined
  | TemplateRef<any>; // 万能key
}

// TODO: 还需提供一个debounceTime
export type DValidateRules =
  | {
    validators?: DValidateRule[];
    asyncValidators?: DAsyncValidateRule[];
    asyncDebounceTime?: number; // 异步校验器debounceTime
    errorStrategy?: DValidationErrorStrategy; // error更新策略
    message?: string | { [key: string]: string } | TemplateRef<any>; // 统一配置的message
    updateOn?: 'change' | 'blur' | 'submit'; // model更新策略
    messageShowType?: 'popover' | 'text' | 'none'; // 消息自动显示策略（当前仅单个表单组件下生效），自身附着popover | form-control下显示 | 不显示，
    popPosition?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right'
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom'
    | (
      | 'left'
      | 'right'
      | 'top'
      | 'bottom'
      | 'bottom-left'
      | 'bottom-right'
      | 'top-left'
      | 'top-right'
      | 'left-top'
      | 'left-bottom'
      | 'right-top'
      | 'right-bottom'
    )[];
  }
  | DValidateRule[];

export interface DValidateErrorStatus {
  errorMessage: string | { [key: string]: string } | null;
  showError: boolean;
  errors: { [key: string]: any };
}

/* TODO: 这里是否需要导出 */
export const ruleReservedWords = [
  'id',
  'validator',
  'message',
  'errorStrategy',
  'priority',
  'isNgValidator',
  'popPosition',
  'asyncDebounceTime',
];

// 这里要考虑如果可全局添加默认
export const dDefaultValidators = {
  required: Validators.required,
  minlength: Validators.minLength, // 实际设置时再次调用该方法传入具体值
  maxlength: Validators.maxLength, // 实际设置时再次调用该方法传入具体值
  min: Validators.min,
  max: Validators.max,
  requiredTrue: Validators.requiredTrue,
  email: Validators.email,
  pattern: Validators.pattern,
  whitespace: DValidators.whiteSpace,
};

export interface DPopConfig {
  popMaxWidth?: number;
  scrollElement?: Element;
  zIndex?: number;
  showAnimation?: boolean;
}
