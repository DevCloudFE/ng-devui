import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { TableWidthConfig } from '../../data-table.model';
import { TableTrComponent } from '../row/tr.component';

@Component({
    /* eslint-disable-next-line @angular-eslint/component-selector*/
    selector: '[dTableBody]',
    templateUrl: './tbody.component.html',
    styleUrls: ['./tbody.component.scss'],
    standalone: false
})
export class TableTbodyComponent implements OnInit {
  @Input() dataSource: any[] = [];
  @Input() rowTemplete: TemplateRef<any>;
  @Input() nestedLayer = 0;
  @Input() nestedIndex = '-1';
  @Input() virtualScroll;
  @Input() tableWidthConfig: TableWidthConfig[];
  @Input() minHeight: string;
  @Input() minHeightStretchRow: TemplateRef<any>;

  @ContentChild(TemplateRef) rowTempleteForSelect: TemplateRef<TableTrComponent>;

  constructor() {}

  ngOnInit() {}

  trackByFn(index) {
    return index;
  }
}
