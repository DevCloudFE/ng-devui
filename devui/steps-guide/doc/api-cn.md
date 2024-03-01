# 如何使用

在 module 中引入:

```ts
import { StepsGuideModule } from 'ng-devui/steps-guide';
```

在页面中使用:

```html
<!-- xxx可以是任意html元素 -->
<xxx dStepsGuide></xxx>
```

# dStepsGuide

## dStepsGuide 参数

|         参数         |                        类型                         | 默认 |                                                                         说明                                                                          | 跳转 Demo                       | 全局配置项 |
| :------------------: | :-------------------------------------------------: | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------ | ---------- |
|       pageName       |                      `string`                       |  --  |                                            必选，用于标识操作指引是否显示，一组操作指引序列建议使用相同值                                             | [基本用法](demo#basic-usage)    |
|        steps         |         `Array<`[`StepItem`](#stepitem)`>`          |  []  |                必选，操作指引步骤数组，如通过 StepsGuideService.setSteps 设置了操作指引步骤，则优先使用服务中的，StepItem 对象定义见下                | [基本用法](demo#basic-usage)    |
|      stepIndex       |                      `number`                       |  --  |                                                       必选，当前步骤在整个操作指引序列中的索引                                                        | [基本用法](demo#basic-usage)    |
|     beforeChange     |           `Function\|Promise\|Observable`           |  --  |                                            可选，在切换步骤时前置执行，返回 boolean 值决定是否显示当前步骤                                            | [基本用法](demo#basic-usage)    |
|     ~~position~~     | [`StepsGuidePositionType`](#stepsguidepositiontype) | top  | 可选，指引信息弹出的位置方向，可选值：top、top-left、top-right、bottom、bottom-left、bottom-right、left、right（`已废弃，请使用dStepsGuidePosition`） | [基本用法](demo#basic-usage)    |
| dStepsGuidePosition  | [`StepsGuidePositionType`](#stepsguidepositiontype) | top  |                    可选，指引信息弹出的位置方向，可选值：top、top-left、top-right、bottom、bottom-left、bottom-right、left、right                     | [基本用法](demo#basic-usage)    |
|       leftFix        |                      `number`                       |  0   |                                                             可选，用于修正指引信息的位置                                                              | [自定义位置](demo#custom-usage) |
|        topFix        |                      `number`                       |  0   |                                                             可选，用于修正指引信息的位置                                                              | [自定义位置](demo#custom-usage) |
|        zIndex        |                      `number`                       | 1100 |                                                           可选，用于调整指引信息的显示层级                                                            | [自定义位置](demo#custom-usage) |
|    targetElement     |                    `HTMLElement`                    |  --  |                                       可选，指引信息显示的目标 dom ，如果指定，不再使用指令所在的 dom 作为目标                                        | [自定义位置](demo#custom-usage) |
|    scrollElement     |                    `HTMLElement`                    |  --  |                                 可选，指引信息跟随滚动定位的容器 dom ，默认会自动获取，如果与预想 dom 不同时需要指定                                  |                                 |
| scrollToTargetSwitch |                      `boolean`                      | true |                                                    可选，是否自动滚动页面至指引信息显示的位置 dom                                                     | [基本用法](demo#basic-usage)    |
| observerDom | `HTMLElement` | -- | 可选，允许用户指定一个 dom 反馈页面变化。主要用于用户无法控制或判断的且不会触发 resize 事件的 dom 改变导致指引信息位置变化的情况，例如：指引信息绑定在 fixed 定位的头部菜单，页面随路由跳转内容变化会显示或隐藏滚动条导致头部菜单的 dom 位置发生变化 | [自定义位置](demo#custom-usage) |
| extraConfig | [`ExtraConfig`](#extraconfig) | -- | 可选，扩展配置，用于隐藏上一步按钮和步骤圆点图标，ExtraConfig 对象定义见下文 | [自定义位置](demo#custom-usage) |

### StepItem

```ts
export interface StepItem {
  title: string; // 引导标题
  content: string; // 引导介绍内容
}
```

### StepsGuidePositionType

```ts
export type StepsGuidePositionType = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right';
```

### ExtraConfig

```ts
export interface ExtraConfig {
  hidePreStep: boolean; // 隐藏上一步按钮
  hideStepNav: boolean; // 隐藏步骤圆点图标显示
}
```

### dStepsGuide 事件

|     参数      |                          类型                           | 说明                                                             | 跳转 Demo                    |
| :-----------: | :-----------------------------------------------------: | :--------------------------------------------------------------- | :--------------------------- |
| operateChange | `EventEmitter<`[`OperateResponse`](#operateresponse)`>` | 可选，返回当前步骤索引和当前操作，OperateResponse 对象定义见下文 | [基本用法](demo#basic-usage) |

# 接口 & 类型定义

### OperateResponse

```ts
OperateResponse {
  currentIndex: number; // 当前索引
  clickType: 'prev' | 'next' | 'close'; // 当前操作
}
```
