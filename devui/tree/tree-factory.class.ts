import { forEach, isUndefined, omitBy, pickBy, reduce, trim, values } from 'lodash-es';
import { BehaviorSubject } from 'rxjs';
export interface Dictionary<T> {
  [id: number]: T;
}
export interface ITreeNodeData {
  id?: number | string;
  parentId?: number | string;
  title?: string;
  isOpen?: boolean;
  data?: any;
  isParent?: boolean;
  loading?: boolean;
  isMatch?: boolean;
  isHide?: boolean;
  isActive?: boolean;
  isChecked?: boolean;
  disabled?: boolean;

  [prop: string]: any;

  children?: [];
}

export interface ITreeMap {
  [index: number]: ITreeNodeData;
}

export interface ITreeItem {
  title?: string;
  open?: boolean;
  loading?: boolean;
  isMatch?: boolean;
  items?: ITreeItem[];
  isParent?: boolean;
  data?: any;
  id?: number | string;
  isHide?: boolean;
  isActive?: boolean;
  isChecked?: boolean;
  halfChecked?: boolean;
  disabled?: boolean;
  showCheckbox?: boolean;
  [prop: string]: any;

  disableAdd?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  disableSelect?: boolean;
  disableToggle?: boolean;
}

export interface ITreeInput {
  treeItems: Array<ITreeItem>;
  parentId?: number | string;
  treeNodeChildrenKey?: string;
  treeNodeIdKey?: string;
  checkboxDisabledKey?: string;
  selectDisabledKey?: string;
  toggleDisabledKey?: string;
  treeNodeTitleKey?: string;
  isVirtualScroll?: boolean;
}

export class TreeNode implements ITreeNodeData {
  constructor(public id, public parentId, public data) {}
}

export class TreeFactory {
  nodes: Dictionary<TreeNode>;
  private idx: number;
  private _checked = new Set<Object>();
  private _treeRoot: TreeNode[] = [];
  searchItem: string;
  flattenNodes = new BehaviorSubject<TreeNode[]>([]);
  virtualScroll: boolean;
  canIdEmpty = true;
  static create(isVirtualScroll) {
    return new TreeFactory(isVirtualScroll);
  }

  // tree model with items
  static fromTree({
    treeItems,
    isVirtualScroll = false,
    treeNodeChildrenKey = 'items',
    treeNodeIdKey = 'id',
    checkboxDisabledKey = 'disabled',
    selectDisabledKey = 'disabled', // 默认值与checkboxDisabledKey相同，为了兼容以前tree的disable情况
    toggleDisabledKey = 'disabledToggle',
    treeNodeTitleKey = 'title',
  }: ITreeInput): TreeFactory {
    const treeFactory = TreeFactory.create(isVirtualScroll);
    treeFactory.mapTreeItems(
      {
        treeItems,
        parentId: undefined,
        treeNodeChildrenKey,
        treeNodeIdKey,
        checkboxDisabledKey,
        selectDisabledKey,
        toggleDisabledKey,
        treeNodeTitleKey,
      },
      false
    );
    return treeFactory;
  }

  constructor(public isVirtualScroll) {
    this.virtualScroll = isVirtualScroll;
    this.idx = 0;
    this.nodes = {};
  }

  mapTreeItems = (
    {
      treeItems,
      parentId,
      treeNodeChildrenKey = 'items',
      treeNodeIdKey = 'id',
      checkboxDisabledKey = 'disabled',
      selectDisabledKey = 'disableSelect',
      toggleDisabledKey = 'disableToggle',
      treeNodeTitleKey = 'title',
    }: ITreeInput,
    renderTree = true
  ) => {
    forEach(treeItems, (item: ITreeItem) => {
      const node = this.addNode(
        {
          id: item[treeNodeIdKey],
          parentId,
          title: item[treeNodeTitleKey],
          isOpen: !!item.open,
          data: item.data || {},
          originItem: item,
          isParent: !!item.isParent || !!(item[treeNodeChildrenKey] && item[treeNodeChildrenKey].length > 0),
          loading: !!item.loading,
          isMatch: !!item.isMatch,
          isHide: !!item.isHide,
          isChecked: !!item.isChecked,
          halfChecked: !!item.halfChecked,
          isActive: !!item.isActive,
          disabled: !!item[checkboxDisabledKey],
          disableSelect: !!item[selectDisabledKey],
          disableToggle: !!item[toggleDisabledKey],
          disableAdd: !!item.disableAdd,
          disableEdit: !!item.disableEdit,
          disableDelete: !!item.disableDelete,
          children: [],
          showCheckbox: item.showCheckbox,
        },
        undefined,
        renderTree
      );

      if (item.isChecked) {
        this._checked.add(node);
      }

      this.mapTreeItems(
        {
          treeItems: item[treeNodeChildrenKey] || [],
          parentId: node.id,
          treeNodeChildrenKey,
          treeNodeIdKey,
          checkboxDisabledKey,
          selectDisabledKey,
          toggleDisabledKey,
          treeNodeTitleKey,
        },
        renderTree
      );
    });
    return this;
  };

