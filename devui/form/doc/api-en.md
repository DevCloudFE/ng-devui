# How to use

Import into module

```ts
import { FormModule } from 'ng-devui/form';
```

If you need to use the NgForm, introduce the following

```ts
import { Forms } from '@angular/forms';
```

In the page

```html
<form dForm>
  <d-form-item>
    <d-form-label>...</d-form-label>
    <d-form-control>
      <!-- Form element -->
      <xxx></xxx>
    </d-form-control>
  </d-form-item>

  <d-form-item>
    <d-form-label>...</d-form-label>
    <d-form-control>
      <!-- Form element -->
      <xxx></xxx>
    </d-form-control>
  </d-form-item>

  <d-form-operation>
    <!-- Operation element -->
    <xxx dFormSubmit></xxx>
    <xxx dFormReset></xxx>
  </d-form-operation>
</form>

<!-- Form validation (xxx: input, d-select, form, and NG form container)-->
<xxx [dValidateRules]="yourRules"></xxx>
```

## dForm

### dForm Parameter

| Parameter    | Type                                  | Default      | Description                                                                                                                                            | Jump to Demo                                               | Global Config |
| ------------ | ------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------------- |
| layout       | `'horizontal'\|'vertical'\|'columns'` | 'horizontal' | Optional. Sets the form arrangement mode.                                                                                                              | [Basic usage](demo#basic-usage)                            |
| labelSize    | `'sm' \| '' \| 'lg'`                  | ''           | Optional. Sets the width of the label. If this parameter is not set, the default value is 100 px. 'sm' corresponds to 80 px, 'lg' corresponds to 150px | [Label horizontal arrangement](demo#demo-label-horizontal) |
| labelAlign   | `'start'\|'center'\|'end'`            | 'start'      | Optional. This parameter specifies the label alignment mode in horizontal layout mode.                                                                 | [label horizontal arrangement](demo#demo-label-horizontal) |
| dHasFeedback | `boolean`                             | false        | Optional. Sets whether to display the feedback icon for the current form.                                                                              |                                                            |

### dForm Event

| Parameter | Type                                                                                                                             | Description                                                                                              | Jump to Demo                                                                   |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| dSubmit   | `EventEmitter<{valid: boolean, directive: `[`DFormGroupRuleDirective`](#dformgroupruledirective) `\| AbstractControlDirective}>` | Optional. This event is responded to when the dFormSubmit binding element is used to trigger submission. | [Template-driven form verification (recommended)](demo#demo-validate-template) |

## d-form-item

### d-form-item parameter

| Parameter    | Type      | Default | Description                                                                       | Jump to Demo                                            |
| ------------ | --------- | ------- | --------------------------------------------------------------------------------- | ------------------------------------------------------- |
| dHasFeedback | `boolean` | false   | Optional. Sets whether to display the feedback icon for the current form control. | [Reactive form validation](demo#demo-validate-reactive) |

## d-form-label

### d-form-label parameter

| Parameter | Type      | Default | Description                                                | Jump to Demo                    |
| --------- | --------- | ------- | ---------------------------------------------------------- | ------------------------------- |
| required  | `boolean` | false   | Optional. Indicating whether the form option is mandatory. | [Basic usage](demo#basic-usage) |
| hasHelp   | `boolean` | false   | Optional. Indicating whether a form item requires help.    | [Basic usage](demo#basic-usage) |
| helpTips  | `string`  | ''      | Optional. This parameter is used together with `hasHelp`.  | [Basic usage](demo#basic-usage) |
| customHelpTipTemplate | `TemplateRef<any>` | - |Optional, user-defined prompt template, which must be used together with `hasHelp` | [multi-list](demo#demo-multi-col) |

## d-form-control

### d-form-control parameters

| Parameter      | Type                                        | Default | Description                                                                                     | Jump to Demo                                               |
| -------------- | ------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| extraInfo      | `string \| TemplateRef<any>`                | --      | Optional. attachment information, which is used to supplement the description of table options. | [Label horizontal arrangement](demo#demo-label-horizontal) |
| feedbackStatus | [`DFormControlStatus`](#dformcontrolstatus) | --      | Optional. Manually specify the current control status.                                          | [Specify form status](demo#demo-custom-status)             |
| suffixTemplate | `TemplateRef<any>`                          | --      | Optional. Pass icon template to be the suffix of Input.                                         |

## dFormSubmit

- Specify the element that triggers the `submit` in `<form>` (the dForm needs to be bound).
- You can set the trigger event (click by default), for example, `dFormSubmit="dblclick"`, to trigger `submit` when an element is double-clicked.

### dFormSubmit Parameter

| Parameter       | Type     | Default | Description                                                                                                                                  | Jump to Demo                                            |
| --------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| dFormSubmit     | `string` | 'click' | Optional. Configure the event name used to trigger submit.                                                                                   | [Reactive form validation](demo#demo-validate-reactive) |
| dFormSubmitData | `any`    | --      | Optional. Configure the data that needs to be transferred and the dSubmit callback event, which can be used to distinguish multiple buttons. | [Reactive form validation](demo#demo-validate-reactive) |

## dFormReset

- Specify the element that triggers the `reset` in `<form>` (the dForm needs to be bound).
- You can set the trigger event (click by default), for example, `dFormReset="dblclick"`, to trigger `reset` when an element is double-clicked.

### dFormReset Parameter

| Parameter  | Type     | Default | Description                                               | Jump to Demo |
| ---------- | -------- | ------- | --------------------------------------------------------- | ------------ |
| dFormReset | `string` | 'click' | Optional. Configure the event name for triggering submit. |              |

## dValidateRules Form Validation

### Locating

- DevUI form verification is based on [Angular Form](https://angular.io/guide/forms-overview) and is fully compatible with responsive forms and template-driven forms. To encapsulate and simplify form validation logic, you only need to configure simple rules. Verification messages and verification status management are automatically completed by DevUI Form.

### How to use form validator

- When you use a responsive form or a template-driven form (both include `Angular FormsModule` in your module):

```ts
import { Forms } from '@angular/forms';
```

- Bind `dValidateRules` to your element and pass in the rules to be configured. (\*Although you can directly use literals to pass in the template, considering change detection, it is recommended that you declare the rules in the component controller and then bind them to the template.)

```html
<input [(ngModel)]="name" [dValidateRules]="yourRules" />
```

### dValidateRules Parameter

| Parameter          | Type                                | Default | Description                                | Jump to Demo                                                                   |
| ------------------ | ----------------------------------- | ------- | ------------------------------------------ | ------------------------------------------------------------------------------ |
| dValidateRules     | [`DValidateRules`](#dvalidaterules) | --      | Required. Configure the verification rule. | [Template-driven form verification (recommended)](demo#demo-validate-template) |
| dValidatePopConfig | [`DPopConfig`](#dpopconfig)         | --      | Optional. popover hint config              | [Template-driven form verification (recommended)](demo#demo-validate-template) |

### dValidateSyncKey Parameter

Collaborative form validation.

| Parameter        | Type     | Default | Description                                                                                                                                                                                                           | Jump to Demo                                               |
| ---------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| dValidateSyncKey | `string` | --      | Required. This parameter is mandatory. It specifies the unique key. When the value of one element in the form of the same key changes, verification is triggered. responsive and template-driven forms are supported. | [Form collaboration verification](demo#demo-validate-sync) |

## dActiveFormControl

Add the direct to the customized container of the service to obtain the same click interaction effect as other component forms (such as text-input, select, and cascader).

## Integrated Validation Rules

### Using

```typescript
// import at xxx.component.ts
import { DValidators } from 'ng-devui/form/validator-directive/validators';
import { DValidateRules } from 'ng-devui/form/validator-directive/validate.type';

const rules: DValidateRules = {
  validators: [
    { contains: DValidators.contains('abc'), message: 'Custom Info', isNgValidator: true },
    { alphabet: DValidators.alphabet, message: 'Custom Info', isNgValidator: true },
    { whitespace: true } // whitespace has been registered to Angular
    ...
  ],
};

// You can custom your validator like following
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
<!-- Using in any form components -->
<d-input [dValidateRules]="rules"></d-input>
```

### Validators

| Validator   | Description                                            |
| ----------- | ------------------------------------------------------ |
| contains    | Check if it contains sth.                              |
| notContains | Check if it not contains sth.                          |
| equal       | Check if it is equal to sth.                           |
| notEqual    | Check if it is not equal to sth.                       |
| port        | Check if a port number is in [0, 65535]                |
| date        | Check if a date is valid                               |
| url         | Check if a url is valid                                |
| integer     | Check integer                                          |
| digits      | Check digit                                            |
| number      | Check if it is a number, including scientific notation |
| alphabet    | Check if it is an alphabet                             |
| script      | Check if it is a script tag                            |
| ipv4        | Check if it is a valid ipv4 address                    |
| ipv6        | Check if it is a valid ipv6 address                    |

## Interface & Type Definition

### DFormControlStatus

```ts
export type DFormControlStatus = 'error' | 'pending' | 'success';
```

### DFormControlRuleDirective

DFormControlRuleDirective is the dValidateRules instruction object corresponding to the form element. The class name and selector of the instruction are as follows:

```ts
@Directive({
selector:' [dValidateRules][formControlName],[dValidateRules][ngModel],[dValidateRules][formControl]',
exportAs: 'dValidateRules'
})
```

### DFormGroupRuleDirective

DFormGroupRuleDirective is the dValidateRules instruction object corresponding to the form container. The class name and selector of the instruction are as follows:

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
      validators?: DValidateRule[]; // Synchronize verification rules.

      asyncValidators?: DAsyncValidateRule[]; // Asynchronous Verification Rule

      asyncDebounceTime?: number; // Asynchronous validator debounceTime (unit: ms). The default value is 300.

      errorStrategy?: DValidationErrorStrategy; // error update policy. The default value is'dirty'.

      message?: string | { [key: string]: string } | templateRef<any>; // Unified message. If no message is configured for a verification rule, the unified message is used.

      messageShowType?: 'popover' | 'text' | 'none'; // Automatic message display policy (currently, this policy takes effect only for a single form component). (displayed in the popover | d-form-item container | not displayed)

      // When the message is displayed as popover, set the popover content pop-up direction. The default value is ['right','bottom'].
      popPosition?: 'top' | 'right' | 'bottom' | 'left' | ('top' | 'right' | 'bottom' | 'left')[];
    }
  | DValidateRule[]; // If only the synchronization verification rule needs to be set, the synchronization verification rule array can be transferred.
```

### DValidateRule

```TS
export interface DValidateRule {// Define a synchronization verification rule.

  id ? : string; // Current rule ID, which uniquely identifies the current rule. The form message mechanism uses this ID as the key.

  validator ?: DValidatorFn | ValidatorFn; // validator, which is compatible with the native Angular validator. (Set isNgValidator to true.)

  message ?: string | { [key: string]: string }  | templateRef<any>; // Message returned when the verification fails. The internationalization string object can be returned. The key is the key of the corresponding language. The default key is 'default'.

  errorStrategy ?: DValidationErrorStrategy; // Error update policy of the current rule. The default value is'dirty'.

  priority ? : number; // Priority of the current rule. If the verification fails, the rule with a higher priority is displayed first. The default value is 0.

  isNgValidator ?: boolean; //: indicates whether the current validator is an Angular native validator.

  // This is an all-purpose matching key. You can use the default validator key or quickly set your customized rule key. (If the key does not conflict with the default key or reserved word, the system identifies the current ID.)
  [id: string]: [id: string]: boolean | number | string | { [key: string]: string } | RegExp | DValidatorFn | ValidatorFn | undefined;
}
```

### DAsyncValidateRule

```TS
export interface DAsyncValidateRule {// Define an asynchronous verification rule.
  id ? : string;
  validator ?: DAsyncValidatorFn | AsyncValidatorFn;
  message ?: string | { [key: string]: string }  | templateRef<any>;;
  errorStrategy ?: DValidationErrorStrategy;
  priority ? : number;
  isNgValidator ? : boolean;
  [id: string]: boolean | number | string | { [key: string]: string } | RegExp | DAsyncValidatorFn | AsyncValidatorFn | undefined;
}
```

### DValidationErrorStrategy

- primine: throws an error message when a verification rule fails.dirty: throws an error message when the verification rule fails and the status is dirty.

```TS
export type DValidationErrorStrategy = 'pristine' | 'dirty';
```

### DValidatorFn

- Define the DevUI Form synchronization validator: If the boolean value is returned, the current rule passes.
- If string|null is returned, null indicates that the check is passed. If no message is set for the current rule, the returned string is used as the current rule message.

```TS
export type DValidatorFn = (value: any) => boolean | string | { [key: string]: string } | null;
```

### DAsyncValidatorFn

- Define DevUI Form asynchronous validator: Similar to the synchronous rule, the difference is that your function needs to return an Observable object.

```TS
export type DAsyncValidatorFn = (value: any) => Observable<boolean | string | { [key: string]: string } | null>;
```

### ruleReservedWords

- Define the reserved word of the DevUI rule. If your key is not a reserved word, it can be used as the current rule ID (default validator ID or customized validator ID).

```TS
export const ruleReservedWords = ['id','validator','message','errorStrategy','priority','isNgValidator','popPosition', 'asyncDebounceTime'];
```

### dDefaultValidators

```TS
export const dDefaultValidators = {
'required': Validators.required, // The configuration cannot be empty. The following is used in the rule: {required: true}
'minlength': Validators.minlength, // Indicates the minimum length. The value {minlength: 5} is used in the rule.
'maxlength': Validators.maxlength, // Configure the maximum length. {maxlength: 128} is used in the rule.
'min': Validators.min, // Minimum value. {min: 0} is used in the rule.
'max': Validators.max, // Indicates the maximum value. {max: 100} is used in the rule.
'requiredTrue': Validators.requiredTrue, // The value must be true. The value {requiredTrue: true} is used in the rule.
'email': Validators.email, // Configure email verification. Use {email: true} in the rule.
'pattern': Validators.pattern, // Configure regular expression verification. The rule uses {pattern: RegExp}.
'whitespace': DValidators.whiteSpace, // Indicates that the input cannot contain only spaces. The rule uses {whitespace: true}.
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
