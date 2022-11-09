import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ColData } from './table-option-toggle.component';

@Component({
  selector: 'd-table-option-modal',
  templateUrl: './table-option-modal.component.html',
  styleUrls: ['./table-option-modal.component.scss', './table-option-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOptionModalComponent implements OnInit {
  @Input() data: any;

  get showStyleSetting() {
    return !!Object.keys(this.data.styleSetting).length;
  }

  get selectedCols() {
    return this._columnsData.filter(t => t.checked);
  }

  _columnsData: Array<ColData> = [];
  columnsCache: Array<ColData> = [];
  _styleSetting: any = {};

  filterKey = '';

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  judgeNameFIlter(name: string) {
    return name.toUpperCase().includes(this.filterKey.toUpperCase());
  }

  onSearch(value: string) {
    this.filterKey = value;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this._columnsData = this.data.columnsData;
    this.columnsCache = [...this._columnsData];
    this._styleSetting = this.data.styleSetting;
  }

  searchIndex(col) {
    return this.data.columnsData.findIndex(t => t.header === col.header);
  }

  onDrop(e) {
    let index = this.searchIndex(this.selectedCols[e.dropIndex]);
    const fromIndex = this.searchIndex(this.selectedCols[e.dragFromIndex]);
    if (-1 !== index) {
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      this._columnsData.splice(index, 0, fromIndex === -1 ? e.dragData : this._columnsData.splice(fromIndex, 1)[0]);
    } else {
      this._columnsData.push(e.dragData);
    }
  }

  onCardActiveChanges(active: boolean, status: 'xs' | 'sm' | 'md') {
    this._styleSetting['size'] = active ? status : 'none';
  }

  styleSettingChanges(checked, type: 'border' | 'striped' | 'shadow') {
    switch (type) {
    case 'border':
      this._styleSetting['borderType'] = checked ? '' : 'borderless';
      break;
    case 'shadow':
      this._styleSetting['shadowType'] = checked ? 'normal' : 'embed';
      break;
    case 'striped':
      this._styleSetting['striped'] = checked;
      break;
    }
  }

  close() {
    this.data.onClose();
  }

  ensure() {
    this.data.onEnsure(this._columnsData, this._styleSetting);
  }
}
