import { Component } from '@angular/core';

@Component({
  selector: 'd-splitter-demo-basic',
  templateUrl: './splitter-demo-basic.component.html',
  styleUrls: ['../splitter-demo.component.scss']
})
export class SplitterDemoBasicComponent {
 // splitter input
  orientation = 'horizontal';
  splitBarSize = '2px';
  disabledBarSize = '1px';

  // splitter pane input
  size = '30%';
  minSize = '20%';
  maxSize = '60%';

  constructor() {
  }

  sizeChange(size) {
    console.log(size);
  }

  collapsedChange(event) {
    console.log(event);
  }
}
