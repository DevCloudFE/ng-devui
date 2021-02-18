import { Component, ViewChild } from '@angular/core';
import { ITreeItem, TreeComponent, TreeNode } from 'ng-devui/tree';
import { customLoadingSvg } from './custom-loading-svg';
@Component({
  selector: 'd-custom-loading',
  templateUrl: './custom-loading.component.html'
})
export class CustomLoadingComponent {
  @ViewChild('basicTree', { static: true }) basicTree: TreeComponent;
  showLoading: boolean;
  view = {
    left: '30px'
  };
  customLoadingSvg = customLoadingSvg;
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

  onNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
  }

  onNodeToggled(treeNode: TreeNode) {
    this.loadChildren(treeNode);
  }

  changeTree() {
    this.data1 = [{
      id: 'dynamicNode2',
      title: 'parent node 4 - dynamic loading',
      isParent: true,
      data: {
        id: 'newChildNode2',
        name: 'new child node 2'
      }
    }];
  }

  loadChildren(treeNode: TreeNode) {
    if (this.basicTree.treeFactory.getChildrenById(treeNode.id).length === 0 && treeNode.data.isParent) {
      if (!this.basicTree.treeFactory.nodes[treeNode.id].data.loading) {
        this.showLoading = true;
        this.basicTree.treeFactory.startLoading(treeNode.id);
        this.getMockData()
          .then((result: Array<ITreeItem>) => {
            this.showLoading = false;
            this.basicTree.treeFactory.endLoading(treeNode.id);
            this.basicTree.treeFactory.mapTreeItems({ treeItems: result, parentId: treeNode.id });
            console.log('loaded children: ', this.basicTree.treeFactory.getChildrenById(treeNode.id));
          })
          .catch(() => {
            this.showLoading = false;
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

}
