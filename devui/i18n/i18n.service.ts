import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { I18nInterface } from './i18n.model';
import zhCN from './zh-cn';
import enUS from './en-us';

@Injectable(
  {providedIn: 'root'}
)
export class I18nService {
  private i18nConfig = {
    'zh-cn': zhCN,
    'en-us': enUS
  };
  private subject = new Subject<string>(); // 废弃
  private i18nSubject = new Subject<I18nInterface>();
  toggleLang(lang = 'zh-cn') {
    localStorage.setItem('lang', lang);
    this.i18nSubject.next(this.getI18nText());
  }

  getLangSuffix() { // 废弃
    return localStorage.getItem('lang') === 'en-US' ? 'EN' : 'CN';
  }

  getMessage(): Observable<string> { // 废弃
    return this.subject.asObservable();
  }

  getI18nText(): I18nInterface {
    const lang = localStorage.getItem('lang') ? localStorage.getItem('lang').toLocaleLowerCase() : 'zh-cn';
    if (this.i18nConfig.hasOwnProperty(lang)) {
      return this.i18nConfig[lang];
    } else {
      return zhCN;
    }
  }

  langChange(): Observable<I18nInterface> {
    return this.i18nSubject.asObservable();
  }
}
