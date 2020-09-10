## Slider 使用说明

### d-slider 参数

|     参数     |        类型        |           默认           | 说明                                                                | 跳转 Demo                                           |
| :----------: | :----------------: | :----------------------: | :------------------------------------------------------------------ | --------------------------------------------------- |
|     min      |      `number`      |            0             | 可选，滑动输入条的最小值                                            | [基本用法](/components/slider/demo#basic-usage)      |
|     max      |      `number`      |           100            | 可选，滑动输入条的最大值                                            | [基本用法](/components/slider/demo#basic-usage)      |
|     step     |      `number`      |            1             | 可选，滑动输入条的步长，取值必须大于等于 0，且必须可被(max-min)整除 | [基本用法](/components/slider/demo#basic-usage)      |
|   disabled   |     `boolean`      |          false           | 可选，值为 true 时禁止用户输入                                      | [禁止输入态](/components/slider/demo#slider-disabled)  |
| tipsRenderer | `function \| null` | (value) => String(value) | 可选，渲染 Popover 内容的函数，传入 null 时不显示 Popover           | [异定制Popover的显示内容](/components/slider/demo#slider-formatter) |
