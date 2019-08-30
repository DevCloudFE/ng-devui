import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ContentChild,
} from '@angular/core';
import {
  ITreeItem,
  TreeNode
} from './tree-factory.class';
import { TreeComponent } from './tree.component';
import { ICheckboxInput } from './tree.types';

@Component({
  selector: 'd-operable-tree',
  templateUrl: './operable-tree.component.html',
  styleUrls: ['./operable-tree.component.scss'],
  exportAs: 'dOperableTreeComponent',
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
  @Input() canActivateNode = true;
  @Input() canActivateParentNode = true;
  @Input() treeNodeTitleKey = 'title';
  @Input() postAddNode: (node: TreeNode) => Promise<any>;
  @Input() iconTemplatePosition: string;
  @Output() nodeSelected: EventEmitter<any> = new EventEmitter();
  @Output() nodeDeleted: EventEmitter<any> = new EventEmitter();
  @Output() nodeToggled: EventEmitter<any> = new EventEmitter();
  @Output() nodeChecked: EventEmitter<any> = new EventEmitter();
  @Output() nodeEdited: EventEmitter<any> = new EventEmitter();
  @Output() editValueChange: EventEmitter<any> = new EventEmitter();
  @Output() nodeOnDrop: EventEmitter<any> = new EventEmitter();
  @ViewChild('operableTree') operableTree: TreeComponent;
  @ContentChild('iconTemplate') iconTemplate;
  @ContentChild('operatorTemplate') operatorTemplate;
  @ContentChild('statusTemplate') statusTemplate;
  private addingNode = false;

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
    if (!this.draggable) {
      return;
    }
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
            this.treeFactory.deleteNodeById(dragNodeId);
            this.appendTreeItems([{
              id: dragNodeId,
              title: dragNodeTitle,
              isParent: dragNodeIsParent
            }], treeNode.id);
            this.nodeToggled.emit(treeNode);
            this.treeFactory.openNodesById(treeNode.id);
            treeNode.data.isParent = true;
          });
        }
      } catch (e) {

      } finally {
        if (this.nodeOnDrop.observers.length > 0) {
          this.nodeOnDrop.emit({event, treeNode});
        }
      }
    }
  }

  selectNode(event, treeNode: TreeNode) {
    if (!this.canActivateNode) {
      this.checkNode(event, treeNode);
      return;
    }
    if (this.canActivateParentNode || (!this.canActivateParentNode && !treeNode.data.isParent)) {
      this.treeFactory.activeNodeById(treeNode.id);
    } else {
      this.toggleNode(event, treeNode);
    }
    this.nodeSelected.emit(treeNode);
  }

  toggleNode(event, treeNode: TreeNode) {
    this.nodeToggled.emit(treeNode);
    this.treeFactory.toggleNodeById(treeNode.id);
  }

  deleteNodes(event, treeNode: TreeNode) {
    let delResult = Promise.resolve(true);
    if (this.beforeDeleteNode) {
      delResult = this.beforeDeleteNode(treeNode);
    }

    delResult.then(() => {
      this.treeFactory.deleteNodeById(treeNode.id);
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
      const node = this.treeFactory.addNode({
        parentId: treeNode.id,
        title: nodeInfo['title'] ? nodeInfo['title'] : '新增节点',
        isParent: nodeInfo['isParent'],
        id: nodeInfo['id'] ? nodeInfo['id'] : undefined,
        data: nodeInfo.data
      });
      this.treeFactory.editNodeTitle(node.id);
      this.addingNode = true;
      treeNode.data.isOpen = true;
      treeNode.data.isParent = true;
      return treeNode;
    });
  }

  addChildNodeProxy = (event, treeNode: TreeNode, newNode?) => {
    this.addChildNode(event, treeNode, newNode);
  }

  editNode(event, treeNode: TreeNode) {
    this.treeFactory.editNodeTitle(treeNode.id);
  }

  editNodeProxy = (event, treeNode: TreeNode) => {
    this.editNode(event, treeNode);
  }


  public checkNodeById(checked: boolean, id: number) {
    const results = this.treeFactory.checkNodesById(id, checked);
    this.nodeChecked.emit(results);
  }

  onBlurEdit(treeNode) {
    if (!treeNode.data.errTips) {
      // tslint:disable-next-line:no-unused-expression
      treeNode.data.errTips && delete treeNode.data.errTips;
      treeNode.data.editable = false;
      return this.postEditNode(treeNode);
    }
  }

  onInputChange(currentValue, treeNode) {
    this.editValueChange.emit({
      value: currentValue, callback: (validateInfo) => {
        if (validateInfo && validateInfo.errTips) {
          treeNode.data.errTips = validateInfo.errTips;
        } else {
          // tslint:disable-next-line:no-unused-expression
          treeNode.data.errTips && delete treeNode.data.errTips;
        }
      }
    });
  }

  treeNodeHover(treeNode, type) {
    treeNode.data.isHover = type === 'enter';
  }

  isSelectedNode(node: any) {
    if (this.checkable) {
      return node.isChecked;
    } else {
      return node.isActive;
    }
  }

  get nodes(): any[] {
    return this.operableTree ? Object.keys(this.treeFactory.nodes).map((k) => {
      return this.treeFactory.nodes[k];
    }) : [];
  }

  private postEditNode(treeNode) {
    if (this.addingNode === true) {
      this.addingNode = false;
      if (typeof this.postAddNode === 'function') {
        const originalId = treeNode.id;
        return this.postAddNode(treeNode).then((nodeInfo) => {
          // Swap id if id was modified by outer system
          treeNode.id = nodeInfo.id ? nodeInfo.id : originalId;
          delete this.treeFactory.nodes[originalId];
          this.treeFactory.nodes[treeNode.id] = treeNode;
          return treeNode;
        }).catch((e, reaction = 'cancel') => {
          switch (reaction) {
            case 'justify':
              const parentNode = this.treeFactory.nodes[treeNode.parentId];
              const title = treeNode.data.title;
              this.treeFactory.deleteNodeById(treeNode.id);
              this.addChildNode(null, parentNode, {title: title});
              break;
            case 'cancel':
            default:
              this.treeFactory.deleteNodeById(treeNode.id);
          }
          return Promise.reject(e);
        });
      }
    } else {
      this.nodeEdited.emit(treeNode);
    }
    return Promise.resolve(treeNode);
  }

  public appendTreeItems(treeItems: Array<ITreeItem>, parentId) {
    if (!this.treeFactory.nodes[parentId]) {
      throw new Error('parent node does not exist.');
    }
    this.treeFactory.mapTreeItems({
      treeItems: treeItems,
      parentId: parentId,
      treeNodeChildrenKey: this.treeNodeChildrenKey,
      treeNodeIdKey: this.treeNodeIdKey,
      checkboxDisabledKey: this.checkboxDisabledKey,
      treeNodeTitleKey: this.treeNodeTitleKey
    });
  }

  public get treeFactory() {
    return this.operableTree.treeFactory;
  }

  public checkNode(checked, treeNode: TreeNode) {
    if (!treeNode.data.disabled) {
      treeNode.data.isChecked = !treeNode.data.isChecked;
      this.checkNodeById(treeNode.data.isChecked, treeNode.id);
    }
  }
}
