import * as enquire from 'enquire.js';
import { ReplaySubject } from 'rxjs';


export class PrefersColorSchemeMediaQuery {
  private prefersColorSchemeSubject = new ReplaySubject<PrefersColorSchemeMediaQuery.Value>(1);
  public prefersColorSchemeChange = this.prefersColorSchemeSubject.asObservable();

  register() {
    enquire
    .register(PrefersColorSchemeMediaQuery.Query.light, {
      match: () => {
        this.handleColorSchemeChange('light');
      }
    })
    .register(PrefersColorSchemeMediaQuery.Query.dark, {
      match: () => {
        this.handleColorSchemeChange('dark');
      }
    });
    this.prefersColorSchemeSubject.next(this.getInitValue());
  }

  unregister() {
    enquire
    .unregister(PrefersColorSchemeMediaQuery.Query.light)
    .unregister(PrefersColorSchemeMediaQuery.Query.dark);
    this.prefersColorSchemeSubject.complete();
  }

  handleColorSchemeChange = (value: PrefersColorSchemeMediaQuery.Value) => {
    this.prefersColorSchemeSubject.next(value);
  }

  getInitValue(): PrefersColorSchemeMediaQuery.Value {
    return window.matchMedia(PrefersColorSchemeMediaQuery.Query.light).matches && 'light'
     || window.matchMedia(PrefersColorSchemeMediaQuery.Query.dark).matches && 'dark'
     || 'no-preference';
  }
}

export namespace PrefersColorSchemeMediaQuery {
  export type Value = 'light' | 'dark' | 'no-preference';
  export enum Query {
    'light' = 'screen and (prefers-color-scheme: light)',
    'dark' = 'screen and (prefers-color-scheme: dark)',
    'noPreferences' = 'screen and (prefers-color-scheme: light)',
  }
}
