import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { stopPropagationIfExist } from 'ng-devui/utils';
import { DataTableRowComponent } from './data-table-row.component';
import { DataTableComponent } from './data-table.component';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';

@Component({
  selector: 'd-data-table-cell,[dDataTableCell]',
  templateUrl: './data-table-cell.component.html',
  styleUrls: ['./data-table-cell.component.scss']
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
  @Input() tableLevel: number;
  @Input() rowHovered: boolean;
  isCellEdit: boolean;
  forceUpdateSubscription: Subscription;
  documentClickSubscription: Subscription;
  cellEditorClickSubscription: Subscription;
  cellActionSubscription: Subscription;
  clickCount = 0; // 记录点击次数
  timeoutId; // 延时id

  constructor(public dt: DataTableComponent, private changeDetectorRef: ChangeDetectorRef,
    public rowComponent: DataTableRowComponent, private cellRef: ElementRef, private ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.forceUpdateSubscription = this.rowComponent.forceUpdateEvent.subscribe(_ => this.forceUpdate());
    this.ngZone.runOutsideAngular(() => {
      this.cellRef.nativeElement.addEventListener(
          'click',
          this.onCellClick.bind(this)
      );
      this.cellRef.nativeElement.addEventListener(
        'dblclick',
        this.onCellDBClick.bind(this)
      );
    });
  }

  onCellClick($event) {
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
        }
        this.clickCount = 0;
        clearTimeout(this.timeoutId);
      }, this.timeout);
    }
  }

  onCellDBClick($event) {
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
    this.ngZone.run(() => {
      this.isCellEdit = false;
    });

    // tslint:disable-next-line:no-unused-expression
    this.documentClickSubscription && this.unSubscription(this.documentClickSubscription);
    // tslint:disable-next-line:no-unused-expression
    this.cellEditorClickSubscription && this.unSubscription(this.cellEditorClickSubscription);
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
    // tslint:disable-next-line:no-unused-expression
    this.forceUpdateSubscription && this.unSubscription(this.forceUpdateSubscription);
    // tslint:disable-next-line:no-unused-expression
    this.documentClickSubscription && this.unSubscription(this.documentClickSubscription);
    // tslint:disable-next-line:no-unused-expression
    this.cellEditorClickSubscription && this.unSubscription(this.cellEditorClickSubscription);
    // tslint:disable-next-line:no-unused-expression
    this.cellActionSubscription && this.unSubscription(this.cellActionSubscription);
  }

  private unSubscription(sbscription: Subscription) {
    if (sbscription) {
      sbscription.unsubscribe();
      sbscription = null;
    }
  }

  cellEditing($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.dt.cellEditorClickEvent.emit($event);
    const cellSelectedEventArg = {
      rowIndex: this.rowIndex,
      colIndex: this.colIndex,
      column: this.column,
      rowItem: this.rowItem,
      cellComponent: this,
      rowComponent: this.rowComponent
    };
    if (this.column.editable && this.editModel === 'cell') {
      this.isCellEdit = true;
      this.documentClickSubscription = this.dt.documentClickEvent.subscribe(
        event => {
          if (!this.cellRef.nativeElement.contains(event.target)) {
            this.onFinishCellEdit();
          }
        }
      );
      this.cellEditorClickSubscription = this.dt.cellEditorClickEvent.subscribe(
        event => {
          if (!this.cellRef.nativeElement.contains(event.target)) {
            this.onFinishCellEdit();
          }
        }
      );
      this.dt.onCellEditStart(cellSelectedEventArg);
    }
  }

  toggleChildTable(rowItem) {
    rowItem.$isChildTableOpen = !rowItem.$isChildTableOpen;
    if (rowItem.$isChildTableOpen) {
      this.dt.onChildTableOpen(rowItem);
    }
  }
}
