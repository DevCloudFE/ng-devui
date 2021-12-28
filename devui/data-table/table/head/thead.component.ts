import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TableCheckOptions, TableCheckStatusArg } from '../../data-table.model';
import { TableTrComponent } from '../row/tr.component';
import { TableThComponent } from './th/th.component';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector*/
  selector: '[dTableHead]',
  templateUrl: './thead.component.html'
})
export class TableTheadComponent implements OnInit, AfterContentInit, OnDestroy, OnChanges {
  @Input() checkable: boolean;
  @Input() checkDisabled: boolean;
  @Input() checkOptions: TableCheckOptions[];
  @ContentChildren(TableTrComponent) headerRowList: QueryList<TableTrComponent>;
  @ContentChildren(TableThComponent, { descendants: true }) thList: QueryList<TableThComponent>;

  headerFirstRow: TableTrComponent;
  nestedTh: TableThComponent;
  toggleTableSubscription: Subscription;
  checkStatusSubscription: Subscription;
  headerCheckStatusEvent = new EventEmitter<boolean>();
  headerChildrenTableToggleEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  ngAfterContentInit() {
    if (this.headerRowList) {
      this.headerFirstRow = this.headerRowList.first;
      if (this.headerFirstRow) {
        this.headerFirstRow.headerRowspan = this.headerRowList.length;
        this.headerFirstRow.headerCheckable = this.checkable;
        this.headerFirstRow.headerCheckDisabled = this.checkDisabled;
        this.headerFirstRow.headerCheckOptions = this.checkOptions;

        this.checkStatusSubscription = this.headerFirstRow.headerCheckStatusEvent.subscribe((status) => {
          this.headerCheckStatusEvent.emit(status);
        });
      }
    }
    if (this.thList) {
      this.setNestedThToggle();
      this.thList.changes.subscribe((list) => {
        this.setNestedThToggle();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['checkable'] && !changes['checkable'].isFirstChange()) ||
      (changes['checkDisabled'] && !changes['checkDisabled'].isFirstChange()) ||
      (changes['checkOptions'] && !changes['checkOptions'].isFirstChange())
    ) {
      if (this.headerFirstRow) {
        this.headerFirstRow.headerRowspan = this.headerRowList.length;
        this.headerFirstRow.headerCheckable = this.checkable;
        this.headerFirstRow.headerCheckDisabled = this.checkDisabled;
        this.headerFirstRow.headerCheckOptions = this.checkOptions;
      }
    }
  }

  setNestedThToggle() {
    this.nestedTh = this.thList.find(th => {
      return th.nestedColumn;
    });

    if (this.nestedTh) {
      this.toggleTableSubscription = this.nestedTh.toggleChildrenTableEvent.subscribe((childrenTableOpen) => {
        this.headerChildrenTableToggleEvent.emit(childrenTableOpen);
      });
    }
  }

  setHeaderCheckStatus(status: TableCheckStatusArg) {
    if (status.pageAllChecked !== undefined) {
      this.headerFirstRow.headerChecked = status.pageAllChecked;
    }

    if (status.pageHalfChecked !== undefined) {
      this.headerFirstRow.headerHalfChecked = status.pageHalfChecked;
    }
  }

  setHeaderToggleStatus(open: boolean) {
    if (this.nestedTh) {
      this.nestedTh.childrenTableOpen = open;
    }
  }

  ngOnDestroy() {
    if (this.checkStatusSubscription) {
      this.checkStatusSubscription.unsubscribe();
      this.checkStatusSubscription = null;
    }
    if (this.toggleTableSubscription) {
      this.toggleTableSubscription.unsubscribe();
      this.toggleTableSubscription = null;
    }
  }
}
