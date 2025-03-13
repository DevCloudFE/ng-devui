import { Component } from '@angular/core';

@Component({
    selector: 'd-tree-select-basic',
    templateUrl: './tree-select-basic.component.html',
    styles: ['h5 { margin-bottom:20px } d-tree-select { width: 280px }'],
    standalone: false
})
export class TreeSelectBasicComponent {
  data1 = [
    {
      title: 'parent 1',
      id: 1,
    },
    {
      title: 'parent 2',
      children: [
        {
          title: 'parent 2-1',
          children: [
            {
              title: 'leaf 2-1-1',
              id: 3,
            },
            {
              title: 'leaf 2-1-2',
              id: 4,
            },
          ],
          id: 2,
        },
        {
          title: 'parent 2-2',
          children: [
            {
              title: 'leaf 2-2-1',
              id: 6,
            },
            {
              title: 'leaf 2-2-2',
              id: 7,
            },
          ],
          id: 5,
        },
      ],
      id: 18,
    },
    {
      title: 'parent 3',
      open: true,
      children: [
        {
          title: 'leaf 3-1',
          id: 9,
        },
        {
          title: 'leaf 3-2',
          disabled: true,
          id: 10,
        },
        {
          title: 'leaf 3-3',
          disabled: true,
          id: 11,
        },
      ],
      id: 8,
    },
    {
      title: 'parent 4',
      disabled: true,
      children: [
        {
          title: 'leaf 4-1',
          id: 13,
        },
        {
          title: 'leaf 4-2',
          id: 14,
        },
      ],
      id: 12,
    },
    {
      title: 'parent 5',
      children: [
        {
          title: 'leaf 5-1',
          id: 16,
        },
        {
          title: 'leaf 5-2',
          id: 17,
        },
      ],
      id: 15,
    },
  ];

  data2 = [
    {
      title: 'parent 1',
      id: 1,
    },
    {
      title: 'parent 2',
      children: [
        {
          title: 'parent 2-1',
          children: [
            {
              title: 'leaf 2-1-1',
              id: 3,
            },
            {
              title: 'leaf 2-1-2',
              id: 4,
            },
          ],
          id: 2,
        },
        {
          title: 'parent 2-2',
          children: [
            {
              title: 'leaf 2-2-1',
              id: 6,
            },
            {
              title: 'leaf 2-2-2',
              id: 7,
            },
          ],
          id: 5,
        },
      ],
      id: 18,
    },
    {
      title: 'parent 3',
      open: true,
      children: [
        {
          title: 'leaf 3-1',
          id: 9,
        },
        {
          title: 'leaf 3-2',
          disabled: true,
          id: 10,
        },
        {
          title: 'leaf 3-3',
          disabled: true,
          id: 11,
        },
      ],
      id: 8,
    },
    {
      title: 'parent 4',
      disabled: true,
      children: [
        {
          title: 'leaf 4-1',
          id: 13,
        },
        {
          title: 'leaf 4-2',
          id: 14,
        },
      ],
      id: 12,
    },
    {
      title: 'parent 5',
      children: [
        {
          title: 'leaf 5-1',
          id: 16,
        },
        {
          title: 'leaf 5-2',
          id: 17,
        },
      ],
      id: 15,
    },
    {
      title: 'LazyLoad Parent',
      isParent: true,
      isOpen: false,
      id: 20,
    },
  ];

  value1 = {
    title: 'leaf 4-1',
    id: 13,
  };
  value2 = [
    {
      title: 'leaf 4-2',
      id: 14,
    },
    {
      title: 'leaf 4-1',
      id: 13,
    },
    {
      title: 'leaf 2-1-1',
      id: 3,
    },
  ];

  showSelected($event: Event) {
    console.log('event emitted: ', $event);
  }

  valueChanged($event) {
    console.log('value changed:', $event);
  }

  toggleChange(event) {
    console.log('isOpen:', event);
  }

  nodeToggleEvent(node) {
    if (node.id === 20 && node.data.isOpen) {
      this.data2[5].children = [
        {
          title: 'LazyLoad leaf-1',
          id: 21,
        },
        {
          title: 'LazyLoad leaf-2',
          id: 22,
        },
        {
          title: 'LazyLoad leaf-3',
          id: 23,
        },
      ];
      this.data2 = [...this.data2];
    }
  }
}
