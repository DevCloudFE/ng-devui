import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import enUS from './en-us';
import { I18nInterface } from './i18n.model';
import zhCN from './zh-cn';

export const ZH_CN = 'zh-cn';
export const EN_US = 'en-us';
export const DEVUI_LANG = new InjectionToken<string>(ZH_CN);

@Injectable(
  {providedIn: 'root'}
)
export class I18nService {
  i18nConfig = {
    'zh-cn': zhCN,
    'en-us': enUS
  };
  LANG_KEY = 'lang';
  DEFAULT_LANG: string;

  private currentLang: string;
  private subject = new Subject<string>(); // 废弃
  private i18nSubject = new ReplaySubject<I18nInterface>(1);

  constructor(@Optional() @Inject(DEVUI_LANG) private appLang) {
    if (this.i18nConfig.hasOwnProperty(this.appLang)) {
      this.DEFAULT_LANG = this.appLang;
      this.currentLang = this.appLang;
    } else {
      this.DEFAULT_LANG = 'zh-cn';
      this.currentLang = 'zh-cn';
    }
    this.i18nSubject.next(this.getI18nText());
  }

  toggleLang(lang = this.DEFAULT_LANG) {
    localStorage.setItem('lang', lang);
    if (this.i18nConfig.hasOwnProperty(lang)) {
      this.currentLang = lang;
      this.i18nSubject.next(this.getI18nText());
    }
  }

  /** @deprecated */
  getLangSuffix() {
    return localStorage.getItem('lang') === 'en-US' ? 'EN' : 'CN';
  }
  /**
   * @deprecated use langChange to replace;
   */
  getMessage(): Observable<string> {
    return this.subject.asObservable();
  }

  getI18nText(): I18nInterface {
    const lang = localStorage.getItem(this.LANG_KEY) ? localStorage.getItem('lang') : this.DEFAULT_LANG;
    if (this.i18nConfig.hasOwnProperty(lang)) {
      this.currentLang = lang;
    }
    return this.i18nConfig[this.currentLang];
  }

  langChange(): Observable<I18nInterface> {
    return this.i18nSubject.asObservable();
  }
}
