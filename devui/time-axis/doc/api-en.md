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
| data | `TimeAxisData` | -- | Optional, configuration data. It is an object. | [Basic usage](demo#basic-usage) |
| contentTemplate | `TemplateRef` | -- | Optional, Content template. This parameter is left empty by default. This parameter is mandatory when model is set to `template`. | [Customize content using a template](demo#content-with-template) |

## data parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :-------: | :--------------------------: | :--: | :-------------- | -------------------------------------------------------- |
| direction | `'vertical'\|'horizontal'` |'' | Optional, direction | [Setting direction parameters](demo#direction)           |
| position | `'left'\|'bottom'` |'' | Optional, It is used to locate the time point. | [Basic usage](demo#basic-usage)           |
| model | `'text'\|'html'\|'template'` |'' | Optional, Model | [Content Use HTML](demo#content-with-html)           |
| list | `array` | [] | Optional, List data | [Basic usage](demo#basic-usage)           |

## list parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :----: | :-----------------------------------------: | :--: | :----------------------------------------------------------- | ----------------------------------------------- |
| time | `string` | -- | Optional, time | [Basic usage](demo#basic-usage)           |
| text | `string` | -- | Optional, Text content | [Basic usage](demo#basic-usage)           |
| type | `'primary'\|'success'\|'danger'\|'warning'` | -- | Optional, type | [Setting direction parameters](demo#direction)           |
| status | `'runned'\|'running'` | -- | Optional, The default value is empty. The value can be runned or running. | [Setting direction parameters](demo#direction)           |
| data | `array` | -- | Optional, Template data. This parameter is valid only when model is set to template. | [Customize content using a template](demo#content-with-template) |

## TimeAxisData

```
interface TimeAxisData {
  direction?:  'vertical' | 'horizontal';
  position?: 'bottom' | 'left';
  model: 'text' | 'html' | 'template';
  list: Array<{
    time?: string;
    text?: string;
    type?: 'primary' | 'success' | 'danger' | 'warning';
    status?: 'runned' | 'running' | '';
    iconClass?: string;
    data?: any;
  }>;
}
```
