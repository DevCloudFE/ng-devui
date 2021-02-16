## d-breadcrumb-item parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :----------------: | :-----------------: | :---: | :------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| showMenu | `boolean` | false | Optional. Indicating whether to display the drop-down arrow and content in the drop-down list | [Breadcrumbs with Dropdown menu](demo#drop-down-breadcrumbs) |
| menuList | `Array<MenuConfig>` | -- | Optional. This parameter is transferred when showMenu is set to true. Content displayed in the drop-down list box | [Breadcrumbs with Dropdown menu](demo#drop-down-breadcrumbs) |
| isSearch | `boolean` | false | Optional. This parameter is transferred when showMenu is set to true. Whether the search function is required in the drop-down list box | [Breadcrumbs with searchable Dropdown menu](demo#with-search-drop-down-breadcrumbs) |
| customMenuTemplate | `TemplateRef<any>` | -- | Optional. This parameter is transferred when showMenu is set to true. Customized drop-down list box | [Customize](demo#self-defined-breadcrumbs) |

## d-breadcrumb-item event

| Event | Type | Description | Jump to Demo |
| :---------: | :-----------------: | :-----------------------------------------------------: | ------------------------------------------------------------------- |
| toggleEvent | `EventEmitter<any>` | Event of expanding or collapsed Dropdown menus. The return value is whether the current menu is opened | [Breadcrumbs with Dropdown menu](demo#drop-down-breadcrumbs) |

## d-breadcrumb

| Parameter | Type | Default | Description | Jump to Demo |
| :-----------: | :-------------------: | :---: | :------------------------------------------------- | -------------------------------------------------------------------------------------- |
| separatorIcon | `TemplateRef<any>` | ' / ' | Optional. Custom separator style | [Customize](demo#self-defined-breadcrumbs) |
| source | `Array<SourceConfig>` | [] | Optional. The breadcrumbs are displayed in the default rendering mode based on the configured source | [Basic Breadcrumbs](demo#basic-breadcrumbs) |

```javascript
MenuConfig {
  name: string;
  link: string;
  linkType? :'hrefLink' | 'routerLink';
  target? : string;
}
```

name: indicates the name to be displayed.

link: indicates the jump path, which can be an absolute path or a relative path. The path must be the same as the route configuration.

linkType: link type. The default value is hrefLink. The value can be hrefLink or routerLink.

target: The target property specifies where to open the linked document.

Format of the input source:

```javascript
SourceConfig {
  title: string;
  link? : string;
  showMenu? : boolean;
  isSearch? : boolean;
  menuList? : Array<MenuConfig>;
  customMenuTemplate? :TemplateRef<any>;
  noNavigation? : boolean;
  target? :string;
  linkType? :'hrefLink' | 'routerLink';
}
```

title: name to be displayed

link: indicates the path to be redirected.

showMenu: indicates whether to display the drop-down list box.

isSearch: indicates whether the drop-down list box can be searched.

menuList: data in the drop-down list box. For details, see MenuConfig.

customMenuTemplate: customized drop-down list box

noNavigation: indicates whether a link cannot be redirected. This parameter is used to configure the link that cannot be redirected to the current location.

linkType: link type. The default value is hrefLink. The value can be hrefLink or routerLink.

target: The target property specifies where to open the linked document.

Note: Source data changes use the `Object.assign` method to trigger change detection.
