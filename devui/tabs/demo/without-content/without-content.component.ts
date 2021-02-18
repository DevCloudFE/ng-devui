import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-without-content',
  templateUrl: './without-content.component.html'
})
export class WithoutContentComponent implements OnInit {
  acticeTabId = 'tab2';
  constructor() { }

  ngOnInit() {
  }
  activeTabChange(event) {
    console.log('switch to', event);
  }
}
