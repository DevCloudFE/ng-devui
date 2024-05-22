import { formatDate, getLocaleId } from '@angular/common';
import { I18nUtil } from './i18n.util';

export class I18nFormat {
  // 默认locale使用英文，因为angular默认只支持英文，其他的需要显示注册
  private static readonly DEFAULT_LOCALE = 'en-us';
  private static readonly FULL_FORMAT_ZH = 'y-MM-dd HH:mm:ss zzzz';
  private static readonly FULL_FORMAT_EN = 'MMM dd, y HH:mm:ss zzzz';
  private static readonly FULL_FORMAT_RU = 'dd.MM.y HH:mm:ss zzzz';
  private static readonly LONG_FORMAT_ZH = 'y-MM-dd HH:mm:ss';
  private static readonly LONG_FORMAT_EN = 'MMM dd, y HH:mm:ss';
  private static readonly LONG_FORMAT_RU = 'dd.MM.y HH:mm:ss';
  private static readonly MEDIUM_FORMAT_ZH = 'y-MM-dd HH:mm';
  private static readonly MEDIUM_FORMAT_EN = 'MMM dd, y HH:mm';
  private static readonly MEDIUM_FORMAT_RU = 'dd.MM.y HH:mm';
  private static readonly SHORT_FORMAT_ZH = 'y-MM-dd';
  private static readonly SHORT_FORMAT_EN = 'MMM dd, y';
  private static readonly SHORT_FORMAT_RU = 'dd.MM.y';
  private static readonly ULTRA_SHORT_FORMAT_ZH = 'y-MM';
  private static readonly ULTRA_SHORT_FORMAT_EN = 'MMM, y';
  private static readonly ULTRA_SHORT_FORMAT_RU = 'MM.y';

  static readonly localFormat = {
    'zh-cn': {
      full: I18nFormat.FULL_FORMAT_ZH,
      long: I18nFormat.LONG_FORMAT_ZH,
      medium: I18nFormat.MEDIUM_FORMAT_ZH,
      short: I18nFormat.SHORT_FORMAT_ZH,
      ultraShort: I18nFormat.ULTRA_SHORT_FORMAT_ZH,
    },
    'en-us': {
      full: I18nFormat.FULL_FORMAT_EN,
      long: I18nFormat.LONG_FORMAT_EN,
      medium: I18nFormat.MEDIUM_FORMAT_EN,
      short: I18nFormat.SHORT_FORMAT_EN,
      ultraShort: I18nFormat.ULTRA_SHORT_FORMAT_EN,
    },
    'ru-ru': {
      full: I18nFormat.FULL_FORMAT_RU,
      long: I18nFormat.LONG_FORMAT_RU,
      medium: I18nFormat.MEDIUM_FORMAT_RU,
      short: I18nFormat.SHORT_FORMAT_RU,
      ultraShort: I18nFormat.ULTRA_SHORT_FORMAT_RU,
    },
  };

  // 通过get方法来做业务没有指定locale的时候fallback
  static getLocaleAndLang(locale?: string) {
    const currentLanguage = I18nUtil.getCurrentLanguage();
    let localeId;
    try {
      // 通过get方法来判断是否存在locale
      getLocaleId(locale);
      localeId = (locale || I18nFormat.DEFAULT_LOCALE).toLocaleLowerCase();
    } catch (error) {
      localeId = I18nFormat.DEFAULT_LOCALE;
    }
    return { localeId, currentLanguage };
  }

  // 短格式：y-MM-dd
  static formatDate(value: string | number | Date, format?: string, locale?: string, timezone?: string) {
    const localeLang = I18nFormat.getLocaleAndLang(locale);
    const formatStr = format ? format : I18nFormat.localFormat[localeLang.currentLanguage].short;
    return formatDate(value, formatStr, localeLang.localeId, timezone);
  }

  // 完整格式：y-MM-dd hh:mm:ss zzzz
  static formatDateTime(value: string | number | Date, format?: string, locale?: string, timezone?: string) {
    const localeLang = I18nFormat.getLocaleAndLang(locale);
    const formatStr = format ? format : I18nFormat.localFormat[localeLang.currentLanguage].full;
    return formatDate(value, formatStr, localeLang.localeId, timezone);
  }

  // 完整格式不加GMT：y-MM-dd hh:mm:ss
  static formatDateTimeWithoutGMT(value: string | number | Date, format?: string, locale?: string, timezone?: string) {
    const localeLang = I18nFormat.getLocaleAndLang(locale);
    const formatStr = format ? format : I18nFormat.localFormat[localeLang.currentLanguage].long;
    return formatDate(value, formatStr, localeLang.localeId, timezone);
  }
}
