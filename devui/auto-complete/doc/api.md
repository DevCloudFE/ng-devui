
| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| allowEmptyValueSearch | `boolean`        | false          | 可选，在绑定的输入框value为空时，是否进行搜索提示操作 |
| appendToBody| `boolean`        | false          | 可选，下拉弹出是否append to body |
| source      | `Array<any>`        | --          | 必选，有searchFn的情况下可以不必选 |
| disabled    | `boolean`      | false     | 可选，是否禁止指令 |
| cssClass    | `string`       | --      | 可选，自定义class名 |
| delay       | `number`       | 300         | 可选，只有在delay时间经过后并且输入新值，才做搜索查询 |
| disabledKey | `string`      | --        | 可选，禁用单个选项;当传入资源source选项类型为对象,比如设置为'disabled',则当对象的disable属性为true时，比如{label: xxx, disabled: true},该选项将禁用 |
| itemTemplate| `TemplateRef`  | --      | 可选，自定义展示模板 |
| noResultItemTemplate| `TemplateRef`        | --      | 可选，没有匹配项的展示结果 |
| formatter   | `Function`     | --      | 可选，格式化函数 |
| isSearching | `boolean`      | false   | 可选，是否在搜索中，用于控制searchingTemplate是否显示 |
| searchFn    | `Function`     | (term: string, target?: AutoCompleteDirective) => Observable<any[]> | 可选，自定义搜索过滤 |
| searchingTemplate    | `TemplateRef`     | -- | 可选，自定义搜索中显示模板 |
| selectValue | `Function`     | --      | 可选，选择选项之后的回调函数 |
| transInputFocusEmit | `Function`     | --      | 可选，input focus和blur标志 |
| sceneType | `string`     | --      | 可选，值为select、suggest |
| tipsText | `string`     | --      | 可选，提示文字 |
| overview | `border\|none\|multiline\|single`     | --      | 可选 |
| latestSource | `Array<any>`     | --      | 可选， 最近输入 |
| enableLazyLoad              | `boolean`      | false | 可选，是否允许懒加载  |

### d-auto-complete 事件

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| loadMore              | `EventEmitter<any>`      | -- | 可选，懒加载触发事件，配合enableLazyLoad使用,使用\`$event.loadFinish()\`关闭loading状态,$event为弹窗组件AutoCompletePopupComponent的实例 |

#### searchFn默认值

``` javascript
  this.searchFn = (term) => {
    return of(this.source.filter(lang => this.formatter(lang).toLowerCase().indexOf(term.toLowerCase()) !== -1));
  };
```

term 参数为输入的关键字