  addNode({ id, parentId, ...data }: ITreeNodeData, index?, renderTree = true): TreeNode {
    let newId = id;
    if (isUndefined(id)) {
      this.idx++;
      newId = this.idx;
    }
    const treeNode = new TreeNode(newId, parentId, data);
    if (Object.prototype.hasOwnProperty.call(this.nodes, treeNode.id)) {
      throw new Error(`Duplicated id: ${treeNode.id} detected, please specify unique ids in the tree.`);
    }
    this.nodes[treeNode.id] = treeNode;
    this.addChildNode(this.nodes[parentId], treeNode, index);
    // 兼容当前用户外部直接调用addNode方法创建节点
    if (renderTree) {
      this.renderFlattenTree();
    }
    return treeNode;
  }

  editNodeTitle(id: number | string) {
    if (!this.nodes[id]) {
      return;
    }
    this.nodes[id].data.editable = true;
  }

  deleteNodeById(id: number | string, renderTree = true) {
    const node = this.nodes[id];
    if (!node) {
      return;
    }
    const parentNode = this.nodes[node.parentId];
    this.removeChildNode(parentNode, node);

    const deleteItems = (nodeId) => {
      this.maintainCheckedNodeList(this.nodes[nodeId], false);
      const children = this.getChildrenById(nodeId);
      this.nodes = omitBy(this.nodes, (_node) => {
        return _node.id === nodeId;
      }) as Dictionary<TreeNode>;
      forEach(children, (child) => {
        deleteItems(child.id);
      });
    };
    deleteItems(id);
    if (parentNode && (!parentNode.data.children || !parentNode.data.children.length)) {
      parentNode.data.isParent = false;
    }
    if (renderTree) {
      this.renderFlattenTree();
    }
    return this;
  }

  toggleNodeById(id: number | string) {
    if (!this.nodes[id]) {
      return;
    }
    this.nodes[id].data.isOpen = !this.nodes[id].data.isOpen;
    this.renderFlattenTree();
    return this;
  }

  openNodesById(id: number | string) {
    if (!this.nodes[id]) {
      return;
    }
    this.nodes[id].data.isOpen = true;
    if (this.nodes[id].parentId !== undefined) {
      this.openNodesById(this.nodes[id].parentId);
    }
    this.renderFlattenTree();
    return this;
  }

  closeNodesById(id: number | string, closeChildren = false) {
    if (!this.nodes[id]) {
      return;
    }
    this.nodes[id].data.isOpen = false;
    if (closeChildren) {
      if (this.nodes[id] && this.nodes[id].data.children) {
        this.nodes[id].data.children.forEach((node) => {
          this.closeNodesById(node.id);
        });
      }
    }
    this.renderFlattenTree();
    return this;
  }

  disabledNodesById(id: number | string) {
    if (!this.nodes[id]) {
      return;
    }
    this.nodes[id].data.disabled = true;

    const parentId = this.nodes[id].parentId;
    this._disabledParentNodes(parentId);

    const disabledNodes = (nodeId: number | string) => {
      const children = this.getChildrenById(nodeId);
      if (children.length > 0) {
        children.forEach((child) => {
          this.nodes[child.id].data.disabled = true;
          disabledNodes(child.id);
        });
      }
    };
    disabledNodes(id);
    return this;
  }

  private _disabledParentNodes(parentId: number | string | undefined) {
    const children = this.getChildrenById(parentId);

    if (children.length < 1) {
      return;
    }
    const result = reduce(
      children,
      (status: boolean, child) => {
        return status && child.data.disabled;
      },
      true
    );

    if (this.nodes[parentId]) {
      this.nodes[parentId].data.disabled = result;
    }
  }

