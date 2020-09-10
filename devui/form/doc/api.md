## dForm 参数

|   参数    |                 类型                  |     默认     | 说明                                                                     | 跳转 Demo                                                     |
| :-------: | :-----------------------------------: | :----------: | :----------------------------------------------------------------------- | ------------------------------------------------------------- |
|  layout   | `'horizontal'\|'vertical'\|'columns'` | 'horizontal' | 可选，设置表单的排列方式                                                 | [基本用法](/components/form/demo#basic-usage)                 |
| labelSize |         `'sm' \| '' \| 'lg'`          |      ''      | 可选，设置 label 的占宽，未设置默认为 100px,'sm'对应 80px,'lg'对应 150px | [label 横向排列](/components/form/demo#demo-label-horizontal) |

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
