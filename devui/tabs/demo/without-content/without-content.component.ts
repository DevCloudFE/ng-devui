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
    console.log('当前切换至', event);
  }
}
