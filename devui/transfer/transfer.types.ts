export enum TransferDirection { SOURCE, TARGET }

export interface TransferDataFormat {
  name: string;
  value: any;
  id?: string;
  checked?: boolean;
  disabled?: boolean;
}
