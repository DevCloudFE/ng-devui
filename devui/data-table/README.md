# 目录结构
│  data-table-body.component.html       #配置column方式tbody模板
│  data-table-body.component.scss       #配置column方式tbody样式
│  data-table-body.component.ts         #配置column方式tbody指令
│  data-table-cell.component.html       #配置column方式td模板
│  data-table-cell.component.ts         #配置column方式td指令
│  data-table-head.component.html       #配置column方式thead模板
│  data-table-head.component.scss       #配置column方式thead样式
│  data-table-head.component.ts         #配置column方式thead指令
│  data-table-row.component.html        #配置column方式tr模板
│  data-table-row.component.scss        #配置column方式tr样式
│  data-table-row.component.ts          #配置column方式tr指令
│  data-table.component.color.scss      #datatable组件样式
│  data-table.component.html            #datatable组件模板
│  data-table.component.scss            #datatable组件样式
│  data-table.component.ts              #datatable组件
│  data-table.model.ts                  #datatable类型定义
│  data-table.module.ts                 #datatable模块
│  display-cell-value.pipe.ts           #配置column方式单元格显示管道
│  editor-host.directive.ts             #配置column方式单元格编辑时编辑组件宿主模板指令
│
├─demo                       #DEMO目录
│  ├─async                   #异步加载数据
│  ├─basic                   #基本用法-模板
│  ├─basic-old               #基本用法-配置column
│  ├─cell-merge              #合并单元格
│  ├─check-options           #自定义选中操作-模板
│  ├─check-options-column    #自定义选中操作-模板
│  ├─drag-column             #列拖拽
│  ├─drag-row                #行拖拽  
│  ├─editable                #表格编辑-模板
│  ├─editable-old            #表格编辑-配置column
│  ├─expand-row              #扩展行-模板
│  ├─expand-row-old          #扩展行-配置column
│  ├─fix-column              #固定列-模板
│  ├─fix-column-old          #固定列-配置column
│  ├─header-grouping         #表头分组-模板
│  ├─interaction             #表格交互-模板
│  ├─interaction-column      #表格交互-配置column
│  ├─lazy                    #懒加载
│  ├─max-height              #表头固定
│  ├─multi-header            #表头分组-配置column
│  ├─muti-drag-row           #行批量拖拽
│  ├─mutil-styles            #表格样式
│  ├─tree-table              #树形表格-模板
│  ├─tree-table-old          #树形表格-配置column
│  └─virtual-scroll          #虚拟滚动
│
├─doc                        #文档目录
│
├─table                      #模板方式代码目录
│  ├─body                    #tbody
│  │  └─td                   #td
│  ├─head                    #thead
│  │  └─th                   #th
│  │      ├─filter           #表头过滤
│  │      └─sort             #表头排序
│  └─row                     #tr
│
└─tmpl                                              #配置column方式模板代码目录
        data-table-cell-edit-tmpl.component.ts      #自定义单元格编辑模板
        data-table-cell-tmpl.component.ts           #unused
        data-table-cell-view-tmpl.component.ts      #自定义单元格模板
        data-table-column-tmpl.component.ts         #column模板
        data-table-head-cell-tmpl.component.ts      #自定义表头单元格模板

# 模板方式和配置column方式的区分方法
在data-table.component.ts通过ContentChild来取模板方式的thead和tbody
``` javascript
  @ContentChild(TableTheadComponent) innerHeader: TableTheadComponent;
  @ContentChild(TableTbodyComponent) innerBody: TableTbodyComponent;
```

在data-table.component.html中通过判断是否有模板方式的thead和tbody来决定使用哪种thead和tbody，
由于需要支持行拖拽，所以在模板方式中tbody没有直接使用业务方写的tbody
``` html
<ng-container *ngTemplateOutlet="HeaderContent"></ng-container>
<ng-template *ngIf="!innerHeader" [ngTemplateOutlet]="headerTpl"></ng-template>
```

``` html
<tbody
  *ngIf="innerBody"
  dTableBody
  dSortable
  ...
></tbody>
<tbody
  *ngIf="!innerBody"
  dDataTableBody
  ...
></tbody>
```