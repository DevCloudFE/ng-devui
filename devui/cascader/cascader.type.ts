export interface CascaderItem {
  label: string;
  value: number | string;
  isLeaf?: boolean;
  children?: CascaderItem[];
  disabled?: boolean;
  checked?: boolean;
  halfChecked?: boolean;
  active?: boolean;
  icon?: string;
  _loading?: boolean;
  [prop: string]: any;
}
