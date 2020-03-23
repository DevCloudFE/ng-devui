import { Component, ViewChild } from '@angular/core';
import { ITreeItem, TreeComponent, TreeNode } from 'ng-devui';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  @ViewChild('basicTree', { static: true }) basicTree: TreeComponent;
  data1 = [
    {
      title: '父节点1 - 展开',
      open: true,
      items: [
        {
          title: '父节点11 - 折叠',
          items: [
            {
              title: '叶子节点111'
            },
            {
              title: '叶子节点112'
            },
            {
              title: '叶子节点113'
            },
            {
              title: '叶子节点114'
            }
          ]
        },
        {
          title: '父节点12 - 折叠',
          items: [
            {
              title: '叶子节点121'
            },
            {
              title: '叶子节点122'
            },
            {
              title: '叶子节点123'
            },
            {
              title: '叶子节点124'
            }
          ]
        },
        {
          title: '父节点13 - 没有子节点 - 动态加载',
          isParent: true
        }
      ]
    },
    {
      title: '父节点2 - 折叠',
      items: [
        {
          title: '父节点21 - 展开',
          open: true,
          items: [
            {
              title: '叶子节点211'
            },
            {
              title: '叶子节点212'
            },
            {
              title: '叶子节点213'
            },
            {
              title: '叶子节点214'
            }
          ]
        },
        {
          title: '父节点22 - 折叠',
          items: [
            {
              title: '叶子节点221'
            },
            {
              title: '叶子节点222'
            },
            {
              title: '叶子节点223'
            },
            {
              title: '叶子节点224'
            }
          ]
        },
        {
          title: '父节点23 - 折叠',
          items: [
            {
              title: '叶子节点231'
            },
            {
              title: '叶子节点232'
            },
            {
              title: '叶子节点233'
            },
            {
              title: '叶子节点234'
            }
          ]
        }
      ]
    },
    {
      id: 'hello,dddd',
      title: '父节点3 - 没有子节点 - 动态加载',
      isParent: true,
      data: {
        id: '1123213',
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

  changeTree() {
    this.data1 = [{
      id: 'h21111',
      title: '父节点4 - 动态加载',
      isParent: true,
      data: {
        id: '1123ccc213',
        name: '456'
      }
    }];
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
            title: '叶子节点311',
            data: {
              id: '我是额外数据id',
              name: '我是额外的数据名称'
            }
          },
          {
            title: '叶子节点312',
          },
          {
            title: '叶子节点313--展开',
            open: true,
            items: [
              {
                title: '叶子节点313-1',
              },
              {
                title: '叶子节点313-2',
              },
              {
                title: '叶子节点313-3',
              }
            ]
          }
        ]);
      }, 3000);
    });
  }
}
