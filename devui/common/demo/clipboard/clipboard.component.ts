import { Component } from '@angular/core';

@Component({
  selector: 'd-common-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss']
})
export class ClipboardDemoComponent {
  value = 'Copied Content';
  result: any;

  copyResultEvent(event) {
    this.result = event;
  }
}
