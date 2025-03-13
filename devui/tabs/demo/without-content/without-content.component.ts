import { Component } from '@angular/core';

@Component({
    selector: 'd-without-content',
    templateUrl: './without-content.component.html',
    styles: [
        `
      pre {
        border: none;
      }
    `,
    ],
    standalone: false
})
export class WithoutContentComponent {
  tabActiveId: string | number = 'tab2';

  activeTabChange(event) {
    console.log('switch to', event);
  }
}
