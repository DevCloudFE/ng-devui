| 参数        | 类型                            | 默认        |   说明                                      |
| :---------: | :-----------------------------: | :---------: | :------------------------------------------|
| loading     | LoadingType                     | (none)      | 可选参数，延时对象 Observable\| Promise\| Array<Promise> \| Array<Observable> \| undefined |
| message     | string                          | (none)      | 可选参数，loading时的提示信息 |
| templateRef | TemplateRef<any>                | (none)      | 可选参数，自定义的加载模板 |
| backdrop    | boolean                         | (none)      | 可选参数，loading时是否显示遮罩 |
| showLoading | function(_showLoading: boolean) | (none)      | 可选参数，手动启动和关闭loading页面,与loading属性不能同时使用 |
| positionType | string | 'relative'      | 可选参数，指定loading宿主元素的定位类型 |