  checkNodesById(
    id: number | string,
    checked: boolean,
    checkableRelation: 'upward' | 'downward' | 'both' | 'none' = 'both'
  ): Array<Object> {
    if (!this.nodes[id]) {
      return;
    }
    this.nodes[id].data.halfChecked = false;
    this.nodes[id].data.isChecked = checked;
    switch (checkableRelation) {
    case 'upward':
      this.checkParentNodes(this.nodes[id]);
      break;
    case 'downward':
      this.checkChildNodes(this.nodes[id], checked, this.nodes[id].data.isHide);
      break;
    case 'both':
      this.checkParentNodes(this.nodes[id]);
      this.checkChildNodes(this.nodes[id], checked, this.nodes[id].data.isHide);
      break;
    case 'none':
      break;
    default:
    }
    this.maintainCheckedNodeList(this.nodes[id], checked);
    return this.getCheckedNodes();
  }

  checkParentNodes(node: TreeNode) {
    const { parentId } = node;
    const parentNode = this.nodes[parentId];
    if (parentNode) {
      const childrenNode = this.getChildrenById(parentId);
      if (childrenNode.every((childNode) => childNode.data.isChecked && !childNode.data.halfChecked)) {
        parentNode.data.isChecked = true;
        parentNode.data.halfChecked = false;
      } else if (childrenNode.some((childNode) => childNode.data.halfChecked || childNode.data.isChecked)) {
        parentNode.data.isChecked = true;
        parentNode.data.halfChecked = true;
      } else {
        parentNode.data.isChecked = false;
        parentNode.data.halfChecked = false;
      }
      this.maintainCheckedNodeList(parentNode, parentNode.data.isChecked);
      this.checkParentNodes(parentNode);
    }
  }

  private checkChildNodes(node: TreeNode, checked: boolean, hasHiddenAncestor = undefined) {
    const { id } = node;
    const childrenNode = this.getChildrenById(id);
    if (childrenNode.length > 0) {
      childrenNode.forEach((childNode) => {
        const { id: childId } = childNode;
        const { data: nodeData } = this.nodes[childId];
        if (!nodeData.disabled) {
          nodeData.isChecked = checked;
          nodeData.halfChecked = false;
          nodeData.hasHiddenAncestor = hasHiddenAncestor;
          this.maintainCheckedNodeList(childNode, checked);
        }
        this.checkChildNodes(childNode, checked, nodeData.isHide);
      });
      const childrenFullCheckedCount = childrenNode.filter(({ data: nodeData }) => nodeData.isChecked).length;
      const childrenCheckedCount = childrenNode.filter(({ data: nodeData }) => nodeData.isChecked || nodeData.halfChecked).length;
      node.data.halfChecked = childrenCheckedCount > 0 && childrenNode.length > childrenFullCheckedCount;
    }
  }

  getLineage(node: TreeNode): Array<string> {
    const { parentId } = node;
    if (parentId) {
      const parentNode = this.nodes[parentId];
      return [node.id, ...this.getLineage(parentNode)];
    } else {
      return [node.id];
    }
  }

  getCheckedNodes(): Array<any> {
    return Array.from(this._checked);
  }

  getCheckedNodesWithoutHide(hideInVirtualScroll = false): Array<any> {
    return Array.from(this._checked).filter(
      (item: any) => !((hideInVirtualScroll ? item.data.hideInVirtualScroll : item.data.isHide) || item.data.hasHiddenAncestor)
    );
  }

  getActivatedNodes(): Array<any> {
    const results = pickBy(this.nodes, (node) => node.data.isActive === true);
    return values(results);
  }

  getDisabledNodes(): Array<any> {
    const results = pickBy(this.nodes, (node) => node.data.disabled === true);
    return values(results);
  }

  activeNodeById(id: number | string, isMultiple?: boolean) {
    if (!this.nodes[id]) {
      return;
    }
    if (!isMultiple) {
      this.deactivateAllNodes();
    }
    this.nodes[id].data.isActive = !this.nodes[id].data.isActive;
  }

  getChildrenById(id: number | string): Array<TreeNode> {
    if (this.nodes[id]) {
      return this.nodes[id].data.children || [];
    } else if (id === undefined) {
      return this._treeRoot;
    }

    return [];
  }

  startLoading(id: number | string) {
    if (!this.nodes[id]) {
      return;
    }
    this.nodes[id].data.loading = true;
  }

