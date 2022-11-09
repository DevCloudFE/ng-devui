# How To Use
Import in module：
```ts
import {GanttModule} from' ng-devui/gantt';
```


### d-gantt-scale parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :---------------------------: | :----------------: | :---: | :----------------------------------------- | -------------------------------------------------------------------------- |
| milestoneList | `GanttMilestone[]` | [] | Optional. Version milestone list | [Combined With Datatable](demo#gantt-with-datatable) |
| ganttScaleContainerOffsetLeft | `number` | 0 | Optional. Left offset pixel of the Gantt chart time axis container | [Combined With Datatable](demo#gantt-with-datatable) |
| ganttBarContainerElement | `Element` | null | Time bar container of the Gantt chart, which is mandatory. It is used to display the Gantt chart lines. | [Combined With Datatable](demo#gantt-with-datatable) |
| scrollElement | `Element` | -- | Optional, scrolling container. | [Combined With Datatable](demo#gantt-with-datatable) |
| unit | `'day'\|'week'\|'month'` | 'day' | Optional, default time dimension. |
| height | `number` | -- | Optional, hight. |
| startDate | `Date` | -- | Optional, start date. |
| endDate | `Date` | -- | Optional, end date. |

### d-gantt-scale event

| Event | Type | Description | Jump to Demo |
| :-----------------: | :---------------------------: | :--------------------------: | -------------------------------------------------------------------------- |
| addMilestoneEvent | `EventEmitter<GanttScaleDateInfo>` | Event triggered after a user clicks New. |

### d-gantt-bar parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| startDate | `Date` | null | Required. Start time | [Combined With Datatable](demo#gantt-with-datatable) |
| endDate | `Date` | null | Required. End time | [Combined With Datatable](demo#gantt-with-datatable) |
| id | `string` | null | Optional. id is supported | [Combined With Datatable](demo#gantt-with-datatable) |
| data | `object` | null | Optional. Any data can be transferred. | [Combined With Datatable](demo#gantt-with-datatable) |
| progressRate | `number` | 0 | Optional. Progress. For example, 30 indicates 30% progress. | [Combined With Datatable](demo#gantt-with-datatable) |
| tipTemplateRef | `TemplateRef<any>` | null | Optional. Customized prompt content template | [Combined With Datatable](demo#gantt-with-datatable) |
| barMoveDisabled | `boolean` | false | Optional. Whether bar dragging is forbidden | [Combined With Datatable](demo#gantt-with-datatable) |
| barResizeDisabled | `boolean` | false | Optional. Whether to forbid bar adjustment of the start time and end time. | [Combined With Datatable](demo#gantt-with-datatable) |
| progressDisabled | `boolean` | false | Optional. Whether to disable bar adjustment progress | [Combined With Datatable](demo#gantt-with-datatable) |
| originOffsetX   |     `number`      |   0    |Optional.Lateral offset distance from parent container.                                      | [[Combined With Datatable](demo#gantt-with-datatable) |
| showTitle   |     `boolean`      |   --    |Optional.Indicates whether to display title.                                      | [[Combined With Datatable](demo#gantt-with-datatable) |
| title  |     `string`      |   --    |Optional.title                                       | [[Combined With Datatable](demo#gantt-with-datatable) |
| customBarClass   |     `string`      |   --    |Optional.Customizing the Style of the Gantt Bar.                                      | -- |
| customBgClass   |     `string`      |   --    |Optional.Drag the background color when the Gantt bar is moved.  | -- |
| customTitleClass   |     `string`      |   --    | Optional. Customizing the title style.                                     | -- |
| scrollElement | `Element` | -- | Optional, scrolling container. | [Basic Usage](demo#gantt-basic) |
| status   |     `GanttRailStatus`      | --  | Optional. status`'normal' \| 'overdue' \| 'done'`                 | [Basic Usage](demo#gantt-basic) |
| titleTemplateRef   |     ``TemplateRef<any>``      | null  | Optional. Custom Title Content Template。         | [Basic Usage](demo#gantt-basic) |

### d-gantt-bar event

| Event | Type | Description | Jump to Demo |
| :-----------------: | :---------------------------: | :--------------------------: | -------------------------------------------------------------------------- |
| barMoveStartEvent | `EventEmitter<GanttTaskInfo>` | Work Item Time Bar Start Drag Event | [Combined With Datatable](demo#gantt-with-datatable) |
| barMovingEvent | `EventEmitter<GanttTaskInfo>` | Work Item Time Bar Dragging Event | [Combined With Datatable](demo#gantt-with-datatable) |
| barMoveEndEvent | `EventEmitter<GanttTaskInfo>` | Work Item Time Bar Drag Completion Event | [Combined With Datatable](demo#gantt-with-datatable) |
| barResizeStartEvent | `EventEmitter<GanttTaskInfo>` | Work Item Time Bar Width Adjustment Event | [Combined With Datatable](demo#gantt-with-datatable) |
| barResizingEvent | `EventEmitter<GanttTaskInfo>` | Work Item Time Bar Width Adjustment Event | [Combined With Datatable](demo#gantt-with-datatable) |
| barResizeEndEvent | `EventEmitter<GanttTaskInfo>` | Work Item Time Bar Width Adjustment Completion Event | [Combined With Datatable](demo#gantt-with-datatable) |
| barProgressEvent | `EventEmitter<number>` | Work Item Progress Adjustment Event | [Combined With Datatable](demo#gantt-with-datatable) |

### d-gantt-milestone parameter
| Parameter | Type | Default | Description | Jump to Demo |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| startDate | `Date` | null | Required. Start time | [Combined With Datatable](demo#gantt-with-datatable) |
| id | `string` | null | Optional. Id is supported | [Combined With Datatable](demo#gantt-with-datatable) |
| title | `string` | null | Optional. The title can be transferred, which is used as the title of the milestone type | [Combined With Datatable](demo#gantt-with-datatable) |


### d-gantt-bar-parent parameter
| Parameter | Type | Default | Description | Jump to Demo |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| startDate | `Date` | null | Required. Start time | [Combined With Datatable](demo#gantt-with-datatable) |
| endDate | `Date` | null | Required. End time | [Combined With Datatable](demo#gantt-with-datatable) |
| id | `string` | null | Optional. Id is supported | [Combined With Datatable](demo#gantt-with-datatable) |
| data | `object` | null | Optional. Any data can be transferred | [Combined With Datatable](demo#gantt-with-datatable) |
| progressRate | `number` | 0 | Optional. Progress. For example, 30 indicates 30% progress | [Combined With Datatable](demo#gantt-with-datatable) |
|   tip    |      `string`      |     0      | Optional. Prompt message                                  | [Combined With Datatable](demo#gantt-with-datatable) |

### d-gantt-tools parameter
| Parameter | Type | Default | Description | Jump to Demo |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     currentUnit     |       `[currentUnit](# currentUnit)`       |    null    | Optional.Current View Units.                                                   | [Combined With Datatable](demo#gantt-with-datatable) |
|      isFullScreen       |       `Boolean`       |    false    | Optional.Is Full Screen.                                                | [Combined With Datatable](demo#gantt-with-datatable) |

### d-gantt-tools parameter
| Parameter | Type | Default | Description | Jump to Demo |
| :---------------: | :----------------: | :--------: | :---------------------------------------------------------------- | -------------------------------------------------------------------------- |
|     goToday     |       `EventEmitter<any>`       |    null    | Optional.Jump To Today                                                   | [Combined With Datatable](demo#gantt-with-datatable) |
|      reduceUnit       |       `EventEmitter<any>`       |    null    | Optional.View Unit +1                                                    | [Combined With Datatable](demo#gantt-with-datatable) |
|      increaseUnit       |       `EventEmitter<any>`       |    null    | Optional.View Unit -1                                                  | [Combined With Datatable](demo#gantt-with-datatable) |
|      switchView       |       `EventEmitter<currentUnit>`       |    null    | Optional.Current View Units.

### GanttService Public Methods

| Method | Parameter | Return value type | Description | Jump to Demo |
| :------------------: | :------------------------------: | :--------: | :----------------------------: | -------------------------------------------------------------------------- |
| setScaleConfig | `GanttScaleConfig` | void | Configuring the Timeline | [Combined With Datatable](demo#gantt-with-datatable) |
| getDurationWidth | `startDate: Date, endDate: Date` | number | Obtains the width of the start time and end time on the time axis. | [Combined With Datatable](demo#gantt-with-datatable) |
| getDatePostionOffset | `date: Date` | number | Obtaining the Left Offset of a Time Point on the Timeline | [Combined With Datatable](demo#gantt-with-datatable) |

#### Gantt Chart Type Definition

```javascript
export interface GanttMilestone {
  date: Date;
  lable: string;
}

export interface GanttTaskInfo {
  id: string;
  startDate: Date;
  endDate: Date;
  title? : string;
  progress: string; // Current progress
  duration: string; // Duration
  moveOffset? : number; // Drag the distance.
}

export interface GanttScaleConfig {
  startDate? : Date;
  endDate? : Date;
  unit? : GanttScaleUnit;
}

export enum GanttScaleUnit {
  day = 'day',
  week = 'week',
  month ='month'
}

export enum UnitRole {
  day = 10,
  week = 20,
  month = 30,
}

export type GanttRailStatus = 'normal' | 'overdue' | 'done';
```
