### d-quadrant-diagram 参数

|        参数         |            类型            |                  默认                  | 说明                                                                                                                                           |
| :-----------------: | :------------------------: | :------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------- |
|        view         |       `IViewConfigs`       |         {height:900,width:950}         | 可选，指定象限图所占宽高，由于需要计算坐标轴及象限区域，值必须为具体数字，若需要根据容器大小变更，建议使用 document 相关方法计算出实际值后传入 |
|     axisConfigs     |       `IAxisConfigs`       |     参考下方`DEFAULT_AXIS_CONFIGS`     | 可选，设置坐标轴相关属性，具体配置参数意义参考下方`IAxisConfigs`                                                                               |
|    showQuadrants    |         `boolean`          |                  true                  | 可选，是否显示四个象限区域                                                                                                                     |
|   quadrantConfigs   | `Array<IQuadrantConfigs>`  |   参考下方`DEFAULT_QUADRANT_CONFIGS`   | 可选，设置四个象限区域的相关属性，数组中数据的顺序分别代表第一象限、第二象限、第三象限、第四象限，具体配置参数意义参考下方`IQuadrantConfigs`   |
|      labelData      | `Array<ILabelDataConfigs>` |                   []                   | 可选，指定警告提示的样式                                                                                                                       |
|  currentLabelSize   |        `labelSize`         |                'large'                 | 可选，设置当前的标签尺寸，`'small'`表现为点，`'normal'`表现为含有标题的标签，`'large'`表现为含有标题和进度条的标签                             |
| smallLabelTemplate  |     `TemplateRef<any>`     |                   --                   | 可选，自定义`currentLabelSize='small'`时的标签样式                                                                                             |
| normalLabelTemplate |     `TemplateRef<any>`     |                   --                   | 可选，自定义`currentLabelSize='normal'`时的标签样式                                                                                            |
| largeLabelTemplate  |     `TemplateRef<any>`     |                   --                   | 可选，自定义`currentLabelSize='large'`时的标签样式                                                                                             |
|      diagramId      |          `string`          | 'devui-quadrant-diagram-'+当前组件顺序 | 可选，为象限图组件添加 id 属性，用于区分不同实例                                                                                               |
|      dropScope      |          `string`          |               'default'                | 可选， 限制 drop 的位置，必须匹配对应的 dragScope ，详情参考`DragDropAPI`                                                                      |

### d-quadrant-diagram 事件

|      参数       |        类型         | 说明                                                       |
| :-------------: | :-----------------: | :--------------------------------------------------------- |
|    dropEvent    | `EventEmitter<any>` | 可选，拖拽放置时的触发事件，返回值`{ dragData: e.dragData, xAxisValue: xAxisValue, yAxisValue: yAxisValue }` ,分别对应当前标签数据，标签放置的x值，标签放置的y值    |
|  zoomOutEvent   | `EventEmitter<any>` | 可选，点击缩小按钮的触发事件，返回值为当前的标签尺寸       |
|   zoomInEvent   | `EventEmitter<any>` | 可选，点击放大按钮的触发事件，返回值为当前的标签尺寸       |
| fullScreenEvent | `EventEmitter<any>` | 可选，点击全屏按钮的触发事件，返回值为当前的是否是全屏状态 |

### d-quadrant-diagram 相关类型定义及默认值如下

```typescript
export interface IAxisConfigs {
  tickWidth?: number; // 刻度的宽(高)度，默认为10
  spaceBetweenLabelsAxis?: number; // 刻度值和坐标轴之间的距离，默认为20
  xAxisLabel?: string; // X轴名称，默认值为'紧急度'
  yAxisLabel?: string; // Y轴名称，默认值为'重要度'
  axisMargin?: number; // 右侧留出的空白区域
  xWeight?: number; // X轴权重，默认值为1
  yWeight?: number; // Y轴权重，默认值为1
  xAxisRange?: IRangeConfigs; // X轴的坐标值范围和间距设置,默认值为{min:0,max:100,step:10}
  yAxisRange?: IRangeConfigs; // Y轴的坐标值范围和间距设置,默认值为{min:0,max:100,step:10}
  originPosition?: {
    left: number;
    bottom: number;
  }; // 原点的位置设置，默认值为{left:30,bottom:30}
}
export interface IQuadrantConfigs {
  backgroundColor?: any;
  color?: any;
  title?: string;
  top?: number;
  left?: number;
}
export interface ILabelDataConfigs {
  x: number; // X轴坐标值
  y: number; // Y轴坐标值
  title: string; // 标签的名称
  content?: string; // 鼠标悬浮在标签上时的提示内容
  progress?: number; // 标签对应事项的进度
  [propName: string]: any; // 其他数据
}

export interface IViewConfigs {
  height: number; // 象限图高度
  width: number; // 象限图宽度
}

export interface IRangeConfigs {
  min: number; // 坐标轴起始值
  max: number; // 坐标轴终止值
  step: number; // 坐标轴刻度值的间隔
}

export type labelSize = 'small' | 'normal' | 'large';

export const DEFAULT_AXIS_CONFIGS = {
  tickWidth: 10,
  spaceBetweenLabelsAxis: 20,
  xAxisLabel: '紧急度',
  yAxisLabel: '重要度',
  xAxisRange: {
    min: 0,
    max: 100,
    step: 10
  },
  yAxisRange: {
    min: 0,
    max: 50,
    step: 5
  },
  originPosition: {
    left: 30,
    bottom: 30
  },
  axisMargin: 50,
  xWeight: 1,
  yWeight: 1
};
export const DEFAULT_QUADRANT_CONFIGS = [
  { title: '重要紧急' },
  { title: '重要不紧急' },
  { title: '不重要不紧急' },
  { title: '不重要紧急' }
];
```

```xml
<ng-template #defaultSmalllLabel let-labelData="labelData" let-labelInstance=""></ng-template>
<ng-template #defaultNormalLabel let-labelData="labelData" let-labelInstance=""></ng-template>
<ng-template #defaultLargeLabel let-labelData="labelData" let-labelInstance=""></ng-template>
```

labelData: 传入的 labelData 数据

通过使用`[style.top.px]="labelInstance.getLabelTopValue(yAxisValue,offsetY)"`设置当前标签的 top 位置，其中 yAxisValue 为 y 轴坐标，offsetY 为偏移量，一般取标签高度的一半
通过使用`[style.left.px]="labelInstance.getLabelLeftValue(xAxisValue,offsetX)"`设置当前标签的 left 位置，其中 yAxisValue 为 x 轴坐标，offsetX 为偏移量，一般取标签宽度度的一半

### d-quadrant-diagram 设计原则

#### 坐标值的确定

标签的坐标轴是根据标签中心点的位置所得出
