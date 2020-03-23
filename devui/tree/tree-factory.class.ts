import {
  Dictionary,
  filter,
  forEach,
  isUndefined,
  map,
  omitBy,
  pickBy,
  reduce,
  trim,
  values
} from 'lodash-es';

export interface ITreeNodeData {
  id?: number;
  parentId?: number;
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
  title: string;
  open?: boolean;
  loading?: boolean;
  isMatch?: boolean;
  items?: ITreeItem[];
  isParent?: boolean;
  data?: any;
  id?: any;
  isHide?: boolean;
  isActive?: boolean;
  isChecked?: boolean;
  halfChecked?: boolean;
  disabled?: boolean;

  [prop: string]: any;

  disableAdd?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
}

export interface ITreeInput {
  treeItems: Array<ITreeItem>;
  parentId?: number;
  treeNodeChildrenKey?: string;
  treeNodeIdKey?: string;
  checkboxDisabledKey?: string;
  treeNodeTitleKey?: string;
}

export class TreeNode implements ITreeNodeData {
  constructor(public id,
    public parentId,
    public data) {
  }
}

export class TreeFactory {
  nodes: Dictionary<TreeNode>;
  private idx: number;
  private _checked = new Set<Object>();
  private _treeRoot: TreeNode[] = [];

  static create() {
    return new TreeFactory();
  }

  // tree model with items
  static fromTree({
    treeItems,
    treeNodeChildrenKey = 'items',
    treeNodeIdKey = 'id',
    checkboxDisabledKey = 'disabled',
    treeNodeTitleKey = 'title'
  }: ITreeInput): TreeFactory {
    const treeFactory = TreeFactory.create();
    treeFactory.mapTreeItems({ treeItems, parentId: undefined, treeNodeChildrenKey, treeNodeIdKey, checkboxDisabledKey, treeNodeTitleKey });
    return treeFactory;
  }

  constructor() {
    this.idx = 0;
    this.nodes = {};
  }

  mapTreeItems = ({
    treeItems,
    parentId,
    treeNodeChildrenKey = 'items',
    treeNodeIdKey = 'id',
    checkboxDisabledKey = 'disabled',
    treeNodeTitleKey = 'title'
  }: ITreeInput) => {
    forEach(treeItems, (item: ITreeItem) => {
      const node = this.addNode({
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
        disableAdd: !!item.disableAdd,
        disableEdit: !!item.disableEdit,
        disableDelete: !!item.disableDelete,
        children: []
      });

      if (!!item.isChecked) {
        this._checked.add(node);
      }

      this.mapTreeItems({
        treeItems: item[treeNodeChildrenKey] || [], parentId: node.id, treeNodeChildrenKey, treeNodeIdKey,
        checkboxDisabledKey, treeNodeTitleKey
      });
    });
    return this;
  }

  addNode({ id, parentId, ...data }: ITreeNodeData): TreeNode {
    if (isUndefined(id)) {
      this.idx++;
      id = this.idx;
    }
    const treeNode = new TreeNode(id, parentId, data);
    if (this.nodes.hasOwnProperty(treeNode.id)) {
      throw new Error(`Duplicated id: ${treeNode.id} detected, please specify unique ids in the tree.`);
    }
    this.nodes = {
      ...this.nodes,
      [treeNode.id]: treeNode
    };

    this.addChildNode(this.nodes[parentId], treeNode);
    return treeNode;
  }

  editNodeTitle(id: number) {
    this.nodes[id].data.editable = true;
  }

  deleteNodeById(id: number) {
    const node = this.nodes[id];
    const parentNode = this.nodes[node.parentId];
    this.removeChildNode(parentNode, node);

    const deleteItems = (nodeId) => {
      const children = this.getChildrenById(nodeId);
      this.nodes = omitBy<Dictionary<TreeNode>>(this.nodes, (_node) => {
        return _node.id === id;
      });
      forEach(children, (child) => {
        deleteItems(child.id);
      });
    };
    deleteItems(id);
    if (parentNode && (!parentNode.data.children || !parentNode.data.children.length)) {
      parentNode.data.isParent = false;
    }
    return this;
  }

  toggleNodeById(id: number) {
    this.nodes[id].data.isOpen = !this.nodes[id].data.isOpen;
    return this;
  }

  openNodesById(id: number) {
    this.nodes[id].data.isOpen = true;
    if (this.nodes[id].parentId !== undefined) {
      this.openNodesById(this.nodes[id].parentId);
    }
    return this;
  }

  closeNodesById(id: number, closeChildren = false) {
    this.nodes[id].data.isOpen = false;
    if (closeChildren) {
      if (this.nodes[id] && this.nodes[id].data.children) {
        this.nodes[id].data.children.forEach((node) => {
          this.closeNodesById(node.id);
        });
      }
    }
    return this;
  }

