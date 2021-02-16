import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-icon-left',
  templateUrl: './icon-left.component.html'
})
export class IconLeftComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  onSearch(term) {
    console.log(term);
  }

}
