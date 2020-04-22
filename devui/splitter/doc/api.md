## d-splitter 参数
| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------|
| orientation | `'vertical'\|'horizontal'` | 'horizontal' |可选，指定Splitter分割方向,可选值'vertical'\|'horizontal'|
| splitBarSize | `string`       | '2px'        |可选，分隔条大小，默认2px|
| disabledBarSize | `string`    | '1px'        |可选，pane设置不可调整宽度时生效|


## d-splitter-pane 参数
| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :---------------------------|
| size | `string`  | -- |可选，指定pane宽度，设置像素值或者百分比|
| minSize | `string`       | --        |可选，指定pane最小宽度，设置像素值或者百分比|
| maxSize | `string`    | --        |可选，指定pane最大宽度，设置像素值或者百分比|
| resizable | `boolean`    | true       |可选，指定pane是否可调整大小，会影响相邻pane|
| collapsible | `boolean`    | false       |可选，指定pane是否可折叠收起|
| collapsed | `boolean`    | false       |可选，指定pane初始化是否收起，配合`collapsible`使用|
| collapseDirection | `'before'\|'after'\|'both'`   | 'both'       |可选，指定非边缘pane收起方向，配合`collapsible`使用|

## d-splitter-pane事件
| 事件        | 类型          |  说明       |
| :---------: | :----------: | :---------: |
| sizeChange |   `EventEmitter<string>` |大小变动时，返回改变后的值,像素值或者百分比|
| collapsedChange |   `EventEmitter<boolean>` |折叠和展开时，返回当前pane是否折叠|
