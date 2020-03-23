
### d-editable-select 参数

| 参数 | 类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---|
| ngModel               | `any`          | --          | 可选，绑定选中对象，可双向绑定                           |
| ngModelChange         | `EventEmitter` | --          | 可选，仅支持事件绑定，用于处理选中对象发生变化            |
| source                | `any[]`        | --         | 必选，菜单的条目                                    |
| disabled              | `boolean`      | false           | 可选，值为true禁用下拉框                                |
| disabledKey              | `string`      | --           | 可选，设置禁用选项的Key值                                |
| placeholder           | `string`       | ''              | 可选，没有选中项的时候提示文字                           |
| itemTemplate          | `TemplateRef`  | --            | 可选，下拉菜单条目的模板                                 |
| noResultItemTemplate  | `TemplateRef`  | --            | 可选，下拉菜单条目搜索后没有结果的模板                    |
| maxHeight             | `number`       | --            | 可选，下拉菜单的最大高度                                 |
| searchFn              | `Function`      | (term: string) => Observable<any[]> | 可选，自定义搜索函数|
| enableLazyLoad              | `boolean`      | false | 可选，是否允许懒加载  |

### d-editable-select 事件

| 事件                 | 类型         |   说明                          |
| :-------------------: | :----------: | :----------------------------: |
| loadMore           |    `EventEmitter<any>`     | 懒加载触发事件，配合`enableLazyLoad`使用,使用`$event.loadFinish()`关闭loading状态，其中$event为AutoCompletePopupComponent的实例  |

#### searchFn默认值

``` javascript
      this.searchFn = (term) => {
        return of(this.source.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) !== -1));
      };
```

term 参数为输入的关键字
