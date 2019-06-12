| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| tags        | Array        | []          | 必选参数，记录输入的标签和选择的标签 |
| displayProperty    | string       | 'name'      | 可选参数，使用的属性名 |
| placeholder   | boolean       | ''                           | 可选参数，输入框的placeholder |
| minLength     | number        | 3                            | 可选参数，输入标签的最小长度 |
| maxLength     | number        | Number.MAX_SAFE_INTEGER      | 可选参数，输入标签的最大长度 |
| minTags       | number        | 0                            | 可选参数，标签的最小个数 |
| maxTags       | number        | Number.MAX_SAFE_INTEGER      | 可选参数，标签的最大个数 |
| caseSensitivity[4.2.0支持]       | boolean        | false    | 可选参数，大小写敏感，默认忽略大小写 |
| spellcheck    | boolean       | true                         | 可选参数，输入框的spellcheck |
| suggestionList | Array          | []      | 可选参数，下拉选项 |
| isAddBySpace   | boolean        | true    | 可选参数，是否可以通过空格键添加tag，默认可以 |
| checkBeforeAdd | function       | 无      | 可选参数，自定义校验函数，类型为(newTag: string) => boolean 或者Promise<boolean>或者Observable<boolean> |
| valueChange    | function       | 无      | 可选参数，输出函数，当选中某个选项项后，将会调用此函数，参数为当前选择项的值。如果需要获取所有选择状态的值，请参考(ngModelChange)方法 |
