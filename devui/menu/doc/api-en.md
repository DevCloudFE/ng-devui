# How to use

Import into module:

```typescript
import { MenuModule } from 'ng-devui/menu';
```

On the page:

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

### dMenu Parameter

|        Parameter        |                         Type                          |    Default    |                                                                                                                  Description                                                                                                                  | Jump to Demo                                                      |Global Config| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|      collapsed      |                       `boolean`                        |  false   |                                                                                    whether to disable collapse                                                                                    | [Open Close](demo#open-close)                                 |

### dMenu Event

|       Event       |                                   Type                                    |                                                                            Description                                                                            | Jump to Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------- |
|    menuItemClick    | [MenuItemClickType](#menutypeDefinition) | Click Event on the menu item, and the Parameter is the instruction and native MouseEvent of the dMenu item itself | [Basic usage](demo#basic-usage) |                                                                        | [Basic usage](demo#basic-usage) |


### dSubMenu Parameter

|        Parameter        |                         Type                          |    Default    |                                                                                                                  Description                                                                                                                  | Jump to Demo                                                      |Global Config| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|      title      |                       string or TemplateRef<[SubTitleContextType](#menutypeDefinition)>                       |  ''   |  title                                                                                   |                           |
|      noStyle      |                       `boolean`                        |  false   |  whether to remove all prefabricated styles                                                                                   |                                |
|      open      |                       `boolean`                        |  false   |  whether to disable open                                                                                  |                             |
|      disabled      |                       `boolean`                        |  false   |  whether to disable interactive                                                                              |                                |
|      icon      |                       `string`                        |  ''   |  Icon                                                                         |                               |

### dSubMenu Event

|       Event       |                                   Type                                    |                                                                            Description                                                                            | Jump to Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------- |
|    openChange    | `boolean` | Open close change Event |                                                                                                        |  |

### dMenuItem Parameter

|        Parameter        |                         Type                          |    Default    |                                                                                                                  Description                                                                                                                  | Jump to Demo                                                      |Global Config| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|      active      |                       `boolean`                       |  false   |  whether to selected                                                                                   |                           |
|      noStyle      |                       `boolean`                        |  false   |  whether to remove all prefabricated Styles                                                                                         |                                |
|      disabled      |                       `boolean`                        |  false   |  whether to disable interactive                                                                                          |                                |

### dMenuItem Event

|       Event       |                                   Type                                    |                                                                            Description                                                                            | Jump to Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------- |
|    itemClick    | `MouseEvent` | Click Event |                                                                                                        |  |



### MenuTypeDefinition

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

### Templates can use variable values.

#### SubmenuTitleTemplate Available variable values

|        Variable        |    Type    |                   Variable                  |
| :----------------: | :--------: | :-----------------------------------------------: |
|       $implicit        |   `string`    |                title attribute                 |
|       disabled       |  `boolean`  |                 represents a nested structure hierarchy                  |
|       open       |   `boolean`    |                 parent Menu Data                  |
|   icon   |  `string`  |        Icon   |


### css variable

|        Variable        |    Type    |        Default    |          Description                    |
| :----------------: | :--------: | :---------------: |---------------------------------: |
|       --devui-menu-width        |   `string`    |      100%  |          menu width                 |
|       --devui-menu-item-height       |  `string`  |       36  |          menu item height                  |
|       --devui-menu-item-gap      |  `string`  |              4    |       menu item gap                    |
|       --devui-menu-item-static-padding       |   `string`    |   12  |     menu item indent distance                |
|   --devui-padding-size   |  `string`  |    16  |     menu item basic indent distance    |
|   --devui-menu-icon-gap  |  `string`  |     10  |   the spacing between title and icon   |
