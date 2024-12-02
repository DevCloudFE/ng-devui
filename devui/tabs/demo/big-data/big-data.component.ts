import { Component } from '@angular/core';
@Component({
  selector: 'd-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.scss'],
})
export class BigDataComponent {
  toggle = false;
  showLoading = false;
  normalTabActiveId: string | number = '';
  autoTabActiveId: string | number = 'tab1';
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

  activateRandomTab() {
    this.normalTabActiveId = `tab${Math.floor(Math.random() * 50)}`;
  }

  getData() {
    this.showLoading = true;
    setTimeout(() => {
      this.dynamicData = this.toggle ? this.baseData : [...this.staticData];
      this.autoTabActiveId = this.toggle ? 'tab1' : 'tab21';
      this.toggle = !this.toggle;
      this.showLoading = false;
    }, 1000);
  }

  clearAll() {
    this.dynamicData = [{ id: 'tab1', title: 'Tab1', content: 'Tab1 Content' }];
    this.autoTabActiveId = 'tab1';
    this.toggle = false;
  }
}
