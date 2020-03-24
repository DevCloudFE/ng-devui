
| 参数                 | 类型                                 | 默认        |   说明                                      |
| :------------------: | :---------------------------------: | :---------: | :------------------------------------------|
| cssClass             | `string`                              | --      | 可选， 自定义class    |
| disabled             | `boolean`                             | --      | 可选，是否禁用 |
| source               | `Array<any>`                             | --      | 可选，数据列表 |
| isOpen               | `boolean`                             | --      | 可选，未使用 |
| term                 | `string`                              | --      | 可选，未使用 |
| itemTemplate         | `TemplateRef`                    | --      | 可选，未使用 |
| noResultItemTemplate | `TemplateRef`                    | --      | 可选, 结果不存在时的显示模板  |
| dropdown             | `boolean`                             | --      | 可选，未使用 |
| minLength            | `number`                              | --      | 可选，未使用 |
| delay                | `number`                              | 300      | 可选，输入结束dalay毫秒后启动查询 |
| searchFn    | `Function`     | (term: string) => Observable<any[]> | 可选，自定义搜索过滤 |
| formatter            | `Function`             | (item: any) => string      | 可选，对item的数据进行自定义显示内容，默认显示item.label 或 item.toString()|
| valueParser          | `Function`                  | (item: any) => any      | 可选，对item的数据进行转换，结果用于判断两个item是否一样，默认显示原值|
| overview | `border\|none\|multiline\|single`     | 'border'      | 可选 |
| tipsText             | `string`                              | --      | 可选，提示文字 |
| placeholder          | `string`                              | (请输入关键字)      | 可选，placeholder |
| latestSource         | `Array<any>`                                | --      | 可选， 最近输入，最多支持5个，超过5个，截取最后5个 |
| autoSubmit           | `Function`                            | --      | 可选，自动保存 |

#### searchFn默认值

``` javascript
  this.searchFn = (term) => {
    return of(this.source.filter(lang => this.formatter(lang).toLowerCase().indexOf(term.toLowerCase()) !== -1));
  };
```

term 为输入的关键字