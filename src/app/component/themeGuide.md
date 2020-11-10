# 主题化使用指南

## 使用默认的主题

无需做任何处理，直接使用即可。

## 开启主题化

Angular CLI 工程，可以在 main.ts 引入

```typescript
// main.ts
import { ThemeServiceInit } from 'ng-devui/theme';
ThemeServiceInit();
```

ThemeServiceInit 的函数定义如下：

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

themes: 可以用于切换的所有主题 Map 对象，key 值为主题名字，value 为主题类实例。

defaultThemeName: 默认主题名字，为 themes 中的一个，在 localStorage 没有指定上一次的主题名字的情况下会使用 defaultThemeName。

extraData: 主题的额外数据，用于做三方库兼容，key 值为主题名字， value 为对象，appendClasses 字段指定 body 绑定的类，cssVariables 为主题额外的自定义变量。

ieSupport：是否打开 ie 支持，目前使用 css-var-ponyfill 方案支持 ie 切换主题。

## 制作主题切换器

请参考 [ThemePickerComponent](https://github.com/DevCloudFE/ng-devui/blob/master/src/app/theme-picker/theme-picker.component.ts)

## 使用自定义主题

可以通过给 ThemeServiceInit 传参支持自定义主题。
可以通过 new Theme 新建一个主题，并从默认主题里面改色。

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
