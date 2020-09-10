export const THEME_KEY = {
  userLastPreferTheme : 'user-custom-theme', // localStorage 存储的上一次主题名字
  userLastPreferThemeData: 'user-custom-theme-data', // localStorage 存储的上一次主题的变量，用于骨架屏阶段快速恢复主题
  currentTheme: 'devuiCurrentTheme', // context（默认window） 当前主题名字
  themeCollection: 'devuiThemes', // context（默认window） 存储所有主题集合
  styleElementId: 'devuiThemeVariables', // DOM Style Element 的 id标识, 标记css变量声明的片段
  transitionStyleElementId: 'devuiThemeColorTransition',  // DOM Style Element 的 id标识，标记临时使用的css颜色动画
  uiThemeAttributeName: 'ui-theme', // body 和 style元素标记用户数据
  themeService: 'devuiThemeService' // 全局window下的theme service实例
};
