import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ThemeServiceInit, devuiLightTheme, devuiDarkTheme } from 'ng-devui/theme';
import { greenLightTheme, greenDarkTheme } from './app/theme-picker/theme-data-more';
ThemeServiceInit({
  'devui-light-theme': devuiLightTheme,
  'devui-dark-theme': devuiDarkTheme,
  'green-light-theme': greenLightTheme,
  'green-dark-theme': greenDarkTheme,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
