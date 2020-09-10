# Anchor 使用说明

需要三个指令配合使用: 'dAnchor'、'dAnchorLink'、'dAnchorBox'

## dAnchor 指令

定义一个锚点

## dAnchor 参数

|     参数     |   类型   | 默认 |                         说明                          | 跳转 Demo |
| :----------: | :------: | :--: | :---------------------------------------------------: | --------- |
|   dAnchor    | `string` |  --  |               必选，设置一个锚点的名字                |[基本用法](/components/anchor/demo#basic-usage) |
| anchorActive | `string` |  --  | 可选，锚点处于激活状态的时候，模块生效对应的 css 类名 |[基本用法](/components/anchor/demo#basic-usage) |

### 判断激活锚点的事件

自动会给锚点加上以下类对应不同激活的对象

|           css 类名            |        代表意义        |
| :---------------------------: | :--------------------: |
| anchor-active-by-anchor-link  |    点击锚点链接激活    |
|    anchor-active-by-scroll    | 容器滚动到锚点位置激活 |
| anchor-active-by-click-inside |  点击锚点内部内容激活  |
|   anchor-active-by-initial    |  初始化滚动条位置激活  |

## dAnchorLink 指令

定义一个锚点的链接，点击链接会滑动到锚点，锚点处于页面顶部的时候也会激活链接的 class

|     参数     |   类型   | 默认 |                         说明                          | 跳转 Demo |
| :----------: | :------: | :--: | :---------------------------------------------------: | --------- |
| dAnchorLink  | `string` |  --  |            必选，点击滑动的目标锚点的名字             |[基本用法](/components/anchor/demo#basic-usage) |
| anchorActive | `string` |  --  | 可选，锚点处于激活状态的时候，链接生效对应的 css 类名 |[基本用法](/components/anchor/demo#basic-usage) |

## dAnchorBox 指令

（必须有一个容器，否则功能无法使用）

定义一个扫描锚点的容器，放在 dAnchor 与 dAnchorLink 的公共父节点上，用于锚点和链接之间的通信

|     参数      |              类型              |                  默认                   |                                                             说明                                                             | 跳转 Demo |
| :-----------: | :----------------------------: | :-------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | --------- |
|     view      | `{top?:number,bottom?:number}` |            {top:0,bottom:0}             |                    可选，用于可视区域的调整，比如顶部有固定位置的头部等，数值对应被遮挡的顶部或底部的高度                    |[基本用法](/components/anchor/demo#basic-usage) |
| defaultAnchor |            `string`            |                   --                    | 可选，进入页面后默认被激活的锚点链接，一般设置为第一个锚点，如果不设置，那么第一个锚点需要在滑动到顶部位置的时候才能激活链接 |[基本用法](/components/anchor/demo#basic-usage) |
| scrollTarget  |         `HTMLElement`          | document.documentElement(document.body) |                       可选，设置要发生滚动的容器，一般为滚动条所在容器，为主页面的滚动条时候可以不设置                       |[更换滚动容器](/components/anchor/demo#scroll-target) |

## dAnchorHashSupport 指令 （dAnchorBox 辅助指令）

以下参数为高级配置参数，一般不需要使用，只需要直接使用dAnchorHashSupport。

|             参数             |   类型    | 默认  |                                         说明                                          | 跳转 Demo |
| :--------------------------: | :-------: | :---: | :-----------------------------------------------------------------------------------: | --------- |
|  updateUrlWhenAnchorActive   | `boolean` | true  |        可选，当激活 anchor 的时候更新 url，用于处理复杂场景, 默认为 true 即可         |[支持url锚点](/components/anchor/demo#support-hash) |
| scrollToAnchorByHashOnlyInit | `boolean` | false | 可选，true 为只有初始化的时候接收来自路由的 fragment 字段变化并接收，用于处理复杂场景 |[支持url锚点](/components/anchor/demo#support-hash) |

dAnchorHashSupport 指令搭配 dAnchorBox 使用， 可以绑定路由的 hash fragment， 举例 xxx.xxx/xxx#foo, foo 字段为哈希字段。
跳转哈希字段可以使用 anchor 组件，路由 navigate，routerLink 的 fragment 字段等。

### 跳转到 anchor 的方法

```html
<!--使用组内nchor组件, 点击anchor的时候会-->
<div dAnchorBox dAnchorHashSupport>
  <div dAnchorLink="foo">xxx</div>
  <div dAnchor="foo">xxx</div>
</div>
```

```typescript
// 跨路由跳转锚点
this.router.navigateByUrl('../xxx/xxx#foo');
this.router.navigate(['/xxxx'], { fragment: 'foo' });
// 同路由跳转锚点
this.router.navigateByUrl('#foo');
this.router.navigate([], { fragment: 'foo' });
```

```html
<!--routerLink的fragment-->
<a [routerLink]="['/xxxx']" fragment="foo"></a>
```

### 注意事项

注意不可和 ng6.1 以上路由模块自带的 RouterScoller 混用， routerlScroller 会滚动到传统的 id 锚点。
单独使用 RouterScroller 可以通过配置路由模块

```typescript
@NgModule({
  // ......
  imports: [
    // ......
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled', // 该策略与锚点组件的dAnchorHashSupport指令相冲突
    }),
  ],
  // ......
})
export class DemoModule {}
```