  endLoading(id: number | string) {
    if (!this.nodes[id]) {
      return;
    }
    this.nodes[id].data.loading = false;
  }

  getNodeById(id: number | string): any {
    if (!this.nodes[id]) {
      return;
    }
    return this.nodes[id].data;
  }

  getCompleteNodeById(id: number | string): any {
    return this.nodes[id];
  }

  hideNodeById(id: number | string, hide: boolean) {
    if (!this.nodes[id]) {
      return;
    }
    this.nodes[id].data.isHide = hide;
    this.renderFlattenTree();
    return this;
  }

  private maintainCheckedNodeList(node: TreeNode, checked: boolean) {
    if (checked && !node.data.halfChecked) {
      this._checked.add(node);
    } else {
      this._checked.delete(node);
    }
  }

  private dfs(target, tree, hideUnmatched?: boolean, keyword?, pattern?) {
    if (!tree) {
      return false;
    }
    if (!target) {
      return false;
    }
    if (Array.isArray(tree)) {
      return tree.map((treeNode) => {
        return this.dfs(target, treeNode, hideUnmatched, keyword, pattern);
      });
    } else {
      const treeNode = tree;
      const treeChildren = this.getChildrenById(treeNode.id);
      const key = keyword ? treeNode.data.originItem[keyword] : treeNode.data.title;
      const selfMatched = pattern ? pattern.test(key) : key.toLowerCase().includes(target);
      if (selfMatched) {
        treeNode.data.isMatch = true;
        treeNode.data.isCustomSearch = keyword;
      }
      // Test if children matches target recursively, do not hide children if parent is matched.
      const childrenMatched = this.dfs(target, treeChildren, hideUnmatched && !selfMatched, keyword, pattern).some((_) => !!_);
      if (selfMatched || childrenMatched) {
        if (childrenMatched && treeChildren.length > 0) {
          this.openNodesById(treeNode.id);
        }
        return true;
      } else {
        treeNode.data.isHide = hideUnmatched;
        return false;
      }
    }
  }

  public addChildNode(parentNode: TreeNode, childNode: TreeNode, index?) {
    if (parentNode) {
      if (Array.isArray(parentNode.data.children)) {
        if (index !== undefined) {
          parentNode.data.children.splice(index, 0, childNode);
        } else {
          parentNode.data.children.push(childNode);
        }
      } else {
        parentNode.data.children = [childNode];
      }
    } else {
      index !== undefined ? this._treeRoot.splice(index, 0, childNode) : this._treeRoot.push(childNode);
    }
    this.nodes[childNode.id] = childNode;
  }

  private removeChildNode(parentNode: TreeNode, childNode: TreeNode) {
    if (parentNode) {
      parentNode.data.children = parentNode.data.children.filter((node) => node.id !== childNode.id);
    } else {
      this._treeRoot = this._treeRoot.filter((node) => node.id !== childNode.id);
    }
  }

  resetSearchResults() {
    Object.keys(this.nodes).forEach((key) => {
      const treeNode = this.nodes[key];
      treeNode.data.isMatch = false;
      treeNode.data.isHide = false;
      treeNode.data.isCustomSearch = false;
    });
  }

  public searchTree(target: string, hideUnmatched = false, keyword?, pattern?) {
    this.searchItem = target;
    const TrimmedTarget = trim(target);
    this.resetSearchResults();
    return this.dfs(TrimmedTarget.toLowerCase(), this._treeRoot, hideUnmatched, keyword, pattern);
  }

  get treeRoot() {
    return this._treeRoot;
  }

  public deactivateAllNodes() {
    for (const id of Object.keys(this.nodes)) {
      this.nodes[id].data.isActive = false;
    }
  }

  public checkAllNodes(checked: boolean) {
    for (const id of Object.keys(this.nodes)) {
      if (!this.nodes[id].data.disabled) {
        this.nodes[id].data.halfChecked = false;
        this.nodes[id].data.isChecked = checked;
      }
      this.maintainCheckedNodeList(this.nodes[id], this.nodes[id].data.isChecked);
    }
  }

