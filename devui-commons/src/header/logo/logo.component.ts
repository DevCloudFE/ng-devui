import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'd-header-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    standalone: false
})
export class LogoComponent implements OnInit {
  @Input() name = 'DevUI';
  @Input() link = '/home';

  constructor() { }

  ngOnInit() {
  }

}
