## d-transfer parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :---------------: | :-----: | :---: | :------------------------- | ------------------------------------------------------------ |
| sourceOption | array | [] | Optional. This parameter indicates the source data of the shuttle box. | [Basic Usage](demo#transfer-demo-base) |
| targetOption | array | [] | Optional. This parameter indicates the target data of the shuttle box. | [Basic Usage](demo#transfer-demo-base) |
| titles | array | [] | Optional. Title of the shuttle box. | [Basic Usage](demo#transfer-demo-base) |
| height | string | 320px | Optional. It indicates the height of the shuttle box. |
| isSearch | number | false | Optional. Specifies whether to search. | [Search Shuttle Box](demo#transfer-demo-search) |
| isSourceDroppable | boolean | false | Optional. Indicates whether the source can be dragged. |
| isTargetDroppable | boolean | false | Optional. Indicates whether the object can be dragged. | [Sorting Shuttle Box](demo#transfer-demo-sort) |
| disabled | boolean | false | Optional. The shuttle box cannot be used. | [Basic Usage](demo#transfer-demo-base) |
| beforeTransfer | (sourceOption, targetOption) => boolean \| Promise<boolean> \| Observable<boolean>; | - | Optional. Determines whether the transfer event can be triggered before the transfer event occurs. | [Basic Usage](demo#transfer-demo-base) |

## d-transfer event

| Event | Type | Description | Jump to Demo |
| :--------------: | :--------------------: | :--------------------------------: | -------------------------------------------------------- |
| transferToSource | Return the source and target data in the shuttle box. | When you click the right button, the source and target data are returned. | [Basic Usage](demo#transfer-demo-base) |
| transferToTarget | Return the source and target data in the shuttle box. | When you click the left button, the source and target data are returned. | [Basic Usage](demo#transfer-demo-base) |
