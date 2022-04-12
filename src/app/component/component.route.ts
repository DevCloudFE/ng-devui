import { ExamplePanelComponent } from './example-panel.component';
import { GetStartedComponent } from './get-started.component';
import { GlobalConfigComponent } from './global-config.component';
import { ComponentsOverviewComponent } from './overview.component';
import { ThemeGuideComponent } from './theme-guide.component';
export const routesConfig = [
  {
    path: 'design-color',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/design-token/color/demo/design-color-demo.module'
      ).then((m) => m.DesignColorDemoModule),
    data: {
      type: 'Design Tokens',
      enType: 'Design Tokens',
      name: 'Color',
      cnName: '颜色',
      nodisplay: true,
    },
  },
  {
    path: 'design-animation',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/design-token/animation/demo/design-animation-demo.module'
      ).then((m) => m.DesignAnimationDemoModule),
    data: {
      type: 'Design Tokens',
      enType: 'Design Tokens',
      name: 'Animation',
      cnName: '动效',
      nodisplay: true,
    },
  },
  {
    path: 'design-link',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/design-token/link/demo/design-link-demo.module'
      ).then((m) => m.DesignLinkDemoModule),
    data: {
      type: 'Design Tokens',
      enType: 'Design Tokens',
      name: 'Link',
      cnName: '链接',
      nodisplay: true,
    },
  },
  {
    path: 'design-shadow',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/design-token/shadow/demo/design-shadow-demo.module'
      ).then((m) => m.DesignShadowDemoModule),
    data: {
      type: 'Design Tokens',
      enType: 'Design Tokens',
      name: 'Shadow',
      cnName: '阴影',
      nodisplay: true,
    },
  },
  {
    path: 'design-font',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/design-token/font/demo/design-font-demo.module'
      ).then((m) => m.DesignFontDemoModule),
    data: {
      type: 'Design Tokens',
      enType: 'Design Tokens',
      name: 'Font',
      cnName: '字体',
      nodisplay: true,
    },
  },
  {
    path: 'design-border-radius',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/design-token/border-radius/demo/design-border-radius-demo.module'
      ).then((m) => m.DesignBorderRadiusDemoModule),
    data: {
      type: 'Design Tokens',
      enType: 'Design Tokens',
      name: 'BorderRadius',
      cnName: '圆角',
      nodisplay: true,
    },
  },
  {
    path: 'design-z-index',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/design-token/z-index/demo/design-z-index-demo.module'
      ).then((m) => m.DesignZIndexDemoModule),
    data: {
      type: 'Design Tokens',
      enType: 'Design Tokens',
      name: 'ZIndex',
      cnName: '层级',
      nodisplay: true,
    },
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
    data: {},
  },
  {
    path: 'overview',
    component: ComponentsOverviewComponent,
    data: {
      nodisplay: true,
    },
  },
  {
    path: 'get-start',
    component: GetStartedComponent,
    data: {
      nodisplay: true,
    },
  },
  {
    path: 'theme-guide',
    component: ThemeGuideComponent,
    data: {
      nodisplay: true,
    },
  },
  {
    path: 'global-config',
    component: GlobalConfigComponent,
    data: {
      nodisplay: true,
    },
  },
  {
    path: 'accordion',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/accordion/demo/accordion-demo.moudule').then(
        (m) => m.AccordionDemoModule
      ),
    data: {
      type: '导航',
      enType: 'Navigation',
      name: 'Accordion',
      cnName: '手风琴',
    },
  },
  {
    path: 'alert',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/alert/demo/alert-demo.module').then(
        (m) => m.AlertDemoModule
      ),
    data: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Alert',
      cnName: '警告',
    },
  },
  {
    path: 'anchor',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/anchor/demo/anchor-demo.module').then(
        (m) => m.AnchorDemoModule
      ),
    data: {
      type: '导航',
      enType: 'Navigation',
      name: 'Anchor',
      cnName: '锚点',
    },
  },
  {
    path: 'animations',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/animations/demo/animations-demo.module').then(
        (m) => m.AnimationsDemoModule
      ),
    data: {
      type: '扩展服务',
      enType: 'Extended Service',
      name: 'Animations',
      cnName: '动效',
    },
  },
  {
    path: 'auto-complete',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/auto-complete/demo/auto-complete-demo.module'
      ).then((m) => m.AutoCompleteDemoModule),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'AutoComplete',
      cnName: '自动补全',
    },
  },
  {
    path: 'avatar',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/avatar/demo/avatar-demo.module').then(
        (m) => m.AvatarDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Avatar',
      cnName: '头像',
    },
  },
  {
    path: 'ImagePreview',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/image-preview/demo/image-preview-demo.module'
      ).then((m) => m.ImagePreviewDemoModule),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'ImagePreview',
      cnName: '图片预览',
    },
  },
  {
    path: 'breadcrumb',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/breadcrumb/demo/breadcrumb-demo.module').then(
        (m) => m.BreadCrumbDemoModule
      ),
    data: {
      type: '导航',
      enType: 'Navigation',
      name: 'Breadcrumb',
      cnName: '面包屑',
    },
  },
  {
    path: 'back-top',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/back-top/demo/back-top-demo.module').then(
        (m) => m.BackTopDemoModule
      ),
    data: {
      type: '导航',
      enType: 'Navigation',
      name: 'BackTop',
      cnName: '回到顶部',
    },
  },
  {
    path: 'button',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/button/demo/button-demo.module').then(
        (m) => m.ButtonDemoModule
      ),
    data: {
      name: 'Button',
      cnName: '按钮',
    },
  },
  {
    path: 'badge',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/badge/demo/badge-demo.module').then(
        (m) => m.BadgeDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Badge',
      cnName: '徽标',
    },
  },
  {
    path: 'card',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/card/demo/card-demo.module').then(
        (m) => m.CardDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Card',
      cnName: '卡片',
    },
  },
  {
    path: 'carousel',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/carousel/demo/carousel-demo.module').then(
        (m) => m.CarouselDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Carousel',
      cnName: '走马灯',
    },
  },
  {
    path: 'checkbox',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/checkbox/demo/checkbox-demo.module').then(
        (m) => m.CheckBoxDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'CheckBox',
      cnName: '复选框',
    },
  },
  {
    path: 'common',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/common/demo/common-demo.module').then(
        (m) => m.CommonDemoModule
      ),
    data: {
      name: 'Common',
      cnName: '公共方法',
    },
  },
  {
    path: 'datepickerPro',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/datepicker-pro/demo/datepicker-pro-demo.module'
      ).then((m) => m.DatepickerProDemoModule),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'DatepickerPro',
      cnName: '日期选择器',
    },
  },
  {
    path: 'dashboard',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/dashboard/demo/dashboard-demo.module').then(
        (m) => m.DashboardDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Dashboard',
      cnName: '仪表盘',
    },
  },
  {
    path: 'datatable',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/data-table/demo/data-table-demo.module').then(
        (m) => m.DataTableDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'DataTable',
      cnName: '表格',
    },
  },
  {
    path: 'datepicker',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/datepicker/demo/datepicker-demo.module').then(
        (m) => m.DatepickerDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'DatePicker',
      cnName: '日期选择器',
    },
  },
  {
    path: 'multi-auto-complete',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/multi-auto-complete/demo/multi-auto-complete-demo.module'
      ).then((m) => m.MultiAutoCompleteDemoModule),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'MultiAutoComplete',
      cnName: '多项自动补全',
    },
  },
  {
    path: 'form',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/form/demo/form-demo.module').then(
        (m) => m.FormDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Form',
      cnName: '表单',
    },
  },
  {
    path: 'fullscreen',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/fullscreen/demo/fullscreen-demo.module').then(
        (m) => m.FullscreenDemoModule
      ),
    data: {
      name: 'Fullscreen',
      cnName: '全屏',
    },
  },
  {
    path: 'transfer',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/transfer/demo/transfer-demo.module').then(
        (m) => m.TransferDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Transfer',
      cnName: '穿梭框',
    },
  },
  {
    path: 'dragdrop',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/dragdrop/demo/dragdrop-demo.module').then(
        (m) => m.DragDropDemoModule
      ),
    data: {
      name: 'DragDrop',
      cnName: '拖拽',
    },
  },
  {
    path: 'drawer',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/drawer/demo/drawer-demo.module').then(
        (m) => m.DrawerDemoModule
      ),
    data: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Drawer',
      cnName: '抽屉板',
    },
  },
  {
    path: 'dropdown',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/dropdown/demo/dropdown-demo.module').then(
        (m) => m.DropdownDemoModule
      ),
    data: {
      type: '导航',
      enType: 'Navigation',
      name: 'DropDown',
      cnName: '下拉菜单',
    },
  },
  {
    path: 'editable-select',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/editable-select/demo/editable-select-demo.module'
      ).then((m) => m.EditableSelectDemoModule),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'EditableSelect',
      cnName: '可输入下拉选择框',
    },
  },
  {
    path: 'loading',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/loading/demo/loading-demo.module').then(
        (m) => m.LoadingDemoModule
      ),
    data: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Loading',
      cnName: '加载提示',
    },
  },
  {
    path: 'modal',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/modal/demo/modal-demo.module').then(
        (m) => m.ModalDemoModule
      ),
    data: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Modal',
      cnName: '模态弹窗',
    },
  },
  {
    path: 'pagination',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/pagination/demo/pagination-demo.module').then(
        (m) => m.PaginationDemoModule
      ),
    data: {
      type: '导航',
      enType: 'Navigation',
      name: 'Pagination',
      cnName: '分页',
    },
  },
  {
    path: 'panel',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/panel/demo/panel-demo.module').then(
        (m) => m.PanelDemoModule
      ),
    data: {
      name: 'Panel',
      cnName: '面板',
    },
  },
  {
    path: 'popover',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/popover/demo/popover-demo.module').then(
        (m) => m.PopoverDemoModule
      ),
    data: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Popover',
      cnName: '悬浮提示',
    },
  },
  {
    path: 'progress',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/progress/demo/progress-demo.module').then(
        (m) => m.ProgressDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Progress',
      cnName: '进度条',
    },
  },
  {
    path: 'quadrant-diagram',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/quadrant-diagram/demo/quadrant-diagram-demo.module'
      ).then((m) => m.QuadrantDiagramDemoModule),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Quadrant Diagram',
      cnName: '象限图',
    },
  },
  {
    path: 'radio',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/radio/demo/radio-demo.module').then(
        (m) => m.RadioDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Radio',
      cnName: '单选框',
    },
  },
  {
    path: 'rate',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/rate/demo/rate-demo.module').then(
        (m) => m.RateDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Rate',
      cnName: '等级评估',
    },
  },
  {
    path: 'search',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/search/demo/search-demo.module').then(
        (m) => m.SearchDemoModule
      ),
    data: {
      name: 'Search',
      cnName: '搜索框',
    },
  },
  {
    path: 'select',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/select/demo/select-demo.module').then(
        (m) => m.SelectDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Select',
      cnName: '下拉选择框',
    },
  },
  {
    path: 'cascader',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/cascader/demo/cascader-demo.module').then(
        (m) => m.CascaderDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Cascader',
      cnName: '级联菜单',
    },
  },
  {
    path: 'status',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/status/demo/status-demo.module').then(
        (m) => m.StatusDemoModule
      ),
    data: {
      name: 'Status',
      cnName: '状态',
    },
  },
  {
    path: 'sticky',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/sticky/demo/sticky-demo.module').then(
        (m) => m.StickyDemoModule
      ),
    data: {
      name: 'Sticky',
      cnName: '便贴',
    },
  },
  {
    path: 'tabs',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/tabs/demo/tabs-demo.module').then(
        (m) => m.TabsDemoModule
      ),
    data: {
      type: '导航',
      enType: 'Navigation',
      name: 'Tabs',
      cnName: '选项卡切换',
    },
  },
  {
    path: 'nav-sprite',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/nav-sprite/demo/nav-sprite-demo.module').then(
        (m) => m.NavSpriteDemoModule
      ),
    data: {
      type: '导航',
      enType: 'Navigation',
      name: 'NavSprite',
      cnName: '导航精灵',
    },
  },
  {
    path: 'tags',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/tags/demo/tags-demo.module').then(
        (m) => m.TagsDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Tags',
      cnName: '标签',
    },
  },
  {
    path: 'tags-input',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/tags-input/demo/tags.input-demo.module').then(
        (m) => m.TagsInputDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'TagsInput',
      cnName: '标签输入',
    },
  },
  {
    path: 'time-axis',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/time-axis/demo/time-axis-demo.module').then(
        (m) => m.TimeAxisDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'TimeAxis',
      cnName: '时间轴',
    },
  },
  {
    path: 'toast',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/toast/demo/toast-demo.module').then(
        (m) => m.ToastDemoModule
      ),
    data: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Toast',
      cnName: '全局通知',
    },
  },
  {
    path: 'tooltip',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/tooltip/demo/tooltip-demo.module').then(
        (m) => m.TooltipDemoModule
      ),
    data: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Tooltip',
      cnName: '提示',
    },
  },
  {
    path: 'read-tip',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/read-tip/demo/read-tip-demo.module').then(
        (m) => m.ReadTipDemoModule
      ),
    data: {
      type: '反馈',
      enType: 'Feedback',
      name: 'ReadTip',
      cnName: '阅读提示',
      description: '阅读提示组件。',
      tmw: `当html文档中需要对特定内容进行提示时使用。`,
    },
  },
  {
    path: 'mention',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/mention/demo/mention-demo.module').then(
        (m) => m.MentionDemoModule
      ),
    data: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Mention',
      cnName: '提及',
      description: '提及组件。',
      tmw: `用于在输入中提及某人或某事，常用于发布、聊天或评论功能。`,
    },
  },
  {
    path: 'toggle',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/toggle/demo/toggle-demo.module').then(
        (m) => m.ToggleDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Toggle',
      cnName: '开关',
    },
  },
  {
    path: 'tree',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/tree/demo/tree-demo.module').then(
        (m) => m.TreeDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Tree',
      cnName: '树',
    },
  },
  {
    path: 'upload',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/upload/demo/upload-demo.module').then(
        (m) => m.UploadDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Upload',
      cnName: '上传',
    },
  },
  {
    path: 'input-number',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/input-number/demo/input-number-demo.module').then(
        (m) => m.InputNumberDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'InputNumber',
      cnName: '数字输入框',
    },
  },
  {
    path: 'tree-select',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/tree-select/demo/tree-select-demo.module').then(
        (m) => m.TreeSelectDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'TreeSelect',
      cnName: '树形选择框',
    },
  },
  {
    path: 'slider',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/slider/demo/slider-demo.module').then(
        (m) => m.SliderDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Slider',
      cnName: '滑动输入条',
    },
  },
  {
    path: 'splitter',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/splitter/demo/splitter-demo.module').then(
        (m) => m.SplitterDemoModule
      ),
    data: {
      type: '布局',
      enType: 'Layout',
      name: 'Splitter',
      cnName: '分割器',
    },
  },
  {
    path: 'layout',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/layout/demo/layout-demo.module').then(
        (m) => m.LayoutDemoModule
      ),
    data: {
      type: '布局',
      enType: 'Layout',
      name: 'Layout',
      cnName: '布局',
    },
  },
  {
    path: 'gantt',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/gantt/demo/gantt-demo.module').then(
        (m) => m.GanttDemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Gantt',
      cnName: '甘特图',
    },
  },
  {
    path: 'text-input',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/text-input/demo/text-input-demo.module').then(
        (m) => m.TextInputDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'TextInput',
      cnName: '文本框',
    },
  },
  {
    path: 'textarea',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/textarea/demo/text-demo.module').then(
        (m) => m.TextDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Textarea',
      cnName: '多行文本框',
    },
  },
  {
    path: 'steps-guide',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/steps-guide/demo/steps-guide-demo.module').then(
        (m) => m.StepsGuideDemoModule
      ),
    data: {
      type: '导航',
      enType: 'Navigation',
      name: 'StepsGuide',
      cnName: '操作指引',
    },
  },
  {
    path: 'time-picker',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/time-picker/demo/time-picker-demo.module').then(
        (m) => m.TimePickerDemoModule
      ),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'TimePicker',
      cnName: '时间选择器',
    },
  },
  {
    path: 'relative-time',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import('../../../devui/relative-time/demo/demo.module').then(
        (m) => m.DemoModule
      ),
    data: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'RelativeTime',
      cnName: '人性化时间转换',
    },
  },
  {
    path: 'category-search',
    component: ExamplePanelComponent,
    loadChildren: () =>
      import(
        '../../../devui/category-search/demo/category-search-demo.module'
      ).then((m) => m.CategorySearchDemoModule),
    data: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'CategorySearch',
      cnName: '分类搜索',
    },
  },
];
