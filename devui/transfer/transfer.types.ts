export enum TransferDirection {
  SOURCE = 0,
  TARGET = 1,
}

export interface TransferDataFormat {
  name: string;
  value: any;
  id?: number | string;
  checked?: boolean;
  disabled?: boolean;
}
