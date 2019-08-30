import { DataTableHeadTmplComponent } from './data-table-head-tmpl.component';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { DataTableCellTmplComponent } from './data-table-cell-tmpl.component';
import { stopPropagationIfExist } from 'ng-devui/utils';
import { DropDownDirective } from 'ng-devui/dropdown';
import { DevUIConfig } from 'ng-devui/devui.config';
import { I18nService } from 'ng-devui/utils';
import { DefaultIcons } from 'ng-devui/tree-select';

@Component({
  selector: 'd-data-table-templates',
  templateUrl: './data-table-tmpls.component.html',
  styleUrls: ['./data-table-tmpls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableTmplsComponent {

  @ViewChild('defaultHeadTemplate') headTemplate: TemplateRef<any>;
  @ViewChild('filterContentTmpl') filterContentTmpl: TemplateRef<any>;
  @ViewChild('defaultPagerTemplate') pagerTemplate: TemplateRef<any>;
  @ViewChild('textCellTemplate') text: DataTableCellTmplComponent;
  @ViewChild('numberCellTemplate') number: DataTableCellTmplComponent;
  @ViewChild('telCellTemplate') tel: DataTableCellTmplComponent;
  @ViewChild('mailCellTemplate') mail: DataTableCellTmplComponent;
  @ViewChild('imageCellTemplate') image: DataTableCellTmplComponent;
  @ViewChild('selectCellTemplate') select: DataTableCellTmplComponent;
  @ViewChild('dateCellTemplate') date: DataTableCellTmplComponent;
  @ViewChild('AdvancedHeadTmpl') AdvancedHeadTmpl: DataTableHeadTmplComponent;
  @ViewChild('treeSelectCellTemplate') treeSelect: DataTableCellTmplComponent;
  datePicker;
  showDetail;
  rowItem = undefined;
  placeholder: string;
  buttonText: string;
  checkAll: string;
  DefaultIcons = DefaultIcons;
constructor(private devUIConfig: DevUIConfig, private i18n: I18nService) {
  this.placeholder = devUIConfig[`dataTable${i18n.getLangSuffix()}`].placeholder;
  this.buttonText = devUIConfig[`dataTable${i18n.getLangSuffix()}`].buttonText;
  this.checkAll = devUIConfig[`dataTable${i18n.getLangSuffix()}`].checkAll;
}
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

  treeSelectInit = (autoOpen) => {
    if (autoOpen) {
      return (selectTreeComponent) => {
        if (selectTreeComponent) {
          selectTreeComponent.isOpen = true;
        }
      };
    } else {
      return () => {};
    }
  }

  closeFilter(dropdown: DropDownDirective) {
    dropdown.toggle();
  }
}
