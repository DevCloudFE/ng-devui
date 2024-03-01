# 如何使用

在 module 中引入：

```ts
import { FormModule } from 'ng-devui/form';
```

如果你需使用到 NgForm，则引入：

```ts
import { FormsModule } from '@angular/forms';
```

在页面中使用：

```html
<form dForm>
  <d-form-item>
    <d-form-label>...</d-form-label>
    <d-form-control>
      <!-- 表单元素 -->
      <xxx></xxx>
    </d-form-control>
  </d-form-item>

  <d-form-item>
    <d-form-label>...</d-form-label>
    <d-form-control>
      <!-- 表单元素 -->
      <xxx></xxx>
    </d-form-control>
  </d-form-item>

  <d-form-operation>
    <!-- 操作元素 -->
    <xxx dFormSubmit></xxx>
    <xxx dFormReset></xxx>
  </d-form-operation>
</form>

<!-- 表单验证（xxx: input、d-select、form、NG表单容器等元素/容器）-->
<xxx [dValidateRules]="yourRules"></xxx>
```

## dForm

### dForm 参数

| 参数         | 类型                                  | 默认         | 说明                                                                       | 跳转 Demo                                    | 全局配置项 |
| ------------ | ------------------------------------- | ------------ | -------------------------------------------------------------------------- | -------------------------------------------- | ---------- |
| layout       | `'horizontal'\|'vertical'\|'columns'` | 'horizontal' | 可选，设置表单的排列方式                                                   | [基本用法](demo#basic-usage)                 |
| labelSize    | `'sm' \| '' \| 'lg'`                  | ''           | 可选，设置 label 的占宽，未设置默认为 100px，'sm'对应 80px，'lg'对应 150px | [label 横向排列](demo#demo-label-horizontal) |
| labelAlign   | `'start' \| 'center' \| 'end'`        | 'start'      | 可选，设置水平布局方式下，label 对齐方式                                   | [label 横向排列](demo#demo-label-horizontal) |
| dHasFeedback | `boolean`                             | false        | 可选，设置当前 form 是否显示反馈图标                                       |                                              |

### dForm 事件

| 参数    | 类型                                                                                                                                                                        | 说明                                                | 跳转 Demo                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| dSubmit | `EventEmitter<{valid: boolean, directive: `[`DFormGroupRuleDirective`](#dformgroupruledirective) `\| AbstractControlDirective}, errors: {[key: string]: ValidationErrors}>` | 可选，使用 dFormSubmit 绑定元素触发提交时，响应事件 | [模板驱动表单验证（推荐）](demo#demo-validate-template) |

## d-form-item

### d-form-item 参数

| 参数         | 类型      | 默认  | 说明                                        | 跳转 Demo                                     |
| ------------ | --------- | ----- | ------------------------------------------- | --------------------------------------------- |
| dHasFeedback | `boolean` | false | 可选，设置当前 formControl 是否显示反馈图标 | [响应式表单验证](demo#demo-validate-reactive) |

## d-form-label

### d-form-label 参数

| 参数     | 类型      | 默认  | 说明                                               | 跳转 Demo                    |
| -------- | --------- | ----- | -------------------------------------------------- | ---------------------------- |
| required | `boolean` | false | 可选，表单选项是否必填                             | [基本用法](demo#basic-usage) |
| hasHelp  | `boolean` | false | 可选，表单项是否需要帮助指引                       | [基本用法](demo#basic-usage) |
| helpTips | `string`  | ''    | 可选，表单项帮助指引提示内容，需配合 `hasHelp`使用 | [基本用法](demo#basic-usage) |
| customHelpTipTemplate | `TemplateRef<any>`  | ''    | 可选，自定义提示模板，需配合 `hasHelp`使用 | [多列表单](demo#demo-multi-col) |

## d-form-control

### d-form-control 参数

| 参数           | 类型                                        | 默认 | 说明                                       | 跳转 Demo                                    |
| -------------- | ------------------------------------------- | ---- | ------------------------------------------ | -------------------------------------------- |
| extraInfo      | `string \| TemplateRef<any>`                | --   | 可选，附件信息，一般用于补充表单选项的说明 | [label 横向排列](demo#demo-label-horizontal) |
| feedbackStatus | [`DFormControlStatus`](#dformcontrolstatus) | --   | 可选，手动指定当前 control 状态反馈        | [指定表单状态](demo#demo-custom-status)      |
| suffixTemplate | `TemplateRef<any>`                          | --   | 可选，可传入图标模板作为输入框后缀         |

## dFormSubmit

- 在`<form>`（需绑定 dForm）中指定触发`submit`的元素。
- 可设置触发事件（默认为'click'），如`dFormSubmit="dblclick"`，设置元素双击时触发`submit`。

### dFormSubmit 参数

| 参数            | 类型     | 默认    | 说明                                                                  | 跳转 Demo                                     |
| --------------- | -------- | ------- | --------------------------------------------------------------------- | --------------------------------------------- |
| dFormSubmit     | `string` | 'click' | 可选，配置用于触发 submit 的事件名                                    | [响应式表单验证](demo#demo-validate-reactive) |
| dFormSubmitData | `any`    | --      | 可选，配置需要传递与 dSubmit 回调事件数据，可用于需区分多个按钮的场景 | [响应式表单验证](demo#demo-validate-reactive) |

## dFormReset

- 在`<form>`（需绑定 dForm）中指定触发`reset`的元素。
- 可设置触发事件（默认为'click'），如`dFormReset="dblclick"`，设置元素双击时触发`reset`。

### dFormReset 参数

| 参数       | 类型     | 默认    | 说明                               | 跳转 Demo |
| ---------- | -------- | ------- | ---------------------------------- | --------- |
| dFormReset | `string` | 'click' | 可选，配置用于触发 submit 的事件名 |           |

## dValidateRules 表单验证

### 定位

- DevUI 表单验证基于[Angular Form](https://angular.io/guide/forms-overview)，完全兼容响应式表单与模板驱动表单。旨在封装与简化表单校验逻辑，你只需配置简单规则，验证消息与验证状态管理全交由 DevUI Form 自动完成。

### 如何使用表单校验

- 当你使用了响应式表单或模板驱动表单（均需在你的模块中引入`Angular FormsModule`）:

```ts
import { FormsModule } from '@angular/forms';
```

- 在你的元素上绑定`dValidateRules`并传入你需要配置的规则即可（_虽在模板中可直接使用字面量传入规则，但考虑了变更检测，我们推荐你在组件控制器中声明规则再绑定到模板中_）。如：

```html
<input [(ngModel)]="name" [dValidateRules]="yourRules" />
```

### dValidateRules 参数

| 参数               | 类型                                | 默认 | 说明                   | 跳转 Demo                                               |
| ------------------ | ----------------------------------- | ---- | ---------------------- | ------------------------------------------------------- |
| dValidateRules     | [`DValidateRules`](#dvalidaterules) | --   | 必选，配置你的校验规则 | [模板驱动表单验证（推荐）](demo#demo-validate-template) |
| dValidatePopConfig | [`DPopConfig`](#dpopconfig)         | --   | 可选，popover 提示配置 | [模板驱动表单验证（推荐）](demo#demo-validate-template) |

### dValidateSyncKey 参数

表单协同校验。

| 参数             | 类型     | 默认 | 说明                                                                                                          | 跳转 Demo                               |
| ---------------- | -------- | ---- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| dValidateSyncKey | `string` | --   | 必选，配置唯一标识 key，相同 key 表单元素将在其中一个元素值发生变更时，同时触发校验，支持响应式与模板驱动表单 | [表单协同验证](demo#demo-validate-sync) |

### dActiveFormControl

给业务的自定义容器添加该 directive，可以获得与其他组件表单（如 text-input, select, cascader）同样的点击交互效果。

## 封装的校验规则

### 使用方法

```typescript
// 在 xxx.component.ts 中引入
import { DValidators } from 'ng-devui/form/validator-directive/validators';
import { DValidateRules } from 'ng-devui/form/validator-directive/validate.type';

const rules: DValidateRules = {
  validators: [
    { contains: DValidators.contains('abc'), message: '自定义提示信息', isNgValidator: true },
    { alphabet: DValidators.alphabet, message: '自定义提示信息', isNgValidator: true },
    { whitespace: true } // 因为 whitespace 已经注册到 Angular 中
    ...
  ],
};

// 自定义校验器的写法可以参考下方代码
public static contains(contain: string | number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (DValidators.isEmptyInput(control.value) || DValidators.isEmptyInput(contain)) {
      return null;
    }
    return control.value.indexOf(contain) === -1 ? { contains: { requiredContains: contain,actualValue: control.value } } : null;
  };
}

public static alphabet(control: AbstractControl): ValidationErrors | null {
  if (DValidators.isEmptyInput(control.value)) {
    return null;
  }
  return DValidators.AlphabetPattern.test(control.value) ? null : { alphabet: true };
}
```

```html
<!-- 任何表单组件都可以使用 -->
<d-input [dValidateRules]="rules"></d-input>
```

### 校验规则

| 校验器      | 说明                           |
| ----------- | ------------------------------ |
| contains    | 校验是否包含                   |
| notContains | 校验是否不包含                 |
| equal       | 校验是否等于                   |
| notEqual    | 校验是否不等于                 |
| port        | 校验端口号是否属于 [0, 65535]  |
| date        | 校验日期是否合法               |
| url         | 校验 url 是否合法              |
| integer     | 校验是否是整数                 |
| digits      | 校验是否是数字                 |
| number      | 校验是否是数字，包括科学计数法 |
| alphabet    | 校验是否是字母                 |
| script      | 校验是否是 script 标签         |
| ipv4        | 校验 ipv4 地址是否合法         |
| ipv6        | 校验 ipv6 地址是否合法         |

## 接口 & 类型定义

### DFormControlStatus

```ts
export type DFormControlStatus = 'error' | 'pending' | 'success';
```

### DFormControlRuleDirective

DFormControlRuleDirective 为表单元素对应 dValidateRules 指令对象，以下为指令 Class 名与 selector：

```ts
@Directive({
  selector: '[dValidateRules][formControlName],[dValidateRules][ngModel],[dValidateRules][formControl]',
  exportAs: 'dValidateRules'
})
```

### DFormGroupRuleDirective

DFormGroupRuleDirective 为表单容器对应 dValidateRules 指令对象，以下为指令 Class 名与 selector：

```ts
@Directive({
  selector: `[dValidateRules][formGroupName],[dValidateRules][formArrayName],[dValidateRules][ngModelGroup],
          [dValidateRules][formGroup],[dValidateRules]form:not([ngNoForm]),[dValidateRules][ngForm]`,
  exportAs: 'dValidateRules'
})
```

### DValidateRules

```ts
export type DValidateRules =
  | {
      validators?: DValidateRule[]; // 同步校验规则

      asyncValidators?: DAsyncValidateRule[]; // 异步校验规则

      asyncDebounceTime?: number; // 异步校验器debounceTime（单位ms），默认为300

      errorStrategy?: DValidationErrorStrategy; // error更新策略，默认为'dirty'

      message?: string | { [key: string]: string } | templateRef<any>; // 统一配置的message，如果你的某一条校验规则未配置message，将取统一message, message模板仅在popover下生效

      messageShowType?: 'popover' | 'text' | 'none'; // 消息自动显示策略（当前仅单个表单组件下生效），(popover | d-form-item容器内部显示 | 不显示)

      // 消息显示为popover时，设置popover的内容弹出方向，默认为['right', 'bottom']
      popPosition?: 'top' | 'right' | 'bottom' | 'left' | ('top' | 'right' | 'bottom' | 'left')[];
    }
  | DValidateRule[]; // 若只需设置同步校验规则，可传同步校验规则数组
```

### DValidateRule

```TS
export interface DValidateRule { // 定义同步校验规则

  id ?: string; // 当前rule id，唯一标识当前规则，表单消息机制将以此作为key

  validator ?: DValidatorFn | ValidatorFn; // 校验器，兼容Angular原生校验器（需要设置isNgValidator为true）

  message ?: string | { [key: string]: string }  | templateRef<any>;  // 校验不通过时返回的提示消息，可返回国际化词条对象，key为对应语言key，默认key为'default'，message模板仅在popover下生效

  errorStrategy ?: DValidationErrorStrategy;  // 当前规则的error更新策略，默认为'dirty'

  priority ?: number;  // 当前规则优先级，同时校验不通过，优先级高的规则消息将优先显示，默认为0

  isNgValidator ?: boolean; // 标识当前校验器是否为Angular原生校验器

  // 这是一个万能的匹配key，你可使用默认提供的校验器key，或者快捷设置你的自定义rule key（不与默认key&保留字冲突即被识别为你当前id）
  [id: string]: [id: string]: boolean | number | string | { [key: string]: string } | RegExp | DValidatorFn | ValidatorFn | undefined;
}
```

### DAsyncValidateRule

```TS
export interface DAsyncValidateRule { // 定义异步校验规则
  id ?: string;
  validator ?: DAsyncValidatorFn | AsyncValidatorFn;
  message ?: string | { [key: string]: string };
  errorStrategy ?: DValidationErrorStrategy;
  priority ?: number;
  isNgValidator ?: boolean;
  [id: string]: boolean | number | string | { [key: string]: string } | RegExp | DAsyncValidatorFn | AsyncValidatorFn | undefined;
```

### DValidationErrorStrategy

- pristine：有校验规则不通过即抛出错误 message，dirty：校验规则不通过且状态为 dirty 时抛出错误 message

```TS
export type DValidationErrorStrategy = 'pristine' | 'dirty';
```

### DValidatorFn

- 定义 DevUI Form 同步校验器：返回 boolean 值则表示当前规则是否通过
- 若返回 string|null，null 表示通过，若当前 rule 未设置 message，则返回的 string 将作为当前 rule message

```TS
export type DValidatorFn = (value: any) => boolean | string | { [key: string]: string } | null;
```

### DAsyncValidatorFn

- 定义 DevUI Form 异步校验器：与同步规则类似，不同为需要你的函数需要返回一个 Observable 对象

```TS
export type DAsyncValidatorFn = (value: any) => Observable<boolean | string | { [key: string]: string } | null>;
```

### ruleReservedWords

- 定义 DevUI Rule 规则的保留字，如果你的 key 不为保留字，则可作为你当前 rule id 使用（默认校验器 id 或自定义校验器 id）

```TS
export const ruleReservedWords = ['id', 'validator', 'message', 'errorStrategy', 'priority', 'isNgValidator', 'popPosition', 'asyncDebounceTime'];
```

### dDefaultValidators

```TS
export const dDefaultValidators = {
  'required': Validators.required, // 配置不能为空限制，rule中使用：{ required: true }
  'minlength': Validators.minlength, // 配置最小长度限制，rule中使用：{ minlength: 5 }
  'maxlength': Validators.maxlength, // 配置最大长度限制，rule中使用：{ maxlength: 128 }
  'min': Validators.min, // 配置最小值限制，rule中使用：{ min: 0 }
  'max': Validators.max, // 配置最大值限制，rule中使用：{ max: 100 }
  'requiredTrue': Validators.requiredTrue, // 配置需要为true，rule中使用：{ requiredTrue: true }
  'email': Validators.email, // 配置邮箱校验，rule中使用：{ email: true }
  'pattern': Validators.pattern, // 配置正则校验，rule中使用：{ pattern: RegExp }
  'whitespace': DValidators.whiteSpace, // 配置输入不能全为空格限制，rule中使用：{ whitespace: true }
};
```

### DPopConfig

```TS
export type DPopConfig = {
  popMaxWidth?: number;
  scrollElement?: Element;
  zIndex?: number;
  showAnimation?: boolean;
}
```
