# How to use

Import into the module:

```ts
import { RelativeTimeModule } from 'ng-devui/relative-time';
```
on the page：
```
<div>{{ value | dRelativeTime: limit }}</div>
```
## Conversion Rule

```javascript
Compared with the current time:
If the difference between different years is greater than 3 months, convert the value to year. Otherwise, convert the value to month.
If the difference between months is more than four weeks, the value is converted to a month. Otherwise, the value is converted to a week.
If the difference is greater than 6 days and the week is different from the same week, convert it to a week. Otherwise, convert it to a day.
If the time difference between the two days is greater than 6 hours, convert the time difference to day. Otherwise, convert the time difference to hour.
If the time difference is greater than 59 minutes, the value is converted to hour. Otherwise, the value is converted to minute.
If the time difference is greater than 59 seconds and the time difference is greater than 59 seconds, the value is changed to minute. Otherwise, the value is changed to just or later.
The limit parameter is accepted. When the time difference exceeds the limit, no conversion is performed.
```

## pipe parameters
| Parameter | Type | Default | Description |Global Config| 
| :----------------: | :------------------: | :----------------: | :-----: | :------------------------------------------------------------- |
| value | `'string' \| 'number' \| 'Date'` | - | Value converted by pipe |
| limit | number | - | The first parameter of pipe indicates the timestamp of the maximum limit. If the timestamp is exceeded, the absolute time is returned. |
| compareDate | `'string' \| 'number' \| 'Date'` | - | pipe second parameter, which is optional. The value is the time when the comparison is performed. The default value is the current time. |
| weekStartsOn | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 0` | 1 | pipe third parameter, which is optional. It indicates the index of the start date of a week. The value 0 indicates Sunday. |
