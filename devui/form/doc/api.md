## dForm 参数

|   参数    |                 类型                  |     默认     | 说明                                                                     | 跳转 Demo                                                     |
| :-------: | :-----------------------------------: | :----------: | :----------------------------------------------------------------------- | ------------------------------------------------------------- |
|  layout   | `'horizontal'\|'vertical'\|'columns'` | 'horizontal' | 可选，设置表单的排列方式                                                 | [基本用法](/components/form/demo#basic-usage)                 |
| labelSize |         `'sm' \| '' \| 'lg'`          |      ''      | 可选，设置 label 的占宽，未设置默认为 100px,'sm'对应 80px,'lg'对应 150px | [label 横向排列](/components/form/demo#demo-label-horizontal) |
| dFeedbackType |         `'label' \| null`          |      --      | 可选，设置当前form是否显示反馈图标与反馈的方式 | [响应式表单验证](/components/form/demo#demo-validate-reactive) |

### d-button 事件

|   参数   |        类型         | 说明                                                                                    | 跳转 Demo                                      |
| :------: | :-----------------: | :-------------------------------------------------------------------------------------- | ---------------------------------------------- |
| dSubmit | `EventEmitter<{valid: boolean, directive: DFormGroupRuleDirective \| AbstractControlDirective}>` | 可选，使用dFormSubmit绑定元素触发提交时，响应事件 | [模板驱动表单验证（推荐）](/components/form/demo#demo-validate-template) |


## d-form-label 参数

|   参数   |   类型    | 默认  | 说明                                               | 跳转 Demo                                     |
| :------: | :-------: | :---: | :------------------------------------------------- | --------------------------------------------- |
| required | `boolean` | false | 可选，表单选项是否必填                             | [基本用法](/components/form/demo#basic-usage) |
| hasHelp  | `boolean` | false | 可选，表单项是否需要帮助指引                       | [基本用法](/components/form/demo#basic-usage) |
| helpTips | `string`  |  ''   | 可选，表单项帮助指引提示内容，需配合 `hasHelp`使用 | [基本用法](/components/form/demo#basic-usage) |

## d-form-control 参数

|   参数    |            类型            | 默认 | 说明                                       | 跳转 Demo                                                     |
| :-------: | :------------------------: | :--: | :----------------------------------------- | ------------------------------------------------------------- |
| extraInfo | `string\|TemplateRef<any>` |  --  | 可选，附件信息，一般用于补充表单选项的说明 | [label 横向排列](/components/form/demo#demo-label-horizontal) |


# 表单校验dValidateRules

## 定位
+ DevUI表单验证基于[Angular Form](https://angular.io/guide/forms-overview)，完全兼容响应式表单与模板驱动表单。旨在封装与简化表单校验逻辑，你只需配置简单规则，验证消息与验证状态管理全交由DevUI Form自动完成。

## 如何使用
+ 当你使用了响应式表单或模板驱动表单。在你的元素上绑定`dValidateRules`并传入你需要配置的规则即可（*虽在模板中可直接使用字面量传入规则，但考虑了变更检测，我们推荐你在组件控制器中声明规则再绑定到模板中*）。如：
```html
<input [(ngModel)]="name" [dValidateRules]="yourRules">
```

### dValidateRules指令完整的selector声明
我们对表单组件与表单容器分别提供了dValidateRules指令，以下为对应指令的Class名与selector：
+ `DFormControlRuleDirective`:
```ts
@Directive({
  selector: '[dValidateRules][formControlName],[dValidateRules][ngModel],[dValidateRules][formControl]',
  exportAs: 'dValidateRules'
})
```
+ `DFormGroupRuleDirective`：
```ts
@Directive({
  selector: `[dValidateRules][formGroupName],[dValidateRules][formArrayName],[dValidateRules][ngModelGroup],
          [dValidateRules][formGroup],[dValidateRules]form:not([ngNoForm]),[dValidateRules][ngForm]`,
  exportAs: 'dValidateRules'
})
```
## dValidateRules参数完整说明

|   参数    | 类型 | 默认 | 说明 | 跳转 Demo |
| :----   : | :---: | :--: | :--: | :--: |
| dValidateRules | `DValidateRules` |  --  | 必选，配置你的校验规则 | [模板驱动表单验证（推荐）](/components/form/demo#demo-validate-template) |

### 类型定义
#### DValidateRules
```ts
export type DValidateRules = {

  validators ?: DValidateRule[]; // 同步校验规则

  asyncValidators ?: DAsyncValidateRule[]; // 异步校验规则

  errorStrategy ?: DValidationErrorStrategy; // error更新策略，默认为'dirty'

  message ?: string; // 统一配置的message，如果你的某一条校验规则未配置message，将取统一message

  messageShowType ?: 'popover' | 'text' | 'none' // 消息自动显示策略（当前仅单个表单组件下生效），(popover | d-form-item容器内部显示 | 不显示)

} | DValidateRule[];  // 若只需设置同步校验规则，可传同步校验规则数组
```

#### DValidateRule同步校验规则
```TS
export interface DValidateRule { // 定义同步校验规则

  id ?: string; // 当前rule id，唯一标识当前规则，表单消息机制将以此作为key

  validator ?: DValidatorFn | ValidatorFn; // 校验器，兼容Angular原生校验器（需要设置isNgValidator为true）

  message ?: string;  // 校验不通过时返回的提示消息

  errorStrategy ?: DValidationErrorStrategy;  // 当前规则的error更新策略，默认为'dirty'

  priority ?: number;  // 当前规则优先级，同时校验不通过，优先级高的规则消息将优先显示，默认为0

  isNgValidator ?: boolean; // 标识当前校验器是否为Angular原生校验器

  // 这是一个万能的匹配key，你可使用默认提供的校验器key，或者快捷设置你的自定义rule key（不与默认key&保留字冲突即被识别为你当前id）
  [id: string]: boolean | number | string | RegExp | DValidatorFn | ValidatorFn; 
}
```

#### DAsyncValidateRule异步校验规则
```TS
export interface DAsyncValidateRule { // 定义异步校验规则
  id ?: string;
  validator ?: DAsyncValidatorFn | AsyncValidatorFn;
  message ?: string;
  errorStrategy ?: DValidationErrorStrategy;
  priority ?: number;
  isNgValidator ?: boolean;
  [id: string]: boolean | number | string | RegExp | DAsyncValidatorFn | AsyncValidatorFn;
```

#### DValidationErrorStrategy错误抛出策略定义 
+ pristine：有校验规则不通过即抛出错误message，dirty：校验规则不通过且状态为dirty时抛出错误message
```TS
export type DValidationErrorStrategy = 'pristine' | 'dirty';
```

#### DValidatorFn同步校验器定义
+ 定义DevUI Form同步校验器：返回boolean值则表示当前规则是否通过
+ 若返回string|null，null表示通过，若当前rule未设置message，则返回的string将作为当前rule message
```TS
export type DValidatorFn = (value: any) => boolean | string | null;
```

#### DAsyncValidatorFn异步校验器定义
+ 定义DevUI Form异步校验器：与同步规则类似，不同为需要你的函数需要返回一个Observable对象
```TS
export type DAsyncValidatorFn = (value: any) => Observable<boolean | string | null>;
```

#### ruleReservedWords规则对象保留字
+ 定义DevUI Rule规则的保留字，如果你的key不为保留字，则可作为你当前rule id使用（默认校验器id或自定义校验器id）
```TS
export const ruleReservedWords = ['id', 'validator', 'message', 'errorStrategy', 'priority', 'isNgValidator', 'updateOn'];
```

#### dDefaultValidators默认校验器
```TS
export const dDefaultValidators = {
  'required': Validators.required, // 配置不能为空限制，rule中使用：{ required: true }
  'minLength': DValidators.minLength, // 配置最小长度限制，rule中使用：{ minLength: 5 }
  'maxLength': DValidators.maxLength, // 配置最大长度限制，rule中使用：{ maxLength: 128 }
  'min': Validators.min, // 配置最小值限制，rule中使用：{ min: 0 }
  'max': Validators.max, // 配置最大值限制，rule中使用：{ max: 100 }
  'requiredTrue': Validators.requiredTrue, // 配置需要为true，rule中使用：{ requiredTrue: true }
  'email': Validators.email, // 配置邮箱校验，rule中使用：{ email: true }
  'pattern': Validators.pattern, // 配置正则校验，rule中使用：{ pattern: RegExp }
};
```

### dFormSubmit指令
+ 在`<form>`（需绑定dForm）中指定触发`submit`的元素。
+ 可设置触发事件（默认为'click'），如`dFormSubmit="dblclick"`，设置元素双击时触发`submit`。


### dFormReset指令
+ 在`<form>`（需绑定dForm）中指定触发`reset`的元素。
+ 可设置触发事件（默认为'click'），如`dFormReset="dblclick"`，设置元素双击时触发`reset`。