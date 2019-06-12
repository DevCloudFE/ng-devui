import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ave-head',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeadTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
