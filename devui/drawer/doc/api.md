## Drawer 说明

**打开Drawer层**：drawerService.**open** ( ~ : **IDrawerOptions** ) : **IDrawerOpenResult**

注意：传递给API中drawerContentComponent的组件需要在当前Module的\`declarations\`和\`entryComponents\`属性中注册

### IDrawerOptions

| 属性                       | 类型                        | 默认              |   说明                                          |
| :------------------------: | :------------------------: | :---------------: | :--------------------------------------------: |
| drawerContentComponent     | `Type<any>`            | --            | 必要参数，传入自定义的component                  |
| componentFactoryResolver   | `ComponentFactoryResolver`   | 组件库provider提供 | 可选，一般不需要设置                             |
| injector                   | `Injector`                   | default           | 可选，一般不需要设置                             |
| width                      | `string`                     | '300px'           | 可选，设置drawer的宽度                           |
| isCover                    | `boolean`                    | true              | 可选，是否有遮罩层                               |
| fullScreen                 | `boolean`                    | false             | 可选，设置默认是否全屏                           |
| data                       | `any`                        | --            | 可选，可以传入任意对象给drawerContentComponent使用|
| backdropCloseable          | `boolean`                    | true              | 可选，设置可否通过点击背景来关闭drawer层          |
| escKeyCloseable            | `boolean`                    | true              | 可选，设置可否通过esc按键来关闭drawer层          |
| onClose                    | `Function`                   | --            | 可选，关闭drawer时候调用                         |
| afterOpened                | Function                   | (none)            | \`7.23.0版本新增\`可选，打开drawer后时候调用                         |
| beforeHidden               | `Function`                   | --            | 可选, 关闭drawer前调用，返回boolean类型，返回false可以阻止关闭drawer层，类型为\`() => boolean\` 或者\`Promise<boolean>\`或者\`Observable<boolean>\`|
| clickDoms                  | `array`                      | []                | 可选，isCover为false的情况下，点击Dom关闭侧滑栏
| destroyOnHide              | `boolean`                    | true              | 可选，关闭drawer时是否销毁DrawerComponent，默认销毁
| position                   | string                       | 'right'           | 可选，抽屉板出现的位置，'left'或者'right'
| bodyScrollable             | boolean                    | false             | 可选，drawer打开body是否可滚动，默认不可滚动

### IDrawerOpenResult

| 属性                       | 类型                        | 说明                                     |
| :------------------------: | :------------------------: | :--------------------------------------: |
| drawerInstance             | `DrawerComponent`            | 返回Drawer对象                            |
| drawerContentInstance      | `Type<any>`          | 返回Drawer的承载内容的对象，包括传入的data  |

### drawerInstance API

- **切换drawer的全屏状态**：drawerInstance.**toggleFullScreen**(): void

- **设置drawer的全屏状态**：drawerInstance.**setFullScreen**(fullScreen: boolean): void

- **触发打开drawer层**：drawerInstance.**show**(): void

- **触发关闭drawer层**：drawerInstance.**hide**(): void， 该函数会先检查beforeHidden，如果返回true才关闭

- **触发销毁drawer层**：drawerInstance.**destroy**(): void， destroyOnHide为false且drawer层关闭时可以调用destroy方法销毁
- **设置宽度**：drawerInstance.**setWidth**(width: string): void
