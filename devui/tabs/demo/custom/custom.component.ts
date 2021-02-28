import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'd-custom',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CustomComponent {

    tabActiveId = 'tab1';
    tabItems = [
        {
          id: 'tab1',
          title: 'Tab1',
          content: `Tab1 Content`
        },
        {
          id: 'tab2',
          title: 'Tab2',
          content: `Tab2 Content`,
          disabled: true
        },
        {
          id: 'tab3',
          title: 'Tab3',
          content: `Tab3 Content`
        },
      ];

    constructor() {
    }
}
