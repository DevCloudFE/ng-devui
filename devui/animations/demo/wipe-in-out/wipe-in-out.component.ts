import { Component } from '@angular/core';
import { wipeInOutAnimation } from 'ng-devui/utils';

@Component({
  selector: 'd-wipe-in-out',
  templateUrl: './wipe-in-out.component.html',
  styleUrls: ['./wipe-in-out.component.scss'],
  animations: [wipeInOutAnimation],
})
export class WipeInOutComponent {
  open = false;
  constructor() {}
}
