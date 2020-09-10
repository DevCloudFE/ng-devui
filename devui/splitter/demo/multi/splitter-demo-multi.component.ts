import { Component } from '@angular/core';

@Component({
  selector: 'd-splitter-demo-multi',
  templateUrl: './splitter-demo-multi.component.html',
  styles: [
    `
    .pane-content{
      padding: 0 10px;
    }
    `
  ]
})
export class SplitterDemoMultiComponent {

  constructor() {
  }

  sizeChange(size) {
    console.log(size);
  }
}
