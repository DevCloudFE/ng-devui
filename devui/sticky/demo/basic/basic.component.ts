import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  stickyView = {
    top: 60,
    bottom: 0
  };
  demoDocViewer;
  demoDocViewerMain;
  constructor() { }

  ngOnInit() {
    this.demoDocViewer = document.querySelector('.doc-viewer-container');
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }

}
