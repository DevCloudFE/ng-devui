# Anchor使用说明

需要三个指令配合使用: 'dAnchor'、'dAnchorLink'、'dAnchorBox'

## dAnchor指令

定义一个锚点

## dAnchor 参数

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| dAnchor               | `string`      | --          | 必选，设置一个锚点的名字                          |
| anchorActive          | `string`      | --          | 可选，锚点处于激活状态的时候，模块生效对应的css类名          |

### 判断激活锚点的事件

自动会给锚点加上以下类对应不同激活的对象

| css类名                      | 代表意义         |
| :--------------------------: | :----------: |
| anchor-active-by-anchor-link | 点击锚点链接激活 |
| anchor-active-by-scroll      |  容器滚动到锚点位置激活  |
| anchor-active-by-click-inside | 点击锚点内部内容激活     |
| anchor-active-by-initial      | 初始化滚动条位置激活 |

## dAnchorLink指令

定义一个锚点的链接，点击链接会滑动到锚点，锚点处于页面顶部的时候也会激活链接的class

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| dAnchorLink           | `string`       | --              | 必选，点击滑动的目标锚点的名字                          |
| anchorActive          | `string`       | --              | 可选，锚点处于激活状态的时候，链接生效对应的css类名           |

## dAnchorBox指令 （必须有一个容器，否则功能无法使用）

定义一个扫描锚点的容器，放在dAnchor与dAnchorLink的公共父节点上，用于锚点和链接之间的通信

| 参数                  | 类型                          | 默认            |   说明                                                |
| :-------------------: | :--------------------------: | :-------------: | :--------------------------------------------------: |
| view                  | `{top?:number,bottom?:number}` | {top:0,bottom:0} | 可选，用于可视区域的调整，比如顶部有固定位置的头部等，数值对应被遮挡的顶部或底部的高度      |
| defaultAnchor         | `string`                      | --          | 可选，进入页面后默认被激活的锚点链接，一般设置为第一个锚点，如果不设置，那么第一个锚点需要在滑动到顶部位置的时候才能激活链接  |
| scrollTarget          | `HTMLElement`                  | document.documentElement(document.body) | 可选，设置要发生滚动的容器，一般为滚动条所在容器，为主页面的滚动条时候可以不设置   |

## dAnchorHashSupport指令 （dAnchorBox辅助指令）

| 参数                          | 类型          | 默认            |   说明                                                                      |
| :--------------------------: | :-----------: | :-------------: | :-------------------------------------------------------------------------: |
| updateUrlWhenAnchorActive    | `boolean`     | true            | 可选，当激活anchor的时候更新url，用于处理复杂场景, 默认为true即可                |
| scrollToAnchorByHashOnlyInit | `boolean`     | false           | 可选，true为只有初始化的时候接收来自路由的fragment字段变化并接收，用于处理复杂场景 |

dAnchorHashSupport指令搭配dAnchorBox使用， 可以绑定路由的hash fragment， 举例 xxx.xxx/xxx#foo,  foo字段为哈希字段。
跳转哈希字段可以使用anchor组件，路由navigate，routerLink的fragment字段等。

### 跳转到anchor的方法

``` html
<!--使用组内nchor组件, 点击anchor的时候会-->
<div dAnchorBox dAnchorHashSupport>
  <div dAnchorLink="foo">xxx</div>
  <div dAnchor="foo">xxx</div>
</div>
```

``` typescript
// 跨路由跳转锚点
this.router.navigateByUrl('../xxx/xxx#foo');
this.router.navigate(['/xxxx'], { fragment: 'foo'});
// 同路由跳转锚点
this.router.navigateByUrl('#foo');
this.router.navigate([], { fragment: 'foo'});
```

``` html
<!--routerLink的fragment-->
<a [routerLink]="['/xxxx']" fragment="foo" ></a>
```

### 注意事项

注意不可和 ng6.1 以上路由模块自带的 RouterScoller混用， routerlScroller会滚动到传统的id锚点。
单独使用 RouterScroller可以通过配置路由模块

``` typescript
@NgModule({
  // ......
  imports:[
    // ......
    RouterModule.forRoot(routes,{
      anchorScrolling: 'enabled'   // 该策略与锚点组件的dAnchorHashSupport指令相冲突
    })
  ],
  // ......
})
export class DemoModule {}
```
