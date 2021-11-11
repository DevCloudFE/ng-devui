import { Component, OnInit } from '@angular/core';

export const source = [
  {
    name: 'parent node 1 - expanded',
    open: true,
    items: [
      {
        name: 'parent node 11 - folded',
        items: [
          {
            name: 'leaf node 111'
          },
          {
            name: 'leaf node 112'
          },
          {
            name: 'leaf node 113'
          },
          {
            name: 'leaf node 114'
          }
        ]
      },
      {
        name: 'parent node 12 - folded',
        items: [
          {
            name: 'leaf node 121'
          },
          {
            name: 'leaf node 122'
          },
          {
            name: 'leaf node 123'
          },
          {
            name: 'leaf node 124'
          }
        ]
      },
      {
        name: 'parent node 13 - without children',
        isparent: true
      }
    ]
  },
  {
    name: 'parent node 2 - folded',
    items: [
      {
        name: 'parent node 21 - expanded',
        open: true,
        items: [
          {
            name: 'leaf node 211'
          },
          {
            name: 'leaf node 212'
          },
          {
            name: 'leaf node 213'
          },
          {
            name: 'leaf node 214'
          }
        ]
      },
      {
        name: 'parent node 22 - folded',
        items: [
          {
            name: 'leaf node 221'
          },
          {
            name: 'leaf node 222'
          },
          {
            name: 'leaf node 223'
          },
          {
            name: 'leaf node 224'
          }
        ]
      },
      {
        name: 'parent node 23 - folded',
        items: [
          {
            name: 'leaf node 231'
          },
          {
            name: 'leaf node 232'
          },
          {
            name: 'leaf node 233'
          },
          {
            name: 'leaf node 234'
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'd-check-control',
  templateUrl: './check-control.component.html'
})
export class CheckControlComponent implements OnInit {
  data1 = Object.assign(source, []);
  data2 = Object.assign(source, []);
  data3 = Object.assign(source, []);
  data4 = Object.assign(source, []);
  data5 = source.map(item => {
    if (item.items && item.items.length) {
      item['showCheckbox'] = false;
    }
    return item;
  });
  constructor() { }

  ngOnInit() {
  }

}
