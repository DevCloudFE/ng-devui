import { Component, ViewChild, OnInit } from '@angular/core';
import { TreeNode, OperableTreeComponent, ITreeItem } from 'ng-devui/tree';

@Component({
  selector: 'd-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.css']
})
export class VirtualScrollComponent implements OnInit {
  currentSelectedNode;
  transferData: string;
  @ViewChild('operableTree', { static: true }) operableTree: OperableTreeComponent;
  data = [{
    'title': '父节点1'
  },
  {
    title: '试试动态懒加载',
    isParent: true
  },
  {
    'title': '父节点2',
    'children': [{
      'title': '子节点2-1',
      'children': [{
        'title': '子节点2-1-1'
      }, {
        'title': '子节点2-1-2'
      }]
    }, {
      'title': '子节点2-2',
      'children': [{
        'title': '子节点2-2-1'
      }, {
        'title': '子节点2-2-2'
      }]
    }]
  }, {
    'title': '拥有1000子节点的父节点',
    'children': [],
  }, {
    'title': '父节点4',
    'children': [{
      'title': '子节点4-1'
    }, {
      'title': '子节点4-2'
    }]
  }, {
    'title': '父节点5',
    'children': [{
      'title': '子节点5-1'
    }, {
      'title': '子节点5-2'
    }]
  }];
  dropType = {
    dropPrev: true,
    dropNext: true,
    dropInner: true
  };
  constructor() {
    for (let i = 0; i < 2000; i++) {
      this.data.push({ 'title': '节点加载-' + (i + 1) });
    }
    for (let i = 0; i < 1000; i++) {
      this.data[3].children.push({ 'title': '子节点加载-' + (i + 1), children: [] });
    }
  }
  ngOnInit(): void {

  }
  onOperableNodeDeleted(treeNode: TreeNode) {
    console.log('deleted: ', treeNode);
  }

  onOperableNodeSelected(treeNode: TreeNode) {
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
      }, 1000);
    });
  }


  onOperableNodeChecked(checkedNodes: Array<ITreeItem>) {
    console.log('checked: ', checkedNodes);
  }

  addNode() {
    if (this.currentSelectedNode) {
      const node = this.operableTree.treeFactory.addNode({ parentId: this.currentSelectedNode.id, title: '新增一个节点' });
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
      resolve({ title: '新节点', index: 0 });
    }).catch(err => console.error(err));
  }

  beforeDeleteNode = (node) => {
    console.log('beforeDeleteNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch(err => console.error(err));
  }

  beforeEditNode = (node) => {
    console.log('beforeEditNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch(err => console.error(err));
  }

  postAddNode = (node) => {
    console.log('postAddNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch(err => console.error(err));
  }

  editValueChange(event) {
    console.log('editChanged', event);
  }

  onKeyUp(event) {
    this.operableTree.operableTree.treeFactory.searchTree(event);
    this.operableTree.treeFactory.getFlattenNodes();
    const index = this.operableTree.operableTree.treeNodes.findIndex(node => node.data.title.includes(event));
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
