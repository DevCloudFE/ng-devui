export enum SelectDateRangeChangeReason {
  date,
  time,
  button,
  format,
  custom
}

export interface SelectDateRangeChangeEventArgs {
  reason: SelectDateRangeChangeReason;
  selectedRange: Date[];
}
