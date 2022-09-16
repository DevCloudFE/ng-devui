import { Component } from '@angular/core';
import { flyInOut } from 'ng-devui/utils';

@Component({
  selector: 'd-fly-in-out',
  templateUrl: './fly-in-out.component.html',
  styleUrls: ['./fly-in-out.component.scss'],
  animations: [flyInOut],
})
export class FlyInOutComponent {
  open = false;
  constructor() {}
}
