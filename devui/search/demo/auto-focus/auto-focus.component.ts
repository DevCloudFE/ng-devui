import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-auto-focus',
  templateUrl: './auto-focus.component.html'
})
export class AutoFocusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSearch(term) {
    console.log(term);
  }

}
