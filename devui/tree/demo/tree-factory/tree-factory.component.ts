import { Component, ViewChild } from '@angular/core';
import { TreeComponent } from 'ng-devui/tree';

@Component({
  selector: 'd-tree-factory',
  templateUrl: './tree-factory.component.html',
  styleUrls: ['./tree-factory.component.css'],
})
export class OperationForAllNodesComponent {
  @ViewChild('operableTree', { static: true }) operableTree: TreeComponent;
  treeNodeData = '';
  data1 = [
    {
      title: 'parent node 1',
      open: true,
      id: '1',
      items: [
        {
          title: 'parent node 11',
          open: true,
          id: '2',
          items: [
            {
              title: 'leaf node 111',
              id: '3',
            },
            {
              title: 'leaf node 112',
              id: '4',
            },
            {
              title: 'leaf node 113',
              id: '5',
            },
            {
              title: 'leaf node 114',
              id: '6',
            },
          ],
        },
        {
          title: 'parent node 12 ',
          open: true,
          id: '7',
          items: [
            {
              title: 'leaf node 121',
              id: '8',
            },
            {
              title: 'leaf node 122',
              id: '9',
            },
            {
              title: 'leaf node 123',
              id: '10',
            },
            {
              title: 'leaf node 124',
              id: '11',
            },
          ],
        },
      ],
    },
    {
      title: 'parent node 2 ',
      id: '12',
      items: [
        {
          title: 'parent node 21 ',
          id: '13',
          open: true,
          items: [
            {
              title: 'leaf node 211',
              id: '14',
            },
            {
              title: 'leaf node 212',
              id: '15',
            },
            {
              title: 'leaf node 213',
              id: '16',
            },
            {
              title: 'leaf node 214',
              id: '17',
            },
          ],
        },
        {
          title: 'parent node 22 ',
          id: '18',
          items: [
            {
              title: 'leaf node 221',
              id: '19',
            },
            {
              title: 'leaf node 222',
              id: '20',
            },
            {
              title: 'leaf node 223',
              id: '21',
            },
            {
              title: 'leaf node 224',
              id: '22',
            },
          ],
        },
        {
          title: 'parent node 23 ',
          id: '23',
          items: [
            {
              title: 'leaf node 231',
              id: '24',
            },
            {
              title: 'leaf node 232',
              id: '25',
            },
            {
              title: 'leaf node 233',
              id: '26',
            },
            {
              title: 'leaf node 234',
              id: '27',
            },
          ],
        },
      ],
    },
  ];
  constructor() {}

  disableAllNodesCheck($event) {
    this.operableTree.treeFactory.disableAllNodesChecked($event);
  }
  disableAllNodesSelect($event) {
    this.operableTree.treeFactory.disableAllNodesSelected($event);
  }
  disableAllNodesToggle($event) {
    this.operableTree.treeFactory.disableAllNodesToggled($event);
  }
  checkAllNodes($event) {
    this.operableTree.treeFactory.checkAllNodes($event);
  }
  activeNodeById(id) {
    this.operableTree.treeFactory.activeNodeById(id);
  }
  deleteNodeById(id) {
    if (this.operableTree.treeFactory.getCompleteNodeById(id)) {
      this.operableTree.treeFactory.deleteNodeById(id);
    } else {
      console.log('leaf node 112 had been deleted');
    }
  }
  editNodeById(id) {
    this.operableTree.treeFactory.editNodeTitle(id);
  }
  toggleNodeById(id) {
    this.operableTree.treeFactory.toggleNodeById(id);
  }
  disabledNodesById(id) {
    this.operableTree.treeFactory.disabledNodesById(id);
  }
  hideNodeById(id, hide) {
    this.operableTree.treeFactory.hideNodeById(id, hide);
  }
  loading(id, showLoading) {
    if (showLoading) {
      this.operableTree.treeFactory.startLoading(id);
    } else {
      this.operableTree.treeFactory.endLoading(id);
    }
  }
  getNodeById(id) {
    this.treeNodeData = this.operableTree.treeFactory.getNodeById(id);
  }
  getCompleteNodeById(id) {
    this.treeNodeData = this.operableTree.treeFactory.getCompleteNodeById(id);
  }
}
