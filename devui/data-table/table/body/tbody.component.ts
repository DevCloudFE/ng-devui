import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { TableTrComponent } from '../row/tr.component';
import { TableWidthConfig } from '../../data-table.model';

@Component({
  selector: '[dTableBody]',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.scss']
})
export class TableTbodyComponent implements OnInit {
  @Input() dataSource: any[] = [];
  @Input() rowTemplete: TemplateRef<TableTrComponent>;
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
