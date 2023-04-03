# Customize Theme

## Use the default theme

No action is required.

## Enable the theme

If the project is built with Angular CLI, it's allowed to importing the theme in main.ts

```typescript
// main.ts
import { ThemeServiceInit } from'ng-devui/theme';
ThemeServiceInit();
```

The function of ThemeServiceInit is defined as follows:

```typescript
ThemeServiceInit(
    themes?: {[themeName: string]: Theme},
    defaultThemeName?: string,
    extraData?: {[themeName: string]: {
      appendClasses?: Array<string>,
      cssVariables?: {
        [cssVarName: string]: string
      }
    }},
    ieSupport = true
): ThemeService;
```

themes: All the themes map objects that can be switched to. The key is the theme name, and the value is the theme instance.

defaultThemeName: Default theme name, which is one of themes. If the previous theme name is not specified in localStorage, defaultThemeName is used.

extraData: Extra data of the topic, which is used for third-party library compatibility. The key value is the topic name, value is the object, the appendClasses field specifies the class bound to the body, and the cssVariables field specifies the extra customized variable of the topic.

ieSupport: Indicates whether to enable the IE support. Currently, the css-var-ponyfill solution is used to support the IE theme switching.

## Open Extended Theme
1. Introduce the topic initialization service and four sets of extended topics in main.ts.
```
import { ThemeServiceInit } from 'ng-devui/theme';
import {
  infinityTheme,
  sweetTheme,
  provenceTheme,
  deepTheme,
} from 'ng-devui/theme-collection';
```
2. Initialize the four theme services in main.ts and set the default theme to unlimited theme.
```
ThemeServiceInit({
  'infinity-theme': infinityTheme,
  'provence-theme': provenceTheme,
  'sweet-theme': sweetTheme,
  'deep-theme': deepTheme,
}, 'infinity-theme');
```
3. Introduce extended styles globally.
```
@import 'ng-devui/theme-collection/extend-theme.css';
```

~~The switchover of the extended theme is complete.

------------
4. (Optional, if you want to make a theme switcher) Insert a simple theme switcher in the public page area of the project (ex: public header) to switch and verify the theme.
- In ts
```
themeOptions = [`
    'infinity-theme',
    'provence-theme',
    'sweet-theme',
    'deep-theme'
  ];`
  changeTheme(theme: string) {
     window['devuiThemeService'].applyTheme(window['devuiThemes'][theme]);
  }
```
- In html
```
<d-select [placeholder]="'ChooseTheme'" [options]="themeOptions" (valueChange)="changeTheme($event)"></d-select>
```

## Making a Theme Switcher

For details, please see [ThemePickerComponent](https://github.com/DevCloudFE/ng-devui/blob/master/devui-commons/src/header/theme-picker/theme-picker.component.ts).

## Use a custom theme

You can transfer parameters to ThemeServiceInit to support theme customization.
You can use new Theme to create a theme and change the color, font size, rounded corners, and shadow values from the default theme.

```typescript
// my-theme.ts
import { Theme, devuiLightTheme, devuiDarkTheme } from 'ng-devui/theme';

export const myLightTheme: Theme = new Theme({
  id: 'my-light-theme',
  name: 'My Light Theme',
  cnName: '我的浅色主题',
  data: Object.assign({}, devuiLightTheme.data, {
    'devui-global-bg': '#cccccc',
  }),
  isDark: false,
});

export const myDarkTheme: Theme = new Theme({
  id: 'my-dark-theme',
  name: 'My Dark Theme',
  cnName: '我的深色主题',
  data: Object.assign({}, devuiDarkTheme.data, {
    'devui-global-bg': '#33333',
  }),
  isDark: true,
});
```

```typescript
// main.ts
import { ThemeServiceInit } from 'ng-devui/theme';
import { myLightTheme, myDarkTheme } from './my-theme';
ThemeServiceInit(
  {
    'my-light-theme': myLightTheme,
    'my-dark-theme': myDarkTheme,
  },
  'my-light-theme'
);
```