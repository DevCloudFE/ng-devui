import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-scroll-target',
  templateUrl: './scroll-target.component.html',
  styleUrls: ['./scroll-target.component.css']
})
export class ScrollTargetComponent implements OnInit {
  stickyView = {
    top: 10,
    bottom: 0
  };
  demoDocViewerMain;
  constructor() { }

  ngOnInit() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }

}
