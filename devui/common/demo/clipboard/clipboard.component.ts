import { Component } from '@angular/core';

@Component({
  selector: 'd-common-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss']
})
export class ClipboardDemoComponent {
  value = '这里是被复制的内容';
  result: any;

  copyResultEvent(event) {
    this.result = event;
  }
}
