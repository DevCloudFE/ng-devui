import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'd-cell',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DataTableCellViewTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
