## Drawer 说明

**打开 Drawer 层**：drawerService.**open** ( ~ : **IDrawerOptions** ) : **IDrawerOpenResult**

注意：传递给 API 中 drawerContentComponent 的组件需要在当前 Module 的\`declarations\`和\`entryComponents\`属性中注册

### IDrawerOptions

|           属性           |            类型            |         默认         |                                                                            说明                                                                             | 跳转 Demo                                                    |
| :----------------------: | :------------------------: | :------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------ |
|  drawerContentComponent  |        `Type<any>`         |          --          |                                                              必要参数，传入自定义的 component                                                               | [基本用法](/components/drawer/demo#basic-usage)                  |
| componentFactoryResolver | `ComponentFactoryResolver` | 组件库 provider 提供 |                                                                    可选，一般不需要设置                                                                     |
|         injector         |         `Injector`         |       default        |                                                                    可选，一般不需要设置                                                                     |
|          width           |          `string`          |       '300px'        |                                                                  可选，设置 drawer 的宽度                                                                   | [基本用法](/components/drawer/demo#basic-usage)                  |
|          zIndex          |          `number`          |         1000         |                                                               可选，设置 drawer 的 z-index 值                                                               | [基本用法](/components/drawer/demo#basic-usage)                  |
|         isCover          |         `boolean`          |         true         |                                                                     可选，是否有遮罩层                                                                      | [基本用法](/components/drawer/demo#basic-usage)                  |
|        fullScreen        |         `boolean`          |        false         |                                                                   可选，设置默认是否全屏                                                                    | [基本用法](/components/drawer/demo#basic-usage)                  |
|           data           |           `any`            |          --          |                                                    可选，可以传入任意对象给 drawerContentComponent 使用                                                     | [基本用法](/components/drawer/demo#basic-usage)                  |
|    backdropCloseable     |         `boolean`          |         true         |                                                         可选，设置可否通过点击背景来关闭 drawer 层                                                          | [基本用法](/components/drawer/demo#basic-usage)                  |
|     escKeyCloseable      |         `boolean`          |         true         |                                                         可选，设置可否通过 esc 按键来关闭 drawer 层                                                         | [基本用法](/components/drawer/demo#basic-usage)                  |
|         onClose          |         `Function`         |          --          |                                                                 可选，关闭 drawer 时候调用                                                                  | [基本用法](/components/drawer/demo#basic-usage)                  |
|       afterOpened        |          Function          |        (none)        |                                                       \`7.23.0 版本新增\`可选，打开 drawer 后时候调用                                                       |
|       beforeHidden       |         `Function`         |          --          | 可选, 关闭 drawer 前调用，返回 boolean 类型，返回 false 可以阻止关闭 drawer 层，类型为\`() => boolean\` 或者\`Promise<boolean>\`或者\`Observable<boolean>\` | [基本用法](/components/drawer/demo#basic-usage)                  |
|        clickDoms         |          `array`           |          []          |                                                    可选，isCover 为 false 的情况下，点击 Dom 关闭侧滑栏                                                     | [关闭后不销毁](/components/drawer/demo#do-not-destroy-after-closing) |
|      destroyOnHide       |         `boolean`          |         true         |                                                   可选，关闭 drawer 时是否销毁 DrawerComponent，默认销毁                                                    | [关闭后不销毁](/components/drawer/demo#do-not-destroy-after-closing) |
|         position         |           string           |       'right'        |                                                          可选，抽屉板出现的位置，'left'或者'right'                                                          | [基本用法](/components/drawer/demo#basic-usage)                  |
|      bodyScrollable      |          boolean           |        false         |                                                       可选，drawer 打开 body 是否可滚动，默认不可滚动                                                       |

### IDrawerOpenResult

|         属性          |       类型        |                     说明                      |
| :-------------------: | :---------------: | :-------------------------------------------: |
|    drawerInstance     | `DrawerComponent` |               返回 Drawer 对象                |
| drawerContentInstance |    `Type<any>`    | 返回 Drawer 的承载内容的对象，包括传入的 data |

### drawerInstance API

- **切换 drawer 的全屏状态**：drawerInstance.**toggleFullScreen**(): void

- **设置 drawer 的全屏状态**：drawerInstance.**setFullScreen**(fullScreen: boolean): void

- **触发打开 drawer 层**：drawerInstance.**show**(): void

- **触发关闭 drawer 层**：drawerInstance.**hide**(): void， 该函数会先检查 beforeHidden，如果返回 true 才关闭

- **触发销毁 drawer 层**：drawerInstance.**destroy**(): void， destroyOnHide 为 false 且 drawer 层关闭时可以调用 destroy 方法销毁
- **设置宽度**：drawerInstance.**setWidth**(width: string): void
