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

## 开启扩展主题
1. 在main.ts中引入主题初始化服务和4套扩展主题
```
import { ThemeServiceInit } from 'ng-devui/theme';
import {
  infinityTheme,
  sweetTheme,
  provenceTheme,
  deepTheme,
} from 'ng-devui/theme-collection';
```
2. 在main.ts中初始化4套主题服务，并将默认主题置为无限主题
```
ThemeServiceInit({
  'infinity-theme': infinityTheme,
  'provence-theme': provenceTheme,
  'sweet-theme': sweetTheme,
  'deep-theme': deepTheme,
}, 'infinity-theme');
```
~~至此完成扩展主题的切换

------------
3. （可选，若想自制主题切换器）在项目的公共页面区域(ex: 公共头)插入一个简易主题切换器，进行主题切换及验证
- ts中
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
- html中
```
<d-select [placeholder]="'ChooseTheme'" [options]="themeOptions" (valueChange)="changeTheme($event)"></d-select>
```

## 制作主题切换器

请参考 [ThemePickerComponent](https://github.com/DevCloudFE/ng-devui/blob/master/devui-commons/src/header/theme-picker/theme-picker.component.ts)

## 使用自定义主题

可以通过给 ThemeServiceInit 传参支持自定义主题。
可以通过 new Theme 新建一个主题，并从默认主题里面改变颜色、字号、圆角、阴影值等。

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
