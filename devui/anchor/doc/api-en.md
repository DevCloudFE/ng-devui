# Anchor Usage Instructions

Three commands are required: dAnchor, dAnchorLink, and dAnchorBox.

## DAnchor Instruction

Define an anchor point

## dAnchor Parameter

|  Parameter   |   Type   | Default |                                              Description                                              | Jump to Demo                                       |
| :----------: | :------: | :-----: | :---------------------------------------------------------------------------------------------------: | -------------------------------------------------- |
|   dAnchor    | `string` |   --    |                                    Required. Sets an anchor name.                                     | [Basic usage](demo#basic-usage) |
| anchorActive | `string` |   --    | Optional. When the anchor is activated, the corresponding CSS class name takes effect for the module. | [Basic usage](demo#basic-usage) |

### Determining the event for activating the anchor

The following classes are automatically added to the anchor to correspond to different activated objects:

|        css class name         |                          Meaning                          |
| :---------------------------: | :-------------------------------------------------------: |
| anchor-active-by-anchor-link  |           Click the anchor link to activate it.           |
|    anchor-active-by-scroll    | The container scrolls to the anchor point for activation. |
| anchor-active-by-click-inside |         Click the anchor content to activate it.          |
|   anchor-active-by-initial    |            Initialize the scroll bar position.            |

## dAnchorLink instruction

Define a link of an anchor point. Click the link to slide to the anchor point. When the anchor point is at the top of the page, the link class is activated.

|  Parameter   |   Type   | Default |                                            Description                                             | Jump to Demo                                       |
| :----------: | :------: | :-----: | :------------------------------------------------------------------------------------------------: | -------------------------------------------------- |
| dAnchorLink  | `string` |   --    |                       Required. Name of the target anchor point for sliding.                       | [Basic usage](demo#basic-usage) |
| anchorActive | `string` |   --    | Optional. CSS class name corresponding to the link that takes effect when the anchor is activated. | [Basic usage](demo#basic-usage) |

## dAnchorBox instruction

(There must be one container. Otherwise, the function cannot be used.)

Defines a container for scanning anchor points, placed on the common parent node of dAnchor and dAnchorLink, for communication between anchor points and links.

|   Parameter   |              Type              |                 Default                 |                                                                                                                                   Description                                                                                                                                    | Jump to Demo                                                          |
| :-----------: | :----------------------------: | :-------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------------------- |
|     view      | `{top?:number,bottom?:number}` |            {top:0,bottom:0}             |                                                   Optional. It is used to adjust the visible region, for example, the head with a fixed position on the top. The value corresponds to the height of the blocked top or bottom.                                                   | [Basic usage](demo#basic-usage)                    |
| defaultAnchor |            `string`            |                   --                    | Optional. An anchor link that is activated by default after a page is displayed. Generally, the first anchor link is set to the first anchor link. If this parameter is not set, the first anchor link can be activated only when the first anchor is moved to the top position. | [Basic usage](demo#basic-usage)                    |
| scrollTarget  |         `HTMLElement`          | document.documentElement(document.body) |                                                                        Optional. Sets the container where the scroll bar is located. This parameter is optional when the scroll bar is on the home page.                                                                         | [Replace rolling container](demo#scroll-target) |

## dAnchorHashSupport instruction (dAnchorBox auxiliary instruction)

The following parameters are advanced configuration parameters and are not required. You only need to use dAnchorHashSupport.

|          Parameter           |   Type    | Default |                                                                       Description                                                                       | Jump to Demo                                                       |
| :--------------------------: | :-------: | :-----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------ |
|  updateUrlWhenAnchorActive   | `boolean` |  true   |                                  Optional. The URL is updated when the anchor is activated. The default value is true.                                  | [URL Anchor](demo#support-hash)    |
| scrollToAnchorByHashOnlyInit | `boolean` |  false  | Optional. True indicates that the fragment field changes from routes are received only during initialization. This field is used for complex scenarios. | [URL Anchor](demo#support-hash) |

The dAnchorHashSupport command is used together with the dAnchorBox command to bind the hash fragment of a route. For example, xxx.xxx/xxx#foo, where the foo field is a hash field.
The hop hash field can be the anchor component, route navigate, and routerLink fragment field.

### Method of jumping to the anchor

```html
<!-- When you click anchor, the system displays the following information:
<div dAnchorBox dAnchorHashSupport>
<div dAnchorLink="foo">xxx</div>
<div dAnchor="foo">xxx</div>
</div>
```

```typescript
// Cross-route jumping to the anchor
this.router.navigateByUrl('../xxx/xxx#foo');
this.router.navigate(['/xxxx'], { fragment: 'foo' });
//Same-route jump anchor
this.router.navigateByUrl('#foo');
this.router.navigate([], { fragment: 'foo' });
```

```html
<! --Fragment of the routerLink-->
<a [routerLink]="['/xxxx']" fragment="foo"></a>
```

### Precautions

Note that this parameter cannot be used together with the RouterScoller of the routing module of ng6.1 or later. The routerlScroller will scroll to the traditional ID anchor point.
Using RouterScroller alone, you can configure the routing module.

```typescript
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
