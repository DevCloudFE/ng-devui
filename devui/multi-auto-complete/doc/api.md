
### d-multi-auto-complete 参数

+ 本组件基于d-auto-complete实现，itemTemplate、noResultItemTemplate等参数，使用方式与d-auto-complete一致。

|         参数         |               类型                |                默认                 | 说明                                                                           | 跳转 Demo                                                 |
| :------------------: | :-------------------------------: | :---------------------------------: | :----------------------------------------------------------------------------- | --------------------------------------------------------- |
|      appendToBody    |             `boolean`             |                 --                  | 可选，是否appendToBody                                                         | [基本用法](/components/multi-auto-complete/demo#basic-usage) |
|       disabled       |             `boolean`             |                 --                  | 可选，是否禁用                                                                 | [使用禁用](/components/multi-auto-complete/demo#auto-complete-disabled) |
|        source        |           `Array<any>`            |                 --                  | 可选，数据列表                                                                 | [基本用法](/components/multi-auto-complete/demo#basic-usage)            |
|     itemTemplate     |           `TemplateRef`           |                 --                  | 可选，下拉选项模板                                                                   | [自定义模板展示](/components/auto-complete/demo#auto-custom) |
| noResultItemTemplate |           `TemplateRef`           |                 --                  | 可选, 结果不存在时的显示模板                                                   | [自定义模板展示](/components/auto-complete/demo#auto-custom) |
|        delay         |             `number`              |                 300                 | 可选，输入结束 dalay 毫秒后启动查询                                            | [自定义模板展示](/components/auto-complete/demo#auto-custom) |
|       searchFn       |            `Function`             | (term: string) => Observable<any[]> | 可选，自定义搜索过滤                                                           | [自定义匹配方法](/components/multi-auto-complete/demo#auto-complete-array)    |
|      formatter       |            `Function`             |        (item: any) => string        | 可选，对 item 的数据进行自定义显示内容，默认显示 item.label 或 item.toString() | [设置禁用](/components/auto-complete/demo#auto-disable)      |
|     valueParser      |            `Function`             |         (item: any) => any          | 可选，对选中数据进行转化 | [启用懒加载](/components/auto-complete/demo#auto-lazy-load) |
|       overview       | `border\|none\|multiline\|single` |              'border'               | 可选（不推荐）                                                                           |
|       tipsText       |             `string`              |                 --                  | 可选，提示文字                                                                 | [设置禁用](/components/auto-complete/demo#auto-disable)      |
|     placeholder      |             `string`              |           --            | 可选，placeholder                                                              | [基本用法](/components/multi-auto-complete/demo#basic-usage)            |
|     latestSource     |           `Array<any>`            |                 --                  | 可选， 最近输入                       |  [最近输入](/components/auto-complete/demo#auto-latest)      |

### d-auto-complete 事件

|   参数   |        类型         | 默认 | 说明        | 跳转 Demo |
| :------: | :-----------------: | :--: | :---------------------------- | --------- |
| autoSubmit | `EventEmitter<any>` |  --  | 可选，当前已选择数据发生变化时，回传当前已选择数据 | [自定义匹配方法](/components/multi-auto-complete/demo#auto-complete-array)    |

#### searchFn 默认值

```javascript
this.searchFn = (term) => {
  return of(this.source.filter((lang) => this.formatter(lang).toLowerCase().indexOf(term.toLowerCase()) !== -1));
};
```

term 为输入的关键字
