import {
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { BreadCrumbService } from './breadcrumb.service';
import { BREADCRUMB } from './breadcrumb.token';
import { SourceConfig } from './breadcrumb.type';

@Component({
  selector: 'd-breadcrumb',
  exportAs: 'dBreadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  preserveWhitespaces: false,
  providers: [
    {provide: BREADCRUMB, useExisting: BreadCrumbComponent}
  ],
})
export class BreadCrumbComponent {
  @Input() separatorIcon: TemplateRef<any>;
  @Input() source: Array<SourceConfig> = [];
  constructor(private breadCrumbService: BreadCrumbService) { }
  navigateTo($event, item) {
    this.breadCrumbService.navigateTo($event, item);
  }
}
