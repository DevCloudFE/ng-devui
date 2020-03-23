import { formatDate, getLocaleId } from '@angular/common';
import { I18nUtil } from './i18n.util';

export class I18nFormat {
  // 默认locale使用英文，因为angular默认只支持英文，其他的需要显示注册
  private static readonly DEFAULT_LOCALE = 'en-us';
  private static readonly DATETIME_FORMAT_EN = 'MMM dd, y HH:mm:ss zzzz';
  private static readonly DATETIME_FORMAT_ZH = 'y/MM/dd HH:mm:ss zzzz';
  private static readonly DATETIME_FORMAT_RU = 'dd.MM.y HH:mm:ss zzzz';
  private static readonly DATE_FORMAT_EN = 'MMM dd, y';
  private static readonly DATE_FORMAT_ZH = 'y/MM/dd';
  private static readonly DATE_FORMAT_RU = 'dd.MM.y';


  private static readonly localFormat = {
    'zh-cn': {full: I18nFormat.DATETIME_FORMAT_ZH, short: I18nFormat.DATE_FORMAT_ZH},
    'en-us': {full: I18nFormat.DATETIME_FORMAT_EN, short: I18nFormat.DATE_FORMAT_EN},
    'ru-ru': {full: I18nFormat.DATETIME_FORMAT_RU, short: I18nFormat.DATE_FORMAT_RU}
  };

  // 通过get方法来做业务没有指定locale的时候fallback
  private static getLocaleAndLang(locale) {
    const currentLanguage = I18nUtil.getCurrentLanguage();
    let localeId;
    try {
      // 通过get方法来判断是否存在locale
      getLocaleId(locale);
      localeId = (locale || I18nFormat.DEFAULT_LOCALE).toLocaleLowerCase();
    } catch (error) {
      localeId = I18nFormat.DEFAULT_LOCALE;
    }
    return {localeId, currentLanguage};
  }

  // 短格式：y/MM/dd
  public static formatDate(value: string | number | Date, format?: string, locale?: string, timezone?: string) {
    const localeLang = I18nFormat.getLocaleAndLang(locale);
    const formatStr = format ? format : I18nFormat.localFormat[localeLang.currentLanguage].short;
    return formatDate(value, formatStr, localeLang.localeId, timezone);
  }

  // 完整格式：y/MM/dd hh:mm:ss zzzz
  public static formatDateTime(value: string | number | Date, format?: string, locale?: string, timezone?: string) {
    const localeLang = I18nFormat.getLocaleAndLang(locale);
    const formatStr = format ? format : I18nFormat.localFormat[localeLang.currentLanguage].full;
    return formatDate(value, formatStr, localeLang.localeId, timezone);
  }

  // 完整格式不加GMT：y/MM/dd hh:mm:ss
  public static formatDateTimeWithoutGMT(value: string | number | Date, format?: string, locale?: string, timezone?: string) {
    const localeLang = I18nFormat.getLocaleAndLang(locale);
    // 非用户传入的format，就替换掉完整的格式化字符中中GMT信息
    const formatStr = format ? format : (I18nFormat.localFormat[localeLang.currentLanguage].full).replace(' zzzz', '');
    return formatDate(value, formatStr, localeLang.localeId, timezone);
  }

}
