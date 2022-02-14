import { TableWidthConfig } from './data-table.model';

export interface DataTableProperiesInterface {
  maxWidth?: string;
  maxHeight?: string;
  size?: string;
  rowHoveredHighlight?: boolean;
  generalRowHoveredData?: boolean;
  cssClass?: string;
  tableWidth?: string;
  fixHeader?: boolean;
  colDraggable?: boolean;
  colDropFreezeTo?: number;
  tableWidthConfig?: TableWidthConfig[];
  showSortIcon?: boolean;
  showFilterIcon?: boolean;
  showOperationArea?: boolean;
  hideColumn?: string[];
  pageAllChecked?: boolean;
  onlyOneColumnSort?: boolean;
  multiSort?: any;
  resizeable?: boolean;
  timeout?: number;
  beforeCellEdit?: any;
  headerBg?: boolean;
  tableLayout?: string;
  borderType?: string;
  striped?: boolean;
}
