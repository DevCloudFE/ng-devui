## d-breadcrumb-item 参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| showMenu          | `boolean`       | false     | 可选，是否需要显示下拉箭头及下拉列表内容 |
| menuList        | `Array<MenuConfig>`  | --      | 可选，showMenu为true时传入，下拉列表的显示内容 |
| isSearch     | `boolean` | false     | 可选，showMenu为true时传入，下拉列表是否需要搜索功能 |
| customMenuTemplate      | `TemplateRef<any>`  | --    | 可选，showMenu为true时传入，自定义下拉列表  |

## d-breadcrumb-item 事件

| 事件                 | 类型         |   说明                          |
| :-------------------: | :----------: | :----------------------------: |
| toggleEvent           |    `EventEmitter<any>`     | dropdown菜单展开和收起的事件，返回值为当前菜单是否打开     |

## d-breadcrumb

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| separatorIcon          | `TemplateRef<any>`       | ' / '     | 可选，自定义分隔符样式 |
| source          | `Array<SourceConfig>`       | []     | 可选，面包屑根据配置的source按照默认渲染方式显示 |

``` javascript
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

传入的source格式：

``` javascript
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

menuList: 下拉列表的数据，配置参考上方MenuConfig

customMenuTemplate: 自定义下拉列表

noNavigation: 链接是否不可跳转,一般用于当前所处位置不可跳转的配置

linkType: 链接类型，默认为'hrefLink'方式，可选'hrefLink' 或 'routerLink'

target: target 属性规定在何处打开链接文档

备注：source数据改变使用`Object.assign`方式触发变更检测
