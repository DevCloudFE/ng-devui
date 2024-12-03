import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Theme, ThemeService, ThemeServiceFollowSystemOff, ThemeServiceFollowSystemOn } from 'ng-devui/theme';
import { Subscription } from 'rxjs';
import { DevuiCommonsService } from '../../../src/devui-commons.service';
import { I18nUtil } from '../../i18n/i18n.util';
import { LargeFontSize } from './theme-data-more';
import { themePicker } from './theme-picker-i18n.type';
import { themePickerImg } from './theme-picker-img';

@Component({
  selector: 'theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent implements OnInit, OnDestroy {
  themeService!: ThemeService;
  themes: Theme[] = [];
  theme: string = 'devui-light-theme';
  largeFontTheme: Theme;
  fontSize: 'normal' | 'large' = 'normal';
  themeMode: 'light' | 'dark' = 'light';
  themePrefix: 'devui' | 'green' | string = 'devui';
  themePrefersColorScheme: boolean;
  sub: Subscription;
  largeFontSizeMode = false;
  activeThemeType: string | number = 'devuiTheme';
  advancedThemeList = [{ value: 'infinity', url: themePickerImg.infinity },
    { value: 'sweet', url: themePickerImg.sweet },
    { value: 'provence', url: themePickerImg.provence },
    { value: 'deep', url: themePickerImg.deep },
    { value: 'galaxy', url: themePickerImg.galaxy }];
  currentAdvancedTheme = 'infinity';
  subs: Subscription = new Subscription();
  themePicker: any = {};
  constructor(
    private cdr: ChangeDetectorRef,
    private commonsService: DevuiCommonsService
  ) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.themeService = (window as any).devuiThemeService;
      this.themes = (window as any).devuiThemes;
      this.theme = (window as any).devuiCurrentTheme;
    }
    const themeName = localStorage.getItem('user-custom-theme')?.split('-')[0];
    this.currentAdvancedTheme = this.advancedThemeList.find(theme => theme.value === themeName) ? themeName : 'infinity';
    this.advancedThemeChange(this.currentAdvancedTheme);
    this.themePrefix = this.getThemePrefix();
    this.themeMode = this.themes[this.theme]?.isDark ? 'dark' : 'light';
    this.largeFontSizeMode = this.theme === 'devui-large-font-theme';
    this.largeFontTheme = this.themes['devui-large-font-theme'];
    this.themePrefersColorScheme = this.getThemePrefersColorSchemeOn();
    this.initTheme();
    this.cdr.detectChanges();
    if (this.themePrefersColorScheme) {
      this.themePrefersColorSchemeChange(true);
    }
    this.setI18n();
    this.subs = this.commonsService.on('languageEvent').subscribe((term) => this.setI18n(term));
  }

  setI18n(lang?) {
    const curLanguage = lang || I18nUtil.getCurrentLanguage() || 'zh-cn';
    this.themePicker = themePicker[curLanguage];    
  }

  getThemePrefix() {
    return (this.theme.split('-')[0] !== 'devui' && this.theme.split('-')[0] !== 'green') ? 'devui' : this.theme.split('-')[0];
  }
  initTheme() {
    if (!this.checkInitThemeType()) {
      this.activeThemeType = 'devuiTheme';
      this.themesChange();
    } else {
      this.activeThemeType = 'advancedTheme';
      const themeName = localStorage.getItem('user-custom-theme')?.split('-')[0];
      this.currentAdvancedTheme = this.advancedThemeList.find(theme => theme.value === themeName) ? themeName : 'infinity';
      this.advancedThemeChange(this.currentAdvancedTheme);
    }
  }
  isCustomizeTheme() {
    return localStorage.getItem('user-custom-theme')?.startsWith('customize-theme');
  }

  checkInitThemeType() {
    const advancedThemePrefixList = ['infinity', 'sweet', 'provence', 'deep', 'galaxy'];
    return advancedThemePrefixList.some(item => localStorage.getItem('user-custom-theme').startsWith(item));
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
    if (this.largeFontSizeMode) {
      this.largeFontTheme.data = { ...this.themes[`${this.themePrefix}-${this.themeMode}-theme`].data, ...LargeFontSize};
      this.theme = `devui-large-font-theme`;
    } else {
      this.theme = `${this.themePrefix}-${this.themeMode}-theme`;
    }
    this.themeService.applyTheme(this.themes[this.theme]);
  }

  advancedThemeChange(theme) {
    this.currentAdvancedTheme = theme;
    const validTheme = theme + '-theme';
    this.themeService.applyTheme(this.themes[validTheme]);
  }

  themeFontSizeChange() {
    if (typeof window !== 'undefined' && this.largeFontSizeMode) {
      this.largeFontTheme.data = { ...this.themes[(window as any).devuiCurrentTheme].data, ...LargeFontSize};
      this.theme = `devui-large-font-theme`;
    } else {
      this.theme = `${this.themePrefix}-${this.themeMode}-theme`;
    }
    this.themeService.applyTheme(this.themes[this.theme]);
  }

  themeFontSizeSchemeChange(event: boolean) {
    if (event) {
      if (this.sub) {
        ThemeServiceFollowSystemOff(this.sub);
      }
      this.sub = ThemeServiceFollowSystemOn({
        lightThemeName: `${this.themePrefix}-light-large-theme`,
        darkThemeName: `${this.themePrefix}-dark-large-theme`
      });
      this.setThemeFontSizeScheme('on');
    } else {
      ThemeServiceFollowSystemOff(this.sub);
      this.setThemeFontSizeScheme('off');
      this.sub = undefined;
      this.themesChange();
    }
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
    this.subs.unsubscribe();
  }

  getThemeFontSizeSchemeOn() {
    return localStorage.getItem('devuiThemeFontSizeScheme') === 'on';
  }

  setThemeFontSizeScheme(value: 'on' | 'off') {
    localStorage.setItem('devuiThemeFontSizeScheme', value);
  }

  getThemePrefersColorSchemeOn() {
    return localStorage.getItem('devuiThemePrefersColorScheme') === 'on';
  }

  setThemePrefersColorScheme(value: 'on' | 'off') {
    localStorage.setItem('devuiThemePrefersColorScheme', value);
  }

  activeTabChange(tab) {
    if (tab === 'advancedTheme') {
      this.advancedThemeChange(this.currentAdvancedTheme);
    } else {
      this.themesChange();
    }
  }
}
