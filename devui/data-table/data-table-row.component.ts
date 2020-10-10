import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, HostBinding } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { ForceUpdateReason } from './force-update-reason.model';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';

@Component({
  selector: 'd-data-table-row, [dDataTableRow]',
  templateUrl: './data-table-row.component.html',
  styleUrls: ['./data-table-row.component.scss'],
  preserveWhitespaces: false,
})
export class DataTableRowComponent implements OnInit {
  @Input() rowItem: any;
  @HostBinding('style.font-weight') fontWeight = '400';
  @HostBinding('style.vertical-align') verticalAlign = 'middle';
  @Input() selectable: boolean;
  @Input() checkable: boolean;
  @Input() showExpandToggle: boolean;
  @Input() rowIndex: number;
  @Input() allChecked: boolean;
  @Input() columns: DataTableColumnTmplComponent[];
  @Input() editModel: string;
  @Input() editRowItem: any;
  @Input() resizeable: boolean;
  @Input() timeout: number;
  @Input() tableLevel: number;
  @Input() nestedIndex: string;
  @Input() generalRowHoveredData: boolean;
  @Output() detailChange = new EventEmitter<any>();

  forceUpdateEvent = new EventEmitter<ForceUpdateReason>();

  clickCount = 0; // 记录点击次数
  timeoutId; // 延时id

  constructor(public dt: DataTableComponent, private changeDetectorRef: ChangeDetectorRef,
    private rowRef: ElementRef, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.rowRef.nativeElement.addEventListener(
          'click',
          this.onRowClick.bind(this)
      );
      this.rowRef.nativeElement.addEventListener(
        'dblclick',
        this.onRowDBClick.bind(this)
      );
      if (this.generalRowHoveredData) {
        this.rowRef.nativeElement.addEventListener(
          'mouseenter',
          this.onRowMouseEnter.bind(this)
        );
        this.rowRef.nativeElement.addEventListener(
          'mouseleave',
          this.onRowMouseLeave.bind(this)
        );
      }
    });
  }

  forceUpdate() {
    this.changeDetectorRef.markForCheck();
    this.forceUpdateEvent.emit(ForceUpdateReason.RowUpdate);
  }

  onRowClick($event) {
    // $event.stopPropagation();
    this.clickCount++;
    if (this.clickCount === 1) {
      this.timeoutId = setTimeout(() => {
        if (this.clickCount === 1) {
          this.dt.onRowClick({ rowIndex: this.rowIndex, nestedIndex: this.nestedIndex, rowItem: this.rowItem, rowComponent: this });
        }
        this.clickCount = 0;
        clearTimeout(this.timeoutId);
      }, this.timeout);
    }
  }

  onRowDBClick($event) {
    // $event.stopPropagation();
    this.dt.onRowDBClick({ rowIndex: this.rowIndex, nestedIndex: this.nestedIndex, rowItem: this.rowItem, rowComponent: this });
  }

  onRowMouseEnter($event) {
    this.ngZone.run(() => {
      this.rowItem.$hovered = true;
    });
  }

  onRowMouseLeave($event) {
    this.ngZone.run(() => {
      this.rowItem.$hovered = false;
    });
  }

  onRowCheckChange($event, rowIndex, nestedIndex, rowItem) {
    rowItem.$checked = $event;
    rowItem.$halfChecked = false;
    this.dt.setRowCheckStatus({ rowItem, rowIndex, nestedIndex, checked: $event });
  }

  toggle() {
    this.rowItem['$isDetailOpen'] = !this.rowItem['$isDetailOpen'];
    if (this.rowItem.$expandConfig) {
      this.rowItem.$expandConfig.expand = !this.rowItem.$expandConfig.expand;
    }
    this.detailChange.emit({ state: this.rowItem['$isDetailOpen'], index: this.rowIndex });
    this.dt.onDetailToggle({ state: this.rowItem['$isDetailOpen'], index: this.rowIndex });
  }

  trackByFn(index, item) {
    return index;
  }
}
