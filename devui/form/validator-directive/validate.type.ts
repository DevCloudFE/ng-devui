// 后续要提供全局可配置的校验规则，一处配置，处处生效
// 提供一个手动更新的方法，在特殊情况下需要进行变更
// 如果是内置的pattern怎么办？怎样区分呢？一次最多只会返回一个pattern，因为一个pattern方法就是一个key
// 需要可以提供多个正则组合，如phone与email  re1 instanceof RegExp判断是否为正则，可以传正则，与方法，可以传正则数组，传入数组则表示，需要满足多个正则表达式或多个函数

import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

// TODO: 还需要提供一个debounceTime
export type DValidateRules = {
  validators ?: DValidateRule[];
  asyncValidators ?: DAsyncValidateRule[];
  // messageToView ?: boolean; // 是否需要自动更新message到视图中
  errorStrategy ?: DValidationErrorStrategy; // error更新策略
  message ?: string; // 统一配置的message
  updateOn ?: 'change'|'blur'|'submit'; // model更新策略
  messageShowType ?: 'popover' | 'text' | 'none' // 消息自动显示策略（当前仅单个表单组件下生效），自身附着popover | form-control下显示 | 不显示，
  // 如果我想在form上设置怎么处理，想统一设置更新，当前指令提供一个入参进行设置，可以与rules分离
} | DValidateRule[];

/* id: 自定义验证器必须具有（也可不必）
** validator: 自定义验证器必须传入，可支持函数与正则类型，函数必须返回true或false
** 其他key：必须是已注册key
** priority: error抛出的优先级，同时错误，值越大越优先抛出，值相同，后注册先抛出
** COMMENT: 我们这里将提供warning状态，warning状态不会向上传递，不会加入实际校验器中，在所有校验器校验完成后进行校验，若有错则不再进行校验，若无错，则进行校验。
** warning若为异步校验器，只更新当前devui-pending状态，不更新全局
*/
export interface DValidateRule {
  id ?: string;
  validator ?: DValidatorFn | ValidatorFn;
  message ?: string;
  errorStrategy ?: DValidationErrorStrategy;
  priority ?: number;
  isNgValidator ?: boolean;
  validateLevel?: 'error' | 'warning'; // 校验级别
  [id: string]: boolean | number | string | RegExp | DValidatorFn | ValidatorFn; // 万能key
  // 是否还需要updateOn
}
export interface DAsyncValidateRule {
  id ?: string;
  validator ?: DAsyncValidatorFn | AsyncValidatorFn;
  message ?: string;
  errorStrategy ?: DValidationErrorStrategy;
  priority ?: number;
  isNgValidator ?: boolean;
  validateLevel?: 'error' | 'warning'; // 校验级别
  [id: string]: boolean | number | string | RegExp | DAsyncValidatorFn | AsyncValidatorFn; // 万能key
  // 是否还需要updateOn
}

export interface DValidateErrorStatus {
  errorMessage: string | null;
  showError: boolean;
  errors: {[key: string]: any};
}

// DForm ValidatorFn
export type DValidatorFn = (value: any) => boolean | string | null;

// DForm AsyncValidatorFn
export type DAsyncValidatorFn = (value: any) => Observable<boolean | string | null>;

/* TODO: 这里是否需要导出 */
export const ruleReservedWords = ['id', 'validator', 'message', 'errorStrategy', 'priority', 'isNgValidator', 'updateOn'];

// 这里要考虑如果可全局添加默认
export const dDefaultValidators = {
  'required': Validators.required,
  'minlength': Validators.minLength,  // 实际设置时再次调用该方法传入具体值
  'maxlength': Validators.maxLength, // 实际设置时再次调用该方法传入具体值
  'min': Validators.min,
  'max': Validators.max,
  'requiredTrue': Validators.requiredTrue,
  'email': Validators.email,
  'pattern': Validators.pattern,
};

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}

function hasValidLength(value: any): boolean {
  return value != null && typeof value.length === 'number';
}


/* pristine: 抛出error包括pristine状态
** dirty: 抛出error需在dirty状态
*/
export type DValidationErrorStrategy = 'pristine' | 'dirty';
