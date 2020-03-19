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

  @ViewChild('defaultHeadTemplate', { static: true }) headTemplate: TemplateRef<any>;
  @ViewChild('filterContentTmpl', { static: false }) filterContentTmpl: TemplateRef<any>;
  @ViewChild('defaultPagerTemplate', { static: true }) pagerTemplate: TemplateRef<any>;
  @ViewChild('textCellTemplate', { static: true }) text: DataTableCellTmplComponent;
  @ViewChild('numberCellTemplate', { static: true }) number: DataTableCellTmplComponent;
  @ViewChild('telCellTemplate', { static: true }) tel: DataTableCellTmplComponent;
  @ViewChild('mailCellTemplate', { static: true }) mail: DataTableCellTmplComponent;
  @ViewChild('imageCellTemplate', { static: true }) image: DataTableCellTmplComponent;
  @ViewChild('selectCellTemplate', { static: true }) select: DataTableCellTmplComponent;
  @ViewChild('dateCellTemplate', { static: true }) date: DataTableCellTmplComponent;
  @ViewChild('AdvancedHeadTmpl', { static: true }) AdvancedHeadTmpl: DataTableHeadTmplComponent;
  @ViewChild('treeSelectCellTemplate', { static: true }) treeSelect: DataTableCellTmplComponent;
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
