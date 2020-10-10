# 目录结构
│  gantt-marker.directive.ts    # 时间轴标线指令，包括月初、周末、里程碑、今天等标线
│  gantt.model.ts               # 组件类型定义
│  gantt.module.ts              # 组件模块
│  gantt.service.ts             # GanttService
│  resize-handle.directive.ts   # 在与datatable结合时，左侧列表视图和右侧甘特图视图之间调整宽度的指令，需要在demo中提供样式
│
├─demo                          # DEMO目录
│  ├─basic                      # 基本用法
│  └─table                      # 在与datatable结合的用法
│      └─reset-position         # 左侧列表最后一列快速定位时间条的指令
│
├─doc                           # 文档目录
│
├─gantt-bar                     # 时间条组件
│
├─gantt-bar-parent              # 父时间条组件
│
├─gantt-milestone               # 里程碑时间条组件
│
└─gantt-scale                   # 时间轴组件