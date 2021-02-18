import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-search-cascader',
  templateUrl: './search-cascader.component.html',
})
export class SearchCascaderComponent {
  options = [
    {
      label: 'option1',
      value : 1,
      children: [
        {
          label: 'option1-1',
          value : 4,
          children: [
            {
              label: 'option1-1-1',
              value : 8,
              children: []
            },
            {
              label: 'option1-1-2',
              value : 9,
              children: [
                {
                  label: 'option1-1-2-1',
                  value : 81,
                  isLeaf: true
                }
              ],
            }
          ]
        },
        {
          label: 'option1-2',
          value : 41,
          isLeaf: true
        },
        {
          label: 'option1-3',
          value : 42,
          isLeaf: true
        },
        {
          label: 'option1-4',
          value : 43,
          isLeaf: true
        }
      ],
      icon: 'icon-folder'
    },
    {
      label: 'option2',
      value : 2,
      children: [
        {
          label: 'option2-1',
          value : 5,
          children: [
            {
              label: 'option2-1-1',
              value : 51,
              isLeaf: true
            },
            {
              label: 'option2-1-2',
              value : 61,
              isLeaf: true,
              disabled: true
            }
          ]
        },
        {
          label: 'option2-2',
          value : 6,
          children: [
            {
              label: 'option2-2-1',
              value : 512,
              isLeaf: true
            },
            {
              label: 'option2-2-2',
              value : 611,
              isLeaf: true
            }
          ]
        },
        {
          label: 'option2-3',
          value : 712,
          isLeaf: true
        }
      ],
      icon: 'icon-folder'
    },
    {
      label: 'option3',
      value : 3,
      children: [],
      isLeaf: true,
      disabled: true,
      icon: 'icon-folder'
    }
  ];

  value1: Array<string | number>[] = [];
  value2: Array<string | number>[] = [[1, 4, 8], [1, 4, 9, 81], [1, 41]];

  onChanges(value: any) {
    console.log(value);
  }
}
