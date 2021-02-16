import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
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
      ]
    },
    {
      label: '测试3',
      value : 3,
      children: [],
      isLeaf: true,
      disabled: true
    }
  ];

  value1: Array<string | number>;
  value2: Array<string | number> = [2, 6, 512];
  value3: Array<string | number>;
  value4: Array<string | number>;

  onChanges(value: any) {
    console.log(value);
  }
}
