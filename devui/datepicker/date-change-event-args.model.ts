export enum SelectDateChangeReason {
  date = 0,
  time = 1,
  button = 2,
  format = 3,
  custom = 4,
}

export interface SelectDateChangeEventArgs {
  reason: SelectDateChangeReason;
  selectedDate: Date;
}
