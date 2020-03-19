# Dragdrop

提供dDraggabel和dDroppabe(dSortable)指令  

## dDraggable 指令

### dDraggable 参数

| 参数            | 类型       | 默认值       | 描述       |
|:----------------|:----------|:-------------|:-----------|
| dragData        |  `any`     | null        | 可选，转递给 `DropEvent`事件的数据. |
| dragScope       | `string \| Array<string>` | 'default'   |  可选，限制drop的位置，必须匹配对应的 `dropScope` |
| dragOverClass   | `string`   | null        | 可选，拖动时被拖动元素的css |
| draghandle      | `string`   | null        | 可选，拖动句柄，css选择器，只有被选中的元素才能响应拖动事件 |
| disabled        | `boolean`  | false       | 可选，控制当前元素是否可拖动false为可以，true为不可以 |
| enableDragFollow | `boolean` | false       | 可选，是否启用实体元素跟随（可以添加更多特效，如阴影等） |

### dDraggable 事件

| 事件            | 类型           | 描述    |
|:----------------|:--------------|:--------|
| dragStartEvent  | `DragEvent`   | 开始拖动 |
| dragEndEvent    | `DragEvent`   | 拖动结束 |
| dropEndEvent    | `DragEvent`   | 放置结束 |

Drag DOM Events 详情: [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)

## dDroppable 指令

### dDroppable 参数

| 参数             | 类型      |默认值 |描述 |
|:----------------|:----------|:-------------|:-----------|
| dropScope       | `string \| Array<string>` | 'default'   | 可选，限制drop的区域，对应dragScope |
| dragOverClass  | `string` | null | 可选，dragover时drop元素上应用的css |
| placeholderStyle | `object` | {backgroundColor: '#6A98E3', opacity: '.4'} | 可选，允许sort时，用于占位显示 |
| placeholderText | `string` | '' | 可选，允许sort时，用于占位显示内部的文字 |
| allowDropOnItem | `boolean` | false| 可选，允许sort时，用于允许拖动到元素上，方便树形结构的拖动可以成为元素的子节点|
| dragOverItemClass | `string` | -- | 可选，`allowDropOnItem`为`true`时，才有效，用于允许拖动到元素上后，被命中的元素增加样式|
| nestingTargetRect | `{height?: number, width?: number}` | -- | 可选，用于修正有内嵌列表后，父项高度被撑大，此处height，width为父项自己的高度（用于纵向拖动），宽度（用于横向拖动）|

### dDroppable 事件

| 事件               | 类型        | 描述 |
|:------------------|:------------|:-----------|
| dragEnterEvent  | `DragEvent`   | drag元素进入  |
| dragOverEvent   | `DragEvent`   | drag元素在drop上 |
| dragLeaveEvent  | `DragEvent`   | drag元素离开 |
| dropEvent       | `DropEvent`(见下文定义)   | 放置一个元素, 接收的时间 |

### DropEventModel 定义

``` typescript
type DropEvent = {
    nativeEvent: any;
    dragData: any;
    dropSubject: Subject<any>;
    dropIndex?: number;
    dragFromIndex?: number;
    dropOnItem?: boolean;
```

## dSortable 指令

指定需要参与排序的Dom父容器（因为drop只是限定可拖拽区域，具体渲染由使用者控制）

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
 提供drag和drop时的hover样式，注意是`字符串`  

 ```html
 <div dDroppable [dragOverClass]="'drag-target-border'">
   <p>Drop items here</p>
 </div>
 ```

## 限制 Drop 区域

用[dragScope]和[dropScope]限制拖动区域，可以是字符串或数组，只有drag和drop的区域对应上才能放进去

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
  <p> Meal 和 Drinks 可以放在这个container里</p>
</div>
```
  
## 传递数据

`dDraggable`可以用[dragData]向`droppable`传递数据  
`dDroppable`用`(dropEvent)`事件接收数据  

```html  

<ul class="list-group">
    <li dDraggable *ngFor="let item of items" [dragData]="item" class="list-group-item">{{item.name}}</li>
</ul>

<div class="panel panel-default" dDroppable (onDrop)="onItemDrop($event)">
    <div class="panel-heading">Drop Items here</div>
    <div class="panel-body">
        <li *ngFor="let item of droppedItems" class="list-group-item">{{item.name}}</li>
    </div>
</div>
```  

```typescript
export class Component {
    items = [
            {name: "Apple", type: "fruit"},
            {name: "Carrot", type: "vegetable"},
            {name: "Orange", type: "fruit"}];

    onItemDrop(e: any) {
        // Get the dropped data here
        this.droppedItems.push(e.dragData);
    }
    constructor() { }
}
```

## Drag Handle

Drag句柄可以指定实际响应draggable事件的元素，而不是draggable本身  
这个参数必须是一个字符串，实际上是一个css选择器

```html
<li dDraggable [dragHandle]="'.drag-handle'">
   只有.drag-handle可以响应拖动事件来拖起li
   <div class="pull-right"><i class="drag-handle fa fa-bars fa-lg" aria-hidden="true"></i></div>
</li>
```

## 异步DropEnd，通知Drag元素

`dDraggable`有一个`dropEndEvent`事件，此事件非浏览器默认事件而是自定义事件，非组件自动触发触发方式是在`dDroppable`的`dropEvent`事件的参数中有一个dropSubject，当需要触发drag元素上的onDropEnd事件的时候调用dropSubject.next(params) 一般是在接口返回之后 例如：

```html
<ul class="list-group">
    <li dDraggable *ngFor="let item of items;let i=index;" (onDropEnd)="dropEnd($event, i)" [dragData]="item">{{item.name}}</li>
</ul>

<div class="panel panel-default" dDroppable (onDrop)="onItemDrop($event)">
    <div class="panel-heading">Drop Items here</div>
    <div class="panel-body">
        <li *ngFor="let item of droppedItems" class="list-group-item">{{item.name}}</li>
    </div>
</div>
```

```js
export class Component {

    onItemDrop(e: any) {

      ajax.onSuccess(()=>{
        e.dropSubject.next(params);//此时才触发dragComponent的dropEnd 并且parmas对应onDropEnd的$event;
      });
    }
    constructor() { }
}
export class dragComponent {
  onDropEnd($event, i){

  }
}
```
