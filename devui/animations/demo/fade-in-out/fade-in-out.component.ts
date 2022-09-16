import { Component } from '@angular/core';
import { fadeInOut } from 'ng-devui/utils';

@Component({
  selector: 'd-fade-in-out',
  templateUrl: './fade-in-out.component.html',
  styleUrls: ['./fade-in-out.component.scss'],
  animations: [fadeInOut],
})
export class FadeInOutComponent {
  open = false;
  constructor() {}
}
