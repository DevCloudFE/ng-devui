import {
  Dictionary,
  filter,
  forEach,
  isEmpty,
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
}

export interface ITreeMap {
  [index: number]: ITreeNodeData;
}

// 每个tree节点数据组成
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
  disabled?: boolean;
  [prop: string]: any;
  disableAdd?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
}

// tree初始化构造数据
export interface ITreeInput {
  treeItems: Array<ITreeItem>;
  parentId?: number;
  treeNodeChildrenKey?: string;
  treeNodeIdKey?: string;
  checkboxDisabledKey?: string;
}

export class TreeNode {
  constructor(public id,
    public parentId,
    public data) {
  }
}

export class TreeFactory {
  treeChildren: Object;
  nodes: Dictionary<TreeNode>;
  private idx: number;

  static create() {
    return new TreeFactory();
  }

  // tree model with items
  static fromTree ({
                       treeItems,
    treeNodeChildrenKey = 'items',
    treeNodeIdKey = 'id',
    checkboxDisabledKey = 'disabled'
                     }: ITreeInput): TreeFactory {
    const treeFactory = TreeFactory.create();
    treeFactory.mapTreeItems({ treeItems, parentId: 0, treeNodeChildrenKey, treeNodeIdKey, checkboxDisabledKey });
    return treeFactory;
  }

  constructor() {
    this.idx = 0;
    this.nodes = {};
    this.treeChildren = {};
  }

  mapTreeItems = ({
                    treeItems,
    parentId = 0,
    treeNodeChildrenKey = 'items',
    treeNodeIdKey = 'id',
    checkboxDisabledKey = 'disabled'
                  }: ITreeInput) => {
    forEach(treeItems, (item: ITreeItem) => {
      const node = this.addNode({
        id: item[treeNodeIdKey],
        parentId,
        title: item.title,
        isOpen: !!item.open,
        data: item.data || {},
        originItem: item,
        isParent: !!item.isParent,
        loading: !!item.loading,
        isMatch: !!item.isMatch,
        isHide: !!item.isHide,
        isChecked: !!item.isChecked,
        isActive: !!item.isActive,
        disabled: !!item[checkboxDisabledKey],
        disableAdd: !!item.disableAdd,
        disableEdit: !!item.disableEdit,
        disableDelete: !!item.disableDelete
      });
      this.mapTreeItems({ treeItems: item[treeNodeChildrenKey] || [], parentId: node.id, treeNodeChildrenKey: treeNodeChildrenKey,
         treeNodeIdKey: treeNodeIdKey, checkboxDisabledKey: checkboxDisabledKey });
    });
    return this;
  }

  addNode({ id, parentId = 0, ...data }: ITreeNodeData): TreeNode {
    if (isUndefined(id)) {
      this.idx++;
      id = this.idx;
    }
    const treeNode = new TreeNode(id, parentId, data);
    this.nodes = {
      ...this.nodes,
      [treeNode.id]: treeNode
    };
    return treeNode;
  }

  editNodeTitle(id: number) {
    this.nodes[id].data.editable = true;
  }

  deleteNodeById(id: number) {
    const deleteItems = (childId) => {
      const children = this.getChildrenById(childId);
      this.nodes = omitBy<Dictionary<TreeNode>>(this.nodes, (node) => {
        return node.id === childId;
      });
      forEach(children, (child) => {
        deleteItems(child.id);
      });
    };
    deleteItems(id);
    return this;
  }

  toggleNodeById(id: number) {
    this.nodes[id].data.isOpen = !this.nodes[id].data.isOpen;
    return this;
  }

  openNodesById(id: number) {
    this.nodes[id].data.isOpen = true;
    if (this.nodes[id].parentId !== 0) {
      this.openNodesById(this.nodes[id].parentId);
    }
    return this;
  }

  closeNodesById(id: number) {
    this.nodes[id].data.isOpen = false;
    if (this.nodes[id].parentId !== 0) {
      this.closeNodesById(this.nodes[id].parentId);
    }
    return this;
  }

