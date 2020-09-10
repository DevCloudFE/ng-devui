### dStepsGuide 参数

|     参数      |           类型           | 默认 | 说明                                                                                                                    | 跳转 Demo                                               |
| :-----------: | :----------------------: | :--: | :---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
|   pageName    |         `string`         |  --  | 必选，用于标识操作指引是否显示，一组操作指引序列建议使用相同值                                                          | [基本用法](/components/steps-guide/demo#basic-usage)    |
|     steps     |    `Array<StepItem>`     |  []  | 必选，操作指引步骤数组，如通过 StepsGuideService.setSteps 设置了操作指引步骤，则优先使用服务中的，StepItem 对象定义见下 | [基本用法](/components/steps-guide/demo#basic-usage)    |
|   stepIndex   |         `number`         |  --  | 必选，当前步骤在整个操作指引序列中的索引                                                                                | [基本用法](/components/steps-guide/demo#basic-usage)    |
|   position    | `StepsGuidePositionType` | top  | 可选，指引信息弹出的位置方向，可选值：top、top-left、top-right、bottom、bottom-left、bottom-right、left、right          | [基本用法](/components/steps-guide/demo#basic-usage)    |
|    leftFix    |         `number`         |  0   | 可选，用于修正指引信息的位置                                                                                            | [自定义位置](/components/steps-guide/demo#custom-usage) |
|    topFix     |         `number`         |  0   | 可选，用于修正指引信息的位置                                                                                            | [自定义位置](/components/steps-guide/demo#custom-usage) |
|    zIndex     |         `number`         | 1100 | 可选，用于调整指引信息的显示层级                                                                                        | [自定义位置](/components/steps-guide/demo#custom-usage) |
| targetElement |      `HTMLElement`       |  --  | 可选，指引信息显示的目标 dom ，如果指定，不再使用指令所在的 dom 作为目标                                                | [自定义位置](/components/steps-guide/demo#custom-usage) |
|  extraConfig  |      `ExtraConfig`       |  --  | 可选，扩展配置，用于隐藏上一步按钮和步骤圆点图标，ExtraConfig 对象定义见下文                                            | [自定义位置](/components/steps-guide/demo#custom-usage) |

### dStepsGuide 事件

|     参数      |              类型               | 说明                                                             | 跳转 Demo                                            |
| :-----------: | :-----------------------------: | :--------------------------------------------------------------- | :--------------------------------------------------- |
| operateChange | `EventEmitter<OperateResponse>` | 可选，返回当前步骤索引和当前操作，OperateResponse 对象定义见下文 | [基本用法](/components/steps-guide/demo#basic-usage) |

#### 类型定义

```
StepItem {
  title: string; // 引导标题
  content: string; // 引导介绍内容
}

ExtraConfig {
  hidePreStep: boolean; // 隐藏上一步按钮
  hideStepNav: boolean; // 隐藏步骤圆点图标显示
}

OperateResponse {
  currentIndex: number; // 当前索引
  clickType: 'prev' | 'next' | 'close'; // 当前操作
}
```
