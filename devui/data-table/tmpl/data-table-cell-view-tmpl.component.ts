import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-cell',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableCellViewTmplComponent {

    @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

}
