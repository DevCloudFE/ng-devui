import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-before-change',
  templateUrl: './before-change.component.html',
})
export class CustomizeTmpComponent implements OnInit {
  acticeTabId = 'tab2';
  tabItems = [
    {
      id: 'tab1',
      title: 'Tab1',
      content: `这是Tab1的内容`
    },
    {
      id: 'tab2',
      title: 'Tab2',
      content: `这是Tab2的内容`
    },
    {
      id: 'tab3',
      title: 'Tab3',
      content: `这是Tab3的内容`
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
