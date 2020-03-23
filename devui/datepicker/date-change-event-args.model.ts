export enum SelectDateChangeReason {
  date,
  time,
  button,
  format
}

export interface SelectDateChangeEventArgs {
  reason: SelectDateChangeReason;
  selectedDate: Date;
}
