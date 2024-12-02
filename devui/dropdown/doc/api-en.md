# How to use

Import into module:

```typescript
import { DropDownModule } from 'ng-devui/dropdown';
```

## dDropDown

> Use the specified local variable #dropdown="d-dropdown"

### dDropDown Parameter

| Parameter             | Type                          | Default | Description                                                                                                                                                                               | Jump to Demo                                                         | Global Config |
| --------------------- | ----------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------- |
| isOpen                | `boolean`                     | false   | Optional. It indicates whether dropdown is enabled.                                                                                                                                       | [Control dropdown meanu with isOpen](demo#dropdown-set-is-open)      |               |
| disabled              | `boolean`                     | false   | Optional. Set this parameter to true to disable dropdown.                                                                                                                                 |                                                                      |               |
| trigger               | `click'\|'hover'\|'manually'` | 'click' | Optional. Dropdown trigger mode. Click indicates click, hover indicates hover (including click), and manually indicates manual control.                                                   | [Hover dropdown](demo#suspension-drop-down)                          |               |
| closeScope            | `'all'\|'blank'\|'none'`      | 'all'   | Optional. Click the blank area to close the blank area. Click all to close the blank area, the none menu can be closed either inside or outside. Only the drop-down button can be closed. | [Close Trigger Point Settings](demo#turn-off-trigger-point-settings) |               |
| closeOnMouseLeaveMenu | `boolean`                     | false   | Optional. Whether to close the menu when you exit the menu after entering the menu                                                                                                        | [Multi-level drop-down menu](demo#multi-level-drop-down-menu)        |               |
| showAnimation         | `boolean`                     | true    | optional. Whether to enable animation.                                                                                                                                                    |                                                                      | ✔             |

### dDropDown Event

| Event       | Type                    | Description                                                                                                                                                  | Jump to Demo                    |
| ----------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| toggleEvent | `EventEmitter<boolean>` | dropdown Boolean value for expanding or collapsed menus. true indicates that the menu is to be expanded and false indicates that the menu is to be disabled. | [Basic usage](demo#basic-usage) |

## appendToBody (dDropDown additional instruction component)

If this command is used together with dDropDown, dDropDownMenu is attached to the body to prevent dropdown from being blocked in the scroll bar.

| Parameter                  | Type                                                                                                          | Default                                          | Description                                                                                                                            | Jump to Demo                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| alignOrigin                | `ElementRef`                                                                                                  | --                                               | Optional. Specify the aligned object                                                                                                   | [Set the expansion position processing](demo#when-using-appendtobody) |
| appendToBodyDirections     | `Array<`[`AppendToBodyDirection`](#appendtobodydirection)<br>`\|`[`ConnectedPosition`](#connectedposition)`>` | `['rightDown', 'leftDown', 'rightUp', 'leftUp']` | Optional. The direction array preferentially uses the position in the front of the array.                                              | [Set the expansion position processing](demo#when-using-appendtobody) |
| appendToBodyScrollStrategy | `AppendToBodyScrollStrategyType`                                                                              | `reposition`                                     | Optional. Policy for processing pop-up windows during scrolling, see [AppendToBodyScrollStrategyType](#AppendToBodyScrollStrategyType) | [Set the expansion position processing](demo#when-using-appendtobody) |

Note: After appendToBody is used, use `cdkScrollable` where the scroll bar is available.

```terminal
npm install @angular/cdk --save
```

```TypeScript
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    // ...
    ScrollingModule,
    // ...
  ]
})
```

```html
<div class="foo-bar-baz" cdkScrollable>
  <!-- Other contents of the scroll bar container-->
</div>
```

Type Definition:

### ConnectedPosition

Quoted from `@angular/cdk/overlay`

```TypeScript
export interface ConnectedPosition {
  originX: 'start' | 'center' | 'end';
  originY: 'top' | 'center' | 'bottom';
  overlayX: 'start' | 'center' | 'end';
  overlayY: 'top' | 'center' | 'bottom';
  weight?: number;
  offsetX?: number;
  offsetY?: number;
  panelClass?: string | string[];
}
```

### AppendToBodyDirection

```typescript
export type AppendToBodyDirection = 'rightDown' | 'rightUp' | 'leftUp' | 'leftDown' | 'centerDown' | 'centerUp';
```

Simplify several basic directions for the name.

| Simplified name | Meaning                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| rightDown       | Display in the lower right direction relative to the aligned object, that is, the object is left aligned. (Note that the lower right is left aligned.) |
| rightUp         | Display in the upper right direction relative to the aligned object. That is, the object is left aligned and displayed at the top.                     |
| leftUp          | Display in the `leftUp` direction relative to the aligned object, that is, right-aligned and displayed above.                                          |
| leftDown        | Display in the `left bottom` direction relative to the aligned object, that is, right-aligned and displayed below.                                     |
| centerDown      | Display in the `center-bottom` direction relative to the aligned object. That is, the object is center-aligned and displayed below.                    |
| centerUp        | Display in the `center-up` direction relative to the aligned object, that is, display in the center-aligned direction.                                 |

The naming of six directions is simplified. Other directions can be used by using the ConnectedPosition of angular/cdk/overlay.
appendToBodyDirections: The default display sequence is ['rightDown','leftDown','rightUp','leftUp'].
Try the first position, try the second position, and so on.

### AppendToBodyScrollStrategyType

```typescript
export type AppendToBodyScrollStrategyType = 'close' | 'noop' | 'reposition';
```

see [CDK ScrollStrategyOptions](https://material.angular.io/cdk/overlay/api#ScrollStrategyOptions)

## dDropDownToggle

Used for menu control objects. For details, see demo.

### dDropDownToggle Parameter

| Parameter     | Type      | Default | Description                                               | Jump to Demo                                                         |
| ------------- | --------- | ------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| toggleOnFocus | `boolean` | false   | Optional. Automatically expands when you focus on the tab | [Auto Expand and Auto Focus](demo#auto-expand-and-auto-focus)        |
| autoFocus     | `boolean` | false   | Optional. Automatic focus after instantiation             | [Automatic expansion and autofocus](demo#auto-expand-and-auto-focus) |

## dDropDownMenu

Used to expand and close menus. For details, see the demo.

## dDropDownMenuItem

Used for drop-down list items. If the class contains disabled, the drop-down menu is not closed when the drop-down item is clicked. When the disabled attribute is set, the click event is not triggered.

| Parameter | Type      | Default | Description                                                                          | Jump to Demo                    |
| --------- | --------- | ------- | ------------------------------------------------------------------------------------ | ------------------------------- |
| disabled  | `boolean` | false   | Optional. If it is set to true, the corresponding click event will not be triggered. | [Basic usage](demo#basic-usage) |
