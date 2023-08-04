# How to use

Import into module：

```ts
import { CheckBoxModule } from 'ng-devui/checkbox';
```

In the page：

```html
<d-checkbox></d-checkbox> <d-checkbox-group></d-checkbox-group>
```

## d-checkbox

### d-checkbox Parameters

| Parameter              | Type                            | Default | Description                                                                                                                         | Jump to Demo                                     | Global Config |
| ---------------------- | ------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------- |
| name                   | `string`                        | --      | Optional. Form domain name. The native name attribute is input.                                                                     | [Basic usage](demo#checkbox-basic)               |
| label                  | `string`                        | --      | Optional. Display labels.                                                                                                           | [Basic usage](demo#checkbox-basic)               |
| isShowTitle            | `boolean`                       | true    | Optional. Indicates whether to display the title prompt. The value of the `label` parameter is displayed by default.                | [Basic usage](demo#checkbox-basic)               |
| title                  | `string`                        | --      | Optional. Display the customized title prompt content.                                                                              | [Basic usage](demo#checkbox-basic)               |
| disabled               | `boolean`                       | false   | Optional. Indicating whether to disable it.                                                                                         | [Basic usage](demo#checkbox-basic)               |
| labelTemplate Template | `TemplateRef`                   | --      | Optional. Custom template of the label                                                                                              | [Basic usage](demo#checkbox-basic)               |
| halfchecked            | `boolean`                       | false   | Optional. Half-selected state                                                                                                       | [Basic usage](demo#checkbox-basic)               |
| color                  | `string`                        | --      | Optional. Check box color                                                                                                           | [Basic usage](demo#checkbox-basic)               |
| showAnimation          | `boolean`                       | true    | Optional. Controls whether to display animations.                                                                                   | [Basic usage](demo#checkbox-basic)               | ✔             |
| beforeChange           | `Function\|Promise\|Observable` | --      | Callback function before checkbox switching, which returns the boolean type. If false is returned, checkbox switching is prevented. | [Stop Checkbox Switching](demo#condition-change) |
| cssClass               | `string`                        | --      | Optional. ClassName of the checkbox.                                                                                                |
| showGlowStyle          | `boolean`                       | true    | (Optional) Indicates whether to display the floating glow effect.                                                                   |

### d-checkbox Event

| Event  | Type                    | Description                                                                                   | Jump to Demo                       |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------- |
| change | `EventEmitter<boolean>` | Event that is raised when the value of the check box changes. The value is the current state. | [Basic usage](demo#checkbox-basic) |

## d-checkbox-group

### d-checkbox-group Parameters

| Parameter     | Type                            | Default  | Description                                                                                                                               | Jump to Demo                                     | Global Config |
| ------------- | ------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------- |
| name          | `string`                        | --       | Optional. Form domain name. The native name attribute is input.                                                                           | [Checkbox Group](demo#tabs-group)                |
| direction     | `'row'\|'column'`               | 'column' | Optional. Display direction                                                                                                               | [Checkbox Group](demo#tabs-group)                |
| itemWidth     | `number`                        | --       | Optional. Indicating the width of each checkbox (`px`).                                                                                   | [Checkbox Group](demo#tabs-group)                |
| isShowTitle   | `boolean`                       | true     | Optional. Whether to display the title prompt                                                                                             | [Checkbox Group](demo#tabs-group)                |
| options       | `Array<any>`                    | []       | Optional. Check box option array                                                                                                          | [Checkbox Group](demo#tabs-group)                |
| filterKey     | `string`                        | --       | Optional. When options is an object array, this parameter identifies the key value of the unique ID of the option.                        | [Checkbox Group](demo#tabs-group)                |
| labelTemplate | `TemplateRef`                   | --       | Optional. Custom template of the label                                                                                                    | [Checkbox Group](demo#tabs-group)                |
| color         | `string`                        | --       | Optional. Check box color                                                                                                                 | [Checkbox Group](demo#tabs-group)                |
| showAnimation | `boolean`                       | true     | Optional. Controls whether to display animations.                                                                                         | [Checkbox Group](demo#tabs-group)                | ✔             |
| beforeChange  | `Function\|Promise\|Observable` | --       | Callback function before checkbox switching, which returns the boolean type. If false is returned, checkbox-group switching is prevented. | [Stop Checkbox Switching](demo#condition-change) |
| disabled      | `boolean`                       | false    | Optional. Whether to disable the entire button group.                                                                                     | [Checkbox Group](demo#tabs-group)                |

### d-checkbox-group Event

| Event  | Type                    | Description                 | Jump to Demo                      |
| ------ | ----------------------- | --------------------------- | --------------------------------- |
| change | `EventEmitter<boolean>` | Checkbox value change event | [Checkbox Group](demo#tabs-group) |
