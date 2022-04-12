# How to use
Import into module:
```ts
import { BadgeModule } from 'ng-devui/badge';
```

In the page:
```html
<d-badge [count]="6" status="success">
    <div>Unread messages</div>
</d-badge>
<d-badge [count]="66"></d-badge>
```
# Badge

## d-badge Parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :---------: | :------------: | :-----: | :--------------------------------------------------------------------------- | :--------------------------- |
| count | `number` | -- | Optional. Set the number of basic badges and count badges to be displayed. | [Basic Badge](demo#badge-basic) |
| maxCount | `number` | 99 | Optional. Sets the maximum number of basic and counting badges that can be displayed. When count is greater than maxCount, maxCount+ is displayed. | [Basic Badge](demo#badge-basic) |
| showDot | `boolean` | false | Optional. The value true indicates the dot badge (with package) or status badge (without package). The value false indicates the basic badge (with package) or count badge (without package). | [Dotted Badge](demo#badge-dot) |
| status |`BadgeStatusType` | -- | Optional. The status color is'danger'\| 'warning' \| 'waiting' \| 'success' \| 'info' \| 'common'. | [Basic Badge](demo#badge-basic) |
| position | `BadgePositionType` | 'top-right' | Optional. Logo position'top-left' \|'top-right' \|'bottom-left' \|'bottom-right'. | [Badge Position](demo#position) |
| offset | `[number, number]` | -- |Optional. Indicates the logo position offset when there is a package. The format is [x,y], in px. This parameter is optional. x is the relative right offset (right: -x `px`), y is the relative top offset (top: y `px`). | [Custom](demo#custom) |
| bgColor | `string` | -- | Optional. The badge color can be customized. In this case, the badge status color specified by status is invalid.| [Custom](demo#custom) |
| textColor | `string` | -- | Optional. You can customize the logo text color. | [Custom](demo#custom) |
