export enum SelectDateRangeChangeReason {
  date,
  time,
  button
}

export interface SelectDateRangeChangeEventArgs {
  reason: SelectDateRangeChangeReason;
  selectedRange: Date[];
}
