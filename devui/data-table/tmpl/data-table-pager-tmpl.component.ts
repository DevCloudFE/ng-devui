import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ave-pager-panel',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTablePagerTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
