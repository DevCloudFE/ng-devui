import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-multiple-cascader',
  templateUrl: './multiple-cascader.component.html',
})
export class MultipleCascaderComponent {
  options = [
    {
      label: '测试1',
      value : 1,
      children: [
        {
          label: '测试1-1',
          value : 4,
          children: [
            {
              label: '测试1-1-1',
              value : 8,
              children: []
            },
            {
              label: '测试1-1-2',
              value : 9,
              children: [
                {
                  label: '测试1-1-2-1',
                  value : 81,
                  isLeaf: true
                }
              ],
            }
          ]
        },
        {
          label: '测试1-2',
          value : 41,
          isLeaf: true
        },
        {
          label: '测试1-3',
          value : 42,
          isLeaf: true
        },
        {
          label: '测试1-4',
          value : 43,
          isLeaf: true
        }
      ],
      icon: 'icon-folder'
    },
    {
      label: '测试2',
      value : 2,
      children: [
        {
          label: '测试2-1',
          value : 5,
          children: [
            {
              label: '测试2-1-1',
              value : 51,
              isLeaf: true
            },
            {
              label: '测试2-1-2',
              value : 61,
              isLeaf: true,
              disabled: true
            }
          ]
        },
        {
          label: '测试2-2',
          value : 6,
          children: [
            {
              label: '测试2-2-1',
              value : 512,
              isLeaf: true
            },
            {
              label: '测试2-2-2',
              value : 611,
              isLeaf: true
            }
          ]
        },
        {
          label: '测试2-3',
          value : 712,
          isLeaf: true
        }
      ],
      icon: 'icon-folder'
    },
    {
      label: '测试3',
      value : 3,
      children: [],
      isLeaf: true,
      disabled: true,
      icon: 'icon-folder'
    }
  ];

  value1: Array<string | number>[] = [[1, 4, 8], [1, 4, 9, 81], [1, 41]];

  onChanges(value: any) {
    console.log(value);
  }
}
