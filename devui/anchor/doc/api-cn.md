# 如何使用

在 module 中引入：

```ts
import { AnchorModule } from 'ng-devui';
```

在页面中使用：

```html
<div dAnchorBox>
  <ul>
    <li [dAnchorLink]="anchorlink-one">anchorlink-one</li>
    <li [dAnchorLink]="anchorlink-two">anchorlink-two</li>
    <li [dAnchorLink]="anchorlink-three">anchorlink-three</li>
    <li [dAnchorLink]="anchorlink-four">anchorlink-four</li>
  </ul>
  <div>
    <div [dAnchor]="anchorlink-one">
      anchorlink-one
    </div>
    <div [dAnchor]="anchorlink-two">
      anchorlink-two
    </div>
    <div [dAnchor]="anchorlink-three">
      anchorlink-three
    </div>
    <div [dAnchor]="anchorlink-four">
      anchorlink-four
    </div>
  </div>
</div>
```

```ts
// using router (cross-route), anchorName means your own anchor
this.router.navigateByUrl('../xx/xxx#anchorName');
this.router.navigate(['/xxx'], { fragment: 'anchorName' });

// using router (at the same level), anchorName means your own anchor
this.router.navigateByUrl('#anchorName');
this.router.navigate([], { fragment: 'anchorName' });
```
# dAnchor

定义一个锚点。
## dAnchor 参数

|     参数     |   类型   | 默认 |                         说明                          | 跳转 Demo                    |
| :----------: | :------: | :--: | :---------------------------------------------------: | ---------------------------- |
|   dAnchor    | `string` |  --  |               必选，设置一个锚点的名字                | [基本用法](demo#basic-usage) |
| anchorActive | `string` |  --  | 可选，锚点处于激活状态的时候，模块生效对应的 css 类名 | [基本用法](demo#basic-usage) |

## dAnchor 锚点激活事件

自动会给锚点加上以下类对应不同激活的对象。

|           css 类名            |        代表意义        |
| :---------------------------: | :--------------------: |
| anchor-active-by-anchor-link  |    点击锚点链接激活    |
|    anchor-active-by-scroll    | 容器滚动到锚点位置激活 |
| anchor-active-by-click-inside |  点击锚点内部内容激活  |
|   anchor-active-by-initial    |  初始化滚动条位置激活  |

# dAnchorLink

定义一个锚点的链接，点击链接会滑动到锚点，锚点处于页面顶部的时候也会激活链接的 class。

## dAnchorLink 参数

|     参数     |   类型   | 默认 |                         说明                          | 跳转 Demo                    |
| :----------: | :------: | :--: | :---------------------------------------------------: | ---------------------------- |
| dAnchorLink  | `string` |  --  |            必选，点击滑动的目标锚点的名字             | [基本用法](demo#basic-usage) |
| anchorActive | `string` |  --  | 可选，锚点处于激活状态的时候，链接生效对应的 css 类名 | [基本用法](demo#basic-usage) |

# dAnchorBox

必须有一个容器，否则功能无法使用。

定义一个扫描锚点的容器，放在 dAnchor 与 dAnchorLink 的公共父节点上，用于锚点和链接之间的通信。

## dAnchorBox 参数

|     参数      |              类型              |                  默认                   |                                                             说明                                                             | 跳转 Demo                          |
| :-----------: | :----------------------------: | :-------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | ---------------------------------- |
|     view      | `{top?:number,bottom?:number}` |            {top:0,bottom:0}             |                    可选，用于可视区域的调整，比如顶部有固定位置的头部等，数值对应被遮挡的顶部或底部的高度                    | [基本用法](demo#basic-usage)       |
| defaultAnchor |            `string`            |                   --                    | 可选，进入页面后默认被激活的锚点链接，一般设置为第一个锚点，如果不设置，那么第一个锚点需要在滑动到顶部位置的时候才能激活链接 | [基本用法](demo#basic-usage)       |
| scrollTarget  |         `HTMLElement`          | document.documentElement(document.body) |                       可选，设置要发生滚动的容器，一般为滚动条所在容器，为主页面的滚动条时候可以不设置                       | [更换滚动容器](demo#scroll-target) |

# dAnchorHashSupport

dAnchorBox 辅助指令。
## dAnchorHashSupport 参数

以下参数为高级配置参数，一般不需要使用，只需要直接使用 dAnchorHashSupport。

|             参数             |   类型    | 默认  |                                         说明                                          | 跳转 Demo                          |
| :--------------------------: | :-------: | :---: | :-----------------------------------------------------------------------------------: | ---------------------------------- |
|  updateUrlWhenAnchorActive   | `boolean` | true  |        可选，当激活 anchor 的时候更新 url，用于处理复杂场景, 默认为 true 即可         | [支持 url 锚点](demo#support-hash) |
| scrollToAnchorByHashOnlyInit | `boolean` | false | 可选，true 为只有初始化的时候接收来自路由的 fragment 字段变化并接收，用于处理复杂场景 | [支持 url 锚点](demo#support-hash) |

dAnchorHashSupport 指令搭配 dAnchorBox 使用， 可以绑定路由的 hash fragment， 举例 xxx.xxx/xxx#foo, foo 字段为哈希字段。
跳转哈希字段可以使用 anchor 组件，路由 navigate，routerLink 的 fragment 字段等。

# 注意事项

注意不可和 ng6.1 以上路由模块自带的 RouterScoller 混用， routerlScroller 会滚动到传统的 id 锚点。
单独使用 RouterScroller 可以通过配置路由模块。

```ts
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
