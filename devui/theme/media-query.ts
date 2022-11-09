import { ReplaySubject } from 'rxjs';

export class PrefersColorSchemeMediaQuery {
  private prefersColorSchemeSubject = new ReplaySubject<PrefersColorSchemeMediaQuery.Value>(1);
  public prefersColorSchemeChange = this.prefersColorSchemeSubject.asObservable();

  register() {
    matchMedia(PrefersColorSchemeMediaQuery.Query.light).addEventListener('change', this.changeToLight);
    matchMedia(PrefersColorSchemeMediaQuery.Query.dark).addEventListener('change', this.changeToDark);
    this.prefersColorSchemeSubject.next(this.getInitValue());
  }

  unregister() {
    matchMedia(PrefersColorSchemeMediaQuery.Query.light).removeEventListener('change', this.changeToLight);
    matchMedia(PrefersColorSchemeMediaQuery.Query.dark).removeEventListener('change', this.changeToDark);
    this.prefersColorSchemeSubject.complete();
  }

  handleColorSchemeChange = (value: PrefersColorSchemeMediaQuery.Value) => {
    this.prefersColorSchemeSubject.next(value);
  };

  getInitValue(): PrefersColorSchemeMediaQuery.Value {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return (
      (window.matchMedia(PrefersColorSchemeMediaQuery.Query.light).matches && 'light') ||
      (window.matchMedia(PrefersColorSchemeMediaQuery.Query.dark).matches && 'dark') ||
      'no-preference'
    );
  }

  changeToLight(mql) {
    if (mql.matches) {
      this.handleColorSchemeChange('light');
    }
  }

  changeToDark(mql) {
    if (mql.matches) {
      this.handleColorSchemeChange('dark');
    }
  }
}

/* eslint-disable-next-line @typescript-eslint/no-namespace */
export namespace PrefersColorSchemeMediaQuery {
  export type Value = 'light' | 'dark' | 'no-preference';
  export enum Query {
    'light' = 'screen and (prefers-color-scheme: light)',
    'dark' = 'screen and (prefers-color-scheme: dark)',
    'noPreferences' = 'screen and (prefers-color-scheme: light)',
  }
}
