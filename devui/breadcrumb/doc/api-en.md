# How to use

Import into module:

```ts
import { BreadcrumbModule } from 'ng-devui/breadcrumb';
```

In the page:

```xml
//use d-breadcrumb-item
<d-breadcrumb>
  <d-breadcrumb-item></d-breadcrumb-item>
</d-breadcrumb>

//use source
<d-breadcrumb [source]="source"></d-breadcrumb>
```
# d-breadcrumb-item
## d-breadcrumb-item Parameter

|      Parameter      |        Type        |      Default      |      Description         |         Jump to Demo          |
| :----------------: | :-----------------: | :---: | :------------------------------------------------------ | -------------------------------------------------------------------------------------- |
|       showMenu     |       `boolean`        |    false    |    Optional. Indicating whether to display the drop-down arrow and content in the drop-down list    |    [Breadcrumbs with Dropdown menu](demo#drop-down-breadcrumbs)    |
|      menuList      |    [`Array<MenuConfig>`](#menuconfig) |      --     | Optional. This parameter is transferred when showMenu is set to true. Content displayed in the drop-down list box | [Breadcrumbs with Dropdown menu](demo#drop-down-breadcrumbs) |
|      isSearch      |       `boolean`        |    false    | Optional. This parameter is transferred when showMenu is set to true. Whether the search function is required in the drop-down list box | [Breadcrumbs with Dropdown menu](demo#drop-down-breadcrumbs) |
| customMenuTemplate |   `TemplateRef<any>`   |      --     | Optional. This parameter is transferred when showMenu is set to true. Customized drop-down list box | [Customize](demo#self-defined-breadcrumbs) |

## d-breadcrumb-item Event

| Event | Type | Description | Jump to Demo |
| :---------: | :-----------------: | :-----------------------------------------------------: | ------------------------------------------------------------------- |
| toggleEvent | `EventEmitter<boolean>` | Event of expanding or collapsed Dropdown menus. The return value is whether the current menu is opened | [Breadcrumbs with Dropdown menu](demo#drop-down-breadcrumbs) |

# d-breadcrumb
## d-breadcrumb Parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :-----------: | :-------------------: | :---: | :------------------------------------------------- | -------------------------------------------------------------------------------------- |
| separatorIcon |   `TemplateRef<any>`    |  ' / ' | Optional. Custom separator style | [Customize](demo#self-defined-breadcrumbs) |
|   source      |   [`Array<SourceConfig>`](#sourceconfig) |   []   | Optional. The breadcrumbs are displayed in the default rendering mode based on the configured source | [Source Config](demo#source-config-breadcrumbs) |

# Interface & Type Definition
### MenuConfig

```ts
export interface MenuConfig {
    name: string;
    link: string;
    linkType?: 'hrefLink' | 'routerLink';
    target?: string;
}
```

`name`: Indicates the name to be displayed.

`link`: Indicates the jump path, which can be an absolute path or a relative path. The path must be the same as the route configuration.

`linkType`: Link type. The default value is hrefLink. The value can be hrefLink or routerLink.

`target`: Specifies where to open the linked document.

### SourceConfig

```ts
export interface SourceConfig {
    title: string;
    link?: string;
    showMenu?: boolean;
    isSearch?: boolean;
    target?: string;
    menuList?: Array<MenuConfig>;
    customMenuTemplate?: TemplateRef<any>;
    noNavigation?: boolean;
    linkType?: 'hrefLink' | 'routerLink';
}
```

`title`: Name to be displayed

`link`: Indicates the path to be redirected.

`showMenu`: Indicates whether to display the drop-down list box.

`isSearch`: Indicates whether the drop-down list box can be searched.

`menuList`: Data in the drop-down list box. For details, see MenuConfig.

`customMenuTemplate`: Customized drop-down list box

`noNavigation`: Indicates whether a link cannot be redirected. This parameter is used to configure the link that cannot be redirected to the current location.

`linkType`: Link type. The default value is hrefLink. The value can be hrefLink or routerLink.

`target`: Specifies where to open the linked document.

Note: Source data changes use the `Object.assign` method to trigger change detection.
