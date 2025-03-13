import { Component } from '@angular/core';

@Component({
    selector: 'd-alert-close',
    templateUrl: './close.component.html',
    styleUrls: ['./close.component.css'],
    standalone: false
})
export class CloseComponent {
  handleClose($event) {
    console.log($event);
  }
}
