import { Component } from '@angular/core';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'd-demo-parent-select-cascader',
  templateUrl: './parent-select-cascader.component.html',
})
export class ParentSelectCascaderComponent {
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

  value1: Array<string | number>[] = [];
  value2: Array<string | number>[] = [[1, 4, 8], [1, 4, 9, 81], [1, 41]];
  value3: Array<string | number>[] = [[1, 4, 8], [1, 4, 9, 81], [1, 41]];
  value4: Array<string | number>[] = [[1, 4, 8], [1, 4, 9, 81], [1, 41]];

  upward = {upward: true, downward: false};
  downward = {upward: false, downward: true};
  noRelation = {upward: false, downward: false};

  onChanges(value: any) {
    console.log(value);
  }
}
