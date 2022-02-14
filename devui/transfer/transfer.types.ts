export enum TransferDirection { SOURCE, TARGET }

export interface TransferDataFormat {
  name: string;
  value: any;
  id?: number | string;
  checked?: boolean;
  disabled?: boolean;
}
