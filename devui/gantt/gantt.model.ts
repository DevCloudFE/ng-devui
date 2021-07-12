export interface GanttScaleDateInfo {
  dayOfMonthLabel: string;
  dayOfWeekLabel: string;
  monthLabel: string;
  yearLabel: string;
  date: Date;
  monthStart?: boolean;
  weekend?: boolean;
  today?: boolean;
  highlight?: boolean;
  highlightStart?: boolean;
  milestone?: string;
  scaleStartVisable?: boolean;
  index?: number;
}

export enum GanttScaleUnit {
  day = 'day',
  week = 'week',
  month = 'month',
}
export interface GanttBarStatus {
  focused: boolean;
  startDate: Date;
  endDate: Date;
}

export interface GanttScaleConfig {
  startDate?: Date;
  endDate?: Date;
  unit?: GanttScaleUnit;
}

export enum GanttMarkerType {
  milestone = 'milestone',
  month = 'month',
  week = 'week',
}

export interface GanttMilestone {
  date: Date;
  lable: string;
}

export interface GanttTaskInfo {
  id: string;
  startDate: Date;
  endDate: Date;
  title?: string;
  progress: string;
  duration: string;
  moveOffset?: number;
  left?: number;
  width?: number;
}

export enum UnitRole {
  day = 10,
  week = 20,
  month = 30,
}
