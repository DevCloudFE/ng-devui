import { Component, OnInit } from '@angular/core';
import { SourceType, originSource } from '../mock-data';

@Component({
  selector: 'd-cell-merge',
  templateUrl: './cell-merge.component.html',
  styleUrls: ['./cell-merge.component.scss']
})
export class CellMergeComponent implements OnInit {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  constructor() { }

  ngOnInit() {
  }

}
