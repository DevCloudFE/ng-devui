import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { DATA_TABLE_ROW } from './data-table-row.token';
import { DATA_TABLE } from './data-table.token';
import { ForceUpdateReason } from './force-update-reason.model';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';

@Component({
  selector: 'd-data-table-row, [dDataTableRow]',
  templateUrl: './data-table-row.component.html',
  styleUrls: ['./data-table-row.component.scss'],
  preserveWhitespaces: false,
  providers: [
    {
      provide: DATA_TABLE_ROW,
      useExisting: forwardRef(() => DataTableRowComponent),
    },
  ],
})
export class DataTableRowComponent implements OnInit {
  @Input() rowItem: any;
  @HostBinding('style.font-weight') fontWeight = 'normal';
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

  constructor(
    @Inject(DATA_TABLE) public dt: any,
    private changeDetectorRef: ChangeDetectorRef,
    private rowRef: ElementRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.rowRef.nativeElement.addEventListener('mouseup', this.onRowClick.bind(this));
      this.rowRef.nativeElement.addEventListener('dblclick', this.onRowDBClick.bind(this));
      if (this.generalRowHoveredData) {
        this.rowRef.nativeElement.addEventListener('mouseenter', this.onRowMouseEnter.bind(this));
        this.rowRef.nativeElement.addEventListener('mouseleave', this.onRowMouseLeave.bind(this));
      }
    });
  }

  forceUpdate() {
    this.changeDetectorRef.markForCheck();
    this.forceUpdateEvent.emit(ForceUpdateReason.RowUpdate);
  }

  onRowClick($event) {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.timeoutId = setTimeout(() => {
        if (this.clickCount === 1) {
          this.dt.onRowClick({
            rowIndex: this.rowIndex,
            nestedIndex: this.nestedIndex,
            rowItem: this.rowItem,
            rowComponent: this,
            event: $event,
          });
        }
        this.clickCount = 0;
        clearTimeout(this.timeoutId);
      }, this.timeout);
    }
  }

  onRowDBClick($event) {
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
    if (this.rowItem.$isDetailOpen === undefined) {
      this.rowItem.$isDetailOpen = !!this.rowItem.$expandConfig?.expand;
    }
    this.rowItem.$isDetailOpen = !this.rowItem.$isDetailOpen;
    if (this.rowItem.$expandConfig) {
      this.rowItem.$expandConfig.expand = !this.rowItem.$expandConfig.expand;
    }
    this.detailChange.emit({ state: this.rowItem.$isDetailOpen, index: this.rowIndex });
    this.dt.onDetailToggle({ state: this.rowItem.$isDetailOpen, index: this.rowIndex });
  }

  trackByFn(index, item) {
    return index;
  }
}