  disabledNodesById(id: number) {
    this.nodes[id].data.disabled = true;

    const parentId = this.nodes[id].parentId;
    this._disabledParentNodes(parentId);

    const disabledNodes = (nodeId: number) => {
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

  private _disabledParentNodes(parentId: number | undefined) {
    const children = this.getChildrenById(parentId);

    if (children.length < 1) {
      return;
    }
    const result = reduce(children, (status: boolean, child) => {
      return status && child.data.disabled;
    }, true);

    if (this.nodes[parentId]) {
      this.nodes[parentId].data.disabled = result;
    }
  }

  checkNodesById(id: number, checked: boolean): Array<Object> {
    this.nodes[id].data.halfChecked = false;
    this.nodes[id].data.isChecked = checked;

    this.checkParentNodes(this.nodes[id]);
    this.checkChildNodes(this.nodes[id], checked);
    this.maintainCheckedNodeList(this.nodes[id], checked);
    return this.getCheckedNodes();
  }

  private checkParentNodes(node: TreeNode) {
    const { parentId } = node;
    const parentNode = this.nodes[parentId];
    if (parentNode) {
      const childrenNode = this.getChildrenById(parentId);
      if (childrenNode.every(childNode => childNode.data.isChecked && !childNode.data.halfChecked)) {
        parentNode.data.isChecked = true;
        parentNode.data.halfChecked = false;
      } else if (childrenNode.some(childNode => childNode.data.halfChecked || childNode.data.isChecked)) {
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

  private checkChildNodes(node: TreeNode, checked: boolean) {
    const { id } = node;
    const childrenNode = this.getChildrenById(id);
    if (childrenNode.length > 0) {
      childrenNode.forEach(childNode => {
        const { id: childId } = childNode;
        const { data: nodeData } = this.nodes[childId];
        if (!nodeData.disabled) {
          nodeData.isChecked = checked;
          nodeData.halfChecked = false;
          this.maintainCheckedNodeList(childNode, checked);
        }
        this.checkChildNodes(childNode, checked);
      });
      const childrenFullCheckedCount = childrenNode.filter(({ data: nodeData }) => nodeData.isChecked).length;
      const childrenCheckedCount = childrenNode
        .filter(({ data: nodeData }) => nodeData.isChecked || nodeData.halfChecked).length;
      node.data.halfChecked = childrenCheckedCount > 0 && childrenNode.length > childrenFullCheckedCount;
    }
  }

  getCheckedNodes(): Array<any> {
    return Array.from(this._checked);
  }

  getDisabledNodes(): Array<any> {
    const results = pickBy(this.nodes, (node) => {
      return node.data.disabled === true;
    });
    return values(results);
  }

  activeNodeById(id: number) {
    this.deactivateAllNodes();
    this.nodes[id].data.isActive = !this.nodes[id].data.isActive;
  }

  getChildrenById(id: number): Array<TreeNode> {
    if (this.nodes[id]) {
      return this.nodes[id].data.children || [];
    } else if (id === undefined) {
      return this._treeRoot;
    }

    return [];
  }

  /*
  * @deprecated
  *
  */
  private toTree() {
    const patchChildren = (nodes: any) => {
      return map(nodes, (node: any) => {
        return {
          ...node,
          children: patchChildren(this.getChildrenById(node.id))
        };
      });
    };

    return patchChildren(this.getChildrenById(undefined));
  }

  startLoading(id: number) {
    this.nodes[id].data.loading = true;
  }

  endLoading(id: number) {
    this.nodes[id].data.loading = false;
  }


  /*
  * @deprecated
  */
  private isMatchNode(inputValue: string, hideUnmatched?: boolean) {
    const target = trim(inputValue);
    this.resetSearchResults();
    this.dfs(target.toLowerCase(), this._treeRoot, hideUnmatched);
  }

  getNodeById(id): any {
    return this.nodes[id].data;
  }

  hideNodeById(id, hide: boolean) {
    this.nodes[id].data.isHide = hide;
    return this;
  }

  private maintainCheckedNodeList(node: TreeNode, checked: boolean) {
    if (checked && !node.data.halfChecked) {
      this._checked.add(node);
    } else {
      this._checked.delete(node);
    }
  }

  private dfs(target, tree, hideUnmatched?: boolean) {
    if (!tree) { return false; }
    if (!target) { return false; }
    if (Array.isArray(tree)) {
      return tree.map(treeNode => {
        return this.dfs(target, treeNode, hideUnmatched);
      });
    } else {
      const treeNode = tree;
      const treeChildren = this.getChildrenById(treeNode.id);
      const selfMatched = treeNode.data.title.toLowerCase().includes(target);
      if (selfMatched) {
        treeNode.data.isMatch = true;
      }
      // Test if children matches target recursively, do not hide children if parent is matched.
      const childrenMatched = this.dfs(target, treeChildren, hideUnmatched && !selfMatched).some(_ => !!_);
      if (selfMatched || childrenMatched) {
        if (treeChildren.length > 0) {
          this.openNodesById(treeNode.id);
        }
        return true;
      } else {
        treeNode.data.isHide = hideUnmatched;
        return false;
      }
    }
  }

  public addChildNode(parentNode: TreeNode, childNode: TreeNode) {
    if (parentNode) {
      Array.isArray(parentNode.data.children) ?
        parentNode.data.children.push(childNode) : parentNode.data.children = [childNode];
    } else {
      this._treeRoot.push(childNode);
    }
  }

  private removeChildNode(parentNode: TreeNode, childNode: TreeNode) {
    if (parentNode) {
      parentNode.data.children = parentNode.data.children.filter(node => node.id !== childNode.id);
    } else {
      this._treeRoot = this._treeRoot.filter(node => node.id !== childNode.id);
    }
  }

  private resetSearchResults() {
    Object.keys(this.nodes).forEach((key) => {
      const treeNode = this.nodes[key];
      treeNode.data.isMatch = false;
      treeNode.data.isHide = false;
    });
  }

  public searchTree(target, hideUnmatched = false) {
    target = trim(target);
    this.resetSearchResults();
    return this.dfs(target.toLowerCase(), this._treeRoot, hideUnmatched);
  }

  get treeRoot() {
    return this._treeRoot;
  }
  public deactivateAllNodes() {
    for (const id of Object.keys(this.nodes)) {
      this.nodes[id].data.isActive = false;
    }
  }
}
