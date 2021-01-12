### d-badge parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :---------: | :------------: | :-----: | :--------------------------------------------------------------------------- | :--------------------------- |
| count | `number` | -- | Optional. Set the number of basic badges and count badges to be displayed. | [Basic Badge](demo#badge-basic) |
| maxCount | `number` | 99 | Optional. Sets the maximum number of basic and counting badges that can be displayed. When count is greater than maxCount, maxCount+ is displayed. | [Basic Badge](demo#badge-basic) |
| showDot | `boolean` | false | Optional. The value true indicates the dot badge (with package) or status badge (without package). The value false indicates the basic badge (with package) or count badge (without package). | [Dotted Badge](demo#badge-dot) |
| status |`BadgeStatusType` | -- | Optional. The status color is'danger'\| 'warning' \| 'waiting' \| 'success' \| 'info'. | [Basic Badge](demo#badge-basic) |
| badgePos | `BadgeStatusType` | 'top-right' | Optional. Logo position'top-left' \|'top-right' \|'bottpm-left' \|'bottom-right'. | [Basic Badge](demo#badge-basic) |
| offsetXY | `[number, number]` | -- |Optional. Indicates the logo position offset when there is a package. The format is [x,y], in px. This parameter is optional. x is the relative right offset (right: -x px), y is the relative top offset (top: y px). | [Status Badge](demo#badge-status) |
| bgColor | `string` | -- | Optional. The logo color can be customized. | [Basic Badge](demo#badge-basic) |
| textColor | `string` | -- | Optional. You can customize the logo text color. | [Count Badge](demo#badge-count) |