  disabledNodesById(id: number) {
    this.nodes[id].data.disabled = true;

    const parentId = this.nodes[id].parentId;
    this._disabledParentNodes(parentId);

    const disabledNodes = (childId: number) => {
      const children = this.getChildrenById(childId);
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

  private _disabledParentNodes(parentId: number) {
    const children = this.getChildrenById(parentId);

    if (children.length < 1) {
      return;
    }
    const result = reduce(children, (res: boolean, child) => {
      return res && child.data.disabled;
    }, true);

    if (this.nodes[parentId]) {
      this.nodes[parentId].data.disabled = result;
    }
  }

  checkNodesById(id: number, checked: boolean): Array<Object> {
    this.nodes[id].data.isChecked = checked;

    const parentId = this.nodes[id].parentId;
    this._addCheckToParentNodes(parentId);

    const addCheckedToNodes = (childId: number) => {
      const children = this.getChildrenById(childId);
      if (children.length > 0) {
        children.forEach((child) => {
          const nodeData = this.nodes[child.id].data;
          if (!nodeData.disabled) {
            nodeData.isChecked = checked;
          }
          addCheckedToNodes(child.id);
        });
      }
    };
    addCheckedToNodes(id);
    return this.getCheckedNodes();
  }

  private _addCheckToParentNodes(parentId: number) {
    const children = this.getChildrenById(parentId);
    if (children.length < 1) {
      return;
    }
    const parentChecked = reduce(children, (result: boolean, child) => {
      return result && child.data.isChecked;
    }, true);

    if (this.nodes[parentId]) {
      this.nodes[parentId].data.isChecked = parentChecked;
    }
  }

  getCheckedNodes(): Array<any> {
    const results = pickBy(this.nodes, (node) => {
      return node.data.isChecked === true;
    });
    return values(results);
  }

  getDisabledNodes(): Array<any> {
    const results = pickBy(this.nodes, (node) => {
      return node.data.disabled === true;
    });
    return values(results);
  }

  activeNodeById(id: number) {
    forEach(this.nodes, (node) => {
      if (node.id !== id) {
        this.nodes[node.id].data.isActive = false;
      }
    });
    this.nodes[id].data.isActive = !this.nodes[id].data.isActive;
  }

  getChildrenById(id: number): Array<TreeNode> {
    return filter(this.nodes,
      (node: TreeNode) => {
        return node.parentId === id;
      });
  }

  toTree() {
    const patchChildren = (nodes: any) => {
      return map(nodes, (node: any) => {
        return {
          ...node,
          children: patchChildren(this.getChildrenById(node.id))
        };
      });
    };

    return patchChildren(this.getChildrenById(0));
  }

  startLoading(id: number) {
    this.nodes[id].data.loading = true;
  }

  endLoading(id: number) {
    this.nodes[id].data.loading = false;
  }

  isMatchNode(inputValue: string, hideUnmatched?: boolean) {
    const trimedValue = trim(inputValue);
    forEach(this.nodes, (node: TreeNode) => {
      this.nodes[node.id].data.isMatch = false;
      this.nodes[node.id].data.isHide = false;
      if (!isEmpty(trimedValue)) {
        this.nodes[node.id].data.isHide = hideUnmatched ? true : false;
        if (node.data.title.toLowerCase().includes(trimedValue.toLocaleLowerCase()) ) {
          this.nodes[node.id].data.isMatch = true;
          this.nodes[node.id].data.isHide = false;
          if (this.nodes[node.parentId]) {
            let parentId = node.parentId;
            while (hideUnmatched && parentId !== 0) {
              this.nodes[parentId].data.isHide = false;
              parentId = this.nodes[parentId].parentId;
            }
            if (this.getChildrenById(node.parentId).length > 0) {
              this.openNodesById(node.parentId);
            }
          }
        }
      }
    });
  }

}
