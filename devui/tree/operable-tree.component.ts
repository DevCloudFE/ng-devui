import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { expandCollapseForDomDestroy } from 'ng-devui/utils';
import { DevConfigService, WithConfig } from 'ng-devui/utils/globalConfig';
import { Subscription } from 'rxjs';
import { Dictionary, ITreeItem, ITreeNodeData, TreeNode } from './tree-factory.class';
import { TreeComponent } from './tree.component';
import { ICheckboxInput, IDropType } from './tree.types';
@Component({
  selector: 'd-operable-tree',
  templateUrl: './operable-tree.component.html',
  styleUrls: ['./operable-tree.component.scss'],
  exportAs: 'dOperableTreeComponent',
  preserveWhitespaces: false,
  animations: [expandCollapseForDomDestroy]
})
export class OperableTreeComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() tree: Array<ITreeItem>;
  @Input() treeNodeIdKey: string;
  @Input() treeNodeChildrenKey: string;
  @Input() checkboxDisabledKey: string;
  @Input() selectDisabledKey: string;
  @Input() toggleDisabledKey: string;
  @Input() iconParentOpen: string;
  @Input() iconParentClose: string;
  @Input() iconLeaf: string;
  @Input() showLoading: boolean;
  @Input() loadingTemplateRef: TemplateRef<any>;
  @Input() treeNodesRef: TemplateRef<any>;
  @Input() checkable = true;
  @Input() deletable = false;
  @Input() addable = false;
  @Input() editable = false;
  @Input() draggable = false;
  @Input() checkboxInput: ICheckboxInput = {};
  @Input() beforeAddNode: (node: TreeNode) => Promise<any>;
  @Input() disableMouseEvent: boolean;
  @Input() beforeDeleteNode: (node: TreeNode) => Promise<any>;
  @Input() beforeNodeDrop: (drageNodeId: string, dropNodeId: string, dropType: string) => Promise<any>;
  @Input() beforeEditNode: (node: TreeNode) => Promise<any>;
  @Input() canActivateNode = true;
  @Input() canActivateParentNode = true;
  @Input() treeNodeTitleKey = 'title';
  @Input() postAddNode: (node: TreeNode) => Promise<any>;
  @Input() iconTemplatePosition: string;
  @Input() virtualScroll = false;
  @Input() virtualScrollHeight = '800px';
  @Input() @WithConfig() showAnimation = true;
  @Input() itemSize = 30;
  @Input() minBufferPx = 600;
  @Input() maxBufferPx = 900;
  @Input() checkableRelation: 'upward' | 'downward' | 'both' | 'none' = 'both';
  @Output() nodeSelected = new EventEmitter<TreeNode>();
  @Output() nodeDblClicked = new EventEmitter<TreeNode>();
  @Output() nodeRightClicked = new EventEmitter<{ node: TreeNode, event: MouseEvent }>();
  @Output() nodeToggled = new EventEmitter<TreeNode>();
  @Output() afterTreeInit = new EventEmitter<Dictionary<TreeNode>>();
  @Output() nodeDeleted = new EventEmitter<TreeNode>();
  @Output() nodeChecked = new EventEmitter<any>();
  @Output() currentNodeChecked = new EventEmitter<{ id: string | number, data: ITreeNodeData }>();
  @Output() nodeEdited = new EventEmitter<TreeNode>();
  @Output() editValueChange = new EventEmitter<{ value: string, callback: Function }>();
  @Output() nodeOnDrop = new EventEmitter<{ event: DragEvent, treeNode: TreeNode, dropType: IDropType }>();
  @ViewChild('operableTree', { static: true }) operableTree: TreeComponent;
  @ViewChild('operableTreeContainer', { static: true }) operableTreeEle: ElementRef;
  @ViewChild('treeDropIndicator') treeDropIndicator: ElementRef;
  @ContentChild('iconTemplate') iconTemplate;
  @ContentChild('nodeTemplate') nodeTemplate;
  @ContentChild('operatorTemplate') operatorTemplate;
  @ContentChild('statusTemplate') statusTemplate;
  @Input() dropType: IDropType = {
    dropPrev: false,
    dropNext: false,
    dropInner: true
  };
  private addingNode = false;
  private mouseRightButton = 2;
  private treeNodeDragoverResponder = {
    node: null,
    timeout: null
  };
  @ViewChildren('treeNodeContent') treeNodeContent: QueryList<ElementRef>;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  dragState = {
    showIndicator: true,
    dropType: null,
    draggingNode: null,
    indicatorTop: 0,
    indicatorLeft: 0,
    indicatorWidth: 0
  };
  afterInitAnimate = true;
  constructor(private i18n: I18nService, private devConfigService: DevConfigService) {

  }
  ngOnInit(): void {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.afterInitAnimate = false;
    });
  }

  contextmenuEvent(event, node) {
    this.nodeRightClicked.emit({ node: node, event: event });
  }

  onDragstart(event, treeNode) {
    this.dragState.draggingNode = event.target;
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
      this.handlerDragState(event, treeNode);
    }

  }

  handlerDragState(event, treeNode) {
    const dropPrev = this.dropType.dropPrev;
    const dropNext = this.dropType.dropNext;
    const dropInner = this.dropType.dropInner;
    let dropType;
    const treePosition = this.operableTreeEle.nativeElement.getBoundingClientRect();
    const prevPercent = dropPrev ? (dropInner ? 0.25 : (dropNext ? 0.45 : 1)) : -1;
    const nextPercent = dropNext ? (dropInner ? 0.75 : (dropPrev ? 0.55 : 0)) : 1;
    const targetPosition = event.currentTarget.getBoundingClientRect();
    const treeNodePosition = event.currentTarget.querySelector('.devui-tree-node__title').getBoundingClientRect();
    const distance = event.clientY - targetPosition.top;

    if (distance < targetPosition.height * prevPercent) {
      dropType = 'prev';
    } else if (distance > targetPosition.height * nextPercent) {
      dropType = 'next';
    } else if (dropInner) {
      dropType = 'inner';
    } else {
      dropType = 'none';
    }

    if (dropType === 'prev') {
      this.dragState.indicatorTop = treeNodePosition.top - treePosition.top - 10;
    }
    if (dropType === 'next') {
      this.dragState.indicatorTop = treeNodePosition.bottom - treePosition.top + 10;
    }
    if (dropType === 'inner') {
      event.currentTarget.classList.add('devui-drop-inner');
    } else {
      event.currentTarget.classList.remove('devui-drop-inner');
    }
    this.dragState.indicatorLeft = treeNodePosition.left - treePosition.left;
    this.dragState.indicatorWidth = treePosition.width - this.dragState.indicatorLeft;
    this.dragState.dropType = dropType;
    this.dragState.showIndicator = dropType === 'prev' || dropType === 'next';
  }

  onDragleave(event, treeNode) {
    this.removeDraggingStyle(event.currentTarget);
    if (this.treeNodeDragoverResponder.node && this.treeNodeDragoverResponder.node.id === treeNode.id) {
      this.treeNodeDragoverResponder.node = null;
      clearTimeout(this.treeNodeDragoverResponder.timeout);
    }
  }

  removeDraggingStyle(target) {
    this.dragState.showIndicator = false;
    target.classList.remove('devui-drop-inner');
  }

  onDrop(event, dropNode) {
    this.removeDraggingStyle(event.currentTarget);
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
          const isParent = this.treeFactory.checkIsParent(dropNode.id, dragNodeId);
          if (dragNodeId === dropNode.id || isParent) {
            return;
          }
          let dragResult = Promise.resolve(true);
          if (this.beforeNodeDrop) {
            dragResult = this.beforeNodeDrop(dragNodeId, dropNode.id, this.dragState.dropType);
          }

          dragResult.then(() => {
            const movingNode = this.treeFactory.nodes[dragNodeId];
            const movingNodeIndex = this.treeFactory.getNodeIndex(movingNode);
            const dropNodeIndex = this.treeFactory.getNodeIndex(dropNode);
            const originalParentNode = movingNode.parentId ? this.treeFactory.nodes[movingNode.parentId] : this.treeFactory.treeRoot;

            switch (this.dragState.dropType) {
              case 'prev':
                this.handlerDropSort(movingNodeIndex, dropNodeIndex, movingNode, dropNode, originalParentNode, 'prev');
                break;
              case 'next':
                this.handlerDropSort(movingNodeIndex, dropNodeIndex, movingNode, dropNode, originalParentNode, 'next');
                break;
              case 'inner':
                this.handlerDropInner(movingNodeIndex, movingNode, dropNode, originalParentNode);
                break;
            }
            this.treeFactory.renderFlattenTree();
          });
        }
      } catch (e) {

      } finally {
        if (this.nodeOnDrop.observers.length > 0) {
          this.nodeOnDrop.emit({ event, treeNode: dropNode, dropType: this.dragState.dropType });
        }
      }
    }
  }

  handlerDropSort(oldIndex, newIndex, movingNode, dropNode, originalParentNode, type) {
    const dropIndex = type === 'next' ? newIndex + 1 : newIndex;
    movingNode.parentId = dropNode.parentId;
    let parentNode;
    if (dropNode.parentId === undefined) {
      parentNode = this.treeFactory.treeRoot;
      parentNode.splice(dropIndex, 0, movingNode);
    } else {
      parentNode = this.treeFactory.getNodeById(dropNode.parentId);
      parentNode.children.splice(dropIndex, 0, movingNode);
    }
    if (dropNode.parentId === originalParentNode.id && newIndex < oldIndex) {
      this.handlerOriginalParentNode(originalParentNode, oldIndex + 1);
    } else {
      this.handlerOriginalParentNode(originalParentNode, oldIndex);
    }

  }

  handlerOriginalParentNode(originalParentNode, oldIndex) {
    if (originalParentNode.id === undefined) {
      originalParentNode.splice(oldIndex, 1);
    } else {
      originalParentNode.data.children.splice(oldIndex, 1);
      if (!originalParentNode.data.children || !originalParentNode.data.children.length) {
        originalParentNode.data.isParent = false;
      }
    }
  }

  handlerDropInner(oldIndex, movingNode, dropNode, originalParentNode) {
    movingNode.parentId = dropNode.id;
    dropNode.data.isParent = true;
    this.treeFactory.openNodesById(dropNode.id);
    this.treeFactory.addChildNode(dropNode, movingNode);
    this.handlerOriginalParentNode(originalParentNode, oldIndex);
    this.nodeToggled.emit(dropNode);
  }

  selectNode(event, treeNode: TreeNode) {
    if (treeNode.data.disableSelect) {
      return;
    }
    if (!this.operableTree.isSelectableRegion(event.target)) {
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
    if (treeNode.data.disableToggle) {
      return;
    }
    this.treeFactory.toggleNodeById(treeNode.id);
    this.nodeToggled.emit(treeNode);
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
      if (!nodeInfo) {
        return;
      }
      const node = this.treeFactory.addNode({
        parentId: treeNode.id,
        title: nodeInfo['title'] ? nodeInfo['title'] : '新增节点',
        isParent: nodeInfo['isParent'],
        id: nodeInfo['id'] ? nodeInfo['id'] : undefined,
        data: nodeInfo.data
      }, nodeInfo.index, false);
      this.treeFactory.editNodeTitle(node.id);
      this.addingNode = true;
      treeNode.data.isParent = true;
      this.treeFactory.openNodesById(treeNode.id);
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
          treeNode.data.errTipsPosition = validateInfo.errTipsPosition || 'top';
        } else {
          if (treeNode.data.errTips) {
            delete treeNode.data.errTips;
            delete treeNode.data.errTipsPosition;
          }
        }
      }
    });
  }

  treeNodeHover(treeNode, type) {
    if (this.disableMouseEvent) {
      return;
    }
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
      selectDisabledKey: this.selectDisabledKey,
      toggleDisabledKey: this.toggleDisabledKey,
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

  initTreeFinishEvent($event) {
    this.afterTreeInit.emit($event);
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();

    }
  }
}
