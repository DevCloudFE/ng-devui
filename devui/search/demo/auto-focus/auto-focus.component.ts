import { Component } from '@angular/core';

@Component({
  selector: 'd-auto-focus',
  templateUrl: './auto-focus.component.html',
})
export class AutoFocusComponent {
  constructor() {}

  onSearch(term) {
    console.log(term);
  }
}
