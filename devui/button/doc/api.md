### d-button 参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| id          | `string`      | --      | 可选，button id |
| type        | `button`\|`submit`\|`reset`  | button      | 可选，按钮类型 |
| bsStyle     | `primary` \| `common` \| `text` \| `text-dark` | primary | 可选，按钮风格 |
| bsSize      | `lg` \| `md` \| `sm` \| `xs`   | md     | 可选，按钮大小 |
| bordered    | `boolean`      | false       | 可选，是否有边框  |
| icon        | `string`       | --      | 可选， 自定义按钮图标 |
| showLoading | `boolean`      | false       | 可选，是否显示加载提示 |
| width       | `number`       |  --       | 可选，button宽度 |
| disabled    | `boolean`       | false      | 可选，是否禁用button |
| autofocus   | `boolean`      | false       | 可选，按钮加载时是否自动获得焦点 |

### d-button 事件

| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| btnClick   |  `EventEmitter<any>`      | 可选，button点击事件，解决IE浏览器disabled还会触发click, 返回点击下后鼠标事件对象 |
