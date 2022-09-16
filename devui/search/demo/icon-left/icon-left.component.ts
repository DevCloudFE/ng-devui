import { Component } from '@angular/core';

@Component({
  selector: 'd-icon-left',
  templateUrl: './icon-left.component.html',
})
export class IconLeftComponent {
  constructor() {}

  onSearch(term) {
    console.log(term);
  }
}
