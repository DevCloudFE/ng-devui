import { Component } from '@angular/core';

@Component({
    selector: 'd-splitter-demo-direction',
    templateUrl: './splitter-demo-direction.component.html',
    styleUrls: ['../splitter-demo.component.scss'],
    standalone: false
})
export class SplitterDemoDirectionComponent {

  constructor() {
  }

  sizeChange(size) {
    console.log(size);
  }
}
