### d-button 参数

|    参数     |      类型      |  默认   | 说明                                                                           | 跳转 Demo                                            |
| :---------: | :------------:  | :-----: | :---------------------------------------------------------------------------  |                                                     |
|     id      |    `string`     |   --    | 可选，button id                                                                |                                                     |
|    type     | `IButtonType`   | button  | 可选，类型 'button' \|'submit' \|'reset'                                       |                                                     |
|   bsStyle   | `IButtonStyle`  | primary | 可选，风格 'primary' \| 'common' \| 'text' \| 'text-dark' \| 'danger'         | [主要按钮](demo#button-primary)   |
|   bsSize    | `IButtonSize`   |  'md'   | 可选，大小 'lg' \| 'md' \| 'sm' \| 'xs'                                       | [按钮尺寸](demo#button-size)      |
| bsPosition |`IButtonPosition` |'default' | 可选，按钮位置 'default' \| 'left' \| 'right'                                  | [左右按钮](demo#button-left-right)     |
|  bordered   |   `boolean`     |  false  | 可选，是否有边框                                                              |                                                      |
|    icon     |    `string`     |   --    | 可选， 自定义按钮图标                                                          | [图标按钮](demo#button-icon)      |
| showLoading |   `boolean`     |  false  | 可选，是否显示加载提示                                                         | [加载中状态](demo#button-loading) |
|    width    |    `number`     |   --    | 可选，button 宽度                                                             |                                                      |
|  disabled   |   `boolean`     |  false  | 可选，是否禁用 button                                                         | [主要按钮](demo#button-primary)   |
|  autofocus  |   `boolean`     |  false  | 可选，按钮加载时是否自动获得焦点                                                | [自动获得焦点](demo#button-auto-focus)  |

### d-button 事件

|   参数   |        类型         | 说明                                                                                    | 跳转 Demo                                      |
| :------: | :-----------------: | :-------------------------------------------------------------------------------------- | ---------------------------------------------- |
| btnClick | `EventEmitter<any>` | 可选，button 点击事件，解决 IE 浏览器 disabled 还会触发 click, 返回点击下后鼠标事件对象 |    

### d-button-group 参数    

|    参数     |      类型      |  默认   | 说明                                                                           | 跳转 Demo                                            |
| :---------: | :------------:  | :-----: | :---------------------------------------------------------------------------  |                                                     |
|     size      |    `IButtonGroupSize`     |  'md'   | 可选，大小 'lg' \| 'md' \| 'sm' \|'xs' | [按钮组](demo#button-groups)      |                                                                                                           |
