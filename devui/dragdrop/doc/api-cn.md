# 如何使用

在 module 中引入：

```typescript
import { DragDropModule } from 'ng-devui/dragdrop';
```

## Dragdrop

提供 dDraggable 和 dDroppable(dSortable)指令

## dDraggable 指令

### dDraggable 参数

|             参数              | 类型                                                                                                             | 默认值        | 描述                                                                                                                                                                                                                        | 跳转 Demo                                               | 全局配置项 |
| :---------------------------: | :--------------------------------------------------------------------------------------------------------------- | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :--------- |
|           dragData            | `any`                                                                                                            | --            | 可选，转递给 `DropEvent`事件的数据.                                                                                                                                                                                         | [基本用法](demo#basic-usage)                            |
|           dragScope           | `string \| Array<string>`                                                                                        | 'default'     | 可选，限制 drop 的位置，必须匹配对应的 `dropScope`                                                                                                                                                                          | [基本用法](demo#basic-usage)                            |
|         dragOverClass         | `string`                                                                                                         | --            | 可选，拖动时被拖动元素的 css                                                                                                                                                                                                | [拖拽实体元素跟随](demo#drag-entity-elements-to-follow) |
|          dragHandle           | `string`                                                                                                         | --            | 可选，可拖动拖动内容的 css 选择器，只有匹配 css 选择器的元素才能响应拖动事件, 注意是css选择器，示例：`'.title, .title > *'`,`'#header'`, `'.title *:not(input)'`                                                                 |                                                       |                        |
|        dragHandleClass        | `string`                                                                                                         | 'drag-handle' | 可选， 会给可拖动内容的应用的 css 选择器命中的元素添加的 css 类名， 第一个匹配 css 选择器的会被加上该 css 类                                                                                                                | [基本用法](demo#basic-usage)                            |
|           disabled            | `boolean`                                                                                                        | false         | 可选，控制当前元素是否可拖动 false 为可以，true 为不可以                                                                                                                                                                    | [基本用法](demo#basic-usage)                            |
|       enableDragFollow        | `boolean`                                                                                                        | false         | 可选，是否启用实体元素跟随（可以添加更多特效，如阴影等）                                                                                                                                                                    | [拖拽实体元素跟随](demo#drag-entity-elements-to-follow) |
|       dragFollowOption        | `{appendToBody?: boolean}`                                                                                       | --            | 可选，用于控制实体拖拽的一些配置                                                                                                                                                                                            | [拖拽实体元素跟随](demo#drag-entity-elements-to-follow) |
| dragFollowOption.appendToBody | `boolean`                                                                                                        | false         | 可选，用于控制实体拖拽的克隆元素插入的位置。默认 false 会插入到源元素父元素所有子的最后，设置为 true 会附着到。见说明 1                                                                                                     | [拖拽实体元素跟随](demo#drag-entity-elements-to-follow) |
|       originPlaceholder       | `{show?: boolean; tag?: string; style?: {cssProperties: string]: string}; text?: string; removeDelay?: number;}` | --            | 可选，设置源占位符号，用于被拖拽元素原始位置占位                                                                                                                                                                            | [源占位符](demo#source-placeholder)                     |
|    originPlaceholder.show     | `boolean`                                                                                                        | true          | 可选，是否显示，默认 originPlaceholder 有 Input 则显示，特殊情况可以关闭                                                                                                                                                    |
|     originPlaceholder.tag     | `string`                                                                                                         | 'div'         | 可选，使用 tag 名，默认 originPlaceholder 使用'div'，特殊情况可以置换                                                                                                                                                       |
|    originPlaceholder.style    | `Object`                                                                                                         | --            | 可选，传 style 对象，key 为样式属性，value 为样式值                                                                                                                                                                         | [源占位符](demo#source-placeholder)                     |
|    originPlaceholder.text     | `string`                                                                                                         | --            | 可选，placeholder 内的文字                                                                                                                                                                                                  | [源占位符](demo#source-placeholder)                     |
| originPlaceholder.removeDelay | `number`                                                                                                         | --            | 可选，用于希望源占位符在拖拽之后的延时里再删除，方便做动画，单位为 ms 毫秒                                                                                                                                                  | [源占位符](demo#source-placeholder)                     |
|         dragIdentity          | `any`                                                                                                            | --            | 可选，用于虚拟滚动的恢复，虚拟滚动过程中会删除元素（溢出画面）然后又重新生成来恢复元素（回到画面），需要唯一识别值来恢复原始事件拖拽事件监听和源占位符等                                                                    |
|      dragItemParentName       | `string`                                                                                                         | --            | 可选，选择器名，和 dragItemChildrenName 搭配用于拖拽截断看不见的列表内元素以提高性能， 从 dragItemParentName 匹配的选择器里边查询匹配 dragItemChildrenName 的元素，通常是列表里查找条目，把超出可视范围的条目克隆的时候剔除 | 暂无                                                    |
|     dragItemChildrenName      | `string`                                                                                                         | --            | 可选，选择器名，和 dragItemParentName 搭配用于拖拽截断看不见的列表内元素以提高性能，功能见 dragItemParentName 的描述                                                                                                        | 暂无                                                    |

说明 1：dragFollowOptions 的 appendToBody 的使用场景：当拖拽离开后源位置的父对象会被销毁的话，需要把克隆体附着到 body 上防止被销毁。默认会通过复制样式保证克隆到 body 的实体的样式是正确的，但部分深度依赖 DOM 节点位置的样式和属性可能会失败，需要手动调整部分样式。

### dDraggable 事件

| 事件           | 类型                      | 描述                      | 跳转 Demo                    |
| :------------- | :------------------------ | :------------------------ | :--------------------------- |
| dragStartEvent | `EventEmitter<DragEvent>` | 开始拖动的 DragStart 事件 | [基本用法](demo#basic-usage) |
| dragEndEvent   | `EventEmitter<DragEvent>` | 拖动结束的 DragEnd 事件   | [基本用法](demo#basic-usage) |
| dropEndEvent   | `EventEmitter<DragEvent>` | 放置结束的 Drop 事件      | [基本用法](demo#basic-usage) |

Drag DOM Events 详情: [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)

### batchDrag 附加指令

使用方法 dDraggable batchDrag

#### dDraggable batchDrag 属性

| 名字                                | 类型                      | 默认值             | 描述                                                                                           | 跳转 Demo                            |
| :---------------------------------- | :------------------------ | :----------------- | :--------------------------------------------------------------------------------------------- | :----------------------------------- |
| batchDragGroup                      | `string`                  | 'default'          | 可选，批量拖拽分组组名，不同组名                                                               |
| batchDragActive                     | `boolean`                 | false              | 可选，是否把元素加入到批量拖拽组. 见说明 1。                                                   | [批量拖拽](demo#batch-drag-and-drop) |
| batchDragLastOneAutoActiveEventKeys | `Array<key in DragEvent>` | ['ctrlKey']        | 可选，通过过拖拽可以激活批量选中的拖拽事件判断。见说明 2。                                     |
| batchDragStyle                      | `Array<badge\|stack>`     | ['badge', 'stack'] | 可选，批量拖拽的效果，badge 代表右上角有统计数字，stack 代表有堆叠效果，数组里有该字符串则有效 | [批量拖拽](demo#batch-drag-and-drop) |

说明 1： `batchDragActive`为`true`的时候会把元素加入组里，加入顺序为变为 true 的顺序，先加入的在数组前面。第一个元素会确认批量的组名，如果后加入的组名和先加入的组名不一致，则后者无法加入。
说明 2： `batchDragLastOneAutoActiveEventKeys`的默认值为['ctrlKey'], 即可以通过按住 ctrl 键拖动最后一个元素， 该元素自动加入批量拖拽的组，判断条件是 dragStart 事件里的 ctrlKey 事件为 true。目前仅支持判断 true/false。该参数为数组，可以判断任意一个属性值为 true 则生效，可用于不同操作系统的按键申明。

#### dDraggable batchDrag 事件

| 名字                 | 类型                                     | 描述                                               | 跳转 Demo                            |
| :------------------- | :--------------------------------------- | :------------------------------------------------- | :----------------------------------- |
| batchDragActiveEvent | `EventEmitter<{el: Element, data: any}>` | 通过拖拽把元素加入了批量拖拽组，通知外部选中该元素 | [批量拖拽](demo#batch-drag-and-drop) |

## dDroppable 指令

### dDroppable 参数

| 参数                        | 类型                                           | 默认值                                      | 描述                                                                                                                                                   | 跳转 Demo                                  |
| :-------------------------- | :--------------------------------------------- | :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| dropScope                   | `string \| Array<string>`                      | 'default'                                   | 可选，限制 drop 的区域，对应 dragScope                                                                                                                 | [基本用法](demo#basic-usage)               |
| dragOverClass               | `string`                                       | --                                          | 可选，dragover 时 drop 元素上应用的 css                                                                                                                |
| placeholderStyle            | `Object`                                       | {backgroundColor: '#6A98E3', opacity: '.4'} | 可选，允许 sort 时，用于占位显示                                                                                                                       | [源占位符](demo#source-placeholder)        |
| placeholderText             | `string`                                       | ''                                          | 可选，允许 sort 时，用于占位显示内部的文字                                                                                                             |
| allowDropOnItem             | `boolean`                                      | false                                       | 可选，允许 sort 时，用于允许拖动到元素上，方便树形结构的拖动可以成为元素的子节点                                                                       | [多层树状拖拽](demo#multi-level-tree-drag) |
| dragOverItemClass           | `string`                                       | --                                          | 可选，`allowDropOnItem`为`true`时，才有效，用于允许拖动到元素上后，被命中的元素增加样式                                                                | [多层树状拖拽](demo#multi-level-tree-drag) |
| nestingTargetRect           | `{height?: number, width?: number}`            | --                                          | 可选，用于修正有内嵌列表后，父项高度被撑大，此处 height，width 为父项自己的高度（用于纵向拖动），宽度（用于横向拖动）                                  | [多层树状拖拽](demo#multi-level-tree-drag) |
| defaultDropPosition         | `'closest' \| 'before' \| 'after'`             | 'closest'                                   | 可选，设置拖拽到可放置区域但不在列表区域的放置位置，`'closest'` 为就近放下， `'before'`为加到列表头部， `'after'`为加到列表尾部                        | [外部放置位置](demo#external-location)     |
| dropSortCountSelector       | `string`                                       | --                                          | 可选，带有 sortable 的容器的情况下排序，计数的内容的选择器名称，可以用于过滤掉不应该被计数的元素                                                       |
| dropSortVirtualScrollOption | `{totalLength?: number; startIndex?: number;}` | --                                          | 可选，用于虚拟滚动列表中返回正确的 dropIndex 需要接收 totalLength 为列表的真实总长度， startIndex 为当前排序区域显示的第一个 dom 的在列表内的 index 值 |

### dDroppable 事件

| 事件           | 类型                                        | 描述                                                                            | 跳转 Demo                    |
| :------------- | :------------------------------------------ | :------------------------------------------------------------------------------ | :--------------------------- |
| dragEnterEvent | `EventEmitter<DragEvent>`                   | drag 元素进入的 dragenter 事件                                                  | [基本用法](demo#basic-usage) |
| dragOverEvent  | `EventEmitter<DragEvent>`                   | drag 元素在 drop 区域上的 dragover 事件                                         | [基本用法](demo#basic-usage) |
| dragLeaveEvent | `EventEmitter<DragEvent>`                   | drag 元素离开的 dragleave 事件                                                  | [基本用法](demo#basic-usage) |
| dropEvent      | `EventEmitter<`[`DropEvent`](#dropevent)`>` | 放置一个元素, 接收的事件，其中 nativeEvent 表示原生的 drop 事件，其他见定义注释 | [基本用法](demo#basic-usage) |

### DropEvent

```typescript
type DropEvent = {
    nativeEvent: any; // 原生的drop事件
    dragData: any; // drag元素的dragData数据
    dropSubject: Subject<any>; //drop事件的Subject
    dropIndex?: number; // drop的位置在列表的index
    dragFromIndex?: number; // drag元素在原来的列表的index，注意使用虚拟滚动数据无效
    dropOnItem?: boolean; // 是否drop到了元素的上面，搭配allowDropOnItem使用
```

## dSortable 指令

指定需要参与排序的 Dom 父容器（因为 drop 只是限定可拖拽区域，具体渲染由使用者控制）

### dSortable 参数

| 名字           | 类型         | 默认值 | 描述                            | 跳转 Demo |
| :------------- | :----------- | :----- | :------------------------------ | :-------- |
| dSortDirection | `'v' \| 'h'` | 'v'    | 'v'垂直排序,'h'水平排序         |
| dSortableZMode | `boolean`    | false  | 是否是 z 模式折回排序，见说明 1 |

说明 1： z 自行排序最后是以大方向为准的，如果从左到右排遇到行末换行，需要使用的垂直排序+z 模式，因为最后数据是从上到下的只是局部的数据是从左到右。

### dDropScrollEnhanced 参数

| 名字               | 类型                                                                                            | 默认值   | 描述                                                                                                                       | 跳转 Demo                                                    |
| :----------------- | :---------------------------------------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| direction          | [`DropScrollDirection`](#dropscrolldirection)即`'v'\|'h'`                                       | 'v'      | 滚动方向，垂直滚动`'v'`, 水平滚动 `'h'`                                                                                    | [拖拽滚动容器增强](demo#drag-and-roll-container-enhancement) |
| responseEdgeWidth  | `string \| ((total: number) => string)`                                                         | '100px'  | 响应自动滚动边缘宽度, 函数的情况传入的为列表容器同个方向相对宽度                                                           | [拖拽滚动容器增强](demo#drag-and-roll-container-enhancement) |
| speedFn            | [`DropScrollSpeedFunction`](#dropscrolldirection)                                               | 内置函数 | 速率函数，见备注                                                                                                           |
| minSpeed           | `DropScrollSpeed`即`number`                                                                     | 50       | 响应最小速度 ，函数计算小于这个速度的时候，以最小速度为准                                                                  |
| maxSpeed           | `DropScrollSpeed`即`number`                                                                     | 1000     | 响应最大速度 ，函数计算大于这个速度的时候，以最大速度为准                                                                  |
| viewOffset         | {forward?: [`DropScrollAreaOffset`](#dropScrollAreaOffset); backward?: `DropScrollAreaOffset`;} | --       | 设置拖拽区域的偏移，用于某些位置修正                                                                                       |
| dropScrollScope    | `string\| Array<string>`                                                                        | --       | 允许触发滚动 scope，不配置为默认接收所有 scope，配置情况下，draggable 的`dragScope`和`dropScrollScope`匹配得上才能触发滚动 | [拖拽滚动容器增强](demo#drag-and-roll-container-enhancement) |
| backSpaceDroppable | `boolean`                                                                                       | true     | 是否允许在滚动面板上同时触发放置到滚动面板的下边的具体可以放置元素，默认为 true，设置为 false 则不能边滚动边放置           |

备注： speedFn 默认函数为`(x: number) => Math.ceil((1 - x) * 18) * 100`，传入数字`x`是 鼠标位置距离边缘的距离占全响应宽度的百分比，
最终速度将会是 speedFn(x)，但不会小于最小速度`minSpeed`或者大于最大速度`maxSpeed`。

相关类型定义：

#### DropScrollDirection

```typescript
export type DropScrollDirection = 'h' | 'v';
```

#### DropScrollSpeed

```typescript
export type DropScrollEdgeDistancePercent = number; // unit: 1
export type DropScrollSpeed = number; // Unit: px/s
export type DropScrollSpeedFunction = (x: DropScrollEdgeDistancePercent) => DropScrollSpeed;
```

#### DropScrollAreaOffset

```typescript
export type DropScrollAreaOffset = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  widthOffset?: number;
  heightOffset?: number;
};

export enum DropScrollOrientation {
  forward, // Forward, right/bottom
  backward, // Backward, left/up
}
export type DropScrollTriggerEdge = 'left' | 'right' | 'top' | 'bottom';
```

`DropScrollAreaOffset` 仅重要和次要定位边有效， forward 代表后右或者往下滚动，backward 表示往左或者往上滚动

| direction           | `v` 上下滚动     | `h` 左右滚动   |
| :------------------ | :--------------- | :------------- |
| forward 往下或往右  | `left` ,`bottom` | `top` ,`right` |
| backward 往左或网上 | `left`,`top`     | `top`,`left`   |

### dDropScrollEnhancedSide 附属指令

如果需要同时两个方向都有滚动条，则需要使用 dDropScrollEnhanced 的同时使用 dDropScrollEnhancedSide，参数列表同 dDropScrollEnhanced 指令，唯一不同是 direction，如果为`'v'`则 side 附属指令的实际方向为`'h'`。

| 名字               | 类型                                                                   | 默认值   | 描述                                                                                                                       |
| :----------------- | :--------------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------- |
| direction          | `DropScrollSpeed`即`'v'\|'h'`                                          | 'v'      | 滚动方向，垂直滚动`'v'`, 水平滚动 `'h'`                                                                                    |
| responseEdgeWidth  | `string \| ((total: number) => string)`                                | '100px'  | 响应自动滚动边缘宽度, 函数的情况传入的为列表容器同个方向相对宽度                                                           |
| speedFn            | `DropScrollSpeedFunction`                                              | 内置函数 | 速率函数，见备注                                                                                                           |
| minSpeed           | `DropScrollSpeed`即`number`                                            | 50       | 响应最小速度 ，函数计算小于这个速度的时候，以最小速度为准                                                                  |
| maxSpeed           | `DropScrollSpeed`即`number`                                            | 1000     | 响应最大速度 ，函数计算大于这个速度的时候，以最大速度为准                                                                  |
| viewOffset         | {forward?: `DropScrollAreaOffset`; backward?: `DropScrollAreaOffset`;} | --       | 设置拖拽区域的偏移，用于某些位置修正                                                                                       |
| dropScrollScope    | `string\| Array<string>`                                               | --       | 允许触发滚动 scope，不配置为默认接收所有 scope，配置情况下，draggable 的`dragScope`和`dropScrollScope`匹配得上才能触发滚动 |
| backSpaceDroppable | `boolean`                                                              | true     | 是否允许在滚动面板上同时触发放置到滚动面板的下边的具体可以放置元素，默认为 true，设置为 false 则不能边滚动边放置           |

## 使用 `dDraggable` & `dDroppable` 指令

```html
<ul>
  <li dDraggable>Coffee</li>
  <li dDraggable>Tea</li>
  <li dDraggable>Milk</li>
</ul>
```

```html
<div dDroppable>
  <p>Drop items here</p>
</div>
```

## CSS

`dDraggable` & `dDroppable` 指令都有`[dragOverClass]`作为输入.  
 提供 drag 和 drop 时的 hover 样式，注意是`字符串`

```html
<div dDroppable [dragOverClass]="'drag-target-border'">
  <p>Drop items here</p>
</div>
```

## 限制 Drop 区域

用[dragScope]和[dropScope]限制拖动区域，可以是字符串或数组，只有 drag 和 drop 的区域对应上才能放进去

```html
<ul>
  <li dDraggable [dragScope]="'drink'">Coffee</li>
  <li dDraggable [dragScope]="'drink'">Tea</li>
  <li dDraggable [dragScope]="'meal'">Biryani</li>
  <li dDraggable [dragScope]="'meal'">Kebab</li>
  ...
</ul>
```

```html
<div dDroppable [dropScope]="'drink'" [dragOverClass]="'drag-target-border'">
  <p>只有 Drinks 可以放在这个container里</p>
</div>

<div dDroppable [dropScope]="['drink', 'meal']" [dragOverClass]="'drag-target-border'">
  <p>Meal 和 Drinks 可以放在这个container里</p>
</div>
```

## 传递数据

`dDraggable`可以用[dragData]向`droppable`传递数据  
`dDroppable`用`(dropEvent)`事件接收数据

```html
<ul class="list-group">
  <li dDraggable *ngFor="let item of items" [dragData]="item" class="list-group-item">{{item.name}}</li>
</ul>

<div class="panel panel-default" dDroppable (dropEvent)="onItemDrop($event)">
  <div class="panel-heading">Drop Items here</div>
  <div class="panel-body">
    <li *ngFor="let item of droppedItems" class="list-group-item">{{item.name}}</li>
  </div>
</div>
```

```typescript
export class Component {
  items = [
    { name: 'Apple', type: 'fruit' },
    { name: 'Carrot', type: 'vegetable' },
    { name: 'Orange', type: 'fruit' },
  ];

  onItemDrop(e: any) {
    // Get the dropped data here
    this.droppedItems.push(e.dragData);
  }
  constructor() {}
}
```

## Drag Handle

Drag 句柄可以指定实际响应 draggable 事件的元素，而不是 draggable 本身  
这个参数必须是一个字符串，实际上是一个 css 选择器

```html
<li dDraggable [dragHandle]="'.drag-handle'">
  只有.drag-handle可以响应拖动事件来拖起li
  <div class="pull-right"><i class="drag-handle fa fa-bars fa-lg" aria-hidden="true"></i></div>
</li>
```

## 异步 DropEnd，通知 Drag 元素

`dDraggable`有一个`dropEndEvent`事件，此事件非浏览器默认事件而是自定义事件，非组件自动触发触发方式是在`dDroppable`的`dropEvent`事件的参数中有一个 dropSubject，当需要触发 drag 元素上的 dropEndEvent 事件的时候调用 dropSubject.next(params) 一般是在接口返回之后 例如：

```html
<ul class="list-group">
  <li dDraggable *ngFor="let item of items;let i=index;" (dropEndEvent)="dropEnd($event, i)" [dragData]="item">{{item.name}}</li>
</ul>

<div class="panel panel-default" dDroppable (dropEvent)="onItemDrop($event)">
  <div class="panel-heading">Drop Items here</div>
  <div class="panel-body">
    <li *ngFor="let item of droppedItems" class="list-group-item">{{item.name}}</li>
  </div>
</div>
```

```js
export class Component {
  onItemDrop(e: any) {
    ajax.onSuccess(() => {
      e.dropSubject.next(params); //此时才触发dragComponent的dropEnd 并且params对应onDropEnd的$event;
    });
  }
  constructor() {}
}
export class dragComponent {
  onDropEnd($event, i) {}
}
```

# 协同拖拽， 用于二维拖拽，跨纬度拖拽场景

## 协同拖 dDragSync

用于 dDraggle 对象和同时会被拖走的对象。

### dDragSync 参数

| 参数      | 类型     | 默认值 | 描述                                                             | 跳转 Demo                                           |
| :-------- | :------- | :----- | :--------------------------------------------------------------- | :-------------------------------------------------- |
| dDragSync | `string` | ''     | 必选，拖同步的组名，为空或者空字符串的时候无效，不与其他内容同步 | [二维拖拽和拖拽预览](demo#2D-drag-and-drop-preview) |

## 协同放 dDropSortSync

用于 dDroppable 对象和与 droppable 内 sortable 结构相同的 sortable 区域， 注意 dDroppable 对象里是与 dDroppable 对象同个对象上注册 dDropSortSync，其他不带 dDroppable 的与放置在排序区域。

### dDropSortSync 参数

| 参数               | 类型        | 默认值 | 描述                                                             | 跳转 Demo                                           |
| :----------------- | :---------- | :----- | :--------------------------------------------------------------- | :-------------------------------------------------- |
| dDropSortSync      | `string`    | ''     | 必选，放同步的组名，为空或者空字符串的时候无效，不与其他内容同步 | [二维拖拽和拖拽预览](demo#2D-drag-and-drop-preview) |
| dDropSyncDirection | `'v'\| 'h'` | 'v'    | 可选，与 dSortable 的方向正交                                    |

## 协同监听盒子 dDragDropSyncBox

用于统计 dDragSync 和 dDropSortSync 的公共父祖先。
无参数，放置在公共统计区域则可。

# 拖拽预览， 用于需要替换拖拽预览的场景

## 拖拽预览 dDragPreview

需要和 dDraggable 搭配使用， 用于拖起的时候拖动对象的模板

### dDragPreview 参数

| 参数                                | 类型                            | 默认值 | 描述                                                                               | 跳转 Demo                                           |
| :---------------------------------- | :------------------------------ | :----- | :--------------------------------------------------------------------------------- | :-------------------------------------------------- |
| dDragPreview                        | `TemplateRef<any>`              | --     | 必选，预览的模板引用                                                               | [二维拖拽和拖拽预览](demo#2D-drag-and-drop-preview) |
| dragPreviewData                     | `any`                           | --     | 可选，自定义数据，将由模板变量获得                                                 |
| dragPreviewOptions                  | `{ skipBatchPreview : boolean}` | --     | 可选，预览选项                                                                     |
| dragPreviewOptions.skipBatchPreview | `boolean`                       | false  | 可选，预览选项, 是否跳过批量预览的样式处理。建议自行处理批量拖拽预览模板的可以跳过 |

### dDragPreview 模板可用变量

|        变量         |         类型         |                                        变量含义说明                                         |
| :-----------------: | :------------------: | :-----------------------------------------------------------------------------------------: |
|        data         |        `any`         |                            从拖拽预览传入的 dragPreviewData 数据                            |
|      draggedEl      |    `HTMLElement`     |                                      被拖拽的 DOM 元素                                      |
|      dragData       |        `any`         |                               被拖拽元素携带的 dragData 数据                                |
|    batchDragData    |     `Array<any>`     | 被批量拖拽的对象的 dragData 数据的数组， 含被拖拽元素的 dragData， 并且 dragData 处于第一位 |
| dragSyncDOMElements | `Array<HTMLElement>` |                  被协同拖拽的 DOM 元素， 不包括 draggedEl 指向的 DOM 元素                   |

## 拖拽预览辅助克隆节点 <d-drag-preview-clone-dom-ref>

可以从节点的引用中恢复 DOM 的克隆对象作为预览

| 参数      | 类型          | 默认值 | 描述                                       | 跳转 Demo |
| :-------- | :------------ | :----- | :----------------------------------------- | :-------- |
| domRef    | `HTMLElement` | --     | 必选，否则无意义，克隆节点的 DOM 引用      |
| copyStyle | `boolean`     | true   | 可选，是否克隆节点的时候对节点依次克隆样式 |
