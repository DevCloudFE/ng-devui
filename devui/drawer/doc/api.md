## Drawer 说明

**打开Drawer层**：drawerService.**open** ( ~ : **IDrawerOptions** ) : **IDrawerOpenResult**

注意：传递给API中drawerContentComponent的组件需要在当前Module的\`declarations\`和\`entryComponents\`属性中注册

### IDrawerOptions

| 属性                       | 类型                        | 默认              |   说明                                          |
| :------------------------: | :------------------------: | :---------------: | :--------------------------------------------: |
| drawerContentComponent     | Type&lt;any&gt;            | (none)            | 必要参数，传入自定义的component                  |
| componentFactoryResolver   | ComponentFactoryResolver   | 组件库provider提供 | 可选，一般不需要设置                             |
| injector                   | Injector                   | default           | 可选，一般不需要设置                             |
| width                      | string                     | '300px'           | 可选，设置drawer的宽度                           |
| isCover                    | boolean                    | true              | 可选，是否有遮罩层                               |
| fullScreen                 | boolean                    | false             | 可选，设置默认是否全屏                           |
| data                       | any                        | (none)            | 可选，可以传入任意对象给drawerContentComponent使用|
| backdropCloseable          | boolean                    | true              | 可选，设置可否通过点击背景来关闭drawer层          |
| escKeyCloseable            | boolean                    | true              | 可选，设置可否通过esc按键来关闭drawer层          |
| onClose                    | Function                   | (none)            | 可选，关闭drawer时候调用                         |
| beforeHidden               | Function                   | (none)            | 可选, 关闭drawer前调用，返回boolean类型，返回false可以阻止关闭drawer层，类型为\`() => boolean\` 或者\`Promise<boolean>\`或者\`Observable<boolean>\`|
| clickDoms                  | array                      | []                | 可选，isCover为false的情况下，点击Dom关闭侧滑栏
| destroyOnHide              | boolean                    | true              | 可选，关闭drawer时是否销毁DrawerComponent，默认销毁

### IDrawerOpenResult

| 属性                       | 类型                        | 说明                                     |
| :------------------------: | :------------------------: | :--------------------------------------: |
| drawerInstance             | DrawerComponent            | 返回Drawer对象                            |
| drawerContentInstance      | Type&lt;any&gt;            | 返回Drawer的承载内容的对象，包括传入的data  |

### drawerInstance API

- **触发drawer层全屏**：drawerInstance.**toggleFullScreen**(): void

- **触发打开drawer层**：drawerInstance.**show**(): void

- **触发关闭drawer层**：drawerInstance.**hide**(): void， 该函数会先检查beforeHidden，如果返回true才关闭

- **触发销毁drawer层**：drawerInstance.**destroy**(): void， destroyOnHide为false且drawer层关闭时可以调用destroy方法销毁DrawerComponent
