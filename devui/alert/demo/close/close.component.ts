import { Component } from '@angular/core';

@Component({
  selector: 'd-alert-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.css'],
})
export class CloseComponent {
  handleClose($event) {
    console.log($event);
  }
}
