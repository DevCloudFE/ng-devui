import { DataTableHeadTmplComponent } from './data-table-head-tmpl.component';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { DataTableCellTmplComponent } from './data-table-cell-tmpl.component';
import { stopPropagationIfExist } from '../../utils/dom-utils';

@Component({
  selector: 'ave-data-table-templates',
  templateUrl: './data-table-tmpls.component.html',
  styles: [
    `
    .col-divider {
      right: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      position: absolute;
      cursor: col-resize;
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableTmplsComponent {

  @ViewChild('defaultHeadTemplate') headTemplate: TemplateRef<any>;
  @ViewChild('defaultPagerTemplate') pagerTemplate: TemplateRef<any>;
  @ViewChild('textCellTemplate') text: DataTableCellTmplComponent;
  @ViewChild('numberCellTemplate') number: DataTableCellTmplComponent;
  @ViewChild('telCellTemplate') tel: DataTableCellTmplComponent;
  @ViewChild('mailCellTemplate') mail: DataTableCellTmplComponent;
  @ViewChild('imageCellTemplate') image: DataTableCellTmplComponent;
  // @ViewChild('selectCellTemplate') select: DataTableCellTmplComponent;
  @ViewChild('dateCellTemplate') date: DataTableCellTmplComponent;
  @ViewChild('datetimeCellTemplate') datetime: DataTableCellTmplComponent;
  @ViewChild('AdvancedHeadTmpl') AdvancedHeadTmpl: DataTableHeadTmplComponent;


  datePicker;
  isDetailOpen: boolean;
  showDetail;
  rowItem = undefined;

  getTemplate(fieldType: string): DataTableCellTmplComponent {
    return this[fieldType || 'text'] || this.text;
  }

  getCellViewTemplate(column) {
    if (column.cellCmp) {
      return column.cellCmp.template;
    }

    const template = this.getTemplate(column.fieldType);
    return template.view ? template.view.template : this.text.view.template;
  }

  trackByFn(index, item) {
    return index;
  }

  getCellEditTemplate(column) {
    if (column.cellEditCmp) {
      return column.cellEditCmp.template;
    }

    const template = this.getTemplate(column.fieldType);
    return template.edit ? template.edit.template : this.text.edit.template;
  }

  getCellFilterTemplate(column) {
    if (column.cellFilterCmp) {
      return column.cellFilterCmp.template;
    }

    const template = this.getTemplate(column.fieldType);
    return template.filter ? template.filter.template : this.text.filter.template;
  }

  stopPropagation($event: Event) {
    stopPropagationIfExist($event);
  }
}
