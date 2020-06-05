<!--
 * @Author: your name
 * @Date: 2020-06-03 11:02:15
 * @LastEditTime: 2020-06-04 16:52:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ng-devui\devui\image-preview\doc\api.md
--> 
## 如何使用

### 引用

`import {DevUIModule} from 'ng-devui'`;

或

`import {ImagePreviewModule} from 'ng-devui/image-preview'`;


### dImagePreview指令

Image容器元素上使用`dImagePreview`指令

### dImagePreview 参数

| 参数              | 类型                         | 默认        |   说明                              |
| :---------------: | :-------------------------: | :---------: | :--------------------------------:  |
| customSub         | `Subject<HTMLElement>`      | --          | 可选，customsub触发next时，打开预览    |
| disableDefault    | `boolean`      | false         | 可选，关闭默认点击触发图片预览方式    |

