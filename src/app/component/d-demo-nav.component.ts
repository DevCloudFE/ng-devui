import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'd-demo-nav',
  templateUrl: './d-demo-nav.component.html',
  styleUrls: ['./d-demo-nav.component.scss'],
})
export class DDemoNavComponent implements OnInit {
  @Input() navItems: any;
  demoDocViewerMain;
  constructor(@Inject(DOCUMENT) private doc: any) {}

  ngOnInit() {
    this.demoDocViewerMain = this.doc.querySelector('.doc-viewer-container .main');
  }
}
