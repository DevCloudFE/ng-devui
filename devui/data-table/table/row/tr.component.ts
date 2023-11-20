import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, OnInit, Output, QueryList, Renderer2
} from '@angular/core';
import { RowCheckChangeEventArg, TableCheckOptions } from '../../data-table.model';
import { TableThComponent } from '../head/th/th.component';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector*/
  selector: '[dTableRow]',
  templateUrl: './tr.component.html',
  styleUrls: ['./tr.component.scss']
})
export class TableTrComponent implements OnInit, AfterViewInit {
  @ContentChildren(TableThComponent) thList: QueryList<TableThComponent>;
  headerCheckable: boolean;
  headerCheckDisabled: boolean;
  headerRowspan = 1;
  headerCheckOptions: TableCheckOptions[];
  checkOptionsIndex = 1050;
  curLabel = '';
  showTip = false;
  selectOptionOnCheckbox = false;

  headerChecked: boolean;
  headerHalfChecked: boolean;
  firstTh: TableThComponent;

  @Output() headerCheckStatusEvent = new EventEmitter<boolean>();
  @Output() checkStatusEvent = new EventEmitter<RowCheckChangeEventArg>();
  constructor(
    private eleRef: ElementRef,
    private render2: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.thList) {
      this.firstTh = this.thList.first;
    }
    this.initFixedColumnStatus();
    this.cdr.detectChanges();
  }

  initFixedColumnStatus() {
    const fixLeftList = this.eleRef.nativeElement.querySelectorAll('.devui-sticky-left-cell');
    const fixRightList = this.eleRef.nativeElement.querySelectorAll('.devui-sticky-right-cell');
    if (fixLeftList?.length) {
      const lastEle = fixLeftList[fixLeftList.length - 1];
      this.render2.addClass(lastEle, 'devui-last-sticky-left-cell');
    }

    if (fixRightList?.length) {
      const firstEle = fixRightList[0];
      this.render2.addClass(firstEle, 'devui-first-sticky-right-cell');
    }


  }

  onHeaderCheckChange(checked) {
    this.headerChecked = checked;
    this.headerHalfChecked = false;
    this.headerCheckStatusEvent.emit(checked);
  }

  onOptionSelect(option: TableCheckOptions) {
    if (option.onChecked) {
      option.onChecked();
    }
  }
}
