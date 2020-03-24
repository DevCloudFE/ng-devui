import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  stickyView = {
    top: 60,
    bottom: 0
  };
  demoDocViewerMain;
  constructor() { }

  ngOnInit() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
