### d-gantt-scale 参数

|             参数              |        类型        | 默认  | 说明                                       | 跳转 Demo                                                                  |
| :---------------------------: | :----------------: | :---: | :----------------------------------------- | -------------------------------------------------------------------------- |
|         milestoneList         | `GanttMilestone[]` |  []   | 可选，版本里程碑列表                       | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
| ganttScaleContainerOffsetLeft |      `number`      |   0   | 可选，甘特图时间轴容器左偏移像素           | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|   ganttBarContainerElement    |     `Element`      | null  | 必选，甘特图时间条容器，用于显示甘特图标线 | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |

### d-gantt-bar 参数

|       参数        |        类型        |    默认    | 说明                                                              | 跳转 Demo                                                                  |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     startDate     |       `Date`       |    null    | 必选，开始时间                                                    | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|      endDate      |       `Date`       |    null    | 必选，结束时间                                                    | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|        id         |      `string`      |    null    | 可选，支持传入 id                                                 | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|       data        |      `object`      |    null    | 可选，支持传入任意数据                                            | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|   progressRate    |      `number`      |     0      | 可选，进度，例如 30 代表 30%进度                                  | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|  tipTemplateRef   | `TemplateRef<any>` |    null    | 可选，自定义提示内容模板                                          | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|  barMoveDisabled  |     `boolean`      |   false    | 可选，是否禁止 bar 拖动                                           | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
| barResizeDisabled |     `boolean`      |   false    | 可选，是否禁止 bar 调整起止时间                                   | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
| progressDisabled  |     `boolean`      |   false    | 可选，是否禁止 bar 调整进度                                       | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |

### d-gantt-bar 事件

|        事件         |             类型              |             说明             | 跳转 Demo                                                                  |
| :-----------------: | :---------------------------: | :--------------------------: | -------------------------------------------------------------------------- |
|  barMoveStartEvent  | `EventEmitter<GanttTaskInfo>` |   工作项时间条开始拖动事件   | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|   barMovingEvent    | `EventEmitter<GanttTaskInfo>` |    工作项时间条拖动中事件    | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|   barMoveEndEvent   | `EventEmitter<GanttTaskInfo>` |   工作项时间条拖动完成事件   | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
| barResizeStartEvent | `EventEmitter<GanttTaskInfo>` | 工作项时间条宽度开始调整事件 | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|  barResizingEvent   | `EventEmitter<GanttTaskInfo>` |  工作项时间条宽度调整中事件  | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|  barResizeEndEvent  | `EventEmitter<GanttTaskInfo>` | 工作项时间条宽度调整完成事件 | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|  barProgressEvent   |    `EventEmitter<number>`     |      工作项进度调整事件      | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |


### d-gantt-milestone 参数
|       参数        |        类型        |    默认    | 说明                                                              | 跳转 Demo                                                                  |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     startDate     |       `Date`       |    null    | 必选，开始时间                                                    | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|        id         |      `string`      |    null    | 可选，支持传入 id                                                 | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|       title       |      `string`      |    null    | 可选，支持传入 title，用于里程碑类型的标题                        | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |


### d-gantt-bar-parent 参数
|       参数        |        类型        |    默认    | 说明                                                              | 跳转 Demo                                                                  |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     startDate     |       `Date`       |    null    | 必选，开始时间                                                    | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|      endDate      |       `Date`       |    null    | 必选，结束时间                                                    | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|        id         |      `string`      |    null    | 可选，支持传入 id                                                 | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|       data        |      `object`      |    null    | 可选，支持传入任意数据                                            | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|   progressRate    |      `number`      |     0      | 可选，进度，例如 30 代表 30%进度                                  | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |

### GanttService 公共方法

|         方法         |               参数               | 返回值类型 |              说明              | 跳转 Demo                                                                  |
| :------------------: | :------------------------------: | :--------: | :----------------------------: | -------------------------------------------------------------------------- |
|    setScaleConfig    |        `GanttScaleConfig`        |    void    |           配置时间轴           | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
|   getDurationWidth   | `startDate: Date, endDate: Date` |   number   |  获取起止时间在时间轴上的宽度  | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |
| getDatePostionOffset |           `date: Date`           |   number   | 获取时间点在时间轴上的左偏移量 | [与datatable组件结合的甘特图](/components/gantt/demo#gantt-with-datatable) |

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
```
