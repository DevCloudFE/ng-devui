export enum TransferDirection { SOURCE, TARGET }

export interface TransferDataFormat {
  name: string;
  value: any;
  id?: number;
  checked?: boolean;
  disabled?: boolean;
}
