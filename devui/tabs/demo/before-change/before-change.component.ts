import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-before-change',
  templateUrl: './before-change.component.html',
})
export class CustomizeTmpComponent implements OnInit {
  acticeTabId: string | number = 'tab2';
  tabItems = [
    {
      id: 'tab1',
      title: 'Tab1',
      content: `Tab1 Content`
    },
    {
      id: 'tab2',
      title: 'Tab2',
      content: `Tab2 Content`
    },
    {
      id: 'tab3',
      title: 'Tab3',
      content: `Tab3 Content`
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }
  beforeChange = (tab) => {
    if (tab === 'tab1') {
        this.acticeTabId = 'tab3';
        return false;
    } else {
        return true;
    }
}
}
