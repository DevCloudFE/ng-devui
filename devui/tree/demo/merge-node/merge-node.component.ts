import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TreeComponent, TreeNode } from 'ng-devui/tree';

@Component({
  selector: 'd-merge-node',
  templateUrl: './merge-node.component.html'
})
export class MergeNodeComponent implements AfterViewInit {
  @ViewChild('basicTree') basicTree: TreeComponent;
  data1 = [
    {
      title: 'parent node 1',
      items: [
        {
          title: 'parent node 11',
          open: true,
          items: [
            {
              title: 'parent node 111',
              items: [
                {
                  title: 'parent node 1111',
                  items: [
                    {
                      title: 'leaf node 11111'
                    }
                  ]
                }
              ]
            }
          ]
        },
      ]
    },
    {
      title: 'parent node 2',
      items: [
        {
          title: 'parent node 21',
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
            },
            {
              title: 'leaf node 215'
            },
          ]
        },
      ]
    },
    {
      title: 'parent node 3',
      items: [
        {
          title: 'leaf node 31',
          items: [
            {
              title: 'leaf node 311',
              items: [
                {
                  title: 'leaf node 3111'
                }
              ]
            }
          ]
        },
        {
          title: 'leaf node 32'
        },
        {
          title: 'leaf node 33'
        }
      ]
    }
  ];

  constructor() { }

  ngAfterViewInit(): void {
    // 树节点初始化完毕后调用mergeTreeNodes方法将节点合并
    this.basicTree.treeFactory.mergeTreeNodes();
  }

  onNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
  }

  onNodeToggled(treeNode: TreeNode) {
    console.log(treeNode);
  }

}
