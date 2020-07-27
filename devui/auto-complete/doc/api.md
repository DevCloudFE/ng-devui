### d-auto-complete 参数

|         参数          |      类型  |    默认     | 说明      | 跳转 Demo          |
| :---: | :---------------: | :-----------------: | :------------------------ | ------------ |
| allowEmptyValueSearch |    `boolean`    |    false    | 可选，在绑定的输入框 value 为空时，是否进行搜索提示操作      | [自定义模板展示](/components/auto-complete/demo#auto-custom) |
|     appendToBody      |    `boolean`    |    false    | 可选，下拉弹出是否 append to body     | [自定义模板展示](/components/auto-complete/demo#auto-custom) |
|        source         |  `Array<any>`   |     --      | 必选，有 searchFn 的情况下可以不必选           | [基本用法](/components/auto-complete/demo#basic-usage)       |
|       disabled        |    `boolean`    |    false    | 可选，是否禁止指令      | [设置禁用](/components/auto-complete/demo#auto-disable)      |
|         delay         |    `number`     |     300     | 可选，只有在 delay 时间经过后并且输入新值，才做搜索查询      |[自定义模板展示](/components/auto-complete/demo#auto-custom) |
|      disabledKey      |    `string`     |     --      | 可选，禁用单个选项;当传入资源 source 选项类型为对象,比如设置为'disabled',则当对象的 disable 属性为 true 时，比如{label: xxx, disabled: true},该选项将禁用 | [设置禁用](/components/auto-complete/demo#auto-disable)      |
|     itemTemplate      |  `TemplateRef`  |     --      | 可选，自定义展示模板    | [自定义模板展示](/components/auto-complete/demo#auto-custom) |
| noResultItemTemplate  |  `TemplateRef`  |     --      | 可选，没有匹配项的展示结果       | [自定义模板展示](/components/auto-complete/demo#auto-custom) |
|       formatter       |   `Function`    |     --      | 可选，格式化函数        | [设置禁用](/components/auto-complete/demo#auto-disable)      |
|      isSearching      |    `boolean`    |    false    | 可选，是否在搜索中，用于控制 searchingTemplate 是否显示      | [自定义模板展示](/components/auto-complete/demo#auto-custom) |
|       searchFn        |   `Function`    | (term: string, target?: AutoCompleteDirective) => Observable<any[]> | 可选，自定义搜索过滤    | [自定义数据匹配方法](/components/auto-complete/demo#auto-object)  |
|   searchingTemplate   |  `TemplateRef`  |     --      | 可选，自定义搜索中显示模板       | [自定义模板展示](/components/auto-complete/demo#auto-custom) |
|       sceneType       |    `string`     |     --      | 可选，值为 select、suggest       | [启用懒加载](/components/auto-complete/demo#auto-lazy-load) |
|       tipsText        |    `string`     |     -- latestSource     | 可选，提示文字          | [设置禁用](/components/auto-complete/demo#auto-disable)      |
|       overview        | `border\|none\|multiline\|single` |     --      | 可选（不推荐）      | 
|     latestSource      |  `Array<any>`   |     --      | 可选， 最近输入         | [最近输入](/components/auto-complete/demo#auto-latest)      |
|     valueParser      |  `Function`   |     --      | 可选， 对选中后数据进行处理         | [启用懒加载](/components/auto-complete/demo#auto-lazy-load)      |
|    enableLazyLoad     |    `boolean`    |    false    | 可选，是否允许懒加载    | [启用懒加载](/components/auto-complete/demo#auto-lazy-load) |

### d-auto-complete 事件

|   参数   |        类型         |  说明        | 跳转 Demo |
| :------: | :-----------------: | :--: | :---------------------------- | 
| loadMore | `EventEmitter<any>` |   可选，懒加载触发事件，配合 enableLazyLoad 使用,使用\`$event.loadFinish()\`关闭loading状态,$event 为弹窗组件 AutoCompletePopupComponent 的实例 | [启用懒加载](/components/auto-complete/demo#auto-lazy-load) |
|      selectValue      |   `EventEmitter<any>`    |  可选，选择选项之后的回调函数          | [启用懒加载](/components/auto-complete/demo#auto-lazy-load) |
|  transInputFocusEmit  |   `EventEmitter<{focus, popupRef}>`    |   可选，input focus 时回调函数        | [启用懒加载](/components/auto-complete/demo#auto-lazy-load) |

#### searchFn 默认值

```javascript
this.searchFn = (term) => {
  return of(this.source.filter((lang) => this.formatter(lang).toLowerCase().indexOf(term.toLowerCase()) !== -1));
};
```

term 参数为输入的关键字
