# How to use

Import into module:

```typescript
import { MenuModule } from 'ng-devui/menu';
```

On the page:

```html
<div d-menu>
   <div d-menu-item>
    <d-icon class="devui-menu-item-icon" icon="icon-op-list" />
    <span class="devui-menu-item-name">menu item 1</span>
   </div>
   <div d-sub-menu title="sub menu" icon="icon-more-func">
      <div d-menu-item>
        <d-icon class="devui-menu-item-icon" icon="icon-op-list" />
        <span class="devui-menu-item-name">sub menu item 1</span>
      </div>
      <div d-menu-item>
        <d-icon class="devui-menu-item-icon" icon="icon-op-list" />
        <span class="devui-menu-item-name">sub menu item 2</span>
      </div>
    </div>
    <div d-menu-item>
      <d-icon class="devui-menu-item-icon" icon="icon-op-list" />
      <span class="devui-menu-item-name">menu item 3</span>
    </div>
  </div>
```

## Menu

### d-menu Parameter

|        Parameter        |                         Type                          |    Default    |                                                                                                                  Description                                                                                                                  | Jump to Demo                                                      |Global Config| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|      collapsed      |                       `boolean`                        |  false   |                                                                                    whether to disable collapse                                                                                    | [Open Close](demo#open-close)                                 |

### d-menu Event

|       Event       |                                   Type                                    |                                                                            Description                                                                            | Jump to Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------- |
|    menuItemClick    | [MenuItemClickType](#menutypeDefinition) | Click Event on the menu item, and the Parameter is the instruction and native MouseEvent of the d-menu item itself | [Basic usage](demo#basic-usage) |                                                                        | [Basic usage](demo#basic-usage) |


### d-sub-menu Parameter

|        Parameter        |                         Type                          |    Default    |                                                                                                                  Description                                                                                                                  | Jump to Demo                                                      |Global Config| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|      title      |                       string or TemplateRef<[SubTitleContextType](#menutypeDefinition)>                       |  ''   |  title                                                                                   |                           |
|      noStyle      |                       `boolean`                        |  false   |  whether to remove all prefabricated styles                                                                                   |                                |
|      open      |                       `boolean`                        |  false   |  whether to disable open                                                                                  |                             |
|      disabled      |                       `boolean`                        |  false   |  whether to disable interactive                                                                              |                                |
|      icon      |                       `string`                        |  ''   |  Icon                                                                         |                               |

### d-sub-menu Event

|       Event       |                                   Type                                    |                                                                            Description                                                                            | Jump to Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------- |
|    openChange    | `boolean` | Open close change Event |                                                                                                        |  |

### d-menu-item Parameter

|        Parameter        |                         Type                          |    Default    |                                                                                                                  Description                                                                                                                  | Jump to Demo                                                      |Global Config| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|      active      |                       `boolean`                       |  false   |  whether to selected                                                                                   |                           |
|      noStyle      |                       `boolean`                        |  false   |  whether to remove all prefabricated Styles                                                                                         |                                |
|      disabled      |                       `boolean`                        |  false   |  whether to disable interactive                                                                                          |                                |

### d-menu-item Event

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
|       disabled       |  `boolean`  |                 Represents a nested structure hierarchy                  |
|       open       |   `boolean`    |                 Parent Menu Data                  |
|   icon   |  `string`  |        Icon   |