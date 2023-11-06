# 如何使用

在 module 中引入：

```typescript
import { MenuModule } from 'ng-devui/menu';
```

在页面中使用:

```html
<div dMenu>
   <div dMenuItem>
    <d-icon class="devui-menu-item-icon" icon="icon-op-list" />
    <span class="devui-menu-item-name">menu item 1</span>
   </div>
   <div dSubMenu title="sub menu" icon="icon-more-func">
      <div dMenuItem>
        <d-icon class="devui-menu-item-icon" icon="icon-op-list" />
        <span class="devui-menu-item-name">sub menu item 1</span>
      </div>
      <div dMenuItem>
        <d-icon class="devui-menu-item-icon" icon="icon-op-list" />
        <span class="devui-menu-item-name">sub menu item 2</span>
      </div>
    </div>
    <div dMenuItem>
      <d-icon class="devui-menu-item-icon" icon="icon-op-list" />
      <span class="devui-menu-item-name">menu item 3</span>
    </div>
  </div>
```

## Menu

### dMenu 参数

|        参数        |                         类型                          |    默认    |                                                                                                                  说明                                                                                                                  | 跳转 Demo                                                      |全局配置项| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|      collapsed      |                       `boolean`                        |  false   |                                                                                    是否收起                                                                                    | [展开收起](demo#open-close)                                 |

### dMenu 事件

|       事件       |                                   类型                                    |                                                                            说明                                                                            | 跳转 Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------- |
|    menuItemClick    | [MenuItemClickType](#menutype定义) | 可选，menu item点击事件，参数是d-menu-item自身的指令和原生MouseEvent | [基本用法](demo#basic-usage) |                                                                                                        | [基本用法](demo#basic-usage) |


### dSubMenu 参数

|        参数        |                         类型                          |    默认    |                                                                                                                  说明                                                                                                                  | 跳转 Demo                                                      |全局配置项| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|      title      |                       string 或 TemplateRef<[SubTitleContextType](#menutype定义)>                       |  ''   |  标题                                                                                   |                           |
|      noStyle      |                       `boolean`                        |  false   |  是否移除所有预制样式                                                                                   |                                |
|      open      |                       `boolean`                        |  false   |  是否展开                                                                                |                             |
|      disabled      |                       `boolean`                        |  false   |  是否禁用                                                                              |                                |
|      icon      |                       `string`                        |  ''   |  图标                                                                         |                               |

### dSubMenu 事件

|       事件       |                                   类型                                    |                                                                            说明                                                                            | 跳转 Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------- |
|    openChange    | `boolean` | 展开收起事件 |                                                                                                        |  |

### dMenuItem 参数

|        参数        |                         类型                          |    默认    |                                                                                                                  说明                                                                                                                  | 跳转 Demo                                                      |全局配置项| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|      active      |                       `boolean`                       |  false   |  是否选中                                                                                   |                           |
|      noStyle      |                       `boolean`                        |  false   |  是否移除所有预制样式                                                                                   |                                |
|      disabled      |                       `boolean`                        |  false   |  是否禁用                                                                              |                                |

### dMenuItem 事件

|       事件       |                                   类型                                    |                                                                            说明                                                                            | 跳转 Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------- |
|    itemClick    | `MouseEvent` | 点击事件 |                                                                                                        |  |



### MenuType定义

```typescript

interface MenuItemType {
  key: string;
  name: string;
  icon?: string;
  children?: MenuItemType[];
}

interface MenuItemClickType {
  item: MenuItemDirective;
  event: MouseEvent;
}

interface SubTitleContextType {
  $implicit: string;
  icon: string;
  open: boolean;
  disabled: boolean;
}

type MenuHoverTypes = 'enter' | 'leave';

export {
  MenuItemType,
  MenuItemClickType,
  SubTitleContextType,
  MenuHoverTypes,
};

```

### 模板可以用变量值

#### SubmenuTitleTemplate 可用变量值

|        变量        |    类型    |                   变量含义说明                    |
| :----------------: | :--------: | :-----------------------------------------------: |
|       $implicit        |   `string`    |                title属性                 |
|       disabled       |  `boolean`  |                 表示嵌套结构层级                  |
|       open       |   `boolean`    |                 所属父级菜单数据                  |
|   icon   |  `string`  |        图标   |


### css variable

|        变量        |    类型    |           默认    |            变量含义说明                    |
| :----------------: | :--------: | :----------------: |-------------------------------: |
|       --devui-menu-width        |   `string`    |         100%    |           菜单宽度                 |
|       --devui-menu-item-height       |  `string`  |              36    |       单个菜单高度                  |
|       --devui-menu-item-gap      |  `string`  |              4    |       菜单间距                  |
|       --devui-menu-item-static-padding       |   `string`    |           12    |          单个菜单的缩进距离                  |
|   --devui-padding-size   |  `string`  |      16    |       菜单基础缩进距离   |
|   --devui-menu-icon-gap  |  `string`  |       10    |     title和icon的间距   |
