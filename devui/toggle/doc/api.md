### d-toggle参数
| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| size        | `'small'\|'medium'\|'large'`       | small       | 可选，开关尺寸大小 |
| color       | `string`      | --     | 可选，开关打开时的自定义颜色 |
| checked       | `boolean`       | false     | 可选，开关是否打开，默认关闭 |
| [ngModel]       | `boolean`       | false     | 可选，指定当前是否打开，可双向绑定 |
| disabled       | `boolean`       | false     | 可选，是否禁用开关 |
| beforeChange | `Function\|Promise\|Observable` | --    | 可选，开关变化前的回调函数,返回boolean类型，返回false可以阻止开关的变化|

### d-toggle事件
| 事件     | 类型    |   说明                 |
| :------:   | :-----:  | :----------------------|
| change     | `EventEmitter<boolean>`  | 可选,开关打开返回true,关闭返回false |

