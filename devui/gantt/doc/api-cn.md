# 如何使用
在module中引入：
```ts
import { GanttModule } from 'ng-devui/gantt';
```


### d-gantt-scale 参数

|             参数              |        类型        | 默认值  | 描述                                       | 跳转 Demo                                                                  |全局配置项| 
| :----------------: | :---------------------------: | :----------------: | :---: | :----------------------------------------- | -------------------------------------------------------------------------- |
|         milestoneList         | `GanttMilestone[]` |  []   | 可选，版本里程碑列表                       | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
| ganttScaleContainerOffsetLeft |      `number`      |   0   | 可选，甘特图时间轴容器左偏移像素           | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|   ganttBarContainerElement    |     `Element`      | null  | 必选，甘特图时间条容器，用于显示甘特图标线 | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|         scrollElement         |     `Element`      |  --   | 可选，滚动的容器                         | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|             unit              | `'day'\|'week'\|'month'` | 'day' | 可选，默认时间维度                 |
|            height             |      `number`      |  --   | 可选，高度                              |
|           startDate           |       `Date`       |  --   | 可选，开始时间                           |
|            endDate            |       `Date`       |  --   | 可选，结束时间                           |

### d-gantt-scale 事件

|        事件         |             类型               |             描述            | 跳转 Demo                                                                  |
| :-----------------: | :---------------------------: | :-------------------------: | -------------------------------------------------------------------------- |
|  addMilestoneEvent  | `EventEmitter<GanttScaleDateInfo>` | 点击新建后触发事件            |

### d-gantt-bar 参数

|       参数        |        类型        |    默认值    | 描述                                                              | 跳转 Demo                                                                  |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     startDate     |       `Date`       |    null    | 必选，开始时间                                                    | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|      endDate      |       `Date`       |    null    | 必选，结束时间                                                    | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|        id         |      `string`      |    null    | 可选，支持传入 id                                                 | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|       data        |      `object`      |    null    | 可选，支持传入任意数据                                            | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|   progressRate    |      `number`      |     0      | 可选，进度，例如 30 代表 30%进度                                  | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|  tipTemplateRef   | `TemplateRef<any>` |    null    | 可选，自定义提示内容模板                                          | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|  barMoveDisabled  |     `boolean`      |   false    | 可选，是否禁止 bar 拖动                                           | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
| barResizeDisabled |     `boolean`      |   false    | 可选，是否禁止 bar 调整起止时间                                   | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
| progressDisabled  |     `boolean`      |   false    | 可选，是否禁止 bar 调整进度                                       | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
| originOffsetX   |     `number`      |   0    | 可选，相对父容器的横向偏移距离                                      | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
| showTitle   |     `boolean`      |   --    | 可选，是否显示title                                      | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
| title  |     `string`      |   --    | 可选，title                                       | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
| customBarClass   |     `string`      |   --    | 可选，自定义拖拽bar的样式                                      | -- |
| customBgClass   |     `string`      |   --    | 可选，拖拽bar在移动的时候的背景色                                     | -- |
| customTitleClass   |     `string`      |   --    | 可选，自定义title样式                                     | -- |
| scrollElement   |     `Element`      | --  | 可选，滚动的容器                         | [基本用法](demo#gantt-basic) |


### d-gantt-bar 事件

|        事件         |             类型              |             描述             | 跳转 Demo                                                                  |
| :-----------------: | :---------------------------: | :--------------------------: | -------------------------------------------------------------------------- |
|  barMoveStartEvent  | `EventEmitter<GanttTaskInfo>` |   工作项时间条开始拖动事件   | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|   barMovingEvent    | `EventEmitter<GanttTaskInfo>` |    工作项时间条拖动中事件    | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|   barMoveEndEvent   | `EventEmitter<GanttTaskInfo>` |   工作项时间条拖动完成事件   | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
| barResizeStartEvent | `EventEmitter<GanttTaskInfo>` | 工作项时间条宽度开始调整事件 | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|  barResizingEvent   | `EventEmitter<GanttTaskInfo>` |  工作项时间条宽度调整中事件  | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|  barResizeEndEvent  | `EventEmitter<GanttTaskInfo>` | 工作项时间条宽度调整完成事件 | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|  barProgressEvent   |    `EventEmitter<number>`     |      工作项进度调整事件      | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |


### d-gantt-milestone 参数
|       参数        |        类型        |    默认值    | 描述                                                              | 跳转 Demo                                                                  |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     startDate     |       `Date`       |    null    | 必选，开始时间                                                    | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|        id         |      `string`      |    null    | 可选，支持传入 id                                                 | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|       title       |      `string`      |    null    | 可选，支持传入 title，用于里程碑类型的标题                        | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |


### d-gantt-bar-parent 参数
|       参数        |        类型        |    默认值    | 描述                                                              | 跳转 Demo                                                                  |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     startDate     |       `Date`       |    null    | 必选，开始时间                                                    | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|      endDate      |       `Date`       |    null    | 必选，结束时间                                                    | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|        id         |      `string`      |    null    | 可选，支持传入 id                                                 | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|       data        |      `object`      |    null    | 可选，支持传入任意数据                                            | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|   progressRate    |      `number`      |     0      | 可选，进度，例如 30 代表 30%进度                                  | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|   tip    |      `string`      |     0      | 可选，提示信息                                  | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |


### d-gantt-tools 参数
|       参数        |        类型        |    默认值    | 描述                                                              | 跳转 Demo                                                                  |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     currentUnit     |       `[currentUnit](# currentUnit)`       |    null    | 可选，当前视图单位                                                   | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|      isFullScreen       |       `Boolean`       |    false    | 可选，是否全屏                                                    | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |

### d-gantt-tools 事件
|       参数        |        类型        |    默认值    | 描述                                                              | 跳转 Demo                                                                  |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     goToday     |       `EventEmitter<any>`       |    null    | 可选，跳至今天                                                   | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|      reduceUnit       |       `EventEmitter<any>`       |    null    | 可选，视图单位+1                                                    | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|      increaseUnit       |       `EventEmitter<any>`       |    null    | 可选，视图单位-1                                                  | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|      switchView       |       `EventEmitter<currentUnit>`       |    null    | 可选，当前视图单位                                                    | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |


### GanttService 公共方法

|         方法         |               参数               | 返回值类型 |              描述              | 跳转 Demo                                                                  |
| :------------------: | :------------------------------: | :--------: | :----------------------------: | -------------------------------------------------------------------------- |
|    setScaleConfig    |        `GanttScaleConfig`        |    void    |           配置时间轴           | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
|   getDurationWidth   | `startDate: Date, endDate: Date` |   number   |  获取起止时间在时间轴上的宽度  | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |
| getDatePostionOffset |           `date: Date`           |   number   | 获取时间点在时间轴上的左偏移量 | [与datatable组件结合的甘特图](demo#gantt-with-datatable) |

#### 甘特图类型定义

```javascript
export interface GanttMilestone {
    date: Date;
    lable: string;
}

export interface GanttTaskInfo {
    id: string;
    startDate: Date;
    endDate: Date;
    title?: string;
    progress: string; // 当前进度
    duration: string; // 持续时间
    moveOffset?: number; // 拖动距离
}

export interface GanttScaleConfig {
    startDate?: Date;
    endDate?: Date;
    unit?: GanttScaleUnit;
}

export enum GanttScaleUnit {
    day = 'day',
    week = 'week',
    month = 'month'
}

export enum UnitRole {
  day = 10,
  week = 20,
  month = 30,
}
```
