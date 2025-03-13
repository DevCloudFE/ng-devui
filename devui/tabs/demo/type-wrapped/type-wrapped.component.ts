import { Component } from '@angular/core';
@Component({
    selector: 'd-type-wrapped',
    templateUrl: './type-wrapped.component.html',
    standalone: false
})
export class TypeWrappedComponent {
  tabActiveId: string | number = 'tab1';
  activeTabData;
  tabItems = [
    {
      id: 'tab1',
      title: 'Tab1',
    },
    {
      id: 'tab2',
      title: 'Tab2',
    },
    {
      id: 'tab3',
      title: 'Tab3',
    },
  ];

  activeTabChange(tab) {
    console.log(tab);
  }
}
