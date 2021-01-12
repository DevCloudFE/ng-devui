## Import

The current component is an experimental component and needs to be introduced as required. The path is as follows:

```
import {QuadrantDiagramModule} from' ng-devui/experimental/quadrant-diagram';
```

### d-quadrant-diagram parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :-----------------: | :------------------------: | :------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| view | `IViewConfigs` | {height:900,width:950} | Optional. Specifies the width and height of the quadrant map. The value must be a specific number because the coordinate axis and quadrant area need to be calculated. If you need to change the value based on the container size, you are advised to use the document method to calculate the actual value and then transfer the value. | [Customize](demo#custom-quadrant) |
| axisConfigs | `IAxisConfigs` | Set the attributes of the coordinate axis by referring to `DEFAULT_AXIS_CONFIGS` | For details about the configuration parameters, see `IAxisConfigs` | [Customize](demo#custom-quadrant) |
| showQuadrants | `boolean` | true | Optional. Indicates whether to display four quadrants. |
| quadrantConfigs | `Array<IQuadrantConfigs>` | Set the attributes of the four quadrants by referring to `DEFAULT_QUADRANT_CONFIGS` | Optional. The sequence of data in the array indicates the first quadrant, second quadrant, third quadrant, and fourth quadrant respectively. For details about the parameter meaning, see `IQuadrantConfigs` | [Customize](demo#custom-quadrant) |.
| labelData | `Array<ILabelDataConfigs>` | [] | Optional. Specifies the style of the warning prompt. | [Basic Usage](demo#basic-usage) |
| currentLabelSize | `labelSize` | 'large' | Optional. Sets the current label size. The value `small'` is represented as a dot, and the value `normal'` is represented as a label with a title, `large'` is a label with a title and progress bar. |
| smallLabelTemplate | `TemplateRef<any>` | -- |: Optional. Customize the label style when `currentLabelSize='small '`. |
| normalLabelTemplate | `TemplateRef<any>` | -- |: Optional. Customize the label style when `currentLabelSize='normal '`. |
| largeLabelTemplate | `TemplateRef<any>` | -- |: Optional. Customize the label style when `currentLabelSize='large'`. |
| diagramId | `string` | 'devui-quadrant-diagram-'+current component sequence | Optional. Add the ID attribute to the quadrant component to distinguish different instances. | [Basic Usage](demo#basic-usage) |
| dropScope | `string` | 'default' | Optional. This parameter specifies the drop position. The value must match the corresponding dragScope. For details, see `DragDropAPI` | [Customize](demo#custom-quadrant) |.

### d-quadrant-diagram event

| Parameter | Type | Description | Jump to Demo |
| :-------------: | :-----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dropEvent | `EventEmitter<any>` | Optional. Triggered event when a tag is dragged. The return value is `{dragData: e.dragData, xAxisValue: xAxisValue, yAxisValue: yAxisValue}`, which corresponds to the current tag data, x value of the tag, and y value of the tag. | [Basic Usage](demo#basic-usage) |
| zoomOutEvent | `EventEmitter<any>` | Optional. Triggering event when the zoom-in button is clicked. The return value is the current label size. |
| zoomInEvent | `EventEmitter<any>` | OptionaL. Triggering event when the zoom-in button is clicked. The return value is the current label size. |
| fullScreenEvent | `EventEmitter<any>` | Optional. Triggering event when the full-screen button is clicked. The return value is whether the current status is full-screen. |

### d-quadrant-diagram:

```typescript
export interface IAxisConfigs {
tickWidth? : number; // Scale width (height). The default value is 10.
spaceBetweenLabelsAxis?: number; // Distance between the scale value and the coordinate axis. The default value is 20.
xAxisLabel? : string; // X axis name. The default value is Critical.
yAxisLabel? : string; // Y axis name. The default value is Importance.
axisMargin? : number; // Blank area on the right
xWeight? : number; // Weight of the X axis. The default value is 1.
yWeight? : number; // Y-axis weight. The default value is 1.
Set the coordinate value range and spacing of the xAxisRange?: IRangeConfigs; // X axis. The default value is {min:0,max:100,step:10}.
Set the coordinate value range and spacing of the yAxisRange?: IRangeConfigs; // Y axis. The default value is {min:0,max:100,step:10}.
originPosition? : {
left: number;
bottom: number;
}; // Origin position. The default value is {left:30,bottom:30}.
}
export interface IQuadrantConfigs {
backgroundColor? : any;
color? : any;
title? : string;
top? : number;
left? : number;
}
export interface ILabelDataConfigs {
x: number; // X-axis value
y: number; // Y-axis value
title: string; // Tag name
content? : string; // Message displayed when the cursor is hovered on the label.
progress? : number; // Progress of the item corresponding to the label
[propName: string]: any; // Other data
}

export interface IViewConfigs {
height: number; // Quadrant image height
width: number; // Quadrant image width
}

export interface IRangeConfigs {
min: number; // Start value of the coordinate axis.
max: number; // End value of the coordinate axis.
step: number; // Interval between scale values on the coordinate axis.
}

export type labelSize = 'small' | 'normal' | 'large';

export const DEFAULT_AXIS_CONFIGS = {
tickWidth: 10,
spaceBetweenLabelsAxis: 20,
xAxisLabel: 'Urgent',
yAxisLabel: 'Importance',
xAxisRange: {
min: 0,
max: 100,
step: 10,
},
yAxisRange: {
min: 0,
max: 50,
step: 5,
},
originPosition: {
left: 30,
bottom: 30,
},
axisMargin: 50,
xWeight: 1,
yWeight: 1,
};
export const DEFAULT_QUADRANT_CONFIGS = [
{title:'Major and Critical'},
{title:'Major but not critical'},
{title:'Not critical'},
{title:'Not critical'},
];
```

```xml
<ng-template #defaultSmalllLabel let-labelData="labelData" let-labelInstance=""></ng-template>
<ng-template #defaultNormalLabel let-labelData="labelData" let-labelInstance=""></ng-template>
<ng-template #defaultLargeLabel let-labelData="labelData" let-labelInstance=""></ng-template>
```

labelData: input labelData data.

Use `[style.top.px]="labelInstance.getLabelTopValue(yAxisValue, offsetY)"` to set the top position of the current label. yAxisValue indicates the y axis, and offsetY indicates the offset. Generally, the value is half of the label height.
Use `[style.left.px]="labelInstance.getLabelLeftValue(xAxisValue, offsetX)"` to set the left position of the current label. yAxisValue indicates the x coordinate, and offsetX indicates the offset. Generally, the value is half of the width of the label.

### D-quadrant-diagram Design Principles

#### Determining Coordinates

The axis of the label is determined by the position of the label's center point.
