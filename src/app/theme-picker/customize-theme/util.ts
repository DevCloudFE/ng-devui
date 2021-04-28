import { Theme } from 'ng-devui/theme';

export function createTheme(backgroundColor, customDark, cts) {
  return new Theme({
    id: `customize-theme-${backgroundColor}`,
    name: 'test',
    cnName: '测试',
    data: cts.genThemeData([
      {
        colorName: 'devui-brand',
        color: backgroundColor
      }
    ], customDark, 'hsl'),
    isDark: customDark
  });
}