  public getNodeIndex(node: TreeNode) {
    let parentNode;
    let children;
    if (node.parentId !== undefined) {
      parentNode = this.getNodeById(node.parentId);
      children = parentNode.children;
    } else {
      children = this.treeRoot;
    }
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === node.id) {
        return i;
      }
    }
    return -1;
  }

  public checkIsParent(childNodeId: number | string, parentNodeId: number | string) {
    const realParentId = this.nodes[childNodeId].parentId;
    if (realParentId === parentNodeId) {
      return true;
    } else if (realParentId !== undefined) {
      return this.checkIsParent(realParentId, parentNodeId);
    } else {
      return false;
    }
  }

  public getFlattenNodes() {
    this.flattenNodes.next(this.flattenTree());
  }

  public flattenTree() {
    const flattenTree = [];
    const flatTree = (nodes) => {
      for (let i = 0; i < nodes.length; i++) {
        const hasParentId = this.canIdEmpty ? nodes[i].parentId : nodes[i].parentId !== undefined;
        nodes[i].data.depth = hasParentId ? this.nodes[nodes[i].parentId].data.depth + 1 : 0;
        nodes[i].data.hideInVirtualScroll =
          nodes[i].data.isHide ||
          (hasParentId ? this.nodes[nodes[i].parentId].data.hideInVirtualScroll || !this.nodes[nodes[i].parentId].data.isOpen : false);
        nodes[i].data.isLast = i === nodes.length - 1;
        flattenTree.push(nodes[i]);
        if (nodes[i].data.children) {
          flatTree(nodes[i].data.children);
        }
      }
    };
    flatTree(this.treeRoot);
    return flattenTree;
  }

  public mergeTreeNodes(targetNode = this.treeRoot) {
    const mergeToNode = (node) => {
      if (!node) {
        return;
      }
      if (node.data.children?.length === 1 && node.data.children[0]?.data?.children?.length !== 0) {
        node.data.title = node.data.title + ' / ' + node.data.children[0]?.data?.title;
        node.data.children = node.data.children[0]?.data?.children;
        node.data.children.forEach((child) => {
          child.parentId = node.id;
        });
        mergeToNode(node);
      }
      if (node.data.children?.length > 1) {
        node.data.children.forEach((element) => {
          mergeToNode(element);
        });
      }
    };
    if (targetNode === this.treeRoot) {
      this.treeRoot.forEach((element) => {
        mergeToNode(element);
      });
    } else {
      mergeToNode(targetNode);
    }
  }

  public renderFlattenTree() {
    if (!this.virtualScroll) {
      return;
    }
    this.getFlattenNodes();
  }

  public disableAllNodesChecked(disabled = true) {
    for (const id of Object.keys(this.nodes)) {
      this.nodes[id].data.disabled = disabled;
    }
  }

  public disableAllNodesSelected(disabled = true) {
    for (const id of Object.keys(this.nodes)) {
      this.nodes[id].data.disableSelect = disabled;
    }
  }

  public disableAllNodesToggled(disabled = true) {
    for (const id of Object.keys(this.nodes)) {
      this.nodes[id].data.disableToggle = disabled;
    }
  }

  public toggleAllNodes(toggle = true) {
    for (const id of Object.keys(this.nodes)) {
      this.nodes[id].data.isOpen = toggle;
    }
    if (this.isVirtualScroll) {
      this.renderFlattenTree();
    }
  }

  public transferToTreeNode(
    originNode,
    parentId?,
    treeNodeChildrenKey = 'items',
    treeNodeIdKey = 'id',
    checkboxDisabledKey = 'disabled',
    selectDisabledKey = 'disableSelect',
    toggleDisabledKey = 'disableToggle',
    treeNodeTitleKey = 'title'
  ) {
    const node = {
      id: originNode[treeNodeIdKey],
      parentId,
      title: originNode[treeNodeTitleKey],
      isOpen: !!originNode.open,
      data: originNode.data || {},
      originItem: originNode,
      isParent: !!originNode.isParent || !!(originNode[treeNodeChildrenKey] && originNode[treeNodeChildrenKey].length > 0),
      loading: !!originNode.loading,
      isMatch: !!originNode.isMatch,
      isHide: !!originNode.isHide,
      isChecked: !!originNode.isChecked,
      halfChecked: !!originNode.halfChecked,
      isActive: !!originNode.isActive,
      disabled: !!originNode[checkboxDisabledKey],
      disableSelect: !!originNode[selectDisabledKey],
      disableToggle: !!originNode[toggleDisabledKey],
      disableAdd: !!originNode.disableAdd,
      disableEdit: !!originNode.disableEdit,
      disableDelete: !!originNode.disableDelete,
      children: [],
    };
    return new TreeNode(node.id, node.parentId, { ...node });
  }
}
