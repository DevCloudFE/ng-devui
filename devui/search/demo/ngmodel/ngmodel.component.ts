import { Component } from '@angular/core';

@Component({
  selector: 'd-ngmodel',
  templateUrl: './ngmodel.component.html',
  styleUrls: ['./ngmodel.component.css'],
})
export class NgmodelComponent {
  searchText = 'devui';
  constructor() {}

  onSearch(term) {
    console.log(term);
  }
}
