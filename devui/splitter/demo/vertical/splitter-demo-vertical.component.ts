import { Component } from '@angular/core';

@Component({
  selector: 'd-splitter-demo-vertical',
  templateUrl: './splitter-demo-vertical.component.html',
  styles: [
    `
    .pane-content{
      padding: 0 10px;
    }
    `
  ]
})
export class SplitterDemoVerticalComponent {

  constructor() {
  }

  sizeChange(size) {
    console.log(size);
  }
}
