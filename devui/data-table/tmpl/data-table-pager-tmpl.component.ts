import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-pager-panel',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTablePagerTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
