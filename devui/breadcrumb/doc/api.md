## d-breadcrumb-item 参数

|        参数        |        类型         | 默认  | 说明                                                    | 跳转 Demo                                                                              |
| :----------------: | :-----------------: | :---: | :------------------------------------------------------ | -------------------------------------------------------------------------------------- |
|      showMenu      |      `boolean`      | false | 可选，是否需要显示下拉箭头及下拉列表内容                | [可下拉的面包屑](/components/breadcrumb/demo#drop-down-breadcrumbs)                    |
|      menuList      | `Array<MenuConfig>` |  --   | 可选，showMenu 为 true 时传入，下拉列表的显示内容       | [可下拉的面包屑](/components/breadcrumb/demo#drop-down-breadcrumbs)                    |
|      isSearch      |      `boolean`      | false | 可选，showMenu 为 true 时传入，下拉列表是否需要搜索功能 | [带搜索下拉的面包屑](/components/breadcrumb/demo#with-search-drop-down-breadcrumbs)    |
| customMenuTemplate | `TemplateRef<any>`  |  --   | 可选，showMenu 为 true 时传入，自定义下拉列表           | [自定义下拉列表和分隔符的面包屑](/components/breadcrumb/demo#self-defined-breadcrumbs) |

## d-breadcrumb-item 事件

|    事件     |        类型         |                          说明                           | 跳转 Demo                                                           |
| :---------: | :-----------------: | :-----------------------------------------------------: | ------------------------------------------------------------------- |
| toggleEvent | `EventEmitter<any>` | dropdown 菜单展开和收起的事件，返回值为当前菜单是否打开 | [可下拉的面包屑](/components/breadcrumb/demo#drop-down-breadcrumbs) |

## d-breadcrumb

|     参数      |         类型          | 默认  | 说明                                               | 跳转 Demo                                                                              |
| :-----------: | :-------------------: | :---: | :------------------------------------------------- | -------------------------------------------------------------------------------------- |
| separatorIcon |  `TemplateRef<any>`   | ' / ' | 可选，自定义分隔符样式                             | [自定义下拉列表和分隔符的面包屑](/components/breadcrumb/demo#self-defined-breadcrumbs) |
|    source     | `Array<SourceConfig>` |  []   | 可选，面包屑根据配置的 source 按照默认渲染方式显示 | [基础面包屑](/components/breadcrumb/demo#basic-breadcrumbs)                            |

```javascript
MenuConfig {
    name: string;
    link: string;
    linkType?: 'hrefLink' | 'routerLink';
    target?: string;
}
```

name：显示的名称

link：跳转的路径，可为绝对路径与相对路径，注意需要与路由的配置一致

linkType: 链接类型，默认为'hrefLink'方式，可选'hrefLink' 或 'routerLink'

target: target 属性规定在何处打开链接文档

传入的 source 格式：

```javascript
SourceConfig {
    title: string;
    link?: string;
    showMenu?: boolean;
    isSearch?: boolean;
    menuList?: Array<MenuConfig>;
    customMenuTemplate?:TemplateRef<any>;
    noNavigation?: boolean;
    target?:string;
    linkType?: 'hrefLink' | 'routerLink';
}
```

title: 显示的名称

link: 跳转的路径

showMenu: 是否显示下拉列表

isSearch: 下拉列表是否可搜索

menuList: 下拉列表的数据，配置参考上方 MenuConfig

customMenuTemplate: 自定义下拉列表

noNavigation: 链接是否不可跳转,一般用于当前所处位置不可跳转的配置

linkType: 链接类型，默认为'hrefLink'方式，可选'hrefLink' 或 'routerLink'

target: target 属性规定在何处打开链接文档

备注：source 数据改变使用`Object.assign`方式触发变更检测
