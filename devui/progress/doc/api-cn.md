# 如何使用
在module中引入：
```ts
import { ProgressModule } from 'ng-devui/progress';
```
在页面中使用：
```html
<d-progress></d-progress>
```

# d-progress

## d-progress 参数

|      参数      |   类型    |   默认值    | 描述                                                     | 跳转 Demo                                      |全局配置项| 
| :----------------: | :------------: | :-------: | :-------: | :------------------------------------------------------- | ---------------------------------------------- |
|    type    | `line \| circle` |   false   | 可选， 显示进度条是否为圈形                              | [圆环用法](demo#circle-usage) |
|   percentage   | `number`  |     0     | 可选，进度条的值最大为 100                               | [基本用法](demo#basic-usage) |
| percentageText | `string`  |    --     | 可选，进度条当前值的文字说明比如：'30%' \| '4/5'         | [基本用法](demo#basic-usage) |
|  showContent    | `boolean` |   true    | 可选，设置圈形进度条内是否展示内容                     | [圆环用法](demo#circle-usage) |
|   strokeColor   | `string`  | '#5170ff' | 可选，进度条的颜色显示，默认为天蓝色                     | [基本用法](demo#basic-usage) |
|  strokeWidth   | `number`  |     14     | 可选，进度条的线条宽度 | [圆环用法](demo#circle-usage) |
