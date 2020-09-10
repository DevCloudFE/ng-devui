import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'd-demo-nav',
  templateUrl: './d-demo-nav.component.html',
  styleUrls: ['./d-demo-nav.component.scss'],
})
export class DDemoNavComponent implements OnInit {
  @Input() navItems: any;
  demoDocViewerMain;
  constructor() {}

  ngOnInit() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
