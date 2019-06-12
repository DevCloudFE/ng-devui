import { Component, ContentChild, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ITreeItem, TreeNode } from './tree-factory.class';
import { TreeComponent } from './tree.component';
import { ICheckboxInput } from './tree.types';

@Component({
  selector: 'ave-operable-tree',
  templateUrl: './operable-tree.component.html',
  styleUrls: ['./operable-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'aveOperableTreeComponent',
})
export class OperableTreeComponent {
  @Input() tree: Array<ITreeItem>;
  @Input() treeNodeIdKey: string;
  @Input() treeNodeChildrenKey: string;
  @Input() checkboxDisabledKey: string;
  @Input() iconParentOpen: string;
  @Input() iconParentClose: string;
  @Input() iconLeaf: string;
  @Input() showLoading: boolean;
  @Input() checkable = true;
  @Input() deletable = false;
  @Input() addable = false;
  @Input() editable = false;
  @Input() draggable = false;
  @Input() checkboxInput: ICheckboxInput = {};
  @Input() beforeAddNode: (node: TreeNode) => Promise<any>;
  @Input() beforeDeleteNode: (node: TreeNode) => Promise<any>;
  @Input() beforeNodeDrop: (drageNodeId: string, dropNodeId: string) => Promise<any>;
  @Output() nodeSelected: EventEmitter<any> = new EventEmitter();
  @Output() nodeDeleted: EventEmitter<any> = new EventEmitter();
  @Output() nodeToggled: EventEmitter<any> = new EventEmitter();
  @Output() nodeChecked: EventEmitter<any> = new EventEmitter();
  @Output() nodeEdited: EventEmitter<any> = new EventEmitter();
  @Output() editValueChange: EventEmitter<any> = new EventEmitter();
  @Output() nodeOnDrop: EventEmitter<any> = new EventEmitter();
  @ViewChild('operableTree') operableTree: TreeComponent;
  @ContentChild('iconTemplate') iconTemplate;
  @Input() iconTemplatePosition: string;
  @ContentChild('operatorTemplate') operatorTemplate;
  @ContentChild('statusTemplate') statusTemplate;

  onDragstart(event, treeNode) {
    const data = {
      type: 'operable-tree-node',
      nodeId: treeNode.id,
      parentId: treeNode.parentId,
      nodeTitle: treeNode.data.title,
      isParent: treeNode.data.isParent
    };
    event.dataTransfer.setData('Text', JSON.stringify(data));
  }

  onDragover(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  onDrop(event, treeNode) {
    event.preventDefault();
    const transferDataStr = event.dataTransfer.getData('Text');
    if (transferDataStr) {
      try {
        const transferData = JSON.parse(transferDataStr);
        // 判断drop的是operableTree的节点
        if (typeof (transferData) === 'object' && transferData.type === 'operable-tree-node') {
          const dragNodeId = transferData['nodeId'];
          const dragNodeParentId = transferData['parentId'];
          const dragNodeTitle = transferData['nodeTitle'];
          const dragNodeIsParent = transferData['isParent'];
          if (dragNodeId === treeNode.id || dragNodeId === treeNode.parentId
            || dragNodeParentId === treeNode.id) {
            return;
          }
          let dragResult = Promise.resolve(true);
          if (this.beforeNodeDrop) {
            dragResult = this.beforeNodeDrop(dragNodeId, treeNode.id);
          }

          dragResult.then(() => {
            this.operableTree.treeFactory.deleteNodeById(dragNodeId);
            this.operableTree.treeFactory.mapTreeItems({
              treeItems: [{
                id: dragNodeId,
                title: dragNodeTitle,
                isParent: dragNodeIsParent
              }],
              parentId: treeNode.id
            });
            this.nodeToggled.emit(treeNode);
            this.operableTree.treeFactory.openNodesById(treeNode.id);
            treeNode.data.isParent = true;
          });
        }
      } catch (e) {

      } finally {
        if (this.nodeOnDrop.observers.length > 0) {
          this.nodeOnDrop.emit({ event, treeNode });
        }
      }
    }
  }

  selectNode(event, treeNode: TreeNode) {
    this.nodeSelected.emit(treeNode);
    this.operableTree.treeFactory.activeNodeById(treeNode.id);
  }

  toggleNodes(event, treeNode: TreeNode) {
    this.nodeToggled.emit(treeNode);
    this.operableTree.treeFactory.toggleNodeById(treeNode.id);
  }

  deleteNodes(event, treeNode: TreeNode) {
    let delResult = Promise.resolve(true);
    if (this.beforeDeleteNode) {
      delResult = this.beforeDeleteNode(treeNode);
    }

    delResult.then(() => {
      this.operableTree.treeFactory.deleteNodeById(treeNode.id);
      this.nodeDeleted.emit(treeNode);
    });
  }

  deleteNodesProxy = (event, treeNode: TreeNode) => {
    this.deleteNodes(event, treeNode);
  }

  addChildNode(event, treeNode: TreeNode, newNode?) {
    let addResult = Promise.resolve(newNode ? newNode : true);
    if (this.beforeAddNode) {
      addResult = this.beforeAddNode(treeNode);
    }

    addResult.then((nodeInfo) => {
      const node = this.operableTree.treeFactory.addNode({
        parentId: treeNode.id,
        title: nodeInfo['title'] ? nodeInfo['title'] : '新增节点',
        isParent: nodeInfo['isParent'],
        id: nodeInfo['id'] ? nodeInfo['id'] : undefined,
        data: nodeInfo.data
      });
      this.operableTree.treeFactory.editNodeTitle(node.id);
      treeNode.data.isOpen = true;
      treeNode.data.isParent = true;
    });
  }

  addChildNodeProxy = (event, treeNode: TreeNode, newNode?) => {
    this.addChildNode(event, treeNode, newNode);
  }

  editNode(event, treeNode: TreeNode) {
    this.operableTree.treeFactory.editNodeTitle(treeNode.id);
  }

  editNodeProxy = (event, treeNode: TreeNode) => {
    this.editNode(event, treeNode);
  }


  checkNodes(checked: boolean, id: number) {
    const results = this.operableTree.treeFactory.checkNodesById(id, checked);
    this.nodeChecked.emit(results);
  }

  onBlurEdit(treeNode) {
    if (!treeNode.data.errTips) {
      if (treeNode.data.errTips) {
        delete treeNode.data.errTips;
      }
      treeNode.data.editable = false;
      this.nodeEdited.emit(treeNode);
    }
  }

  onInputChange(currentValue, treeNode) {
    this.editValueChange.emit({
      value: currentValue, callback: (validateInfo) => {
        if (validateInfo && validateInfo.errTips) {
          treeNode.data.errTips = validateInfo.errTips;
        } else {
          if (treeNode.data.errTips) {
            delete treeNode.data.errTips;
          }
        }
      }
    });
  }

  treeNodeHover(treeNode, type) {
    if (type === 'enter') {
      treeNode.data.isHover = true;
    } else {
      treeNode.data.isHover = false;
    }
  }
}
