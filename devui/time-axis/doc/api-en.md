# How to use

Import into the module:
```ts
import { TimeAxisModule } from 'ng-devui/time-axis';
```
In the page:
```
<d-time-axis [data]="data"></d-time-axis>
```

# d-time-axis

## d-time-axis parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :------------: | :------: | :--: | :-------------------------------------------------------- | -------------------------------------------------------- |
| data |  [`TimeAxisData`](#data)   |  --  | Optional. Configuring Timeline and Time Point Data.           | [Setting Direction Parameters](demo#direction)           |
|  contentTemplate  | `TemplateRef` |  --  | Optional. Content template. This parameter is left empty by default. This parameter is mandatory when model is set to `template`. | [Customizing Content Using a Template](demo#content-with-template) |
| mode |  `'normal'\|'alternative'`   |  `'normal'`  | Optional. In `normal` mode, content is arranged in the default direction. In `alternative` mode, content is arranged alternately.      | [Customizing the Content Direction of a Time Node](demo#content-with-alternative-mode)  |

## data

| Parameter | Type | Default | Description | Jump to Demo |
| :-------: | :--------------------------: | :--: | :-------------- | -------------------------------------------------------- |
| direction |  `'vertical'\|'horizontal'`  |  ''  | Optional. Sets the time axis direction.      | [Setting Direction Parameters](demo#direction)           |
| position  |     `'left'\|'bottom'`      |  ''  | Optional. Defines the time parameter position only when direction is `vertical`. | [Setting Time Position](demo#basic-usage)           |
| widthMode  |     `'fitContent'\|'fitWidth'`      |  `'fitContent'`  | Optional. Only when the direction is `horizontal`, `widthMode='fitContent'` The timeline width is adaptive to the content width, and `widthMode='fitWidth'` The timeline width fills the container. | [Time Point Customization](demo#custom-dot)           |
| horizontalAlign  |     `'center'\|'left'`      |  `'center'`  | Optional. Only when the direction is `horizontal`, Set Content Alignment. | [Customizing Content Using a Template](demo#content-with-template)           |
|   model   | `'text'\|'html'\|'template'` |  ''  | Optional. model.      | [Content Use HTML](demo#content-with-html)           |
|   list    |      [`array`](#list)        |  []  | Optional. List Data.  | [Setting Direction Parameters](demo#direction)           |

## list

| Parameter | Type | Default | Description | Jump to Demo |
| :----: | :-----------------------------------------: | :--: | :----------------------------------------------------------- | ----------------------------------------------- |
|  time  |                  `string`                   |  --  | Optional. Time.    | [Setting Direction Parameters](demo#direction)           |
|  text  |                  `string`                   |  --  | Optional. Text Content.           | [Setting Direction Parameters](demo#direction)           |
|  type  | `'primary' \| 'success' \| 'danger' \| 'warning'` |  `primary`  | Optional. Time Point Type.     | [Setting Time Position](demo#basic-usage)           |
| ~~status~~ |         `'runned'\|'running'\|''`      |  --  | Optional. Status.(`Deprecated. You are advised to use lineStyle.`) | [Setting Time Position](demo#basic-usage)           |
|  data  |                   `array`                   |  --  | Optional. Template data. This parameter is valid only when model is set to template.             | [Customizing Content Using a Template](demo#content-with-template) |
|  position  | `'up'\|'bottom'\|'left'\|'right'` |  --  | Optional. Indicates the position of text or data. If time exists, the time is in the reverse position.   | [Customizing the Content Direction of a Time Node](demo#content-with-alternative-mode) |
|  dotColor  | `string` |  --  | Optional. Custom Time Circle Color.   | [Customizing Content Using a Template](demo#content-with-template) |
|  lineStyle  | `{style: 'solid' \| 'dashed' \| 'dotted' \| 'none', color: string}` |  `{style: 'solid'}`  | Optional. Setting the Timeline Line Style.   | [Time Point Customization](demo#custom-dot) |
|  dotColor  | `string` |  --  | Optional. Custom Time Circle Color.   | [Customizing Content Using a Template](demo#content-with-template) |
|  customDot  | `string\|HTMLElement\|TemplateRef` |  --  | Optional. User-defined time point.   | [Time Point Customization](demo#custom-dot) |
|  extraElement  | `string\|HTMLElement\|TemplateRef` |  --  | Optional. Customizing Additional Elements Between Two Points in Time.   | [Customizing Content Using a Template](demo#content-with-template) |

## TimeAxisData

```
interface TimeAxisData {
  direction?:  'vertical' | 'horizontal' | '';
  position?: 'bottom' | 'left' | '';
  widthMode?: 'fitContent' | 'fitWidth';
  horizontalAlign?: 'center'|'left';
  model: 'text' | 'html' | 'template' | '';
  list: Array<{
    time?: string;
    text?: string;
    lineStyle?: object;
    dotColor?: string;
    customDot?: string | HTMLElement| TemplateRef<any>;
    type?: 'primary' | 'success' | 'danger' | 'warning';
    status?: 'runned' | 'running' | '';
    position?: 'top' | 'bottom' | 'left' | 'right';
    extraElement?: string | HTMLElement| TemplateRef<any>;
    iconClass?: string;
    data?: any;
  }>;
}
```
# The time node is used as an HTML tag.

## d-time-axis parameter
| Parameter | Type | Default value | Description | Jump to Demo |
| :----: | :-----------------------------------------: | :--: | :------------------------------------------------------- | ------------------------------------------------------ |
|  direction  | `'vertical'\|'horizontal'` |  --  | Required. Sets the time axis direction. | [The time node is used independently](demo#seperate-way) |
| mode |  `'normal'\|'alternative'`   |  `'normal'`  | Optional. In `normal` mode, content is arranged in the default direction. In `alternative` mode, content is arranged alternately.      | [The time node is used independently](demo#seperate-way)  |
| widthMode  |     `'fitContent'\|'fitWidth'`      |  `'fitContent'`  | Optional. Only when the direction is `horizontal`, `widthMode='fitContent'` The timeline width is adaptive to the content width, and `widthMode='fitWidth'` The timeline width fills the container. | [The time node is used independently](demo#seperate-way)           |

## d-time-axis-item parameters

| Parameter | Type | Default value | Description | Jump to Demo |
| :----: | :-----------------------------------------: | :--: | :------------------------------------------------------- | ------------------------------------------------------ |
|  direction  | `'vertical'\|'horizontal'` |  --  | Required. Set the direction of the timeline point. | [The time node is used independently](demo#seperate-way) |
|   model   | `'text'\|'html'\|'template'` |  ''  | Optional. model.      | [The time node is used independently](demo#seperate-way)           |
|  time  |                  `string`                   |  --  | Optional. Time.    | [The time node is used independently](demo#seperate-way)           |
|  text  |                  `string`                   |  --  | Optional. Text.                          | [The time node is used independently](demo#seperate-way)           |
|  type  | `'primary' \| 'success' \| 'danger' \| 'warning' \| 'waiting' \| 'info'` |  `'info'` |  `'info'`    | Optional. Time Point Type.     | [The time node is used independently](demo#seperate-way)          |
|  data  |                   `array`                   |  --  | Optional. This parameter is valid only when model is set to template.             | [The time node is used independently](demo#seperate-way) |
|  contentTemplate  | `TemplateRef` |  --  | Optional. Content template. This parameter is left empty by default. This parameter needs to be set when model is set to `template`. | [The time node is used independently](demo#seperate-way) |
|  lineStyle  | `{style: 'solid' \| 'dashed' \| 'none', color: string}`  | `{style: 'solid'}`  | Optional. Setting the Timeline Line Style.   | [The time node is used independently](demo#seperate-way) |
|  customDot  | `string\|HTMLElement\|TemplateRef` |  --  | Optional. User-defined time point.   | [The time node is used independently](demo#seperate-way) |
|  extraElement  | `string\|HTMLElement\|TemplateRef` |  --  | Optional. Customizing Additional Elements Between Two Points in Time.   | [The time node is used independently](demo#seperate-way) |
|  position  | `'up'\|'bottom'\|'left'\|'right'` |  --  | Optional. Indicates the position of text or data. If time exists, the time is in the reverse position.   | [The time node is used independently](demo#seperate-way) |
|  timePosition  | `'left'\|'bottom'` |  --  | Optional. Defines the time parameter position only when direction is `vertical`.  | [The time node is used independently](demo#seperate-way) |