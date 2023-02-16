# 如何使用
在module中引入：
```ts
import { UserGuideModule } from 'ng-devui/user-guide';
```

以组件方式使用：
```html
<d-user-guide [steps]="steps"></d-user-guide>
```

以服务方式使用使用：
```ts
import { UserGuideService } from 'ng-devui/user-guide';

constructor(private userGuideService: UserGuideService) { }

ngOnInit() {
this.userGuideService.setSteps(this.steps);
}

startTutorial(index: number) {
this.userGuideService.start(index);
}
```
# UserGuide

## d-user-guide 参数 (组件方式)

|    参数     |      类型      |  默认值   | 描述                                                                           | 跳转 Demo                                            |
| :---------: | :------------:  | :-----: | :---------------------------------------------------------------------------  |  :---------------------------     |
|     steps      |    `Array<IStep>`     |   `[]`    | 设置用户指引，每个IStep为一套指引教程 | [基本指南](demo#user-guide-basic) |
|    userGuideEntrancePosition    |    `{bottom: string, left: string}`     |   `{bottom: '30px', left: '30px'}`    | 可选，设置用户指引悬浮入口位置 | [基本指南](demo#badge-basic) |
|     showUserGuideEntrance      |    `boolean`     |   `true`    | 可选，是否显示用户指引悬浮入口 | [基本指南](demo#user-guide-basic) |

## d-user-guide 公共方法 (服务方式)
| 方法名 | 参数  | 类型 |   说明    | 跳转 Demo |          
| :----: | :---: | :----- | :-------: | :-------: |
|  setSteps  | steps   | `Array<IStep>`     | 设置指引教程数据 | [服务方式](demo#user-guide-service-way) |
|  start  |  index   | `number`     | 开始某一套教程 | [服务方式](demo#user-guide-service-way) |
|  goStep  |  index   | `number`     | 从当前教程的某一步开始 | [服务方式](demo#user-guide-service-way) |
|  getCurrentStep  |  --   | --     | 获取当前是第几步 | [服务方式](demo#user-guide-service-way) |
|  getCurrentDirection  |  --   | --  | 获取当前步骤切换方向，返回值为`'forward' \| 'backward'` | [服务方式](demo#user-guide-service-way) |
|  updateCurrentStepElement  |  --   | --     | 动态更新当前步骤元素 | [服务方式](demo#user-guide-service-way) |
|  exit  |  --   | --     | 退出用户指引 | [服务方式](demo#user-guide-service-way) |
|  showDot  |  item   | `string`     | 要展示点的元素，支持类名或id名 | [服务方式](demo#user-guide-service-way) |
|  removeDot  |  item   | `string`     | 要移除点的元素，支持类名或id名 | [服务方式](demo#user-guide-service-way) |

### IStep 出现在指引列表中的一套指引教程

```TS
export interface IStep {
    title: string; // 本套指引标题

    desc?: string; // 本套指引描述

    showDots?: boolean; //是否显示步骤点

    maxContentWidth?: number; //内容区最大宽度

    defaultStart?: boolean; // 是否在页面完成加载后自动开始本套教程

    isCover?: boolean; // 是否有遮罩层

    extraConfig?: IUserGuideExtraConfig; //指引面板配置项

    onExit?： Function; //退出时的回调函数

    detail: Array<IStepElement>; // 本套指引具体步骤
}
```

```TS

export interface IUserGuideExtraConfig {
  panelBackground?: string; // 指引面板背景色
  nextButtonType?: string; // 下一步按钮类型
  infoColor?: string; // 内容颜色
  operationColor?: string; // 操作颜色
  dotColor?: string; // 导航点颜色
}
```

### IStepElement

```TS
export interface IStepElement {
    element?: object; // 指引步骤所关联的元素，支持类名或id名

    title: string; // 指引步骤的标题

    content?: string | TemplateRef<any>; // 指引步骤的解说内容，支持字符串、html或TemplateRef

    position?: PositionType; //弹窗位置，不传入则自动选择一个合适的位置

    type: 'normal' | 'interactable' | 'tip'; //指引模式类型
    // 默认为'normal'即一般指引模式，若element不为undifined则定位到元素并视觉突出当前步骤进行展示，页面及元素不可点击；若element为undifined，则不定位到具体元素，指引窗进行总体的信息展示，页面其余区域不可点击
    // 第二种是'interactable'可交互模式，用蓝色框和呼吸动效突出步骤元素，用户可点击元素进行动态交互，使用时需配合eventType参数一起。目前提供了3种交互事件，点击事件、输入事件、退出事件
    // 第三种是'tip'提示框模式，适用于一些醒目提示用户的单步指引

    eventType?: 'clickable' | 'inputable' | 'exit'; //可交互事件类型
    // 'clickable'是可点击事件，用户点击元素后进行点击附加操作，并进入下一步指引，多用于用户点击后打开弹窗、或下拉菜单等地方
    // 'inputable'是可输入事件，用户点击指引窗的辅助区域可自动输入，自动输入或用户在输入框输入后有输入完成交互并显示下一步按钮
    // 'exit'是退出事件，用在指引步骤的最后一步时自动关闭指引教程，并弹出提示用户完成指南

    highlightOffset?: Array<Number>; //高亮区域偏移量，格式为[上，右，下，左]，单位为px

    inputData?: string; //可输入事件自动输入的内容，当eventType为'inputable'时需设置此值

    waitingTime?: number; //事件等待时间

    beforeChange?: Function | Promise | Observable; //每一步开始之前的用户回调函数，无返回值或返回值为true时继续执行下一步

    showPrevButton?: boolean; //是否显示上一步按钮
}
```

```TS
export type PositionType =  'left' | 'right' | 'top' | 'bottom' | 'bottom-left'| 'bottom-right'| 'top-left'| 'top-right'|
    'left-top'| 'left-bottom'| 'right-top'| 'right-bottom';
```