import { ExamplePanelComponent } from './example-panel.component';
import { GetStartedComponent } from './get-started.component';


export const routesConfig = [
  {
    path: '',
    redirectTo: 'get-start',
    pathMatch: 'full',
    data: {}
  },
  {
    path: 'get-start',
    component: GetStartedComponent,
    data: { nodisplay: true }
  },
  {
    path: 'accordion', component: ExamplePanelComponent,
    loadChildren: '../../../devui/accordion/demo/accordion-demo.moudule#AccordionDemoModule',
    data: {
      type: '导航',
      name: 'Accordion',
      cnName: '手风琴',
      description: '手风琴，用于需要分组的层级菜单',
      tmw: '需要通过分组组织菜单的时候使用'
    }
  },
  {
    path: 'alert', component: ExamplePanelComponent,
    loadChildren: '../../../devui/alert/demo/alert-demo.module#AlertDemoModule',
    data: {
      type: '反馈',
      name: 'Alert',
      cnName: '警告',
      description: '用于向用户显示警告的信息。',
      tmw: '当页面需要向用户发出警告信息时。'
    }
  },
  {
    path: 'anchor', component: ExamplePanelComponent,
    loadChildren: '../../../devui/anchor/demo/anchor-demo.module#AnchorDemoModule',
    data: {
      type: '导航',
      name: 'Anchor',
      cnName: '锚点',
      description: '用于跳转到页面指定位置。',
      tmw: '需要在页面的各个部分之间实现快速跳转时。'
    }
  },
  {
    path: 'auto-complete',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/auto-complete/demo/auto-complete-demo.module#AutoCompleteDemoModule',
    data: {
      type: '数据录入',
      name: 'AutoComplete',
      cnName: '自动补全',
      description: '在用户进行输入时联想用户可能需要的输入结果。',
      tmw: '可以根据用户输入的部分字符推断出他可能想要输入的内容。'
    }
  },
  {
    path: 'button',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/button/demo/button-demo.module#ButtonDemoModule',
    data: {
      name: 'Button',
      cnName: '按钮',
      description: '按钮用于开始一个即时操作，发起命令并获取结果，在特定场景中使用特定按钮形态',
      tmw: '标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。'
    }
  },
  {
    path: 'checkbox',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/checkbox/demo/checkbox-demo.module#CheckBoxDemoModule',
    data: {
      type: '数据录入',
      name: 'CheckBox',
      cnName: '复选框',
      description: '允许用户从一个数据集中选择多个选项。',
      tmw: `<div>1、在一组选项中进行多项选择。</div>
      <div>2、单独使用可以表示在两个状态之间切换，需要和提交操作结合。</div>`
    }
  },
  {
    path: 'datatable',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/data-table/demo/data-table-demo.module#DataTableDemoModule',
    data: {
      type: '数据展示',
      name: 'DataTable',
      cnName: '表格',
      description: '展示行列数据。',
      tmw: `<div>1、当有大量结构化的数据需要展现时</div>
            <div>2、当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。</div>`
    }
  },
  {
    path: 'color-picker',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/color-picker/demo/color-picker-demo.module#ColorPickerDemoModule',
    data: {
      type: '数据录入',
      name: 'ColorPicker',
      cnName: '颜色选择器',
      description: '输入或选择颜色的控件。',
      tmw: '用户可输入颜色，或在选色面板进行选择。颜色选择器会在本地保存用户最近使用数据。'
    }
  },
  {
    path: 'datepicker',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/datepicker/demo/datepicker-demo.module#DatepickerDemoModule',
    data: {
      type: '数据录入',
      name: 'DatePicker',
      cnName: '日期选择器',
      description: '输入或选择日期的控件。',
      tmw: '当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。'
    }
  },
  {
    path: 'dragdrop',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/dragdrop/demo/dragdrop-demo.module#DragDropDemoModule',
    data: {
      name: 'DragDrop',
      cnName: '拖拽',
      description: '拖拽组件。',
      tmw: `当需要使用数个操作步骤，且步骤的顺序需要灵活调整时。`
    }
  },
  {
    path: 'drawer',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/drawer/demo/drawer-demo.module#DrawerDemoModule',
    data: {
      type: '反馈',
      name: 'Drawer',
      cnName: '抽屉板',
      description: '屏幕边缘滑出的浮层面板。',
      tmw: `<div>1、抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。</div>
      <div>2、当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。</div>
      <div>3、当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。</div>`
    }
  },
  {
    path: 'dropdown',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/dropdown/demo/dropdown-demo.module#DropdownDemoModule',
    data: {
      name: 'DropDown',
      cnName: '下拉菜单',
      description: '按向下弹出的列表。',
      tmw: '当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。'
    }
  },
  {
    path: 'editable-select',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/editable-select/demo/editable-select-demo.module#EditableSelectDemoModule',
    data: {
      type: '数据录入',
      name: 'EditableSelect',
      cnName: '可输入下拉选择框',
      description: '同时支持输入和下拉选择的输入框。',
      tmw: '当需要同时支持用户输入数据和选择已有数据的时候使用，加入输入联想功能，方便用户搜索已有数据。'
    }
  },
  {
    path: 'loading',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/loading/demo/loading-demo.module#LoadingDemoModule',
    data: {
      type: '反馈',
      name: 'Loading',
      cnName: '加载提示',
      description: '提示用户页面正在执行指令，需要等待。',
      tmw: '当执行指令时间较长（需要数秒以上）时，向用户展示正在执行的状态。'
    }
  },
  {
    path: 'modal',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/modal/demo/modal-demo.module#ModalDemoModule',
    data: {
      type: '反馈',
      name: 'Modal',
      cnName: '模态弹窗',
      description: '弹窗即模态对话框，整个程序只有弹窗区域获得焦点，用户必须处理弹窗内容才可以做其他操作。',
      tmw: `<div>1、需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。</div>
      <div>2、弹窗起到与用户进行交互的作用，用户可以在对话框中输入信息、阅读提示、设置选项等操作。</div>`
    }
  },
  {
    path: 'pagination',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/pagination/demo/pagination-demo.module#PaginationDemoModule',
    data: {
      type: '导航',
      name: 'Pagination',
      cnName: '分页',
      description: '采用分页的形式分隔长列表，每次只加载一个页面。',
      tmw: `当加载/渲染所有数据将花费很多时间时，可以切换页码浏览数据。`
    }
  },
  {
    path: 'panel',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/panel/demo/panel-demo.module#PanelDemoModule',
    data: {
      name: 'Panel',
      cnName: '面板',
      description: '内容面板，用于内容分组。',
      tmw: `当页面内容需要进行分组显示时使用，一般包含头部、内容区域、底部是哪个部分。`
    }
  },
  {
    path: 'popover',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/popover/demo/popover-demo.module#PopoverDemoModule',
    data: {
      name: 'Popover',
      cnName: '悬浮提示',
      description: '简单的文字提示气泡框。popover用来通知用户非关键性问题或提示某控件处于某特殊情况。',
      tmw: `单击控件则显示提示，单击空白处提示消失，气泡浮层不承载复杂文本和操作。`
    }
  },
  {
    path: 'progress',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/progress/demo/progress-demo.module#ProgressDemoModule',
    data: {
      name: 'Progress',
      cnName: '进度条',
      description: '进度条，用来展示操作的当前进度。',
      tmw: `<div>1、当操作需要较长的时间时，向用户展示操作进度。</div>
            <div>2、当操作需要打断现有界面或后台运行，需要较长时间时。</div>
            <div>3、当需要显示一个操作完成的百分比或已完成的步骤/总步骤时。</div>`
    }
  },
  {
    path: 'radio',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/radio/demo/radio-demo.module#RadioDemoModule',
    data: {
      type: '数据录入',
      name: 'Radio',
      cnName: '单选框',
      description: '单选框。',
      tmw: `用户要从一个数据集中选择单个选项，且能并排查看所有可选项，选项数量在2~7之间，建议使用单选按钮。`
    }
  },
  {
    path: 'search',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/search/demo/search-demo.module#SearchDemoModule',
    data: {
      name: 'Search',
      cnName: '搜索框',
      description: '搜索框。',
      tmw: `当用户需要在数据集中搜索所需数据时，输入所需数据的内容（或部分内容），返回所有匹配内容的搜索结果。`
    }
  },
  {
    path: 'select',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/select/demo/select-demo.module#SelectDemoModule',
    data:  {
      type: '数据录入',
      name: 'Select',
      cnName: '下拉选择框',
      description: '下拉选择框。',
      tmw: `用户可以从多个选项中选择一项或几项；仅支持用户在下拉选项中选择和搜索系统提供的选项，不支持输入。`
    }
  },
  {
    path: 'status',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/status/demo/status-demo.module#StatusDemoModule',
    data: {
      name: 'Status',
      cnName: '状态',
      description: '状态传达了组件或者页面可互动元素交互的结果。',
      tmw: `表示一个任务的执行结果时使用。`
    }
  },
  {
    path: 'sticky',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/sticky/demo/sticky-demo.module#StickyDemoModule',
    data: {
      name: 'Sticky',
      cnName: '便贴',
      description: '页面内容固定在可视区域。',
      tmw: `当用户在滚动屏幕时，需要某个区域内容在段落或者浏览器可视区域可见时。`
    }
  },
  {
    path: 'tabs',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/tabs/demo/tabs-demo.module#TabsDemoModule',
    data: {
      type: '导航',
      name: 'Tabs',
      cnName: '选项卡切换',
      description: '选项卡切换组件。',
      tmw: `用户需要通过平级的区域将大块内容进行收纳和展现，保持界面整洁。`
    }
  },
  {
    path: 'tags',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/tags/demo/tags-demo.module#TagsDemoModule',
    data: {
      type: '数据录入',
      name: 'Tags',
      cnName: '标签',
      description: '标签展示组件。',
      tmw: `用户需要展示多个标签时。`
    }
  },
  {
    path: 'tags-input',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/tags-input/demo/tags.input-demo.module#TagsInputDemoModule',
    data: {
      type: '数据录入',
      name: 'TagsInput',
      cnName: '标签输入',
      description: '用于输入多个标签。',
      tmw: `用户需要输入多个标签时。`
    }
  },
  {
    path: 'toast',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/toast/demo/toast-demo.module#ToastDemoModule',
    data: {
      type: '反馈',
      name: 'Toast',
      cnName: '全局通知',
      description: '全局信息提示组件。',
      tmw: `当需要向用户全局展示提示信息时使用，显示数秒后消失。`
    }
  },
  {
    path: 'tooltip',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/tooltip/demo/tooltip-demo.module#TooltipDemoModule',
    data: {
      name: 'Tooltip',
      cnName: '提示',
      description: '文字提示组件',
      tmw: `用户鼠标移动到文字上，需要进一步的提示时使用。`
    }
  },
  {
    path: 'toggle',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/toggle/demo/toggle-demo.module#ToggleDemoModule',
    data: {
      type: '数据录入',
      name: 'Toggle',
      cnName: '开关',
      description: '开/关切换组件',
      tmw: `当两种状态需要来回切换控制时，比如启用/禁用。`
    }
  },
  {
    path: 'tree',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/tree/demo/tree-demo.module#TreeDemoModule',
    data: {
      type: '数据展示',
      name: 'Tree',
      cnName: '树',
      description: '树型选择组件。',
      tmw: '文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。'
    }
  },
  {
    path: 'upload',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/upload/demo/upload-demo.module#UploadDemoModule',
    data: {
      type: '数据录入',
      name: 'Upload',
      cnName: '上传',
      description: '文件上传组件',
      tmw: `当需要将文件上传到后端服务器时。`
    }
  },
  {
    path: 'input-number',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/input-number/demo/input-number-demo.module#InputNumberDemoModule',
    data: {
      type: '数据录入',
      name: 'InputNumber',
      cnName: '数字输入框',
      description: '通过鼠标或键盘，输入范围内的数值',
      tmw: `当需要获取标准数值时。`
    }
  },
  {
    path: 'tree-select',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/tree-select/demo/tree-select-demo.module#TreeSelectDemoModule',
    data: {
      type: '数据录入',
      name: 'TreeSelect',
      cnName: '树形选择框',
      description: '树形选择框',
      tmw: `文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。`
    }
  },
  {
    path: 'slider',
    component: ExamplePanelComponent,
    loadChildren: '../../../devui/slider/demo/slider-demo.module#SliderDemoModule',
    data: {
      type: '数据录入',
      name: 'Slider',
      cnName: '滑动输入条',
      description: '滑动输入条可以更直观地展示当前值和可选范围。',
      tmw: `当用户需要在数值区间内进行选择时使用。`
    }
  },
];