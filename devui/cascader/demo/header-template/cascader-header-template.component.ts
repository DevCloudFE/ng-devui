import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-cascader-header-template',
  templateUrl: './cascader-header-template.component.html',
  styleUrls: ['./cascader-header-template.component.scss'],
})
export class CascaderHeaderTemplateComponent {
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
      ]
    },
    {
      label: 'option3',
      value : 3,
      children: [],
      isLeaf: true,
      disabled: true
    }
  ];

  optionMap = {
    tab1: [
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
        ]
      },
      {
        label: 'option3',
        value : 3,
        children: [],
        isLeaf: true,
        disabled: true
      }
    ],
    tab2: [
      {
        label: 'group1',
        value : 1,
        children: [
          {
            label: 'group1-1',
            value : 4,
            children: [
              {
                label: 'group1-1-1',
                value : 8,
                children: []
              },
              {
                label: 'group1-1-2',
                value : 9,
                children: [
                  {
                    label: 'group1-1-2-1',
                    value : 81,
                    isLeaf: true
                  }
                ],
              }
            ]
          },
          {
            label: 'group1-2',
            value : 41,
            isLeaf: true
          },
          {
            label: 'group1-3',
            value : 42,
            isLeaf: true
          },
          {
            label: 'group1-4',
            value : 43,
            isLeaf: true
          }
        ],
      },
      {
        label: 'group3',
        value : 3,
        children: [],
        isLeaf: true,
        disabled: true
      }
    ],
    tab3: [
      {
        label: 'custom1',
        value : 1,
        children: [
          {
            label: 'custom1-1',
            value : 4,
            children: [
              {
                label: 'custom1-1-1',
                value : 8,
                children: []
              },
              {
                label: 'custom1-1-2',
                value : 9,
                children: [
                  {
                    label: 'custom1-1-2-1',
                    value : 81,
                    isLeaf: true
                  }
                ],
              }
            ]
          },
          {
            label: 'custom1-2',
            value : 41,
            isLeaf: true
          },
          {
            label: 'custom1-3',
            value : 42,
            isLeaf: true
          },
          {
            label: 'custom1-4',
            value : 43,
            isLeaf: true
          }
        ],
      },
      {
        label: 'custom3',
        value : 3,
        children: [],
        isLeaf: true,
        disabled: true
      }
    ]
  };

  value1: Array<string | number>;

  activeTab = 'tab1';

  onChanges(value: any) {
    console.log(value);
  }

  activeTabChange(id) {
    setTimeout(() => {
      this.options = this.optionMap[id];
    });
  }
}
