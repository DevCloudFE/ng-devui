本组件基于 [ng2-drag-drop](https://github.com/ObaidUrRehman/ng2-drag-drop/tree/develop)扩展
提供aveDraggabel和aveDroppabe(aveSortable)指令  

### aveDraggable 指令

#### 属性

| 名字   | 类型      |默认值 |描述 |
|:-------|:----------|:-------------|:-----------|
| `dragData` |  `any` | `null` | 转递给 `onDrop()`事件的数据. |
| `dragScope` |    `string 或 Array<string>` | `'default'`   |  限制drop的位置，必须匹配对应的 `dropScope`. |
| `dragOverClass` | `string` | `null` | 拖动时被拖动元素的css |
| `draghandle` | `string` | `null` | 拖动句柄，css选择器，只有被选中的元素才能响应拖动事件 |
| `disabled` | `boolean` | `false` | 控制当前元素是否可拖动false为可以，true为不可以 |

#### 事件

| 名字   | 参数  |描述 |
|:-------|:------------|:-----------|
| `onDragStart`  | e: DOM event   | 开始拖动  |
| `onDragEnd`    | e: DOM event   | 拖动结束 |
| `onDropEnd`    | any   | 放置结束，需要手动触发，相当于异步回调（非浏览器内置事件） |
| `enableDragFollow`    | boolean   | 默认值false。是否启用实体元素跟随（可以添加更多特效，如阴影等） |

Drag DOM Events 详情: [Drag Event](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent) 

### aveDroppable 指令

#### 属性

| 名字   | 类型      |默认值 |描述 |
|:-------|:----------|:-------------|:-----------|
| `dropScope` |    `string 或 Array<string>` | `'default'`   |   限制drop的区域，对应dragScope |
| `dragOverClass` | `string` | `null` | dragover时drop元素上应用的css |
| `placeholderStyle` | `object` | ` {backgroundColor: '#6A98E3', opacity: '.4'}` | 允许sort时，用于占位显示 |
| `placeholderText` | `string` | `''` | 允许sort时，用于占位显示内部的文字 |
|`allowDropOnItem` | `boolean` | `false`| 允许sort时，用于允许拖动到元素上，方便树形结构的拖动可以成为元素的子节点|
|`dragOverItemClass` | `string` | `空`| `allowDropOnItem`为`true`时，才有效，用于允许拖动到元素上后，被命中的元素增加样式|
|`nestingTargetRect` | ` {height?: number, width?: number}` | `无`| 用于修正有内嵌列表后，父项高度被撑大，此处height，width为父项自己的高度（用于纵向拖动），宽度（用于横向拖动）|

#### 事件

| 名字   | 参数  |描述 |
|:-------|:------------|:-----------|
| `onDragEnter`  | e: DOM event   | drag元素进入  |
| `onDragOver`   | e: DOM event   | drag元素在drop上 |
| `onDragLeave`  | e: DOM event   | drag元素离开 |
| `onDrop`       | e: `DropEventModel`   | 放置一个元素 |


### aveSortable 指令
指定需要参与排序的Dom父容器（因为drop只是限定可拖拽区域，具体渲染由使用者控制）

# 使用

### Import `DragDropModule`

引入DragDropModule 一般在需要使用此组件的模块中或者share模块，比如sample-shared.module里

```typescript
import { NgModule } from '@angular/core';
import { DragDropModule } from '@avenueui/core/add-ons/dragdrop';


@NgModule({
    imports: [
      DragDropModule
    ],
    exports: [
      DragDropModule
    ],
    declarations: [
    ],
    providers: [],
})
export class SampleSharedModule { }
```

### 使用 `aveDraggable` & `aveDroppable` 指令

```html
<ul>
  <li aveDraggable>Coffee</li>
  <li aveDraggable>Tea</li>
  <li aveDraggable>Milk</li>
</ul>               
```

 
 ```html
 <div aveDroppable>
   <p>Drop items here</p>
 </div>               
 ```

### CSS
 `aveDraggable` & `aveDroppable` 指令都有`[dragOverClass]`作为输入.  
 提供drag和drop时的hover样式，注意是`字符串`  
 
 ```html
 <div aveDroppable [dragOverClass]="'drag-target-border'">
   <p>Drop items here</p>
 </div>               
 ```

### 限制 Drop 区域
用[dragScope]和[dropScope]限制拖动区域，可以是字符串或数组，只有drag和drop的区域对应上才能放进去
 
```html
<ul>
  <li aveDraggable [dragScope]="'drink'">Coffee</li>
  <li aveDraggable [dragScope]="'drink'">Tea</li>
  <li aveDraggable [dragScope]="'meal'">Biryani</li>
  <li aveDraggable [dragScope]="'meal'">Kebab</li>
  ...
</ul>               
```

```html
<div aveDroppable [dropScope]="'drink'" [dragOverClass]="'drag-target-border'">
  <p>只有 Drinks 可以放在这个container里</p>
</div>               

<div aveDroppable [dropScope]="['drink', 'meal']" [dragOverClass]="'drag-target-border'">
  <p> Meal 和 Drinks 可以放在这个container里</p>
</div>               
```
  
### 传递数据  
`aveDraggable`可以用[dragData]向`droppabel`传递数据  
`aveDroppable`用`(onDrop)`事件接收数据  

```html  

<ul class="list-group">
    <li aveDraggable *ngFor="let item of items" [dragData]="item" class="list-group-item">{{item.name}}</li>
</ul>

<div class="panel panel-default" aveDroppable (onDrop)="onItemDrop($event)">
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

### Drag Handle
Drag句柄可以指定实际响应draggable事件的元素，而不是draggable本身  
这个参数必须是一个字符串，实际上是一个css选择器
```html
<li aveDraggable [dragHandle]="'.drag-handle'">
   只有.drag-handle可以响应拖动事件来拖起li    
   <div class="pull-right"><i class="drag-handle fa fa-bars fa-lg" aria-hidden="true"></i></div> 
</li>               
```

### 异步DropEnd，通知Drag元素
`aveDraggable`有一个onDropEnd事件，此事件非浏览器默认事件而是自定义事件，非组件自动触发触发方式是在`aveDroppable`的`onDrop`事件的参数中有一个dropSubject，当需要触发drag元素上的onDropEnd事件的时候调用dropSubject.next(params) 一般是在接口返回之后 例如：  
```html
<ul class="list-group">
    <li aveDraggable *ngFor="let item of items;let i=index;" (onDropEnd)="dropEnd($event, i)" [dragData]="item">{{item.name}}</li>
</ul>

<div class="panel panel-default" aveDroppable (onDrop)="onItemDrop($event)">
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
        e.dropSubject.next(params);//此时才触发dragComponent的onDropEnd 并且parmas对应onDropEnd的$event;
      });
    }
    constructor() { }
} 
export class dragComponent {
  onDropEnd($event, i){

  }
} 
```
