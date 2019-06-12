| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| id          | string       | (none)      | button id |
| type        | IButtonType  | button      | 类型 'button'\|'submit'\|'reset' |
| bsStyle     | IButtonStyle | primary     | 风格 'primary' \| 'common' \| 'text' \| 'text-dark'|
| bsSize      | IButtonSize  | (none)      | 大小 'lg' \| 'sm' \| 'xs' |
| bordered    | boolean      | false       | 是否有边框  |
| icon        | string       | (none)      | 图标 |
| showLoading | boolean      | false       | 是否显示加载提示 |
| width       | number       |  --       | button宽度 |
| disabled    | boolean       | false      | 是否禁用button |
| autofocus   | boolean      | false       | 按钮加载时是否自动获得焦点 |
| btnClick    | func          | --         | button点击事件，解决IE浏览器disabled还会触发click |
