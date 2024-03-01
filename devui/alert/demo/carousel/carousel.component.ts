import { Component } from '@angular/core';

@Component({
  selector: 'd-alert-carousel',
  templateUrl: './carousel.component.html',
  styles: [
    `
      .not-show {
        cursor: pointer;
      }
    `,
  ],
})
export class CarouselComponent {
  data = [
    {
      id: 1,
      content: `info 1`,
    },
    {
      id: 2,
      content: 'info 2',
    },
    {
      id: 3,
      content: 'info 3',
    },
    {
      id: 4,
      content: 'info 4',
    },
    {
      id: 5,
      content: 'info 5',
    },
  ];
}
