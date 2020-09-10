import { ThemeService } from './theme-service';
import { devuiLightTheme, devuiDarkTheme } from './theme-data';
import { Subscription } from 'rxjs';
import { Theme } from './theme';
import { THEME_KEY } from './key-config';
import cssVars from 'css-vars-ponyfill';
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
    themes?: {[themeName: string]: Theme},
    defaultThemeName?: string,
    extraData?: {[themeName: string]: {
      appendClasses?: Array<string>,
      cssVariables?: {
        [cssVarName: string]: string
      }
    }},
    ieSupport = true
  ) {
  window[THEME_KEY.themeCollection] = themes || {
    'devui-light-theme': devuiLightTheme,
    'devui-dark-theme': devuiDarkTheme,
  };
  window[THEME_KEY.currentTheme] = defaultThemeName || 'devui-light-theme';
  const themeService = new ThemeService();
  window[THEME_KEY.themeService] = themeService;

  themeService.setExtraData(extraData || {
    'devui-dark-theme': {
      appendClasses: ['dark-mode']
    }
  });
  themeService.initializeTheme();
  if (ieSupport) {
    ieSupportCssVar();
  }
  return themeService;
}

export function ThemeServiceFollowSystemOn(themeConfig?: { lightThemeName: string, darkThemeName: string}): Subscription {
  const themeService: ThemeService = window[THEME_KEY.themeService];
  themeService.registerMediaQuery();
  return themeService.mediaQuery.prefersColorSchemeChange.subscribe(value => {
    if (value === 'dark') {
      themeService.applyTheme(window[THEME_KEY.themeCollection][themeConfig && themeConfig.darkThemeName || 'devui-dark-theme']);
    } else {
      themeService.applyTheme(window[THEME_KEY.themeCollection][themeConfig && themeConfig.lightThemeName || 'devui-light-theme']);
    }
  });
}
export function ThemeServiceFollowSystemOff(sub?: Subscription) {
  if (sub) {
    sub.unsubscribe();
  }
  const themeService = window[THEME_KEY.themeService];
  themeService.unregisterMediaQuery();
}

export function ieSupportCssVar() {
  const isNativeSupport =  window['CSS'] && CSS.supports && CSS.supports('(--a: 0)') || false;
  if (isNativeSupport) {return; }
  cssVars({ watch: true, silent: true});
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      cssVars({ watch: false, silent: true});
      cssVars({ watch: true, silent: true});
    });
  });

  const config = { attributes: true, attributeFilter: [THEME_KEY.uiThemeAttributeName] };

  observer.observe(document.querySelector(`#${THEME_KEY.styleElementId}`), config);
}

// TODO: management should handle add / remove theme from theme collection.
// TODO: move global variables（window.xxxx） to single namespace
