import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ContentChild,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList,
  OnDestroy
} from '@angular/core';
import {
  ITreeItem,
  TreeNode
} from './tree-factory.class';
import { TreeComponent } from './tree.component';
import { ICheckboxInput } from './tree.types';
import { TreeMaskService } from './tree-mask.service';
import { I18nService, I18nInterface } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-operable-tree',
  templateUrl: './operable-tree.component.html',
  styleUrls: ['./operable-tree.component.scss'],
  exportAs: 'dOperableTreeComponent',
})
export class OperableTreeComponent implements AfterViewInit, OnDestroy {
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
  @Input() beforeEditNode: (node: TreeNode) => Promise<any>;
  @Input() canActivateNode = true;
  @Input() canActivateParentNode = true;
  @Input() treeNodeTitleKey = 'title';
  @Input() postAddNode: (node: TreeNode) => Promise<any>;
  @Input() iconTemplatePosition: string;
  @Input() checkableRelation: 'upward' | 'downward' | 'both' | 'none' = 'both';
  @Output() nodeSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeDblClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeRightClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeToggled: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeChecked: EventEmitter<any> = new EventEmitter<any>();
  @Output() currentNodeChecked: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeEdited: EventEmitter<any> = new EventEmitter<any>();
  @Output() editValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeOnDrop: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('operableTree', { static: true }) operableTree: TreeComponent;
  @ContentChild('iconTemplate') iconTemplate;
  @ContentChild('nodeTemplate') nodeTemplate;
  @ContentChild('operatorTemplate') operatorTemplate;
  @ContentChild('statusTemplate') statusTemplate;
  private addingNode = false;
  private mouseRightButton = 2;
  private treeNodeDragoverResponder = {
    node: null,
    timeout: null
  };
  @ViewChildren('treeNodeContent') treeNodeContent: QueryList<ElementRef>;
  elementAsMask: any;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  constructor(private i18n: I18nService) {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  ngAfterViewInit() {
    this.elementAsMask = TreeMaskService.creatMaskElement();

  }

  contextmenuEvent(event, node) {
    if (event.button === this.mouseRightButton) {
      event.preventDefault();
      this.nodeRightClicked.emit({ node: node, event: event });
    }
  }

  addBackGround(e) {
    e.stopPropagation();
    TreeMaskService.addMask(e.target.parentNode, this.elementAsMask, TreeMaskService.calcWidth(e.target.parentNode));
  }

  removeBackGround(e) {
    e.stopPropagation();
    TreeMaskService.removeMask(e.target.parentNode, this.elementAsMask);
  }

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

  onDragover(event, droppable, treeNode) {
    if (droppable) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      if (!this.treeNodeDragoverResponder.node ||
        (this.treeNodeDragoverResponder.node && this.treeNodeDragoverResponder.node.id !== treeNode.id)) {
        clearTimeout(this.treeNodeDragoverResponder.timeout);
        this.treeNodeDragoverResponder.node = treeNode;
        this.treeNodeDragoverResponder.timeout = setTimeout(() => {
          this.treeFactory.openNodesById(treeNode.id);
          this.nodeToggled.emit(treeNode);
        }, 1000);
      }
    }
  }

  onDragleave(event, treeNode) {
    if (this.treeNodeDragoverResponder.node && this.treeNodeDragoverResponder.node.id === treeNode.id) {
      this.treeNodeDragoverResponder.node = null;
      clearTimeout(this.treeNodeDragoverResponder.timeout);
    }
  }


  onDrop(event, newParentNode) {
    if (!this.draggable) {
      return;
    }
    event.preventDefault();
    const transferDataStr = event.dataTransfer.getData('Text');
    if (transferDataStr) {
      try {
        const transferData = JSON.parse(transferDataStr);
        if (typeof (transferData) === 'object' && transferData.type === 'operable-tree-node') {
          const dragNodeId = transferData['nodeId'];
          const dragNodeParentId = transferData['parentId'];
          if (dragNodeId === newParentNode.id || dragNodeId === newParentNode.parentId
            || dragNodeParentId === newParentNode.id || dragNodeParentId === undefined) {
            return;
          }
          let dragResult = Promise.resolve(true);
          if (this.beforeNodeDrop) {
            dragResult = this.beforeNodeDrop(dragNodeId, newParentNode.id);
          }

          dragResult.then(() => {
            const movingNode = this.treeFactory.nodes[dragNodeId];
            const originalParentNode = this.treeFactory.nodes[movingNode.parentId];
            movingNode.parentId = newParentNode.id;
            this.treeFactory.addChildNode(newParentNode, movingNode);
            originalParentNode.data.children = originalParentNode.data.children.filter(node => node.id !== dragNodeId);
            if (!originalParentNode.data.children || !originalParentNode.data.children.length) {
              originalParentNode.data.isParent = false;
            }
            this.nodeToggled.emit(newParentNode);
            this.treeFactory.openNodesById(newParentNode.id);
            newParentNode.data.isParent = true;
          });
        }
      } catch (e) {

      } finally {
        if (this.nodeOnDrop.observers.length > 0) {
          this.nodeOnDrop.emit({ event, treeNode: newParentNode });
        }
      }
    }
  }

  selectNode(event, treeNode: TreeNode) {
    if (treeNode.data.disabled) {
      return;
    }
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
    let editResult = Promise.resolve(true);
    if (this.beforeEditNode) {
      editResult = this.beforeEditNode(treeNode);
    }
    editResult.then(() => {
      this.treeFactory.editNodeTitle(treeNode.id);
    });
  }

  editNodeProxy = (event, treeNode: TreeNode) => {
    this.editNode(event, treeNode);
  }


  public checkNodeById(checked: boolean, id: number | string) {
    const results = this.treeFactory.checkNodesById(id, checked, this.checkableRelation);
    this.nodeChecked.emit(results);
    this.currentNodeChecked.emit({ id: id, data: this.treeFactory.getNodeById(id) });
  }

  onBlurEdit(treeNode) {
    if (!treeNode.data.errTips) {
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
          if (treeNode.data.errTips) {
            delete treeNode.data.errTips;
          }
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
          if (nodeInfo.hasOwnProperty('data') && nodeInfo.data) {
            if (treeNode.hasOwnProperty('data') && treeNode.data.hasOwnProperty('data')) {
              treeNode.data.data = Object.assign({}, treeNode.data.data, nodeInfo.data);
            } else {
              treeNode.data = Object.assign(treeNode.data, { data: nodeInfo.data });
            }
          }
          this.treeFactory.nodes[treeNode.id] = treeNode;
          return treeNode;
        }).catch((e, reaction = 'cancel') => {
          switch (reaction) {
            case 'justify':
              const parentNode = this.treeFactory.nodes[treeNode.parentId];
              const title = treeNode.data.title;
              this.treeFactory.deleteNodeById(treeNode.id);
              this.addChildNode(null, parentNode, { title: title });
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
  public nodeDblClick(event, node) {
    this.nodeDblClicked.emit(node);
  }
  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();

    }
  }
}
