import { Component } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent {
  constructor() {}

  onSearch(term) {
    console.log(term);
  }
}
