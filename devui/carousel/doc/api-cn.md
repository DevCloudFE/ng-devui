# 如何使用

在 module 中引入：

```ts
import { CarouselModule } from 'ng-devui/carousel';
```

在页面中使用：

```html
<d-carousel>
  <d-carousel-item></d-carousel-item>
</d-carousel>
```

# d-carousel

## d-carousel 参数

|      参数       |             类型             |  默认值  |                                描述                                | 跳转 Demo                             | 全局配置项 |
| :-------------: | :--------------------------: | :------: | :----------------------------------------------------------------: | :------------------------------------ | ---------- |
|  arrowTrigger   | `'hover'\|'never'\|'always'` | 'hover'  |                     可选，指定切换箭头显示方式                     | [指示器&切换箭头](demo#trigger-usage) |
|    autoplay     |          `boolean`           |  false   |                         可选，是否自动轮播                         | [自动轮播](demo#autoplay-usage)       |
|  autoplaySpeed  |           `number`           |   3000   |          可选，配合`autoplay`使用，自动轮播速度，单位 ms           | [自动轮播](demo#autoplay-usage)       |
| transitionSpeed |           `number`           |   500    |                  可选，卡片切换动画速度，单位 ms                  | [自动轮播](demo#autoplay-usage)       |
|     height      |           `string`           |  '100%'  |                         可选，轮播容器高度                         | [基本用法](demo#basic-usage)          |
|    showDots     |          `boolean`           |   true   |                      可选，是否显示面板指示器                      | [自动轮播](demo#autoplay-usage)       |
|   dotPosition   |      `'top'\|'bottom'`       | 'bottom' |                        可选，面板指示器位置                        | [指示器&切换箭头](demo#trigger-usage) |
|   dotTrigger    |      `'click'\|'hover'`      | 'click'  |                      可选，指示器触发轮播方式                      | [指示器&切换箭头](demo#trigger-usage) |
|   activeIndex   |           `number`           |    0     | 可选，初始化激活卡片索引，从 0 开始，支持`[(activeIndex)]`双向绑定 | [基本用法](demo#basic-usage)          |

## d-carousel 事件

|       事件        |          类型          |                   描述                    | 跳转 Demo                    |
| :---------------: | :--------------------: | :---------------------------------------: | ---------------------------- |
| activeIndexChange | `EventEmitter<number>` | 卡片切换时，返回当前卡片的索引，从 0 开始 | [基本用法](demo#basic-usage) |

## d-carousel 方法

|    方法     | 描述                                | 跳转 Demo                       |
| :---------: | :---------------------------------- | :------------------------------ |
|   prev()    | 切换到上一张卡片                    | [自定义操作](demo#custom-usage) |
|   next()    | 切换到下一张卡片                    | [自定义操作](demo#custom-usage) |
| goTo(index) | 切换到指定索引的卡片，索引从 0 开始 | [自定义操作](demo#custom-usage) |
