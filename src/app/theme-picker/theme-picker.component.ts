import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Theme, ThemeService, ThemeServiceFollowSystemOff, ThemeServiceFollowSystemOn } from 'ng-devui/theme';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomThemeService } from './customize-theme/custom-theme.service';
import { createTheme } from './customize-theme/util';
import { LargeFontSize } from './theme-data-more';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  themes;
  theme: string;
  largeFontTheme: Theme;
  fontSize: 'normal' | 'large' = 'normal';
  themeMode: 'light' | 'dark' = 'light';
  themePrefix: 'devui' | 'green' | string = 'devui';
  themePrefersColorScheme: boolean;
  sub: Subscription;
  largeFontSizeMode = false;
  activeThemeType: string | number = 'devuiTheme';
  advancedThemeList = [{ value: 'infinity',  url: 'assets/infinity.png' },
  { value: 'sweet', url: 'assets/sweet.png' },
  { value: 'provence',  url: 'assets/provence.png' },
  { value: 'deep',  url: 'assets/deep.png' },
  { value: 'galaxy',  url: 'assets/galaxy.png' }];
  currentAdvancedTheme = 'infinity';
  assetsPrefix = environment.deployPrefix;
  constructor(
    private cdr: ChangeDetectorRef,
    private cts: CustomThemeService
  ) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.themeService = window['devuiThemeService'];
      this.themes = window['devuiThemes'];
      this.theme = window['devuiCurrentTheme'];
    }
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
  }

  getThemePrefix() {
    return (this.theme.split('-')[0] !== 'devui' && this.theme.split('-')[0] !== 'green') ? 'devui' : this.theme.split('-')[0];
  }
  initTheme() {
    if (this.isCustomizeTheme()) {
      this.activeThemeType = 'customizeTheme';
      try {
        const {brand, isDark} =  JSON.parse(localStorage.getItem('user-custom-theme-config'));
        this.themeService.applyTheme(createTheme(brand, isDark, this.cts));
      } catch (e) {
        this.activeThemeType = 'devuiTheme';
        this.themesChange();
      }
    } else if (this.checkInitThemeType()) {
      this.activeThemeType = 'advancedTheme';
      this.currentAdvancedTheme = localStorage.getItem('user-custom-theme')?.split('-')[0];
      this.advancedThemeChange(this.currentAdvancedTheme);
    } else {
      this.activeThemeType = 'devuiTheme';
      this.themesChange();
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
      this.largeFontTheme.data = Object.assign({}, this.themes[`${this.themePrefix}-${this.themeMode}-theme`].data, LargeFontSize);
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
     this.largeFontTheme.data = Object.assign({}, this.themes[window['devuiCurrentTheme']].data, LargeFontSize);
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
