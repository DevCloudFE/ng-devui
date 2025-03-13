import { Component, OnInit } from '@angular/core';
import { wipeInOutAnimation } from 'ng-devui/utils';

@Component({
    selector: 'd-wipe-in-out',
    templateUrl: './wipe-in-out.component.html',
    styleUrls: ['./wipe-in-out.component.scss'],
    animations: [wipeInOutAnimation],
    standalone: false
})
export class WipeInOutComponent implements OnInit {
  open = false;
  constructor() { }

  ngOnInit(): void {
  }

}
