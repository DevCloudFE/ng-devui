import { Component } from '@angular/core';

export const source = [
  {
    title: 'parent node 1 - expanded',
    open: true,
    items: [
      {
        title: 'parent node 11 - folded',
        items: [
          {
            title: 'leaf node 111',
          },
          {
            title: 'leaf node 112',
          },
          {
            title: 'leaf node 113',
          },
          {
            title: 'leaf node 114',
          },
        ],
      },
      {
        title: 'parent node 12 - folded',
        items: [
          {
            title: 'leaf node 121',
          },
          {
            title: 'leaf node 122',
          },
          {
            title: 'leaf node 123',
          },
          {
            title: 'leaf node 124',
          },
        ],
      },
      {
        title: 'parent node 13 - without children',
        isparent: true,
      },
    ],
  },
  {
    title: 'parent node 2 - folded',
    items: [
      {
        title: 'parent node 21 - expanded',
        open: true,
        items: [
          {
            title: 'leaf node 211',
          },
          {
            title: 'leaf node 212',
          },
          {
            title: 'leaf node 213',
          },
          {
            title: 'leaf node 214',
          },
        ],
      },
      {
        title: 'parent node 22 - folded',
        items: [
          {
            title: 'leaf node 221',
          },
          {
            title: 'leaf node 222',
          },
          {
            title: 'leaf node 223',
          },
          {
            title: 'leaf node 224',
          },
        ],
      },
      {
        title: 'parent node 23 - folded',
        items: [
          {
            title: 'leaf node 231',
          },
          {
            title: 'leaf node 232',
          },
          {
            title: 'leaf node 233',
          },
          {
            title: 'leaf node 234',
          },
        ],
      },
    ],
  },
];

@Component({
  selector: 'd-check-control',
  templateUrl: './check-control.component.html',
})
export class CheckControlComponent {
  data1 = [...source];
  data2 = [...source];
  data3 = [...source];
  data4 = [...source];
  data5 = JSON.parse(JSON.stringify(source)).map((item) => {
    item.showCheckbox = false;
    return item;
  });
}
