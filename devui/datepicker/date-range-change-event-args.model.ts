export enum SelectDateRangeChangeReason {
  date = 0,
  time = 1,
  button = 2,
  format = 3,
  custom = 4,
}

export interface SelectDateRangeChangeEventArgs {
  reason: SelectDateRangeChangeReason;
  selectedRange: Date[];
}
