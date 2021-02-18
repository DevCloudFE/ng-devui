# 如何使用

在module中引入：

```ts
import { BackTopModule } from 'ng-devui/back-top';
```

在页面中使用：

```xml
<d-back-top></d-back-top>
```

# d-back-top
## d-back-top 参数

|    参数     |      类型      |  默认   | 说明                                                                           | 跳转 Demo                                            |
| :---------: | :------------:  | :-----: | :---------------------------------------------------------------------------  |                                                     |
|  customTemplate    |       `TemplateRef<any>`   |    --    |                      可选，自定义按钮样式                  | [自定义](demo#back-top-customize)   |
|       bottom       |        `string`           |   '50px'  |                   可选，按钮距离页面底部位置              | [自定义](demo#back-top-customize)     |
|       right        |        `string`           |   '30px'  |                    可选，按钮距离页面右边距               | [自定义](demo#back-top-customize)     |
|   visibleHeight    |         `number`          |    300    |   可选，滚动高度达到visibleHeight所设值后展示回到顶部按钮，单位为`px`   | [自定义](demo#back-top-customize)     |
|    scrollTarget    |       `HTMLElement`       |   Window  |                      可选，触发滚动的对象                 | [滚动容器](demo#back-top-scroll-container)      |

## d-back-top 事件

|       参数      |          类型          |                                   说明                                         | 跳转 Demo                                      |
| :------: | :-----------------: | :-------------------------------------------------------------------------------------- | ---------------------------------------------- |
|  backTopEvent  |   `EventEmitter<boolean>`  |                         可选，点击回到顶部按钮的回调函数                          | [基本用法](demo#back-top-basic)      |
