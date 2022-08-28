import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'd-big-data',
  templateUrl: './big-data.component.html',
})
export class BigDataComponent implements OnInit {
  tabActiveId: string | number = 'tab1';
  tabItems = [];

  constructor() {
    for (let i = 1; i < 50; i++) {
      this.tabItems.push({
        id: `tab${i}`,
        title: `Tab${i}`,
        content: `Tab${i} Content`,
      });
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.tabActiveId = 'tab2';
    }, 100);
  }
}
