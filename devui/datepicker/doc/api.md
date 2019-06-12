
| 参数        | 类型          | 默认        |  说明 |
| :---------: | :----------: | :---------: | :-------------|
| cssClass | string | - | 自定义class， 可选参数|
| local | string | zh-CN | 时区 |
| showTime | boolean | false | 是否显示时分秒 |
| yearNumber | number | 12 | 下拉年份显示数量 |
| disabled | boolean | false | 禁用选择 |
| direnction| 'up' \| 'down' | down | 日期弹出方向 |
| dateConverter | function | DefaultDateConverter | 日期格式化、解析函数 |
| customViewTemplate | tempalte | - |  自定义快捷设置日期或自定义操作区内容， 可以通过chooseDate(dateString: string)来设置日期	|


> DefaultDateConverter

```typescript
import { DateConverter } from './date-converter';
import { formatDate, parseDate } from './date-utils';

export class DefaultDateConverter implements DateConverter {

  parse(date: any, pattern?: string, locale?: string): Date {
    return parseDate(date);
  }

  format(date: Date, pattern?: string, locale?: string): string {
    return formatDate(date, pattern);
  }
}
```
