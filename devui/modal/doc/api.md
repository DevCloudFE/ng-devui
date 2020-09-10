## modal 说明

**打开 modal**:modalService.**open** ( ~ : **IModalOptions** )

### IModalOptions

|           参数           |              类型               |   默认   | 说明                                           | 跳转 Demo                                                       |
| :----------------------: | :-----------------------------: | :------: | :--------------------------------------------- | --------------------------------------------------------------- |
|            id            |            `string`             |    --    | 必选，弹出框 id                                | [自定义对话框](/components/modal/demo#custom-dialog)            |
|          width           |            `string`             |    --    | 可选，弹出框宽度(e.g 300px)                    | [自定义对话框](/components/modal/demo#custom-dialog)            |
|          zIndex          |            `number`             |   1050   | 可选，弹出框 z-index 值                        |
|        component         |           `Component`           |    --    | 可选，弹出框组件，弹出框会显示组件内容         | [自定义对话框](/components/modal/demo#custom-dialog)            |
|         injector         |           `Injector`            |   true   | 可选，可以选择指定将用作组件的父级的注射器。   |
|           data           |            `object`             |    --    | 可选，传入component实例中的属性                | [自定义对话框](/components/modal/demo#custom-dialog)            |
|       showAnimate        |            `boolean`            |    --    | 可选，是否显示动画，                           | [自定义对话框](/components/modal/demo#custom-dialog)            |
|    backdropCloseable     |            `boolean`            |   true   | 可选，点击空白处是否能关闭弹出框，             | [自定义对话框](/components/modal/demo#custom-dialog)            |
| componentFactoryResolver |   `ComponentFactoryResolver`    |    --    | 可选，自定义动态渲染组件解析器，               |
|         onClose          |           `function`            |    --    | 可选，弹出框关闭之后回调的函数，               | [自定义对话框](/components/modal/demo#custom-dialog)            |
|       beforeHidden       | `function、Promise、Observable` |    --    | 可选，关闭窗口之前的回调                       |
|        placement         | enum('center', 'top', 'bottom') | 'center' | 可选，弹出框出现的位置                         |
|         offsetX          |            `string`             |  '0px'   | 可选，弹出框横向偏移                           |
|         offsetY          |            `string`             |  '0px'   | 可选，弹出框纵向偏移                           |
|      bodyScrollable      |            `boolean`            |  false   | 可选，modal 打开 body 是否可滚动，默认不可滚动 |
|     contentTemplate      |       `TemplateRef<any>`        |    --    | 可选，弹出框内容模板，与component不兼容        | [自定义弹出框内容模板](/components/modal/demo#template-content) |
|        escapable         |            `boolean`            |   true   | 可选，是否支持esc键关闭弹窗                    |

## dialog 说明

**打开 dialog**:dialogService.**open** ( ~ : **IDialogOptions** )

### IDialogOptions

|           参数           |              类型               |    默认    | 说明                                                                     | 跳转 Demo                                                        |
| :----------------------: | :-----------------------------: | :--------: | :----------------------------------------------------------------------- | ---------------------------------------------------------------- |
|            id            |            `string`             |     --     | 必选，弹出框 id                                                          | [标准对话框](/components/modal/demo#standard-dialog)             |
|          width           |            `string`             |     --     | 可选，弹出框宽度(e.g 300px)                                              | [标准对话框](/components/modal/demo#standard-dialog)             |
|          zIndex          |            `number`             |    1050    | 可选，弹出框 z-index 值                                                  | [信息提示](/components/modal/demo#message-hint)                  |
|        maxHeight         |            `string`             |     --     | 可选，弹出框最大高度(e.g 600px)                                          | [标准对话框](/components/modal/demo#standard-dialog)             |
|          title           |            `string`             |     --     | 可选，弹出框 title                                                       | [标准对话框](/components/modal/demo#standard-dialog)             |
|         content          |       `string、Component`       |     --     | 可选，弹出框内容，支持字符串和组件                                       | [标准对话框](/components/modal/demo#standard-dialog)             |
|           html           |            `boolean`            |     --     | 可选，content是否是html代码                                              | [警告弹出框](/components/modal/demo#warning-pop-up)              |
|         injector         |           `Injector`            |    true    | 可选，可以选择指定将用作组件的父级的注射器。                             |
|           data           |            `object`             |     --     | 可选，当content为Component时，传递到Component实例中的属性                | [标准对话框](/components/modal/demo#standard-dialog)             |
|         buttons          |             `array`             |     --     | 可选，弹出框按钮，支持自定义文本、样式、禁用、点击事件                   | [标准对话框](/components/modal/demo#standard-dialog)             |
|       showAnimate        |            `boolean`            |     --     | 可选，是否显示动画，                                                     | [拦截对话框关闭](/components/modal/demo#intercept-dialog-closed) |
|    backdropCloseable     |            `boolean`            |    true    | 可选，点击空白处是否能关闭弹出框，                                       | [拦截对话框关闭](/components/modal/demo#intercept-dialog-closed) |
| componentFactoryResolver |   `ComponentFactoryResolver`    |     --     | 可选，自定义动态渲染组件解析器，                                         |
|         onClose          |           `Function`            |     --     | 可选，弹出框关闭之后回调的函数，                                         | [标准对话框](/components/modal/demo#standard-dialog)             |
|       beforeHidden       | `Function、Promise、Observable` |     --     | 可选，可以阻止对话框关闭                                                 | [拦截对话框关闭](/components/modal/demo#intercept-dialog-closed) |
|        dialogtype        |            `string`             | 'standard' | 可选，弹出框类型，有四种选择[[standard、success、failed、warning、info]] | [标准对话框](/components/modal/demo#standard-dialog)             |
|        draggable         |            `boolean`            |    true    | 可选，弹出框是否可拖拽                                                   |
|        placement         | enum('center', 'top', 'bottom') |  'center'  | 可选，弹出框出现的位置                                                   |
|         offsetX          |            `string`             |   '0px'    | 可选，弹出框横向偏移                                                     |
|         offsetY          |            `string`             |   '0px'    | 可选，弹出框纵向偏移                                                     |
|      bodyScrollable      |            `boolean`            |   false    | 可选，dialog 打开 body 是否可滚动，默认不可滚动                          |
|     contentTemplate      |       `TemplateRef<any>`        |     --     | 可选，弹出框内容模板，与content不兼容                                    | [自定义弹出框内容模板](/components/modal/demo#template-content)  |
|        escapable         |            `boolean`            |    true    | 可选，是否支持esc键关闭弹窗                                              |

### ModalOpenResult

|         属性         |       类型       |                       说明                        |                      跳转 Demo                       |
| :------------------: | :--------------: | :-----------------------------------------------: | :--------------------------------------------------: |
|    modalInstance     | `ModalComponent` | 返回 Modal 对象，可以作为contentTemplate的context | [标准对话框](/components/modal/demo#standard-dialog) |
| modalContentInstance |   `Type<any>`    |               返回 Modal 内容的对象               | [标准对话框](/components/modal/demo#standard-dialog) |

### modalInstance 公共方法
| 方法名 | 参数  | 默认值 |   说明    | 跳转 Demo |          
| :----: | :---: | :----- | :-------: | :-------: |
|  hide  |  --   | --     | 关闭modal | [标准对话框](/components/modal/demo#standard-dialog) |

### buttons 类型定义

```javascript
buttons: Array<{
    id?: string;
    cssClass?: string;
    text: string;
    handler: ($event: Event) => void;
    btnwidth?: string;
    autofocus?: boolean;
    disabled?: boolean;
  }>;
```

## dMoveable 指令

|   参数    |     类型      | 默认  | 说明                                                | 跳转 Demo |
| :-------: | :-----------: | :---: | :-------------------------------------------------- | --------- |
| dMoveable |   `boolean`   | false | 可选，是否启用拖动移动功能                          |
|  handle   | `HTMLElement` |  --   | 可选，可以拖动的元素                                |
|  moveEl   | `HTMLElement` |  --   | 可选，被拖动的区块，默认为使用 dMoveable 指令的元素 |
