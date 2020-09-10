import { Component } from '@angular/core';

@Component({
  selector: 'd-splitter-demo-direction',
  templateUrl: './splitter-demo-direction.component.html',
  styles: [
    `
    .pane-content{
      padding: 0 10px;
    }
    `
  ]
})
export class SplitterDemoDirectionComponent {

  constructor() {
  }

  sizeChange(size) {
    console.log(size);
  }
}
