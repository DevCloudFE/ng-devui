## d-time-axis parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :------------: | :------: | :--: | :-------------------------------------------------------- | -------------------------------------------------------- |
| data | `Object` | -- | Optional, configuration data. It is an object. | [Basic usage](demo#basic-usage) |
| contentTemplate | `TemplateRef` | -- | Optional, Content template. This parameter is left empty by default. This parameter is mandatory when model is set to `template`. | [Customize content using a template](demo#content-with-template) |

## data parameter

| Parameter | Type | Default | Description |
| :-------: | :--------------------------: | :--: | :-------------- |
| direction | `'vertical'\|'horizontal'` |'' | Optional, direction |
| position | `'left'\|'bottom'` |'' | Optional, It is used to locate the time point. |
| model | `'text'\|'html'\|'template'` |'' | Optional, Model |
| list | `array` | [] | Optional, List data |

## list parameter

| Parameter | Type | Default | Description |
| :----: | :-----------------------------------------: | :--: | :----------------------------------------------------------- |
| time | `string` | -- | Optional, time |
| text | `string` | -- | Optional, Text content |
| type | `'primary'\|'success'\|'danger'\|'warning'` | -- | Optional, type |
| status | `'runned'\|'running'` | -- | Optional, The default value is empty. The value can be runned or running. |
| data | `array` | -- | Optional, Template data. This parameter is valid only when model is set to template. |
