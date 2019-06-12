import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  demoDocViewer;
  constructor() {

  }

  ngOnInit() {
    this.demoDocViewer = document.querySelector('.doc-viewer-container');
  }

}
