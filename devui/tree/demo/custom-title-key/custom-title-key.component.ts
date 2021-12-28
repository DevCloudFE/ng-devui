import { Component } from '@angular/core';
import { ITreeItem } from 'ng-devui/tree';
@Component({
  selector: 'd-custom-title-key',
  templateUrl: './custom-title-key.component.html'
})
export class CustomTitleKeyComponent {
  data1: ITreeItem[] = [
    {
      id: '1',
      name: 'parent node 1 - expanded',
      open: true,
      children: [
        {
          id: '2',
          name: 'parent node 11 - folded',
          checkboxDisabled: true,
          children: [
            {
              id: '3',
              name: 'leaf node 111'
            },
            {
              id: '4',
              name: 'leaf node 112'
            },
            {
              id: '5',
              name: 'leaf node 113'
            },
            {
              id: '6',
              name: 'leaf node 114'
            }
          ]
        },
        {
          id: '7',
          name: 'parent node 12 - folded',
          children: [
            {
              id: '8',
              name: 'leaf node 121'
            },
            {
              id: '9',
              name: 'leaf node 122'
            },
            {
              id: '10',
              name: 'leaf node 123'
            },
            {
              id: '11',
              name: 'leaf node 124'
            }
          ]
        },
        {
          id: '12',
          name: 'parent node 13 - without children',
          isParent: true
        }
      ]
    },
    {
      id: '13',
      name: 'parent node 2 - folded',
      children: [
        {
          id: '14',
          name: 'parent node 21 - expanded',
          open: true,
          children: [
            {
              id: '15',
              name: 'leaf node 211'
            },
            {
              id: '16',
              name: 'leaf node 212'
            },
            {
              id: '17',
              name: 'leaf node 213'
            },
            {
              id: '18',
              name: 'leaf node 214'
            }
          ]
        },
        {
          id: '19',
          name: 'parent node 22 - folded',
          children: [
            {
              id: '20',
              name: 'leaf node 221'
            },
            {
              id: '21',
              name: 'leaf node 222'
            },
            {
              id: '22',
              name: 'leaf node 223'
            },
            {
              id: '23',
              name: 'leaf node 224'
            }
          ]
        },
        {
          id: '24',
          name: 'parent node 23 - folded',
          children: [
            {
              id: '25',
              name: 'leaf node 231'
            },
            {
              id: '26',
              name: 'leaf node 232'
            },
            {
              id: '27',
              name: 'leaf node 233'
            },
            {
              id: '28',
              name: 'leaf node 234'
            }
          ]
        }
      ]
    },
    {
      id: '29',
      name: 'parent node 3 - without children',
      isParent: true,
      data: {
        id: '30',
        name: '456'
      }
    }
  ];
  onOperableNodeDblClicked(node) {
    console.log(node);
  }

  onOperableNodeRightClicked(event) {
    console.log(event.node, event.event);
  }
}
