import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'd-head-cell',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DataTableHeadCellTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
