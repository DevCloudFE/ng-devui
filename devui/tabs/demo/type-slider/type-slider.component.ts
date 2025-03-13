import { Component } from '@angular/core';
@Component({
    selector: 'd-type-slider',
    templateUrl: './type-slider.component.html',
    standalone: false
})
export class TypeSliderComponent {
  tabActiveId: string | number = 'tab1';
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
