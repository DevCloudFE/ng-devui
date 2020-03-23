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
  private i18nSubject = new Subject<I18nInterface>();
  toggleLang(lang = 'zh-cn') {
    localStorage.setItem('lang', lang);
    this.i18nSubject.next(this.getI18nText());
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
