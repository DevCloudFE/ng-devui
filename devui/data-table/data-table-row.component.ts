import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output, NgZone, ElementRef, OnInit } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { ForceUpdateReason } from './force-update-reason.model';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';

@Component({
  selector: 'd-data-table-row, [dDataTableRow]',
  templateUrl: './data-table-row.component.html',
  styleUrls: ['./data-table-row.component.scss']
})
export class DataTableRowComponent implements OnInit {
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
  @Input() tableLevel: number;
  @Input() nestedIndex: string;
  @Output() detailChange = new EventEmitter();
  rowHovered = false;

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
      this.rowRef.nativeElement.addEventListener(
        'mouseenter',
        this.onRowMouseEnter.bind(this)
      );
      this.rowRef.nativeElement.addEventListener(
        'mouseleave',
        this.onRowMouseLeave.bind(this)
      );
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
    if (!this.rowHovered) {
      this.ngZone.run(() => {
        this.rowHovered = true;
      });
    }
  }

  onRowMouseLeave($event) {
    this.ngZone.run(() => {
      this.rowHovered = false;
    });
  }

  onRowCheckChange($event, rowIndex, nestedIndex, rowItem) {
    rowItem.$checked = $event;
    rowItem.$halfChecked = false;
    this.dt.onRowCheckChange({ rowItem, rowIndex, nestedIndex, checked: $event });
  }

  toggle() {
    if (this.rowItem.expandConfig) {
      this.rowItem.expandConfig.expand = !this.rowItem.expandConfig.expand;
      this.detailChange.emit({ state: this.rowItem.expandConfig.expand, index: this.rowIndex });
      this.dt.onDetailToggle({ state: this.rowItem.expandConfig.expand, index: this.rowIndex });
    }
  }

  trackByFn(index, item) {
    return index;
  }

}
