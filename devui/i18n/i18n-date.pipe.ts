import { Pipe, PipeTransform } from '@angular/core';
import { I18nFormat } from './i18n.format';

@Pipe({name: 'i18nDate'})
export class I18nDatePipe implements PipeTransform {
  /**
   * 使用方式参考：{{dateObj | i18nDate:'full':false}} 参数可选
   * @param value 日期表达式，字符串、数字或者日期对象.
   * @param format 格式化表达式, 使用 'full','short'或者自定义格式化表达式.
   * @param withGMT 是否包含GMT信息，默认包含，只对完整日期有效
   * @returns 返回格式化后的字符串.
   */
  transform(value: string | number | Date, format = 'full', withGMT = true): any {
    if (format === 'full') {
      let formatValue = I18nFormat.formatDateTime(value);
      if (!withGMT) {
        formatValue = I18nFormat.formatDateTimeWithoutGMT(value);
      }
      return formatValue;
    } else if (format === 'short') {
      return I18nFormat.formatDate(value);
    } else {
      // 默认使用用户传入的format格式化
      return I18nFormat.formatDate(value, format);
    }
  }
}
