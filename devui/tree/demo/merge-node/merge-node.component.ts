import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent, TreeNode } from 'ng-devui/tree';

@Component({
  selector: 'd-merge-node',
  templateUrl: './merge-node.component.html'
})
export class MergeNodeComponent implements AfterViewInit {
  @ViewChild('basicTree') basicTree: TreeComponent;
  data1 = [
    {
      title: '父节点1',
      items: [
        {
          title: '父节点11',
          open: true,
          items: [
            {
              title: '父节点节点111',
              items: [
                {
                  title: '父节点1111',
                  items: [
                    {
                      title: '叶子节点11111'
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
      title: '父节点2',
      items: [
        {
          title: '父节点21',
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
            },
            {
              title: '叶子节点215'
            },
          ]
        },
      ]
    },
    {
      title: '父节点3',
      items: [
        {
          title: '叶子节点31',
          items: [
            {
              title: '叶子节点311',
              items: [
                {
                  title: '叶子节点3111'
                }
              ]
            }
          ]
        },
        {
          title: '叶子节点32'
        },
        {
          title: '叶子节点33'
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
