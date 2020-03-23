import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';
import { SourceConfig } from './breadcrumb.type';
import { BreadCrumbService } from './breadcrumb.service';

@Component({
    selector: 'd-breadcrumb',
    exportAs: 'dBreadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']

})
export class BreadCrumbComponent {
    @Input() separatorIcon: TemplateRef<any>;
    @Input() source: Array<SourceConfig> = [];
    constructor( private breadCrumbService: BreadCrumbService) { }
    navigateTo($event, item) {
        this.breadCrumbService.navigateTo($event, item);
    }
}
