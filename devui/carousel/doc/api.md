## d-carousel 参数

|     参数     |             类型             |   默认   | 说明                                            | 跳转 Demo                                        |
| :----------: | :--------------------------: | :------: | :---------------------------------------------- | ------------------------------------------------ |
| arrowTrigger | `'hover'\|'never'\|'always'` | 'hover'  | 可选，指定切换箭头显示方式                      | [指示器&切换箭头](/components/carousel/demo#trigger-usage)  |
|   autoplay   |          `boolean`           |  false   | 可选，是否自动轮播                              | [自动轮播](/components/carousel/demo#autoplay-usage) |
| autoplaySpeed |           `number`           |   3000   | 可选，配合`autoplay`使用，自动轮播速度，单位 ms | [自动轮播](/components/carousel/demo#autoplay-usage) |
|    height    |           `string`           |  '100%'  | 可选，轮播容器高度                              | [基本用法](/components/carousel/demo#basic-usage)    |
|   showDots   |          `boolean`           |   true   | 可选，是否显示面板指示器                        | [自动轮播](/components/carousel/demo#autoplay-usage) |
| dotPosition  |      `'top'\|'bottom'`       | 'bottom' | 可选，面板指示器位置                            | [指示器&切换箭头](/components/carousel/demo#trigger-usage)  |
|  dotTrigger  |      `'click'\|'hover'`      | 'click'  | 可选，指示器触发轮播方式                        | [指示器&切换箭头](/components/carousel/demo#trigger-usage)  |
| activeIndex  |           `number`           |    0     | 可选，初始化激活卡片索引，从 0 开始             | [基本用法](/components/carousel/demo#basic-usage)    |

## d-carousel 方法

|    方法     | 说明                                | 跳转 Demo                       |
| :---------: | :---------------------------------- | :----------------------------- |
|   prev()    | 切换到上一张卡片                    | [自定义操作](/components/carousel/demo#custom-usage)   |
|   next()    | 切换到下一张卡片                    | [自定义操作](/components/carousel/demo#custom-usage)   |
| goTo(index) | 切换到指定索引的卡片，索引从 0 开始 | [自定义操作](/components/carousel/demo#custom-usage)   |
