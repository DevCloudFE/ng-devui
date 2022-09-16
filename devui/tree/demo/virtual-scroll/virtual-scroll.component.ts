import { Component, ViewChild } from '@angular/core';
import { ITreeItem, OperableTreeComponent, TreeNode } from 'ng-devui/tree';

@Component({
  selector: 'd-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.css'],
})
export class VirtualScrollComponent {
  currentSelectedNode;
  transferData: string;
  @ViewChild('operableTree', { static: true }) operableTree: OperableTreeComponent;
  data = [
    {
      title: 'parent node 1',
    },
    {
      title: 'dynamic loading',
      isParent: true,
    },
    {
      title: 'parent node 2',
      items: [
        {
          title: 'leaf node 2-1',
          items: [
            {
              title: 'leaf node 2-1-1',
            },
            {
              title: 'leaf node 2-1-2',
            },
          ],
        },
        {
          title: 'leaf node 2-2',
          items: [
            {
              title: 'leaf node 2-2-1',
            },
            {
              title: 'leaf node 2-2-2',
            },
          ],
        },
      ],
    },
    {
      title: 'parent node with 1000 leaf nodes',
      items: [],
    },
    {
      title: 'parent node 4',
      items: [
        {
          title: 'leaf node 4-1',
        },
        {
          title: 'leaf node 4-2',
        },
      ],
    },
    {
      title: 'parent node 5',
      items: [
        {
          title: 'leaf node 5-1',
        },
        {
          title: 'leaf node 5-2',
        },
      ],
    },
  ];
  dropType = {
    dropPrev: true,
    dropNext: true,
    dropInner: true,
  };
  constructor() {
    for (let i = 0; i < 2000; i++) {
      this.data.push({ title: 'new node -' + (i + 1) });
    }
    for (let i = 0; i < 1000; i++) {
      this.data[3].items.push({ title: 'new leaf node 加载-' + (i + 1), items: [] });
    }
  }

  onOperableNodeDeleted(treeNode: TreeNode) {
    console.log('deleted: ', treeNode);
  }

  onOperableNodeSelected(treeNode: TreeNode | TreeNode[]) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }

  onOperableNodeEdited(treeNode: TreeNode) {
    console.log('edited: ', treeNode);
  }

  onOperableNodeToggled(treeNode: TreeNode) {
    console.log('toggled: ', treeNode);
    this.loadChildren(treeNode);
  }

  loadChildren(treeNode: TreeNode) {
    if (this.operableTree.treeFactory.getChildrenById(treeNode.id).length === 0 && treeNode.data.isParent) {
      if (!this.operableTree.treeFactory.nodes[treeNode.id].data.loading) {
        this.operableTree.treeFactory.startLoading(treeNode.id);
        this.getMockData()
          .then((result: Array<ITreeItem>) => {
            this.operableTree.treeFactory.endLoading(treeNode.id);
            this.operableTree.treeFactory.mapTreeItems({ treeItems: result, parentId: treeNode.id });
            this.operableTree.treeFactory.getFlattenNodes();
          })
          .catch(() => {
            this.operableTree.treeFactory.endLoading(treeNode.id);
          });
      }
    }
  }

  getMockData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            title: 'leaf node 311',
            data: {
              id: 'extraNode',
              name: 'extra node',
            },
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
              },
            ],
          },
        ]);
      }, 1000);
    });
  }

  onOperableNodeChecked(checkedNodes: Array<ITreeItem>) {
    console.log('checked: ', checkedNodes);
  }

  addNode() {
    if (this.currentSelectedNode) {
      const node = this.operableTree.treeFactory.addNode({ parentId: this.currentSelectedNode.id, title: 'add a node' });
      this.currentSelectedNode.data.isOpen = true;
      console.log(node);
    }
  }

  editNodeTitle() {
    if (this.currentSelectedNode) {
      this.operableTree.treeFactory.editNodeTitle(this.currentSelectedNode.id);
    }
  }

  deleteNode() {
    if (this.currentSelectedNode) {
      this.operableTree.treeFactory.deleteNodeById(this.currentSelectedNode.id);
    }
  }

  beforeAddNode(node) {
    console.log('beforeAddNode', node);
    return new Promise((resolve, reject) => {
      resolve({ title: 'new added node', index: 0 });
    }).catch((err) => console.error(err));
  }

  beforeDeleteNode = (node) => {
    console.log('beforeDeleteNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch((err) => console.error(err));
  };

  beforeEditNode = (node) => {
    console.log('beforeEditNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch((err) => console.error(err));
  };

  postAddNode = (node) => {
    console.log('postAddNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch((err) => console.error(err));
  };

  editValueChange(event) {
    console.log('editChanged', event);
  }

  onKeyUp(event) {
    this.operableTree.operableTree.treeFactory.searchTree(event);
    this.operableTree.treeFactory.getFlattenNodes();
    const index = this.operableTree.operableTree.treeNodes.findIndex((node) => node.data.title.includes(event));
    this.operableTree.operableTree.scrollToIndex(index - 1);
  }
  onKeyUp2(event) {
    this.operableTree.operableTree.treeFactory.searchTree(event, true);
    this.operableTree.treeFactory.getFlattenNodes();
  }
  onDrop(data) {
    this.transferData = data.event.dataTransfer.getData('Text');
  }
  afterTreeInit(event) {
    console.log('finished', event);
  }
}
