import { Component } from '@angular/core';
import { AlertComponent } from 'ng-devui/alert';

@Component({
  selector: 'd-alert-without-icon',
  standalone: true,
  imports: [AlertComponent],
  templateUrl: './withoutIcon.component.html',
  styleUrls: ['./withoutIcon.component.css']
})
export class WithoutIconComponent {

}
