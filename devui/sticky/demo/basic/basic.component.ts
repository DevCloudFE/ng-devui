import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  stickyView = {
    top: 160,
    bottom: 0
  };
  demoDocViewerMain;
  constructor(@Inject(DOCUMENT) private doc: any) { }

  ngOnInit() {
    this.demoDocViewerMain = this.doc.querySelector('.doc-viewer-container .main');
  }
  log(...v) {
    console.log(...v);
  }
}
