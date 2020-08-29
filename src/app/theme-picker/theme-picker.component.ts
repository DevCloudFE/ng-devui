import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, ThemeServiceFollowSystemOn, ThemeServiceFollowSystemOff, Theme } from 'ng-devui/theme';
import { Subscription } from 'rxjs';
import { greenLightTheme } from './theme-data-more';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  themes;
  theme: string;
  themeMode: 'light' | 'dark' = 'light';
  themePrefix: 'devui'|'green' | string = 'devui';
  themePrefersColorScheme: boolean;
  sub: Subscription;
  constructor() {}

  ngOnInit() {
    this.themeService = window['devuiThemeService'];
    this.themes = window['devuiThemes'];
    this.theme = window['devuiCurrentTheme'];
    this.themePrefix = this.theme.split('-')[0];
    this.themeMode = this.themes[this.theme].isDark ? 'dark' : 'light';
    this.themePrefersColorScheme = this.getThemePrefersColorSchemeOn();
    if (this.themePrefersColorScheme) {
      this.themePrefersColorSchemeChange(true);
    }
  }

  themePrefixChange(prefix: string) {
    this.themePrefix = prefix;
    if (this.themePrefersColorScheme) {
      this.themePrefersColorSchemeChange(true);
    } else {
      this.themesChange();
    }
  }

  themesChange() {
    this.theme = `${this.themePrefix}-${this.themeMode}-theme`;
    this.themeService.applyTheme(this.themes[this.theme]);
  }

  themePrefersColorSchemeChange(event: boolean) {
    if (event) {
      if (this.sub) {
        ThemeServiceFollowSystemOff(this.sub);
      }
      this.sub = ThemeServiceFollowSystemOn({
        lightThemeName: `${this.themePrefix}-light-theme`,
        darkThemeName: `${this.themePrefix}-dark-theme`
      });
      this.setThemePrefersColorScheme('on');
    } else {
      ThemeServiceFollowSystemOff(this.sub);
      this.setThemePrefersColorScheme('off');
      this.sub = undefined;
      this.themesChange();
    }
  }
  ngOnDestroy(): void {
    if (this.themePrefersColorScheme) {
      ThemeServiceFollowSystemOff(this.sub);
    }
  }

  getThemePrefersColorSchemeOn() {
    return localStorage.getItem('devuiThemePrefersColorScheme') === 'on';
  }

  setThemePrefersColorScheme(value: 'on' | 'off') {
    localStorage.setItem('devuiThemePrefersColorScheme', value);
  }
}

