import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class I18nService {
  private subject = new Subject<string>();
  toggleLang(lang = 'zh-CN') {
    localStorage.setItem('lang', lang);
    this.subject.next(lang);
    window.location.reload();
  }

  getLangSuffix() {
    return localStorage.getItem('lang') === 'en-US' ? 'EN' : 'CN';
  }

  getMessage(): Observable<string> {
    return this.subject.asObservable();
  }
}
