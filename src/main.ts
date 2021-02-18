import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ThemeServiceInit, devuiLightTheme, devuiDarkTheme } from 'ng-devui/theme';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { greenLightTheme,
   greenDarkTheme,
   devuiLightLargeTheme,
   devuiDarkLargeTheme,
   greenLightLargeTheme,
   greenDarkLargeTheme } from './app/theme-picker/theme-data-more';
import { deepTheme, infinityTheme, provenceTheme, sweetTheme } from 'ng-devui/theme-collection';

ThemeServiceInit({
  'devui-light-theme': devuiLightTheme,
  'devui-dark-theme': devuiDarkTheme,
  'green-light-theme': greenLightTheme,
  'green-dark-theme': greenDarkTheme,
  'devui-light-large-theme': devuiLightLargeTheme,
  'devui-dark-large-theme': devuiDarkLargeTheme,
  'green-light-large-theme': greenLightLargeTheme,
  'green-dark-large-theme': greenDarkLargeTheme,
  'infinity-theme': infinityTheme,
  'provence-theme': provenceTheme,
  'sweet-theme': sweetTheme,
  'deep-theme': deepTheme
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
