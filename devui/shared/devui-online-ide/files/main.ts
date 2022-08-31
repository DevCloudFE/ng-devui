export default `import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import {
  devuiLightTheme,
  ThemeServiceInit
} from 'ng-devui/theme';

import { infinityTheme } from 'ng-devui/theme-collection';

ThemeServiceInit({
  'devui-light-theme': devuiLightTheme,
  'infinity-theme': infinityTheme,
}, 'infinity-theme');

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));`;
