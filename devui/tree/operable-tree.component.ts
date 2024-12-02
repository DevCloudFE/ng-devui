import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { DevConfigService, WithConfig, expandCollapseForDomDestroy } from 'ng-devui/utils';
import { difference } from 'lodash-es';
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
  animations: [expandCollapseForDomDestroy],
})
export class OperableTreeComponent implements OnInit, OnDestroy, AfterViewInit {
  static ID_SEED = 0;
  @Input() tree: Array<ITreeItem>;
  @Input() treeNodeIdKey: string;
  @Input() treeNodeChildrenKey: string;
  @Input() checkboxDisabledKey: string;
  @Input() selectDisabledKey: string;
  @Input() toggleDisabledKey: string;
  @Input() iconParentOpen: string;
  @Input() iconParentClose: string;
  @Input() iconLeaf: string;
  /**
   * @deprecated
   */
  @Input() showLoading: boolean;
  @Input() loadingTemplateRef: TemplateRef<any>;
  @Input() treeNodesRef: TemplateRef<any>;
  @Input() checkable = true;
  @Input() deletable = false;
  @Input() addable = false;
  @Input() editable = false;
  @Input() draggable = false;
  @Input() dropFromOutside = false;
  @Input() disableMouseEvent: boolean;
  @Input() checkboxInput: ICheckboxInput = {};
  @Input() beforeAddNode: (node: TreeNode) => Promise<any>;
  @Input() beforeDeleteNode: (node: TreeNode) => Promise<any>;
  @Input() beforeEditNode: (node: TreeNode) => Promise<any>;
  @Input() beforeSelectNode: (node: TreeNode) => Promise<any>;
  @Input() beforeNodeDrop: (dragNodeId: string, dropNodeId: string, dropType: string, dragNodeIds?: string[]) => Promise<any>;
  @Input() canActivateNode = true;
  @Input() canActivateParentNode = true;
  @Input() canActivateMultipleNode = false;
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
  @Input() indent = '16px';
  /**
   * @deprecated
   */
  @Input() canIdEmpty = true;
  @Input() operatorAlign: 'start' | 'end' = 'start';
  @Output() nodeSelected = new EventEmitter<TreeNode | TreeNode[]>();
  @Output() nodeDblClicked = new EventEmitter<TreeNode>();
  @Output() nodeRightClicked = new EventEmitter<{ node: TreeNode; event: MouseEvent }>();
  @Output() nodeToggled = new EventEmitter<TreeNode>();
  @Output() afterTreeInit = new EventEmitter<Dictionary<TreeNode>>();
  @Output() nodeDeleted = new EventEmitter<TreeNode>();
  @Output() nodeChecked = new EventEmitter<any>();
  @Output() currentNodeChecked = new EventEmitter<{ id: string | number; data: ITreeNodeData }>();
  @Output() nodeEdited = new EventEmitter<TreeNode>();
  @Output() editValueChange = new EventEmitter<{ value: string; callback: Function }>();
  @Output() nodeDragStart = new EventEmitter<{ event: DragEvent; treeNode: TreeNode; treeNodes?: TreeNode[] }>();
  @Output() nodeOnDrop = new EventEmitter<{ event: DragEvent; treeNode: TreeNode; dropType: IDropType; isFromOutside?: boolean }>();
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
    dropInner: true,
  };
  private addingNode = false;
  private mouseRightButton = 2;
  private treeNodeDragoverResponder = {
    node: null,
    timeout: null,
  };
  @ViewChildren('treeNodeContent') treeNodeContent: QueryList<ElementRef>;
  id: string;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  dragState = {
    showIndicator: true,
    dropType: null,
    draggingNode: null,
    indicatorTop: 0,
    indicatorLeft: 0,
    indicatorWidth: 0,
  };
  afterInitAnimate = true;
  document: Document;
  isOpenedOonDragOver = [];

  constructor(@Inject(DOCUMENT) private doc: any, private i18n: I18nService, private devConfigService: DevConfigService) {
    this.id = `d-operable-tree-${OperableTreeComponent.ID_SEED++}`;
    this.document = this.doc;
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

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  contextmenuEvent(event, node) {
    this.nodeRightClicked.emit({ node: node, event: event });
  }

  copyStyle(source, target) {
    ['id', 'class', 'style', 'draggable'].forEach((attr) => target.removeAttribute(attr));

    const computedStyle = getComputedStyle(source);
    for (let i = 0; i < computedStyle.length; i++) {
      const key = computedStyle[i];
      if (key.indexOf('transition') < 0) {
        target.style[key] = computedStyle[key];
      }
    }
    target.style.pointerEvents = 'none';

    for (let i = 0; i < source.children.length; i++) {
      this.copyStyle(source.children[i], target.children[i]);
    }
  }

  multipleDragStyle(event, nodes, target) {
    const num = nodes.length > 2 ? 2 : nodes.length - 1;
    const cloneNodes = new Array(num).fill(null);
    const container = this.document.createElement('div');
    const cloneNode = target.cloneNode(true);
    this.copyStyle(target, cloneNode);
    cloneNode.style.position = 'absolute';
    cloneNode.style.border = 'solid 1px var(--devui-connected-overlay-line, #526ecc)';
    cloneNodes.push(cloneNode);
    cloneNodes.forEach((node, index) => {
      const child = node || cloneNode.cloneNode(true);
      child.style.left = `${8 * (num - index)}px`;
      child.style.top = `${4 * index}px`;
      container.appendChild(child);
    });
    container.className = 'devui-tree-drag-ghost-container';
    // setDragImage 只能对viewport内的 dom 起作用
    this.document.body.appendChild(container);
    event.dataTransfer.setDragImage(container, -16, 0);
    setTimeout(() => container.remove());
  }

  onDragstart(event, treeNode) {
    this.isOpenedOonDragOver = [];
    this.dragState.draggingNode = event.target;
    const result = { event, treeNode };
    const data = {
      type: 'operable-tree-node',
      treeId: this.id,
      nodeId: treeNode.id,
      parentId: treeNode.parentId,
      nodeTitle: treeNode.data.title,
      isParent: treeNode.data.isParent,
      isChecked: treeNode.data.isChecked,
      halfChecked: treeNode.data.halfChecked,
    };
    if (this.canActivateMultipleNode) {
      const activatedNodes = this.treeFactory.getActivatedNodes();
      // 存在无激活项，直接拖拽单个节点情况
      const availableNodes = activatedNodes.length ? activatedNodes : [treeNode];
      (data as any).multipleData = availableNodes;
      (result as any).treeNodes = availableNodes;
      // 拖拽启用层叠样式，随拖拽个数变化
      this.multipleDragStyle(event, availableNodes, event.target);
    }
    event.dataTransfer.setData('Text', JSON.stringify(data));
    this.nodeDragStart.emit(result);
  }

  onDragover(event, droppable, treeNode) {
    if (droppable) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      if (
        this.dropType.dropInner &&
        (!this.treeNodeDragoverResponder.node ||
          (this.treeNodeDragoverResponder.node && this.treeNodeDragoverResponder.node.id !== treeNode.id))
      ) {
        clearTimeout(this.treeNodeDragoverResponder.timeout);
        this.treeNodeDragoverResponder.node = treeNode;
        this.treeNodeDragoverResponder.timeout = setTimeout(() => {
          if (treeNode.data.isParent && !treeNode.data.isOpen) {
            this.isOpenedOonDragOver.push(treeNode.id);
            this.treeFactory.openNodesById(treeNode.id);
            this.nodeToggled.emit(treeNode);
          }
        }, 1000);
      }
      this.handlerDragState(event, treeNode);
    }
  }

  handlerDragState(event, treeNode) {
    let dropType;
    const dropPrev = this.dropType.dropPrev;
    const dropNext = this.dropType.dropNext;
    const dropInner = this.dropType.dropInner;
    const treePosition = this.operableTreeEle.nativeElement.getBoundingClientRect();
    const nextRes = dropNext ? 0.45 : 1;
    const innerNextRes = dropInner ? 0.25 : nextRes;
    const prevPercent = dropPrev ? innerNextRes : -1;
    const prevRes = dropPrev ? 0.55 : 0;
    const innerPrevRes = dropInner ? 0.75 : prevRes;
    const nextPercent = dropNext ? innerPrevRes : 1;
    const targetPosition = event.currentTarget.getBoundingClientRect();
    const dom =
      event.currentTarget.querySelector('.devui-tree-drag-handle') || event.currentTarget.querySelector('.devui-tree-node__title');
    const treeNodePosition = dom.getBoundingClientRect();
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
    if (!this.draggable && !this.dropFromOutside) {
      return;
    }
    event.preventDefault();
    const transferDataStr = event.dataTransfer.getData('Text');
    if (transferDataStr) {
      try {
        const transferData = JSON.parse(transferDataStr);
        if (typeof transferData === 'object' && transferData.type === 'operable-tree-node' && transferData.treeId === this.id) {
          let dragResult = Promise.resolve(true);
          const dragNodeId = transferData.nodeId;
          const dragNodeIds: string[] = [];
          const dropNodeId = dropNode.id;
          // 使用对象存储选择状态，因为节点id为数字，避免产生长索引数组影响性能
          const dragNodesCheckStatus = {};
          const multipleData = transferData.multipleData;
          if (this.canActivateMultipleNode && multipleData?.length > 1) {
            // 多选时遍历所有被激活的节点确认是否为目标节点或其父节点并储存可用节点的选择状态
            // 反序遍历用于先处理子节点以更新父子同时拖拽的状态
            multipleData.reverse().forEach((node) => this.reverseSelection(node, dropNodeId, dragNodeIds, dragNodesCheckStatus));
          } else {
            const isParent = this.treeFactory.checkIsParent(dropNodeId, dragNodeId);
            if (dragNodeId === dropNodeId || isParent) {
              return;
            }
            this.treeFactory.checkNodesById(dragNodeId, false, 'upward');
            dragNodesCheckStatus[dragNodeId] = { checked: transferData.isChecked, halfChecked: transferData.halfChecked };
          }
          if (this.beforeNodeDrop) {
            dragResult = this.beforeNodeDrop(dragNodeId, dropNodeId, this.dragState.dropType, dragNodeIds);
          }
          dragResult
            .then(() => {
              this.setSelection(dropNode, dragNodeId, dragNodeIds, dragNodesCheckStatus);
              if (this.nodeOnDrop.observers.length > 0) {
                if (this.isOpenedOonDragOver.length) {
                  const ids = this.treeFactory.getLineage(dropNode);
                  this.isOpenedOonDragOver = difference(this.isOpenedOonDragOver, ids);
                }
                this.nodeOnDrop.emit({ event, treeNode: dropNode, dropType: this.dragState.dropType });
              }
            });
        } else {
          this.dropFormOutside(event, dropNode);
        }
      } catch (e) {
        this.dropFormOutside(event, dropNode);
      }
    }
  }

  dropFormOutside(event, dropNode) {
    if (this.dropFromOutside && this.nodeOnDrop.observers.length > 0) {
      this.nodeOnDrop.emit({ event, treeNode: dropNode, dropType: this.dragState.dropType, isFromOutside: true });
    }
  }

  @HostListener('dragend', [])
  onDragend() {
    this.isOpenedOonDragOver.forEach((id) => this.treeFactory.closeNodesById(id));
    this.isOpenedOonDragOver = [];
  }

  reverseSelection(node, dropNodeId, dragNodeIds, dragNodesCheckStatus) {
    const id = node.id;
    const isParent = this.treeFactory.checkIsParent(dropNodeId, id);
    if (!isParent && id !== dropNodeId) {
      this.treeFactory.checkNodesById(id, false, 'upward');
      // 获取更新后的node状态，不使用node旧数据避免父子同时拖拽状态被覆盖
      const currentNode = this.treeFactory.getNodeById(id);
      // 半选不保留，取最新状态，选中则保留原有状态
      const checkedStatus = node.data.halfChecked ? currentNode.isChecked : node.data.isChecked;
      dragNodesCheckStatus[id] = { checked: checkedStatus, halfChecked: currentNode.halfChecked };
      dragNodeIds.push(id);
    }
  }

  setSelection(dropNode, dragNodeId, dragNodeIds, dragNodesCheckStatus) {
    let finalDragNodeIds = [dragNodeId];
    if (this.canActivateMultipleNode && dragNodeIds?.length > 1) {
      dragNodeIds.reverse().forEach((id) => this.handleDropNode(id, dropNode));
      finalDragNodeIds = dragNodeIds;
    } else {
      this.handleDropNode(dragNodeId, dropNode);
    }
    this.treeFactory.renderFlattenTree();
    // 移动结束后向上整理选择状态，恢复半选状态
    finalDragNodeIds.forEach((id) => {
      const node = this.treeFactory.getCompleteNodeById(id);
      node.data.isChecked = dragNodesCheckStatus[id].checked;
      node.data.halfChecked = dragNodesCheckStatus[id].halfChecked;
      this.treeFactory.checkParentNodes(node);
    });
  }

  handleDropNode(dragNodeId, dropNode) {
    const movingNode = this.treeFactory.nodes[dragNodeId];
    const movingNodeIndex = this.treeFactory.getNodeIndex(movingNode);
    const dropNodeIndex = this.treeFactory.getNodeIndex(dropNode);
    const hasParentId = this.canIdEmpty ? movingNode.parentId : movingNode.parentId !== undefined;
    const originalParentNode = hasParentId ? this.treeFactory.nodes[movingNode.parentId] : this.treeFactory.treeRoot;

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
    default:
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
    let selectResult = Promise.resolve(true);
    if (this.beforeSelectNode) {
      selectResult = this.beforeSelectNode(treeNode);
    }
    selectResult.then((canSelect) => {
      if (!canSelect) {
        return;
      }
      if (!this.canActivateNode) {
        this.checkNode(event, treeNode);
        return;
      }
      if (this.canActivateParentNode || (!this.canActivateParentNode && !treeNode.data.isParent)) {
        const isMultiple = this.canActivateMultipleNode && (event.ctrlKey || event.shiftKey);
        this.treeFactory.activeNodeById(treeNode.id, isMultiple);
        if (isMultiple) {
          this.nodeSelected.emit(this.treeFactory.getActivatedNodes());
          return;
        }
      } else {
        this.toggleNode(event, treeNode);
        return;
      }
      this.nodeSelected.emit(treeNode);
    });
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

    delResult.then((canDelete) => {
      if (!canDelete) {
        return;
      }
      this.treeFactory.deleteNodeById(treeNode.id);
      this.nodeDeleted.emit(treeNode);
    });
  }

  deleteNodesProxy = (event, treeNode: TreeNode) => {
    this.deleteNodes(event, treeNode);
  };

  addChildNode(event, treeNode: TreeNode, newNode?) {
    let addResult = Promise.resolve(newNode ? newNode : true);
    if (this.beforeAddNode) {
      addResult = this.beforeAddNode(treeNode);
    }

    addResult.then((nodeInfo) => {
      if (!nodeInfo) {
        return;
      }
      const node = this.treeFactory.addNode(
        {
          parentId: treeNode.id,
          title: nodeInfo.title ? nodeInfo.title : '新增节点',
          isParent: nodeInfo.isParent,
          id: nodeInfo.id ? nodeInfo.id : undefined,
          data: nodeInfo.data,
        },
        nodeInfo.index,
        false
      );
      this.treeFactory.editNodeTitle(node.id);
      this.addingNode = true;
      treeNode.data.isParent = true;
      this.treeFactory.openNodesById(treeNode.id);
      return treeNode;
    });
  }

  addChildNodeProxy = (event, treeNode: TreeNode, newNode?) => {
    this.addChildNode(event, treeNode, newNode);
  };

  editNode(event, treeNode: TreeNode) {
    let editResult = Promise.resolve(true);
    if (this.beforeEditNode) {
      editResult = this.beforeEditNode(treeNode);
    }
    editResult.then((canEdit) => {
      if (!canEdit) {
        return;
      }
      this.treeFactory.editNodeTitle(treeNode.id);
    });
  }

  editNodeProxy = (event, treeNode: TreeNode) => {
    this.editNode(event, treeNode);
  };

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

  onInputChange(event, treeNode) {
    const targe = event.target as HTMLInputElement;
    this.editValueChange.emit({
      value: targe.value,
      callback: (validateInfo) => {
        if (validateInfo && validateInfo.errTips) {
          treeNode.data.errTips = validateInfo.errTips;
          treeNode.data.errTipsPosition = validateInfo.errTipsPosition || 'top';
        } else {
          if (treeNode.data.errTips) {
            delete treeNode.data.errTips;
            delete treeNode.data.errTipsPosition;
          }
        }
      },
    });
  }

  treeNodeHover(treeNode, type) {
    if (this.disableMouseEvent || treeNode.data.disableMouseEvent) {
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
    return this.operableTree ? Object.keys(this.treeFactory.nodes).map((k) => this.treeFactory.nodes[k]) : [];
  }

  private postEditNode(treeNode) {
    if (this.addingNode === true) {
      this.addingNode = false;
      if (typeof this.postAddNode === 'function') {
        const originalId = treeNode.id;
        return this.postAddNode(treeNode)
          .then((nodeInfo) => {
            // Swap id if id was modified by outer system
            treeNode.id = nodeInfo.id ? nodeInfo.id : originalId;
            delete this.treeFactory.nodes[originalId];
            if (Object.prototype.hasOwnProperty.call(nodeInfo, 'data') && nodeInfo.data) {
              if (Object.prototype.hasOwnProperty.call(treeNode, 'data') && Object.prototype.hasOwnProperty.call(treeNode.data, 'data')) {
                treeNode.data.data = { ...treeNode.data.data, ...nodeInfo.data };
              } else {
                treeNode.data = Object.assign(treeNode.data, { data: nodeInfo.data });
              }
            }
            this.treeFactory.nodes[treeNode.id] = treeNode;
            return treeNode;
          })
          .catch((e, reaction = 'cancel') => {
            switch (reaction) {
            case 'justify': {
              const parentNode = this.treeFactory.nodes[treeNode.parentId];
              const title = treeNode.data.title;
              this.treeFactory.deleteNodeById(treeNode.id);
              this.addChildNode(null, parentNode, { title: title });
              break;
            }
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
      treeNodeTitleKey: this.treeNodeTitleKey,
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

  eventTriggerBlur(event) {
    (event.target as HTMLElement).blur();
  }
}
