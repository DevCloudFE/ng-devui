# How to use

Import into module:

```typescript
import { AccordionModule } from ' ng-devui/accordion';
```

On the page:

```html
<d-accordion [data]="data"></d-accordion>
```

## Accordion

### d-accordion parameter

|     Parameter      |                          Type                          |  Default   |                                                                                                                                                                                     Description                                                                                                                                                                                     | Jump to Demo                                                               |Global Config| 
| :----------------: | :----------------: | :----------------------------------------------------: | :--------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------------------- |
|        data        |           `Array<any> \| AccordionMenuType`            |     --     |                                                                                                                                               Required. Data source. You can customize an array or use the preset `AccordionMenuType`                                                                                                                                               | [Basic usage](demo#basic-usage)                                            |
|      titleKey      |                        `string`                        |  'title'   |                                                                                                                                        Optional. Title attribute name. The type of item[titleKey] is `string`, indicating the title content.                                                                                                                                        | [Change key value](demo#change-values)                                     |
|     loadingKey     |                        `string`                        | 'loading'  |                                                                                                                                   Optional. attribute name for determining whether a submenu is loaded. The type of item[loadingKey] is `boolean`                                                                                                                                   | [Change key value](demo#change-values)                                     |
|    childrenKey     |                        `string`                        | 'children' |                                                                                                                                                   Optional. Submenu attribute name. The type of item[childrenKey] is `Array<any>`                                                                                                                                                   | [Change key value](demo#change-values)                                     |
|    disabledKey     |                        `string`                        | 'disabled' |                                                                                                                                          Optional. indicating whether to disable the attribute. The type of item[disabledKey] is `boolean`                                                                                                                                          | [Change key value](demo#change-values)                                     |
|     activeKey      |                        `string`                        |  'active'  |                                                                                                                                            Optional. indicating whether a submenu is activated. The type of item[activeKey] is `boolean`                                                                                                                                            | [Change key value](demo#change-values)                                     |
|      openKey       |                        `string`                        |   'open'   |                                                                                                                                               Optional. indicating whether a menu is expanded. The type of item[openKey] is `boolean`                                                                                                                                               | [Change key value](demo#change-values)                                     |
|  restrictOneOpen   |                       `boolean`                        |   false    |                                                                                                                                            Optional. Only one level-1 menu can be opened at a time. By default, there is no restriction.                                                                                                                                            | [Basic usage](demo#basic-usage)                                            |
|  menuItemTemplate  |                   `TemplateRef<any>`                   |  Built-in  |                                                                                                                                        Optional. It can expand the menu content bar template. The available variable values are as follows.                                                                                                                                         | [Using a Template](demo#using-templates)                                   |
|    itemTemplate    |                   `TemplateRef<any>`                   |  Built-in  |                                                                                                                                        Optional. The menu content bar template can be clicked. The available variable values are as follows:                                                                                                                                        | [Using a Template](demo#using-templates)                                   |
| noContentTemplate  |                   `TemplateRef<any>`                   |  Built-in  |                                                                                                                                     Optional. If there is no content, use a customized template. The available variable values are as follows:                                                                                                                                      | [Using a Template](demo#using-templates)                                   |
|  loadingTemplate   |                   `TemplateRef<any>`                   |  Built-in  |                                                                                                                                          Optional. A customized template is used for loading. The available variable values are as follows                                                                                                                                          | [Using a Template](demo#using-templates)                                   |
| innerListTemplate  |                   `TemplateRef<any>`                   |  Built-in  |                                                                                                                               Optional. The sublist content is customized and used as a folding panel. The available variable values are as follows.                                                                                                                                | [Using a Template](demo#using-templates)                                   |
|      linkType      | `'routerLink'\|'hrefLink'\|'dependOnLinkTypeKey'\|'''` |     ''     |                                                     Optional. `routerLink'` indicates the routing scenario. `hrefLink'` indicates the external link scenario. `dependOnLinkTypeKey'` indicates the dynamic routing or external link scenario. `''` is the default non-link type (you cannot right-click to open a new tab page)                                                     | [Built-in route and link type](demo#use-built-in-routing-and-link-types)   |
|    linkTypeKey     |                        `string`                        | 'linkType' | Optional. Key value of the link type, which is used to specify the object link type attribute name when linkType is set to `'dependOnLinkTypeKey'`. The value of item[linkTypeKey] is `'routerLink'\|'hrefLink'\| string`, in the preceding information, `routerLink'` indicates a route link, `hrefLink'` indicates an external link, and other values are default non-link types. |
|      linkKey       |                        `string`                        |   'link'   |                                                                                                Optional. Key of the link content, which is used to set the value of the link value when linkType is not set to ````. item[linkKey] indicates the route address or hyperlink address.                                                                                                |
|   linkTargetKey    |                        `string`                        |  'target'  |                                                                                                                 Optional. Key of the target window to be linked, which is used for the link type. item[linkTargetKey] indicates the target window of a single link.                                                                                                                 |
| linkDefaultTarget  |                        `string`                        |  '\_self'  |                                                                                                     Optional. If target is not set, the default value of target is `'\_self'`, which is used for the link type and its value is the same as that of target attribute of link a.                                                                                                     | [Built-in route and link type](demo#use-built-in-routing-and-link-types)   |
| autoOpenActiveMenu |                       `boolean`                        |   false    |                                                                                                                                                        Optional. Whether to automatically expand menus with active subitems                                                                                                                                                         | [Composite Hierarchy and Auto Expand](demo#compound-level-and-auto-expand) |
|   accordionType    |                 `normal ' \| 'embed'`                  |  'normal'  |                                                                                                                                                   Optional. The menu format is common (with shadow) or embedded (without shadow).                                                                                                                                                   | [Basic usage](demo#basic-usage)                                            |
|   showAnimation    |                       `boolean`                        |    true    |                                                                                                                                                                 Optional. Indicating whether to display animations.                                                                                                                                                                 | [Built-in route and link type](demo#use-built-in-routing-and-link-types)   | ✔ |

### d-accordion event

|      Event       |                                   Type                                    |                                                                                                                                        Description                                                                                                                                         | Jump to Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------- |
|    menuToggle    | `EventEmitter<`[`AccordionMenuToggleEvent`](#accordionmenutoggleevent)`>` |  Optional. The menu can be expanded. In the returned object, the attribute item is the object data clicked. If open is true, the object will be expanded. If open is false, the object will be closed. If parent is the parent object data. Event is the native event of the click event.  | [Basic usage](demo#basic-usage) |
|    itemClick     |  `EventEmitter<`[`AccordionItemClickEvent`](#accordionitemclickevent)`>`  | Optional. It can click a menu event. In the returned object, the attribute item is the object data of the clicked object, the preActive object is the object expanded last time, the parent object is the data of the parent object, and the event is the native event of the click event. | [Basic usage](demo#basic-usage) |
| activeItemChange |                            `EventEmitter<any>`                            |                                                                                                   Optional. Data of the newly activated sub-item is sent when the sub-item is switched.                                                                                                    | [Basic usage](demo#basic-usage) |

### AccordionMenuType Definition

```typescript
/* Basic data type */
type AccordionMenuItemLinkType = 'routerLink' | 'hrefLink' | string;
export interface AccordionBase {
  title: string;
  disabled?: boolean;
  [prop: string]: any;
}
interface IAccordionActiveable {
  active?: boolean;
}
interface IAccordionFoldable<T> {
  open?: boolean;
  loading?: boolean;
  children?: Array<T>;
}
interface IAccordionLinkable {
  link?: string;
  target?: boolean;
  linkType?: AccordionMenuItemLinkType;
}
export interface AccordionBaseItem extends AccordionBase, IAccordionActiveable {}
export interface AccordionBaseMenu<T> extends AccordionBase, IAccordionFoldable<T> {}
export interface AccordionLinkableItem extends AccordionBase, IAccordionActiveable, IAccordionLinkable {}
export interface AccordionMenuItem extends AccordionBase, IAccordionActiveable, IAccordionFoldable<AccordionMenuItem>, IAccordionLinkable {}
export type AccordionMenuType = Array<AccordionMenuItem>;

/* Common configuration data type */
interface AccordionMenuKeyGroup {
  titleKey?: string;
  activeKey?: string;
  disabledKey?: string;
  openKey?: string;
  loadingKey?: string;
  childrenKey?: string;
  linkKey?: string;
  linkTargetKey?: string;
  linkTypeKey?: string;
}
type AccordionTemplateRefArray = 'itemTemplate' | 'menuItemTemplate' | 'noContentTemplate' | 'loadingTemplate' | 'innerListTemplate';
type AccordionTemplateRefGroup = {
  [p in AccordionTemplateRefArray]: TemplateRef<any>;
};
interface AccordionConfigOptions {
  restrictOneOpen?: boolean;
  autoOpenActiveMenu?: boolean;
  showNoContent?: boolean;
  linkDefaultTarget?: string;
  i18nText: any;
  linkType: 'routerLink' | 'hrefLink' | 'dependOnLinkTypeKey' | '';
}
export interface AccordionOptions extends AccordionConfigOptions, AccordionMenuKeyGroup, AccordionTemplateRefGroup {}
```

## AccordionMenuToggleEvent

```typescript
export type AccordionMenuToggleEvent = {
  item: any;
  open: boolean;
  parent: any;
  event: MouseEvent;
};
```

## AccordionItemClickEvent

```typescript
export type AccordionItemClickEvent = {
  item: any;
  prevActiveItem?: any;
  parent: any;
  event: MouseEvent;
};
```

### Templates can use variable values.

#### Variable Usage

```html
<ng-template let-myitem="item">{{myitem}}</ng-template>
```

#### menuItemTemplate Available variable values

|      Variable      |    Type    |                                     Variable Description                                     |
| :----------------: | :--------: | :------------------------------------------------------------------------------------------: |
|        item        |   `any`    |                                     Expandable menu data                                     |
|       deepth       |  `number`  |                            Indicates the nested structure level.                             |
|       parent       |   `any`    |                                       Parent menu data                                       |
|   ~~~titleKey~~~   |  `string`  |                   Deprecated.~~~ The titleKey value of the component. ~~~                    |
| ~~~disabledKey~~~  |  `string`  |              Deprecated. ~~~ The value of the disabledKey of the component. ~~~              |
|   ~~~openKey~~~    |  `string`  |                   Deprecated. ~~~ The openKey value of the component. ~~~                    |
| ~~~menuToggleFn~~~ | `Function` | Deprecated.~~~ The parameter should be item, indicating that the level-1 menu is clicked.~~~ |

#### itemTemplate Available variable values

|     Variable      |    Type    |                                     Variable Description                                     |
| :---------------: | :--------: | :------------------------------------------------------------------------------------------: |
|       item        |   `any`    |                                     Clickable menu data                                      |
|      deepth       |  `number`  |                       The value indicates the nested structure level.                        |
|      parent       |   `any`    |                                       Parent menu data                                       |
|  ~~~titleKey~~~   |  `string`  |                    Deprecated.~~~ The titleKey value of the component ~~~                    |
| ~~~disabledKey~~~ |  `string`  |               Deprecated.~~~ The value of the disabledKey of the component ~~~               |
|  ~~~activeKey~~~  |  `string`  |                   Deprecated.~~~ The activeKey value of the component ~~~                    |
| ~~~itemClickFn~~~ | `Function` | Deprecated. ~~~The parameter should be item, indicating that the level-2 menu is clicked.~~~ |

#### noContentTemplate Available variable value

| Variable |   Type   |              Variable Description               |
| :------: | :------: | :---------------------------------------------: |
|   item   |  `any`   |             Parent menu single data             |
|  deepth  | `number` | The value indicates the nested structure level. |

#### loadingTemplate Available variable values

|        Variable         |       Type       |              Variable Description               |
| :---------------------: | :--------------: | :---------------------------------------------: |
|          item           |      `any`       |             Parent menu single data             |
|         deepth          |     `number`     | The value indicates the nested structure level. |
| LoadingKey value of the | ~~~loadingKey~~~ |                    `string`                     | ~~~ component ~~~ |

#### InnerListTemplate Available Variable Values

|     Variable      |    Type    |                                                                   Variable Description                                                                   |
| :---------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       item        |   `any`    |                                                                 Parent menu single data                                                                  |
|      deepth       |  `number`  |                                                     The value indicates the nested structure level.                                                      |
|  ~~~titleKey~~~   |  `string`  |                                                  Deprecated.~~~The titleKey value of the component ~~~                                                   |
| ~~~loadingKey~~~  |  `string`  |                                                Deprecated.~~~ The loading key value of the component ~~~                                                 |
| ~~~childrenKey~~~ |  `string`  |                                               Deprecated.~~~ The value of childrenKey of the component ~~~                                               |
| ~~~disabledKey~~~ |  `string`  |                                             Deprecated.~~~ The value of the disabledKey of the component ~~~                                             |
|   ~~~openKey~~~   |  `string`  |                                                  Deprecated.~~~ The openKey value of the component ~~~                                                   |
|  ~~~activeKey~~~  |  `string`  |                                      Deprecated. ~~~ The activeKey value of the component Use the level-2 menu ~~~                                       |
|   menuToggleFn    | `Function` |                The parameter should be item, indicating that the menu is expanded. The optional parameter event, original event, is used.                |
|    itemClickFn    | `Function` | The parameter must be an item of a menu that can be clicked, indicating that the menu is clicked. The optional parameter event, original event, is used. |
