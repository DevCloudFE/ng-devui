import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'd-demo-nav',
  templateUrl: './d-demo-nav.component.html',
  styleUrls: ['../../../devui/style/core/_nav.scss']
})
export class DDemoNavComponent implements OnInit {

  @Input() navItems: any;

  constructor() { }

  ngOnInit() {
  }

}
