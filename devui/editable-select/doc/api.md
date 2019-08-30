
### d-editable-select 参数
| 参数 | 类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---|
| ngModel               | `any`          | (none)          | 可选，绑定选中对象，可双向绑定                           |
| ngModelChange         | `EventEmitter` | (none)          | 可选，仅支持事件绑定，用于处理选中对象发生变化            |
| disabled              | `boolean`      | false           | 可选，值为true禁用下拉框                                |
| placeholder           | `string`       | ''              | 可选，没有选中项的时候提示文字                           |
| source                | `any[]`        | (none)          | 必选，菜单的条目                                    |
| itemTemplate          | `TemplateRef`  | null            | 可选，下拉菜单条目的模板                                 |
| noResultItemTemplate  | `TemplateRef`  | null            | 可选，下拉菜单条目搜索后没有结果的模板                    |
| maxHeight             | `number`       | 300             | 可选，下拉菜单的最大高度                                 |
| searchFn              | `funtion`      | 搜索source的内容 | 可选，搜索函数类型 (term: string) => Observable<any[]>  |
