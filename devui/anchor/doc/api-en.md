# How to use

Import into module：

```ts
import { AnchorModule } from 'ng-devui';
```

Import into standalone

```ts
import { AnchorDirective, AnchorBoxDirective, AnchorBoxHashSupportDirective, AnchorLinkDirective } from 'ng-devui/anchor';
```

In the page:

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

Define an anchor point

## dAnchor Parameters

|  Parameter   |   Type   | Default |                                              Description                                              | Jump to Demo                                       |Global Config| 
| :----------------: | :----------: | :------: | :-----: | :---------------------------------------------------------------------------------------------------: | -------------------------------------------------- |
|   dAnchor    | `string` |   --    |                                    Required. Sets an anchor name.                                     | [Basic Usage](demo#basic-usage) |
| anchorActive | `string` |   --    | Optional. When the anchor is activated, the corresponding CSS class name takes effect for the module. | [Basic Usage](demo#basic-usage) |

## dAnchor Anchor Activation Event

The following classes are automatically added to the anchor to correspond to different activated objects:

|        css class name         |                          Meaning                          |
| :---------------------------: | :-------------------------------------------------------: |
| anchor-active-by-anchor-link  |           Click the anchor link to activate it.           |
|    anchor-active-by-scroll    | The container scrolls to the anchor point for activation. |
| anchor-active-by-click-inside |         Click the anchor content to activate it.          |
|   anchor-active-by-initial    |            Initialize the scroll bar position.            |

# dAnchorLink

Define a link of an anchor point. Click the link to slide to the anchor point. When the anchor point is at the top of the page, the link class is activated.

## dAnchorLink Parameters

|  Parameter   |   Type   | Default |                                            Description                                             | Jump to Demo                                       |
| :----------: | :------: | :-----: | :------------------------------------------------------------------------------------------------: | -------------------------------------------------- |
| dAnchorLink  | `string` |   --    |                       Required. Name of the target anchor point for sliding.                       | [Basic Usage](demo#basic-usage) |
| anchorActive | `string` |   --    | Optional. CSS class name corresponding to the link that takes effect when the anchor is activated. | [Basic Usage](demo#basic-usage) |

# dAnchorBox

There must be one container. Otherwise, the function cannot be used.

Defines a container for scanning anchor points, placed on the common parent node of dAnchor and dAnchorLink, for communication between anchor points and links.

## dAnchorBox Parameters

|   Parameter   |              Type              |                 Default                 |                                                                                                                                   Description                                                                                                                                    | Jump to Demo                                                          |
| :-----------: | :----------------------------: | :-------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------------------- |
|     view      | `{top?:number,bottom?:number}` |            {top:0,bottom:0}             |                                                   Optional. It is used to adjust the visible region, for example, the head with a fixed position on the top. The value corresponds to the height of the blocked top or bottom.                                                   | [Basic Usage](demo#basic-usage)                    |
| defaultAnchor |            `string`            |                   --                    | Optional. An anchor link that is activated by default after a page is displayed. Generally, the first anchor link is set to the first anchor link. If this parameter is not set, the first anchor link can be activated only when the first anchor is moved to the top position. | [Basic Usage](demo#basic-usage)                    |
| scrollTarget  |         `HTMLElement`          | document.documentElement(document.body) |                                                                        Optional. Sets the container where the scroll bar is located. This parameter is optional when the scroll bar is on the home page.                                                                         | [Replace Rolling Container](demo#scroll-target) |

# dAnchorHashSupport

dAnchorBox support instruction

## dAnchorHashSupport Parameters

The following parameters are advanced configuration parameters and are not required. You only need to use dAnchorHashSupport.

|          Parameter           |   Type    | Default |                                                                       Description                                                                       | Jump to Demo                                                       |
| :--------------------------: | :-------: | :-----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------ |
|  updateUrlWhenAnchorActive   | `boolean` |  true   |                                  Optional. The URL is updated when the anchor is activated. The default value is true.                                  | [URL Hash Anchor](demo#support-hash)    |
| scrollToAnchorByHashOnlyInit | `boolean` |  false  | Optional. True indicates that the fragment field changes from routes are received only during initialization. This field is used for complex scenarios. | [URL Hash Anchor](demo#support-hash) |

The dAnchorHashSupport command is used together with the dAnchorBox command to bind the hash fragment of a route. For example, xxx.xxx/xxx#foo, where the foo field is a hash field.
The hop hash field can be the anchor component, route navigate, and routerLink fragment field.

# Note

Note that this parameter cannot be used together with the RouterScoller of the routing module of ng6.1 or later. The routerlScroller will scroll to the traditional ID anchor point.
Using RouterScroller alone, you can configure the routing module.

```ts
@NgModule({
  //......
  imports: [
    //......
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled', // This policy conflicts with the dAnchorHashSupport instruction of the anchor component.
    }),
  ],
  //......
})
export class DemoModule {}
```
