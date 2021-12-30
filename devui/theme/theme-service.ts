import { THEME_KEY } from './key-config';
import { PrefersColorSchemeMediaQuery } from './media-query';
import { Theme } from './theme';
import { ContextService, EventBus, IContextService, IEventBus, IStorageService, StorageService } from './utils/index';

/**
 * 负责CSS变量主题的装卸，主题元数据转换成主题数据
 */
export class ThemeService {
  eventBus: IEventBus;
  storage: IStorageService;
  context: IContextService;
  currentTheme: Theme;
  contentElement: HTMLStyleElement;
  colorTransitionElement: HTMLStyleElement;
  extraData: {
    [themeId: string]: {
      cssVariables?: {
        [varname: string]: string;
      };
      appendClasses?: Array<string>;
    };
  };
  private _appendedClasses: Array<string>;
  set appendClasses(classes: Array<string>) {
    if (this._appendedClasses) {
      this.removeAppendedClass(this._appendedClasses);
    }
    if (classes) {
      this.addAppendClass(classes);
    }
    this._appendedClasses = classes;
  }

  get appendClasses() {
    return this._appendedClasses;
  }

  public mediaQuery: PrefersColorSchemeMediaQuery;

  constructor(eventBus?: IEventBus, storage?: IStorageService, context?: IContextService) {
    this.eventBus = eventBus === undefined ? new EventBus() : eventBus;
    this.storage = storage === undefined ? new StorageService() : storage;
    this.context = context === undefined ? new ContextService() : context;
  }

  initializeTheme(specificThemeId?: string, allowDynamicTheme?: boolean) {
    const themeId = specificThemeId
                || this.storage.tryGetLocalStorage(THEME_KEY.userLastPreferTheme)
                || this.context.getDataFromNameSpace(THEME_KEY.currentTheme);
    let theme;

    if (themeId) {
      const themes = this.context.getDataFromNameSpace(THEME_KEY.themeCollection);
      if (themes && Object.keys(themes).length > 0) {
        theme = themes[themeId];
      }
    }
    this.currentTheme = theme || {
      id: 'empty-theme',
      name: '',
      data: {}
    };
    this.createColorTransition();
    if (!theme && allowDynamicTheme) {
      return;
    }
    this.applyTheme(this.currentTheme);
  }

  formatCSSVariables(themeData: Theme['data']) {
    return Object.keys(themeData).map(
      cssVar => ('--' + cssVar + ':' + themeData[cssVar])
    ).join(';');
  }

  applyTheme(theme: Theme) {
    this.addColorTransition();
    this.currentTheme = theme;
    if (!this.contentElement) {
      const styleElement = document.getElementById(THEME_KEY.styleElementId);
      if (styleElement) {
        this.contentElement = <HTMLStyleElement>styleElement;
      } else {
        this.contentElement = document.createElement('style');
        this.contentElement.id = THEME_KEY.styleElementId;
        document.head.appendChild(this.contentElement);
      }

    }
    this.contentElement.innerText = ':root { ' + this.formatCSSVariables(theme.data) + ' }';
    this.contentElement.setAttribute(THEME_KEY.uiThemeAttributeName, this.currentTheme.id);
    document.body.setAttribute(THEME_KEY.uiThemeAttributeName, this.currentTheme.id);

    // 用于挂载额外变量和类名
    this.applyExtraData();
    this.saveCustomTheme(this.currentTheme);

    // 通知外部主题变更
    this.notify(theme, 'themeChanged');
    setTimeout(() => {this.removeColorTransition(); }, 500);
  }

  saveCustomTheme(customTheme: Theme) {
    this.storage.trySetLocalStorage(THEME_KEY.userLastPreferTheme, customTheme.id);
    this.storage.trySetLocalStorage(THEME_KEY.userLastPreferThemeData, JSON.stringify(customTheme.data));
    this.context.setDataFromNameSpace(THEME_KEY.currentTheme, customTheme.id);
  }

  private notify(theme: Theme, eventType: string) {
    if (!this.eventBus) { return; }
    this.eventBus.trigger(eventType, theme);
  }

  setEventBus(eb: IEventBus) {
    this.eventBus = eb;
  }

  private addAppendClass(classNames: Array<string>) {
    document.body.classList.add(...classNames);
  }

  private removeAppendedClass(classNames: Array<string>) {
    document.body.classList.remove(...classNames);
  }

  setExtraData(data, apply = false) {
    this.extraData = data;
    if (apply) {
      this.applyExtraData();
    }
  }

  private applyExtraData() {
    const theme = this.currentTheme;
    if (this.extraData && this.extraData[theme.id] && this.extraData[theme.id].cssVariables) {
      this.contentElement.innerText
      = ':root { ' + this.formatCSSVariables(theme.data) + ' }'
      + ':root { ' + this.formatCSSVariables(this.extraData[theme.id].cssVariables) + ' }';
    }
    if (this.extraData && this.extraData[theme.id] && this.extraData[theme.id].appendClasses) {
      this.appendClasses = this.extraData[theme.id].appendClasses;
    } else {
      this.appendClasses = undefined;
    }
  }

  public unloadTheme() {
    if (this.contentElement && document.contains(this.contentElement)) {
      this.contentElement.parentElement.removeChild(this.contentElement);
    }
    if (this.appendClasses) {
      this.appendClasses = undefined;
    }
  }

  public registerMediaQuery() {
    if (!this.mediaQuery) {
      this.mediaQuery = new PrefersColorSchemeMediaQuery();
    }
    this.mediaQuery.register();
  }

  public unregisterMediaQuery() {
    if (!this.mediaQuery) {
      return;
    }
    this.mediaQuery.unregister();
    this.mediaQuery = undefined;
  }

  private createColorTransition() {
    this.colorTransitionElement = document.createElement('style');
    this.colorTransitionElement.id = THEME_KEY.transitionStyleElementId;
    this.colorTransitionElement.innerText = `
      * { transition: background .3s ease-out, background-color .3s ease-out,
                    border .3s ease-out, border-color .3s ease-out,
                    box-shadow .3s ease-out, box-shadow-color .3s ease-out}
    `;
  }

  private addColorTransition() {
    document.head.appendChild(this.colorTransitionElement);
  }
  private removeColorTransition() {
    if (!this.colorTransitionElement.parentElement) {return; }
    this.colorTransitionElement.parentElement.removeChild(this.colorTransitionElement);
  }
}
