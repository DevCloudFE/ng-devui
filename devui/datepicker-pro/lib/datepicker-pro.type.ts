export interface DevuiCalendarDateItem {
  day: string;
  date: Date;
  isActive: boolean;
  inMonth: boolean;
  isToday: boolean;
  isInRange?: boolean;
  isDisable?: boolean;
}

export interface DateConfig {
  dateConverter: any;
  min: Date; // 默认1900
  max: Date; // 默认 2099
  format: {
    date: string; // 默认 'y-MM-dd'
    time: string; // 默认 'y-MM-dd HH:mm',
    month: string;
    year: string;
  };
}
