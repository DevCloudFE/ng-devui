import {
  Component, ChangeDetectionStrategy, Input, HostListener, ChangeDetectorRef, OnInit,
  OnDestroy,
  HostBinding
} from '@angular/core';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableComponent } from './data-table.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';
import { DataTableRowComponent } from './data-table-row.component';
import { Subscription } from 'rxjs';
import { stopPropagationIfExist } from '../utils/dom-utils';

@Component({
  selector: 'ave-data-table-cell,[aveDataTableCell]',
  templateUrl: './data-table-cell.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableCellComponent implements OnInit, OnDestroy {
  @Input() rowIndex: number;
  @Input() colIndex: number;
  @Input() column: DataTableColumnTmplComponent;
  @Input() rowItem: any;
  @Input() dataTableTemplates: DataTableTmplsComponent;
  @Input() editModel: string;
  @Input() isEditRow: boolean;
  @Input() timeout: number;

  isCellEdit: boolean;
  forceUpdateSubscription: Subscription;
  documentClickubscription: Subscription;
  clickCount = 0; // 记录点击次数
  timeoutId; // 延时id

  constructor(public dt: DataTableComponent, private changeDetectorRef: ChangeDetectorRef,
    public rowComponent: DataTableRowComponent) {
  }

  ngOnInit(): void {
    this.forceUpdateSubscription = this.rowComponent.forceUpdateEvent.subscribe(_ => this.forceUpdate());
  }

  @HostListener('click', ['$event'])
  onCellClick($event) {
    // $event.stopPropagation();
    const cellSelectedEventArg = {
      rowIndex: this.rowIndex,
      colIndex: this.colIndex,
      column: this.column,
      rowItem: this.rowItem,
      cellComponent: this,
      rowComponent: this.rowComponent
    };

    this.clickCount++;
    if (this.clickCount === 1) {
      this.timeoutId = setTimeout(() => {
        if (this.clickCount === 1) {
          this.dt.onCellClick(cellSelectedEventArg);
          if (this.column.editable && this.editModel === 'cell') {
            stopPropagationIfExist($event);
            this.isCellEdit = true;
            this.documentClickubscription = this.dt.documentClickEvent.subscribe(_ => this.onFinishCellEdit());
            this.dt.onCellEditStart(cellSelectedEventArg);
          }
        }
        this.clickCount = 0;
        clearTimeout(this.timeoutId);
      }, this.timeout);
    }

  }

  @HostListener('dblclick', ['$event'])
  onCellDBClick($event) {
    // $event.stopPropagation();
    const cellSelectedEventArg = {
      rowIndex: this.rowIndex,
      colIndex: this.colIndex,
      column: this.column,
      rowItem: this.rowItem,
      cellComponent: this,
      rowComponent: this.rowComponent
    };
    this.dt.onCellDBClick(cellSelectedEventArg);
  }

  forceUpdate() {
    this.changeDetectorRef.markForCheck();
  }

  onFinishCellEdit($event?: Event) {
    if (this.editModel !== 'cell') {
      return;
    }
    this.isCellEdit = false;
    this.unSubscription(this.documentClickubscription);
    stopPropagationIfExist($event);

    this.dt.onCellEditEnd({
      rowIndex: this.rowIndex,
      colIndex: this.colIndex,
      column: this.column,
      rowItem: this.rowItem,
      cellComponent: this,
      rowComponent: this.rowComponent
    });
  }

  isCellEditEnable(column, rowItem) {
    if (this.editModel === 'cell') {
      return this.isCellEdit;
    }

    return this.isEditRow;
  }

  getCellValue(column: DataTableColumnTmplComponent, rowIndex: number, rowItem: any) {
    if (!column || !column.field) {
      return null;
    }

    if (column.field === '$index') {
      return rowIndex + 1;
    }
    return rowItem[column.field];

    /*
     * field with dot, like address.line1
     const fields = column.field.split('.');
     return fields.reduce((obj, field) => obj ? obj[field] : null, rowItem);
     */
  }

  getCellFormatValue(column: DataTableColumnTmplComponent, rowIndex: number, rowItem: any) {
    const cellValue = this.getCellValue(column, rowIndex, rowItem);
    if (column.field !== '$index' && column.formatter) {
      return column.formatter(cellValue, rowItem);
    }
    return cellValue;
  }

  ngOnDestroy(): void {
    this.unSubscription(this.forceUpdateSubscription);
    this.unSubscription(this.documentClickubscription);
  }

  private unSubscription(sbscription: Subscription) {
    if (sbscription) {
      sbscription.unsubscribe();
      sbscription = null;
    }
  }
}
