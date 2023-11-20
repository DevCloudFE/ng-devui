# 如何使用

在 module 中引入：

```ts
import { DrawerModule } from 'ng-devui/drawer';
```

在页面中使用：

```html
<d-button (click)="openDrawer()">click me!</d-button> 通过openDrawer函数中调用drawerService.open()打开抽屉板
```

**打开 Drawer 层**：drawerService.**open** ( ~ : **IDrawerOptions** ) : **IDrawerOpenResult**

```ts
openDrawer() {
    this.results = this.drawerService.open({
      drawerContentComponent: DrawerContentComponent,
      width: '50%',
      zIndex: 1000,
      isCover: true,
      fullScreen: true,
      backdropCloseable: true,
      escKeyCloseable: true,
      position: 'left',
      onClose: () => {
        console.log('on drawer closed');
      },
      data: {
        text: 'hello',
        name: 'tom1'
      }
    });
  }
```

注意：传递给 API 中 drawerContentComponent 的组件需要在当前 Module 的\`declarations\`和\`entryComponents\`属性中注册。

# Drawer

## IDrawerOptions 参数

|           属性           |                     类型                      |  默认   |                                                                               说明                                                                                | 跳转 Demo                                         |全局配置项|
| :----------------: | :----------------------: | :-------------------------------------------: | :-----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------- |
|  drawerContentComponent  |                  `Type<any>`                  |   --    |                                                                 可选，传入自定义的 component                                                                  | [基本用法](demo#basic-usage)                      |
|     contentTemplate      |       `TemplateRef<any>`        |    --    | 可选，自定义模板，与drawerContentComponent不兼容        | [自定义模板](demo#template) |
| componentFactoryResolver |          `ComponentFactoryResolver`           |  内置   |                                                                       可选，一般不需要设置                                                                        |
|         injector         |                  `Injector`                   |   --    |                                                                       可选，一般不需要设置                                                                        |
|          width           |                   `string`                    | '300px' |                                                                     可选，设置 drawer 的宽度                                                                      | [基本用法](demo#basic-usage)                      |
|          zIndex          |                   `number`                    |  1000   |                                                                  可选，设置 drawer 的 z-index 值                                                                  | [基本用法](demo#basic-usage)                      |
|         isCover          |                   `boolean`                   |  true   |                                                                        可选，是否有遮罩层                                                                         | [基本用法](demo#basic-usage)                      |
|           data           |                     `any`                     |   --    |                                                       可选，可以传入任意对象给 drawerContentComponent 使用                                                        | [基本用法](demo#basic-usage)                      |
|    backdropCloseable     |                   `boolean`                   |  true   |                                                            可选，设置可否通过点击背景来关闭 drawer 层                                                             | [基本用法](demo#basic-usage)                      |
|     escKeyCloseable      |                   `boolean`                   |  true   |                                                            可选，设置可否通过 esc 按键来关闭 drawer 层                                                            | [基本用法](demo#basic-usage)                      |
|         onClose          |                  `Function`                   |   --    |                                                                    可选，关闭 drawer 时候调用                                                                     | [基本用法](demo#basic-usage)                      |
|       afterOpened        |                  `Function`                   |   --    |                                                                   可选，打开 drawer 后时候调用                                                                   |
|       beforeHidden       | `Function\|Promise\|()=> Observable<boolean>` |   --    |                                          可选, 关闭 drawer 前调用，返回 boolean 类型，返回 false 可以阻止关闭 drawer 层                                           | [基本用法](demo#basic-usage)                      |
|        clickDoms         |                    `array`                    |   []    |                                                       可选，isCover 为 false 的情况下，点击 Dom 关闭侧滑栏                                                        | [关闭后不销毁](demo#do-not-destroy-after-closing) |
|      destroyOnHide       |                   `boolean`                   |  true   |                                                      可选，关闭 drawer 时是否销毁 DrawerComponent，默认销毁                                                       | [关闭后不销毁](demo#do-not-destroy-after-closing) |
|         position         |                   `string`                    | 'right' |                                                             可选，抽屉板出现的位置，'left'或者'right'                                                             | [基本用法](demo#basic-usage)                      |
|      bodyScrollable      |                   `boolean`                   |  true   | 可选，drawer 打开后，body 是否可滚动，默认为可滚动,false 时隐藏滚动,隐藏滚动条可能会产生抖动，可以通过设置外层 fixed 来同时避免滚动与抖动,可参考 modal 的解决方案 | [解决抖动滚动问题](demo#template-fixed)           |
|      showAnimation      |                   `boolean`                   |  true   | 可选，是否开启动效 |
| id | `string` | -- | 可选，窗口的id |
|      resizable      |                   `boolean`                   |  false   | 可选，是否可动态调整抽屉宽度 |

## IDrawerOpenResult 参数

|         属性          |       类型        |                     说明                      | 跳转 Demo                    |
| :-------------------: | :---------------: | :-------------------------------------------: | ---------------------------- |
|    drawerInstance     | `DrawerComponent` |               返回 Drawer 对象                | [基本用法](demo#basic-usage) |
| drawerContentInstance |    `Type<any>`    | 返回 Drawer 的承载内容的对象，包括传入的 data | [基本用法](demo#basic-usage) |

## drawerInstance API

- **切换 drawer 的全屏状态**：drawerInstance.**toggleFullScreen**(): void

- **设置 drawer 的全屏状态**：drawerInstance.**setFullScreen**(fullScreen: boolean): void

- **触发打开 drawer 层**：drawerInstance.**show**(): void

- **触发关闭 drawer 层**：drawerInstance.**hide**(): void， 该函数会先检查 beforeHidden，如果返回 true 才关闭

- **直接关闭 drawer 层**：drawerInstance.**hideDirectly**(): void，跳过所有钩子函数直接关闭

- **触发销毁 drawer 层**：drawerInstance.**destroy**(): void， destroyOnHide 为 false 且 drawer 层关闭时可以调用 destroy 方法销毁
- **设置宽度**：drawerInstance.**setWidth**(width: string): void
