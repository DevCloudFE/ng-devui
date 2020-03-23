
export class I18nUtil {
  private static readonly supportLanguages = ['zh-cn', 'en-us', 'ru-ru'];

  public static getCurrentLanguage() {
    let lang = localStorage.getItem('lang');
    if (I18nUtil.supportLanguages.indexOf(lang) < 0) {
      lang = I18nUtil.supportLanguages[0];
    }
    return lang;
  }

  public static getSupportLanguages() {
    return I18nUtil.supportLanguages;
  }
}
