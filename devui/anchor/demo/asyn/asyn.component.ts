import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-asyn',
  templateUrl: './asyn.component.html',
  styleUrls: ['./asyn.component.css']
})
export class AsynComponent implements OnInit {
  demoDocViewer;
  demoDocViewerMain;

  loadMenu = false;
  loadContent = false;
  constructor() { }

  ngOnInit() {
    this.demoDocViewer = document.querySelector('.doc-viewer-container');
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }

}
