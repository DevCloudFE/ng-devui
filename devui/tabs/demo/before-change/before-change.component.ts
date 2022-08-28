import { Component } from '@angular/core';

@Component({
  selector: 'd-before-change',
  templateUrl: './before-change.component.html',
})
export class CustomizeTmpComponent {
  tabActiveId: string | number = 'tab2';
  tabItems = [
    {
      id: 'tab1',
      title: 'Tab1',
      content: `Tab1 Content`,
    },
    {
      id: 'tab2',
      title: 'Tab2',
      content: `Tab2 Content`,
    },
    {
      id: 'tab3',
      title: 'Tab3',
      content: `Tab3 Content`,
    },
  ];

  beforeChange = (tab) => {
    if (tab === 'tab1') {
      this.tabActiveId = 'tab3';
      return false;
    } else {
      return true;
    }
  };
}
