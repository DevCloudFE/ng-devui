export enum SelectDateChangeReason {
  date,
  time,
  button,
  format,
  custom
}

export interface SelectDateChangeEventArgs {
  reason: SelectDateChangeReason;
  selectedDate: Date;
}
