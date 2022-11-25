# 如何使用

在 module 中引入：

```typescript
import { AccordionModule } from 'ng-devui/accordion';
```

在 standalone 中引入：

```typescript
import { AccordionComponent } from 'ng-devui/accordion';
```

在页面中使用:

```html
<d-accordion [data]="data"></d-accordion>
```

## Accordion

### d-accordion 参数

|        参数        |                         类型                          |    默认    |                                                                                                                  说明                                                                                                                  | 跳转 Demo                                                      |全局配置项| 
| :----------------: | :----------------: | :---------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|        data        |           `Array<any> \| AccordionMenuType`           |     --     |                                                                                     必选，数据源，可以自定义数组或者使用预设的`AccordionMenuType`                                                                                      | [基本用法](demo#basic-usage)                                   |
|      titleKey      |                       `string`                        |  'title'   |                                                                                    可选，标题的属性名，item[titleKey]类型为`string`，为标题显示内容                                                                                    | [改变键值](demo#change-values)                                 |
|     loadingKey     |                       `string`                        | 'loading'  |                                                                                  可选，子菜单是否加载中的判断属性名，item[loadingKey]类型为`boolean`                                                                                   | [改变键值](demo#change-values)                                 |
|    childrenKey     |                       `string`                        | 'children' |                                                                                       可选，子菜单的属性名，item[childrenKey]类型为`Array<any>`                                                                                        | [改变键值](demo#change-values)                                 |
|    disabledKey     |                       `string`                        | 'disabled' |                                                                                        可选，是否禁用的属性名，item[disabledKey]类型为`boolean`                                                                                        | [改变键值](demo#change-values)                                 |
|     activeKey      |                       `string`                        |  'active'  |                                                                                      可选，子菜单是否激活的属性名，item[activeKey]类型为`boolean`                                                                                      | [改变键值](demo#change-values)                                 |
|      openKey       |                       `string`                        |   'open'   |                                                                                        可选，菜单是否展开的属性名，item[openKey]类型为`boolean`                                                                                        | [改变键值](demo#change-values)                                 |
|  restrictOneOpen   |                       `boolean`                       |   false    |                                                                                            可选，限制一级菜单同时只能打开一个， 默认不限制                                                                                             | [基本用法](demo#basic-usage)                                   |
|  menuItemTemplate  |                  `TemplateRef<any>`                   |    内置    |                                                                                              可选， 可展开菜单内容条模板，可用变量值见下                                                                                               | [使用模板](demo#using-templates)                               |
|    itemTemplate    |                  `TemplateRef<any>`                   |    内置    |                                                                                               可选，可点击菜单内容条模板，可用变量值见下                                                                                               | [使用模板](demo#using-templates)                               |
| noContentTemplate  |                  `TemplateRef<any>`                   |    内置    |                                                                                           可选，没有内容的时候使用自定义模板，可用变量值见下                                                                                           | [使用模板](demo#using-templates)                               |
|  loadingTemplate   |                  `TemplateRef<any>`                   |    内置    |                                                                                               可选，加载中使用自定义模板，可用变量值见下                                                                                               | [使用模板](demo#using-templates)                               |
| innerListTemplate  |                  `TemplateRef<any>`                   |    内置    |                                                                                        可选，子列表内容完全自定义，用做折叠面板，可用变量值见下                                                                                        | [使用模板](demo#using-templates)                               |
|      linkType      | `'routerLink'\|'hrefLink'\|'dependOnLinkTypeKey'\|''` |     ''     |                                       可选，`'routerLink'`为路由场景；`'hrefLink'`为外部链接场景；`'dependOnLinkTypeKey'`为动态路由或外部链接场景；`''`为默认非链接类型（无法右键打开新标签页）                                        | [内置路由和链接类型](demo#use-built-in-routing-and-link-types) |
|    linkTypeKey     |                       `string`                        | 'linkType' | 可选，链接内容的类型的 key 值，用于 linkType 为`'dependOnLinkTypeKey'`时指定对象链接类型属性名，item[linkTypeKey]类型为`'routerLink'\|'hrefLink'\| string`，其中`'routerLink'`为路由链接，`'hrefLink'`为外部链接，其他为默认非链接类型 |
|      linkKey       |                       `string`                        |   'link'   |                                                          可选，链接内容的 key，用于 linkType 为连接类型记非`''`时，链接的取值的属性值，item[linkKey]为路由地址或者超链接地址                                                           |
|   linkTargetKey    |                       `string`                        |  'target'  |                                                                            可选，链接目标窗口的 key，用于链接类型，item[linkTargetKey]为单个链接的目标窗口                                                                             |
| linkDefaultTarget  |                       `string`                        |  '\_self'  |                                                                   可选，不设置 target 的时候 target 默认值为`'_self'`，用于链接类型, 取值等同于 a 链接的 target 属性                                                                   | [内置路由和链接类型](demo#use-built-in-routing-and-link-types) |
| autoOpenActiveMenu |                       `boolean`                       |   false    |                                                                                                  可选，是否自动展开带有活跃子项的菜单                                                                                                  | [复合层级和自动展开](demo#compound-level-and-auto-expand)      |
|   accordionType    |                  `'normal'\|'embed'`                  |  'normal'  |                                                                                           可选，菜单形式是普通（带阴影）还是内嵌（不带阴影）                                                                                           | [基本用法](demo#basic-usage)                                   |
|   showAnimation    |    `boolean`                  |           true         |   可选，是否展示动画         | [内置路由和链接类型](demo#use-built-in-routing-and-link-types)   | ✔ |
|   showNoContent    |    `boolean`                  |           true         |   可选，没有内容的时候是否显示没有数据         |    |  |

### d-accordion 事件

|       事件       |                                   类型                                    |                                                                            说明                                                                            | 跳转 Demo                    |
| :--------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------- |
|    menuToggle    | `EventEmitter<`[`AccordionMenuToggleEvent`](#accordionmenutoggleevent)`>` | 可选，可展开菜单展开事件，返回对象里属性 item 为点击的对象数据，open 为 true 则将要展开 false 则将要关闭， parent 为父对象数据，event 为点击事件的原生事件 | [基本用法](demo#basic-usage) |
|    itemClick     |  `EventEmitter<`[`AccordionItemClickEvent`](#accordionitemclickevent)`>`  |     可选，可点击菜单点击事件，返回对象里属性 item 为点击的对象数据，preActive 对象为上一次展开的对象， parent 为父对象数据，event 为点击事件的原生事件     | [基本用法](demo#basic-usage) |
| activeItemChange |                            `EventEmitter<any>`                            |                                                        可选，子项切换的时候会发出新激活的子项的数据                                                        | [基本用法](demo#basic-usage) |

### AccordionMenuType 定义

```typescript
/* 基础数据类型 */
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

/* 通用公共配置数据类型 */
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

``` typescript
export type AccordionMenuToggleEvent = {
  item: any;
  open: boolean;
  parent: any;
  event: MouseEvent;
};
```

## AccordionItemClickEvent

``` typescript
export type AccordionItemClickEvent = {
  item: any;
  prevActiveItem?: any;
  parent: any;
  event: MouseEvent;
};
```

### 模板可以用变量值

#### 变量使用方法

```html
<ng-template let-myitem="item">{{myitem}}</ng-template>
```

#### menuItemTemplate 可用变量值

|        变量        |    类型    |                   变量含义说明                    |
| :----------------: | :--------: | :-----------------------------------------------: |
|        item        |   `any`    |                可展开类型菜单数据                 |
|       deepth       |  `number`  |                 表示嵌套结构层级                  |
|       parent       |   `any`    |                 所属父级菜单数据                  |
|   ~~~titleKey~~~   |  `string`  |        `已经废弃`~~~组件的 titleKey 值~~~         |
| ~~~disabledKey~~~  |  `string`  |       `已经废弃`~~~组件的 disabledKey 值~~~       |
|   ~~~openKey~~~    |  `string`  |         `已经废弃`~~~组件的 openKey 值~~~         |
| ~~~menuToggleFn~~~ | `Function` | `已经废弃`~~~参数应为 item，表示一级菜单被点击~~~ |

#### itemTemplate 可用变量值

|       变量        |    类型    |                   变量含义说明                    |
| :---------------: | :--------: | :-----------------------------------------------: |
|       item        |   `any`    |                可点击类型菜单数据                 |
|      deepth       |  `number`  |                值表示嵌套结构层级                 |
|      parent       |   `any`    |                 所属父级菜单数据                  |
|  ~~~titleKey~~~   |  `string`  |        `已经废弃`~~~ 组件的 titleKey 值~~~        |
| ~~~disabledKey~~~ |  `string`  |      `已经废弃`~~~ 组件的 disabledKey 值~~~       |
|  ~~~activeKey~~~  |  `string`  |       `已经废弃`~~~ 组件的 activeKey 值~~~        |
| ~~~itemClickFn~~~ | `Function` | `已经废弃`~~~参数应为 item，表示二级菜单被点击~~~ |

#### noContentTemplate 可用变量值

|  变量  |   类型   |    变量含义说明    |
| :----: | :------: | :----------------: |
|  item  |  `any`   |  父级菜单单个数据  |
| deepth | `number` | 值表示嵌套结构层级 |

#### loadingTemplate 可用变量值

|       变量       |   类型   |        变量含义说明        |
| :--------------: | :------: | :------------------------: |
|       item       |  `any`   |      父级菜单单个数据      |
|      deepth      | `number` |     值表示嵌套结构层级     |
| ~~~loadingKey~~~ | `string` | ~~~组件的 loadingKey 值~~~ |

#### innerListTemplate 可用变量值

|       变量        |    类型    |                            变量含义说明                            |
| :---------------: | :--------: | :----------------------------------------------------------------: |
|       item        |   `any`    |                          父级菜单单个数据                          |
|      deepth       |  `number`  |                         值表示嵌套结构层级                         |
|  ~~~titleKey~~~   |  `string`  |                 `已经废弃`~~~组件的 titleKey 值~~~                 |
| ~~~loadingKey~~~  |  `string`  |                `已经废弃`~~~组件的 loadingKey 值~~~                |
| ~~~childrenKey~~~ |  `string`  |               `已经废弃`~~~组件的 childrenKey 值~~~                |
| ~~~disabledKey~~~ |  `string`  |               `已经废弃`~~~组件的 disabledKey 值~~~                |
|   ~~~openKey~~~   |  `string`  |                 `已经废弃`~~~组件的 openKey 值~~~                  |
|  ~~~activeKey~~~  |  `string`  |          `已经废弃`~~~组件的 activeKey 值，用二级菜单~~~           |
|   menuToggleFn    | `Function` |      参数应为 item，表示菜单被展开，可选参数 event，原始事件       |
|    itemClickFn    | `Function` | 参数应为可点击菜单的 item，表示菜单被点击,可选参数 event，原始事件 |
