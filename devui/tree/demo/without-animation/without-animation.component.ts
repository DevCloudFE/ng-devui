import { Component, ViewChild } from '@angular/core';
import { ITreeItem, TreeComponent, TreeNode } from 'ng-devui/tree';

@Component({
  selector: 'd-without-animation',
  templateUrl: './without-animation.component.html',
})
export class WithoutAnimationComponent {
  @ViewChild('basicTree', { static: true }) basicTree: TreeComponent;
  data1 = [
    {
      title: 'parent node 1 - expanded',
      open: true,
      disabled: true,
      items: [
        {
          title: 'parent node 11 - folded',
          items: [
            {
              title: 'leaf node 111'
            },
            {
              title: 'leaf node 112'
            },
            {
              title: 'leaf node 113'
            },
            {
              title: 'leaf node 114'
            }
          ]
        },
        {
          title: 'parent node 12 - folded',
          disableToggle: true,
          items: [
            {
              title: 'leaf node 121'
            },
            {
              title: 'leaf node 122'
            },
            {
              title: 'leaf node 123'
            },
            {
              title: 'leaf node 124'
            }
          ]
        },
        {
          title: 'parent node 13 - without children - dynamic loading',
          isParent: true
        }
      ]
    },
    {
      title: 'parent node 2 - folded',
      items: [
        {
          title: 'parent node 21 - expanded',
          open: true,
          items: [
            {
              title: 'leaf node 211'
            },
            {
              title: 'leaf node 212'
            },
            {
              title: 'leaf node 213'
            },
            {
              title: 'leaf node 214'
            }
          ]
        },
        {
          title: 'parent node 22 - folded',
          items: [
            {
              title: 'leaf node 221'
            },
            {
              title: 'leaf node 222'
            },
            {
              title: 'leaf node 223'
            },
            {
              title: 'leaf node 224'
            }
          ]
        },
        {
          title: 'parent node 23 - folded',
          items: [
            {
              title: 'leaf node 231'
            },
            {
              title: 'leaf node 232'
            },
            {
              title: 'leaf node 233'
            },
            {
              title: 'leaf node 234'
            }
          ]
        }
      ]
    },
    {
      id: 'dynamicNode',
      title: 'parent node 3 - without children - dynamic loading',
      isParent: true,
      data: {
        id: 'newChildNode',
        name: 'new child node'
      }
    }
  ];
  data2 = [
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

  onNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
  }

  onNodeToggled(treeNode: TreeNode) {
    this.loadChildren(treeNode);
  }

  loadChildren(treeNode: TreeNode) {
    if (this.basicTree.treeFactory.getChildrenById(treeNode.id).length === 0 && treeNode.data.isParent) {
      if (!this.basicTree.treeFactory.nodes[treeNode.id].data.loading) {
        this.basicTree.treeFactory.startLoading(treeNode.id);
        this.getMockData()
          .then((result: Array<ITreeItem>) => {
            this.basicTree.treeFactory.endLoading(treeNode.id);
            this.basicTree.treeFactory.mapTreeItems({ treeItems: result, parentId: treeNode.id });
            console.log('loaded children: ', this.basicTree.treeFactory.getChildrenById(treeNode.id));
          })
          .catch(() => {
            this.basicTree.treeFactory.endLoading(treeNode.id);
          });
      }
    }
  }

  getMockData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            title: 'leaf node 311',
            data: {
              id: 'extraNode',
              name: 'extra node'
            }
          },
          {
            title: 'leaf node 312',
          },
          {
            title: 'leaf node 313--expanded',
            open: true,
            items: [
              {
                title: 'leaf node 313-1',
              },
              {
                title: 'leaf node 313-2',
              },
              {
                title: 'leaf node 313-3',
              }
            ]
          }
        ]);
      }, 3000);
    });
  }

  onOperableNodeDblClicked(node) {
    console.log(node);
  }

  onOperableNodeRightClicked(event) {
    console.log(event.node, event.event);
  }
}
