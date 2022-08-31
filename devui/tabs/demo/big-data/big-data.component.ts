import { Component } from '@angular/core';
@Component({
  selector: 'd-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.scss'],
})
export class BigDataComponent {
  toggle = false;
  showLoading = false;
  tabActiveId: string | number = 'tab1';
  baseData = [{ id: 'tab1', title: 'Tab1', content: 'Tab1 Content' }];
  staticData = [];
  dynamicData = this.baseData;

  constructor() {
    for (let i = 1; i < 50; i++) {
      this.staticData.push({
        id: `tab${i}`,
        title: `Tab${i}`,
        content: `Tab${i} Content`,
      });
    }
  }

  getData() {
    this.showLoading = true;
    setTimeout(() => {
      this.dynamicData = this.toggle ? this.baseData : [...this.staticData];
      this.tabActiveId = this.toggle ? 'tab1' : 'tab21';
      this.toggle = !this.toggle;
      this.showLoading = false;
    }, 1000);
  }
}
