# How To Use
Import in module：
```ts
import { SplitterModule } from 'ng-devui/splitter';
```
In the page：
```html
<d-splitter>
  <d-splitter-pane></d-splitter-pane>
  <d-splitter-pane></d-splitter-pane>
</d-splitter>
```

# d-splitter

## d-splitter parameters

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :----------------: | :------------------------: | :----------: | :---------------------------------------------------------- | ------------------------------------------------- |
| orientation | `'vertical'\|'horizontal'` | 'horizontal' | Optional. It specifies the split direction of the splitter. The value can be'vertical'\|'horizontal' | [Basic usage](demo#basic-usage) |
| splitBarSize | `string` | '2px' | Optional. The default value is 2px. | [Basic usage](demo#basic-usage) |
| disabledBarSize | `string` | '1px' | Optional. This parameter is valid when the unadjustable width is set for the panel. | [Vertical layout usage](demo#vertical-layout) |
| showCollapseButton | `boolean` | true | Optional. Whether to display the collapse/expand button | [Collapse and collapse menu](demo#shrink-show-menu) |

## d-splitter instance method

Provides the active folding and unfolding method toggleCollapsed(index: number), where index is the sequence number of the expanded bar.

# d-splitter-pane

## d-splitter-pane parameters

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :---------------: | :---------------: | :-------------------------: | :----: | :---------------------------------------------------- | ---------------------------------------------------------------------- |
| size | `string` | -- | Optional. Specifies the width of the pane and sets the pixel value or percentage. | [Basic usage](demo#basic-usage) |
| minSize | `string` | -- | Optional. Specifies the minimum width of the pane and sets the pixel value or percentage. | [Basic usage](demo#basic-usage) |
| maxSize | `string` | -- | Optional. This parameter specifies the maximum width of the pane and sets the pixel value or percentage. | [Basic usage](demo#basic-usage) |
| resizable | `boolean` | true | Optional. Specifies whether the size of a pane can be adjusted, which affects adjacent panes. | [Vertical layout usage](demo#vertical-layout) |
| collapsible | `boolean` | false | Optional. Specifies whether the pane can be collapsed or collapsed. | [Basic usage](demo#basic-usage) |
| collapsed | `boolean` | false | Optional. Specifies whether to collapse the pane during initialization. This parameter is used together with `collapsible`. | [Vertical layout usage](demo#vertical-layout) |
| collapseDirection | `before'\|'after'\|'both'` | 'both' | Optional. This parameter specifies the folding direction of a non-edge pane. This parameter is used together with `collapsible`. | [Specify the folding direction](demo#certain-unfold-direction) |
| shrink | `boolean` | false | Optional. Indicating whether to shrink the pane width after the pane is collapsed. | [Collapse and collapse menu](demo#shrink-show-menu) |
| shrinkWidth | `number` | 36 | Optional. Width of the pane to be collapsed after collapse (unit: px). | [Collapse and collapse menu](demo#shrink-show-menu) |

## d-splitter-pane event

| Event | Type | Description | Jump to Demo |
| :----------------: | :---------------------: | :-----------------------------------------: | ------------------------------------------------- |
| sizeChange | `EventEmitter<string>` | When the size changes, the changed value (pixel value or percentage) is returned. | [Basic usage](demo#basic-usage) |
| collapsedChange | `EventEmitter<boolean>` | Whether the current pane is collapsed or expanded. | [Basic usage](demo#basic-usage) |
| shrinkStatusChange | `EventEmitter<boolean>` | Whether to collapse the current pane when the current pane is collapsed or expanded. | [Collapse and collapse menu](demo#shrink-show-menu) |
