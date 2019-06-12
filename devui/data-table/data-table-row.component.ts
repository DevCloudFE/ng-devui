import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { ForceUpdateReason } from './force-update-reason.model';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';

@Component({
  selector: 'ave-data-table-row, [aveDataTableRow]',
  templateUrl: './data-table-row.component.html',
  styleUrls: ['./data-table-row.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableRowComponent {
  @Input() selectable: boolean;
  @Input() checkable: boolean;
  @Input() showDetail: boolean;
  @Input() rowItem: any;
  @Input() rowIndex: number;
  @Input() allChecked: boolean;
  @Input() columns: DataTableColumnTmplComponent[];
  @Input() checkableColumn: DataTableColumnTmplComponent;
  @Input() showDetailColumn: DataTableColumnTmplComponent;
  @Input() dataTableTemplates: DataTableTmplsComponent;
  @Input() editModel: string;
  @Input() editRowItem: any;
  @Input() resizeable: boolean;
  @Input() timeout: number;
  @Output() detailChange = new EventEmitter();

  forceUpdateEvent = new EventEmitter<ForceUpdateReason>();
  // isDetailOpen: boolean = false;

  clickCount = 0; // 记录点击次数
  timeoutId; // 延时id

  constructor(public dt: DataTableComponent, private changeDetectorRef: ChangeDetectorRef) {
  }

  forceUpdate() {
    this.changeDetectorRef.markForCheck();
    this.forceUpdateEvent.emit(ForceUpdateReason.RowUpdate);
  }

  @HostListener('click', ['$event'])
  onRowClick($event) {
    // $event.stopPropagation();
    this.clickCount++;
    if (this.clickCount === 1) {
      this.timeoutId = setTimeout(() => {
        if (this.clickCount === 1) {
          this.dt.onRowClick({ rowIndex: this.rowIndex, rowItem: this.rowItem, rowComponent: this });
        }
        this.clickCount = 0;
        clearTimeout(this.timeoutId);
      }, this.timeout);
    }
  }

  @HostListener('dblclick', ['$event'])
  onRowDBClick($event) {
    // $event.stopPropagation();
    this.dt.onRowDBClick({ rowIndex: this.rowIndex, rowItem: this.rowItem, rowComponent: this });
  }

  onRowCheckChange($event, rowIndex, rowItem) {
    rowItem.$checked = $event;
    this.dt.onRowCheckChange({ rowItem, rowIndex, checked: $event });
  }

  toggle() {
    this.rowItem['$isDetailOpen'] = !this.rowItem['$isDetailOpen'];
    // this.isDetailOpen = !this.isDetailOpen;
    this.detailChange.emit({state: this.rowItem['$isDetailOpen'], index: this.rowIndex});
    this.dt.onDetailToggle({state: this.rowItem['$isDetailOpen'], index: this.rowIndex});
  }

  trackByFn(index, item) {
    return index;
  }

}
