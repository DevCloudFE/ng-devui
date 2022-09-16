import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-search-no-border',
  templateUrl: './search-no-border.component.html',
  styleUrls: ['./search-no-border.component.scss'],
})
export class SearchNoBorderComponent {
  constructor() {}

  onSearch(term) {
    console.log(term);
  }
}
