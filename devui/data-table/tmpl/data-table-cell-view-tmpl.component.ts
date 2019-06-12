import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ave-cell',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableCellViewTmplComponent {

    @ContentChild(TemplateRef) template: TemplateRef<any>;

}
