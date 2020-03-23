import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private subject = new Subject<string>();
  toggleLang(lang = 'zhCN') {
    localStorage.setItem('lang', lang);
    this.subject.next(lang);
    window.location.reload();
  }

  getLangSuffix() {
    return localStorage.getItem('lang') === 'enUS' ? 'EN' : 'CN';
  }

  getMessage(): Observable<string> {
    return this.subject.asObservable();
  }
}
