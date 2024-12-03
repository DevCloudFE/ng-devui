import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { ModalService } from 'ng-devui/modal';
import { cloneDeep } from 'lodash-es';
import { Subscription } from 'rxjs';
import { TableOptionModalComponent } from './table-option-modal.component';

export interface ColData {
  header: string;
  checked: boolean;
  category?: string;
  disabled?: boolean;
  [prop: string]: any;
}

export interface TableStyleData {
  size?: 'xs' | 'sm' | 'md';
  borderType?: '' | 'borderless';
  striped?: boolean;
  shadowType?: 'embed' | 'normal';
}

@Component({
  selector: 'd-table-option-toggle',
  templateUrl: './table-option-toggle.component.html',
  styleUrls: ['./table-option-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOptionToggleComponent implements OnInit, OnDestroy {
  @Input() set columnsData(value: Array<ColData>) {
    this._columnsData = cloneDeep(value);
  }
  @Input() showCategory: boolean;
  @Input() colSort = true;
  @Input() styleSetting: TableStyleData = {};
  @Input() toggleMode: 'dropdown' | 'modal' = 'dropdown';
  @Input() modalWidth = '600px';

  @Output() colChanges: EventEmitter<Array<ColData>> = new EventEmitter<Array<ColData>>();
  @Output() styleChanges: EventEmitter<TableStyleData> = new EventEmitter<TableStyleData>();

  _columnsData = [];

  checkedList;

  get showStyleSetting() {
    return !!Object.keys(this.styleSetting).length;
  }

  get sizeStatus() {
    return (this.styleSetting as any)?.size;
  }

  set sizeStatus(value) {
    if (!this.styleSetting) {
      this.styleSetting = {};
    }
    this.styleSetting.size = value;
  }

  i18nText: I18nInterface['datatable'];
  i18nLocale: I18nInterface['locale'];
  i18nSubscription: Subscription;

  constructor(private modalService: ModalService, private cdr: ChangeDetectorRef, private i18n: I18nService) {}

  ngOnInit(): void {
    this.i18nText = this.i18n.getI18nText().datatable;
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.datatable;
      this.i18nLocale = data.locale;
      this.cdr.markForCheck();
    });
  }

  onToggle(event) {
    console.log(event);
  }

  toggleActive(item) {
    if (item.disabled) {
      return;
    }
    item.checked = !item.checked;
    this.emitData();
  }

  onCardActiveChanges(active: boolean, status: 'xs' | 'sm' | 'md') {
    this.sizeStatus = active ? status : 'none';
  }

  emitStyles() {
    this.styleChanges.emit(this.styleSetting as TableStyleData);
  }

  emitData() {
    this.colChanges.emit(this._columnsData);
  }

  styleSettingChanges(checked, type: 'border' | 'striped' | 'shadow') {
    switch (type) {
    case 'border':
      this.styleSetting.borderType = checked ? '' : 'borderless';
      break;
    case 'shadow':
      this.styleSetting.shadowType = checked ? 'normal' : 'embed';
      break;
    case 'striped':
      this.styleSetting.striped = checked;
      break;
    default:
    }

    this.emitStyles();
  }

  onDrop(e) {
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    if (-1 !== index) {
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      this._columnsData.splice(index, 0, fromIndex === -1 ? e.dragData : this._columnsData.splice(fromIndex, 1)[0]);
    } else {
      this._columnsData.push(e.dragData);
    }

    this.colChanges.emit(this._columnsData);
  }

  openModal() {
    const results = this.modalService.open({
      id: 'modal-modal',
      width: this.modalWidth,
      backdropCloseable: true,
      component: TableOptionModalComponent,
      data: {
        columnsData: this._columnsData,
        showCategory: this.showCategory,
        styleSetting: cloneDeep(this.styleSetting),
        colSort: this.colSort,
        i18nText: this.i18nText,
        onClose: () => {
          results.modalInstance.hide();
        },
        onEnsure: (columnsData, styleSetting) => {
          this._columnsData = columnsData;
          this.colChanges.emit(columnsData);
          this.styleChanges.emit(styleSetting);
          results.modalInstance.hide();
          this.cdr.detectChanges();
        },
      },
    });
  }

  ngOnDestroy(): void {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
