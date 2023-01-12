import { Component } from '@angular/core';
import { AlertComponent } from 'ng-devui/alert';

@Component({
  selector: 'd-alert-close',
  standalone: true,
  imports: [AlertComponent],
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.css']
})
export class CloseComponent {
  handleClose($event) {
    console.log($event);
  }
}
