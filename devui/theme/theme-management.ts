import cssVars from 'css-vars-ponyfill';
import { Subscription } from 'rxjs';
import { THEME_KEY } from './key-config';
import { Theme } from './theme';
import { devuiDarkTheme, devuiLightTheme } from './theme-data';
import { ThemeService } from './theme-service';
import { EventBus } from './utils';

/**
 * usage
 * main.ts
 ```ts
 import { ThemeServiceInit } from 'ng-devui/theme';
 ThemeServiceInit();
 ```
 *
*/
export function ThemeServiceInit(
  themes?: { [themeName: string]: Theme },
  defaultThemeName?: string,
  extraData?: {
    [themeName: string]: {
      appendClasses?: Array<string>;
      cssVariables?: {
        [cssVarName: string]: string;
      };
    };
  },
  ieSupport = false, // TODO：css-var-ponyflll 仍有一些问题待定位
  allowDynamicTheme = false
) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }
  window[THEME_KEY.themeCollection] = themes || {
    'devui-light-theme': devuiLightTheme,
    'devui-dark-theme': devuiDarkTheme,
  };
  window[THEME_KEY.currentTheme] = defaultThemeName || 'devui-light-theme';
  const eventBus = (window as any).globalEventBus || new EventBus(); // window.globalEventBus 为 框架的事件总线
  const themeService = new ThemeService(eventBus);
  window[THEME_KEY.themeService] = themeService;

  themeService.setExtraData(
    extraData || {
      'devui-dark-theme': {
        appendClasses: ['dark-mode'],
      },
    }
  );

  const currentTheme = window?.localStorage.getItem(THEME_KEY.userLastPreferTheme) || defaultThemeName;
  themeService.initializeTheme(currentTheme, allowDynamicTheme);
  if (ieSupport) {
    ieSupportCssVar();
  }
  return themeService;
}

export function ThemeServiceFollowSystemOn(themeConfig?: { lightThemeName: string; darkThemeName: string }): Subscription {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }
  const themeService: ThemeService = window[THEME_KEY.themeService];
  themeService.registerMediaQuery();
  return themeService.mediaQuery.prefersColorSchemeChange.subscribe((value) => {
    if (value === 'dark') {
      themeService.applyTheme(window[THEME_KEY.themeCollection][(themeConfig && themeConfig.darkThemeName) || 'devui-dark-theme']);
    } else {
      themeService.applyTheme(window[THEME_KEY.themeCollection][(themeConfig && themeConfig.lightThemeName) || 'devui-light-theme']);
    }
  });
}
export function ThemeServiceFollowSystemOff(sub?: Subscription) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  if (sub) {
    sub.unsubscribe();
  }
  const themeService = window[THEME_KEY.themeService];
  themeService.unregisterMediaQuery();
}

export function ieSupportCssVar() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  const isNativeSupport = ((window as any).CSS && CSS.supports && CSS.supports('(--a: 0)')) || false;
  if (isNativeSupport) {
    return;
  }
  cssVars({ watch: true, silent: true });
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      cssVars({ watch: false, silent: true });
      cssVars({ watch: true, silent: true });
    });
  });

  const config = { attributes: true, attributeFilter: [THEME_KEY.uiThemeAttributeName] };

  observer.observe(document.querySelector(`#${THEME_KEY.styleElementId}`), config);
}

// TODO: management should handle add / remove theme from theme collection.
// TODO: move global variables（window.xxxx） to single namespace
