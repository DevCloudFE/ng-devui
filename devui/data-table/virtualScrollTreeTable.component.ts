import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren,
  EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChild
} from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { DataTableProperiesInterface } from './dataTableProperties.interface';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import {
  distinct, FindChild, highPerformanceFilter, highPerformanceMap, simDeepClone
} from './utils/utils';
import {
  VirtualScrollTreeTableAdd, VirtualScrollTreeTableCopy,
  VirtualScrollTreeTableDelete, VirtualScrollTreeTableDrop, VirtualScrollTreeTableSearch
} from './utils/virtualScrollTreeTable.factory';

export interface TreeNodeInterface {
  key: string;
  title: string;
  level: number;
  parentKey?: string;
  expand?: boolean;
  isLeaf: boolean;
  isDelete?: boolean;
  isMatch?: boolean;
  _children?: string[];
  [prop: string]: any;
}

@Component({
  selector: 'd-virtual-scroll-tree-table',
  templateUrl: './virtualScrollTreeTable.component.html',
  styleUrls: ['./virtualScrollTreeTable.component.scss']
})
export class VirtualScrollTreeTableComponent implements OnInit, AfterContentInit, OnChanges {
  @ContentChildren(DataTableColumnTmplComponent) columns: QueryList<DataTableColumnTmplComponent>;
  @ViewChild('dataTable', { static: true }) dataTable: DataTableComponent;

  @Input() dataSource: any;
  @Input() editOption: any;
  @Input() showRowIndex = 10;
  @Input() dataTableProperties: DataTableProperiesInterface;

  @Output() save = new EventEmitter<any>();

  virtualScrollTreeTableDelete: any;
  virtualScrollTreeTableAdd: any;
  virtualScrollTreeTableCopy: any;
  virtualScrollTreeTableDrop: any;
  virtualScrollTreeTableSearch: any;

  findChild: any;
  itemSize = 40;
  itemCount = 10;
  virtualScrollPadding = '';

  get initData() {
    return highPerformanceFilter(this.treeTableArray, item => !item.parent_node_id);
  }
  get allTableData() {
    return highPerformanceFilter(this.treeTableArray, item => item);
  }
  get copySearchRes() {
    return highPerformanceFilter(this.searchRes, item => item);
  }
  get dataTableEvent() {
    return this.dataTable;
  }
  isOpenAll = false;
  treeTableMap: { [key: string]: TreeNodeInterface } = {};
  treeTableArray: TreeNodeInterface[] = [];
  visibleNodes: TreeNodeInterface[] = [];
  iconParentOpen: string;
  iconParentClose: string;
  basicDataSource: any = [];
  expandArr: Array<any> = [];
  expandClickArr: Array<any> = [];
  expandItemKeys: Array<any> = [];
  toggledArr: Array<any> = [];
  toggledClickArr: Array<any> = [];
  toggledItemKeys: Array<any> = [];
  countNum: any = 0;
  totleItem: Number = 0;
  scrollArray: Array<any> = [];
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  isSearch = false;
  searchRes: Array<any> = [];
  searchAttr: any = {
    name: '全部',
    value: 'all'
  };
  beforeSearchTarget: any;
  parentData: Array<any> = [];
  searchKeyArr: Array<any> = [];
  searchArr: Array<any> = [];

  itemLevel: any = 1;
  peersNum = 0;

  allChildCol: Array<any> = [];

  saveCopyClickNode: any = [];
  saveCopyNode: any = [];
  copyRowNodeId = '';
  saveCutNode: any = [];
  saveCopyRowChild: any = [];

  isAgainCopy = false;

  isDragMove = false;
  dragLine: any;
  dragMouseTipWidth: any;

  constructor(private ref: ChangeDetectorRef) { }

  ngAfterContentInit() {
    this.dataTable.columns = this.columns;
    this.dataTable.updateColumns();
    setTimeout(() => {
      const dataTableHead = this.dataTable.fixHeaderContainerRefElement.nativeElement.clientHeight;
      this.virtualScrollPadding = dataTableHead + 'px';
    });
  }

  ngOnChanges(changes): void {
    if(this.dataSource) {
      new Promise((resolve, reject) => {
        try {
          this.basicDataSource = this.dataSource;
          this.basicDataSource = simDeepClone(this.basicDataSource);
          this.treeTableArray = this.basicDataSource;
          this.totleItem = this.treeTableArray.length;
          this.countNum = this.initData.length;
          this.scrollArray = Array.from(this.initData.keys());
          this.itemCount = this.showRowIndex;
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }).then(() => {
        this.visibleNodes = simDeepClone(this.initData.slice(0, this.itemCount));
        this.visibleNodes.forEach(arr => {
          arr.expand = false;
        });
        this.getVisibleDataOrder(this.visibleNodes);
        this.getVisibleDataLevel(this.visibleNodes);
      });
    } else {
      this.treeTableArray = [];
      this.visibleNodes = [];
    }

    if (
      (changes['dataTableProperties'])
    ) {
      const params = changes['dataTableProperties']['currentValue'];
      this.copyAttribute(this.dataTable, params);
    }
  }

  ngOnInit() {
    this.virtualScrollTreeTableDelete = new VirtualScrollTreeTableDelete();
    this.virtualScrollTreeTableAdd = new VirtualScrollTreeTableAdd();
    this.virtualScrollTreeTableCopy = new VirtualScrollTreeTableCopy();
    this.virtualScrollTreeTableDrop = new VirtualScrollTreeTableDrop();
    this.virtualScrollTreeTableSearch = new VirtualScrollTreeTableSearch();
    this.findChild = new FindChild();
  }

  copyAttribute(target, updateParams) {
    if(!target) {return;}
    const updateKeys = Object.keys(updateParams);
    if(updateKeys.length) {
      updateKeys.forEach(key => {
        if(key === 'size') {
          if(updateParams[key] === 'md') {
            this.itemSize = 48;
          } else if(updateParams[key] === 'lg') {
            this.itemSize = 56;
          } else {
            this.itemSize = 40;
          }
        }
        target[key] = updateParams[key];
      });
    }
  }

  batchUpdateTable(key, val) {
    const saveArr = this.treeTableArray;
    if(saveArr.length) {
      highPerformanceMap(saveArr, obj => {
        obj[key] = val;
      });
    }
    this.getVisiableNodes();
  }

  updateRowData(id, key, val) {
    for (let i = 0; i < this.visibleNodes.length; i++) {
      if(this.visibleNodes[i].node_id === id) {
        this.visibleNodes[i][key] = val;
      }
    }

    const pos = this.treeTableArray.findIndex((v) => v.node_id === id);
    if(pos !== -1) {
      this.treeTableArray[pos][key] = val;
    }
  }

  removeAll() {
    this.expandArr = [];
    this.toggledArr = [];
    this.expandClickArr = [];
    this.toggledClickArr = [];
    this.searchRes = [];
    this.searchArr = [];
  }

  setScrollLength(countNum) {
    this.countNum = countNum;
    this.scrollArray = Array.from(new Array(this.countNum).keys());
  }
  setVisibleNodes(data, flag) {
    this.visibleNodes = simDeepClone(data);
    for (let i = 0; i < this.visibleNodes.length; i++) {
      this.visibleNodes[i].expand = flag;
    }
  }
  getVisiableNodes() {
    const scrollOffset = this.viewPort.measureScrollOffset();
    const firstVisibleIndex = Math.ceil(scrollOffset / this.itemSize);
    const originalDataLength = this.treeTableArray.length;
    if (this.isSearch) {
      if (this.searchArr.length > 0) {
        this.setScrollLength(this.searchRes.length - this.searchArr.length);
        const newSearchRes = this.assemblyToggledData(this.copySearchRes, this.searchArr);
        this.setVisibleNodes(newSearchRes.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount), true);
        this.singleExpend(this.searchArr, 'search');
      } else {
        this.setScrollLength(this.searchRes.length);
        this.setVisibleNodes(this.searchRes.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount), true);
      }
    } else {
      if (this.isOpenAll) {
        this.expandArr = [];
        this.expandClickArr = [];
        if (this.toggledClickArr.length > 0) {
          const newTreeTableArray = this.assemblyToggledData(this.allTableData, this.toggledArr);
          this.setScrollLength(originalDataLength - this.toggledArr.length);
          this.setVisibleNodes(newTreeTableArray.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount), true);
          this.singleExpend(this.toggledClickArr, 'away');
        } else {
          this.setScrollLength(this.treeTableArray.length);
          this.setVisibleNodes(this.treeTableArray.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount), true);
        }
      } else {
        this.toggledArr = [];
        this.toggledClickArr = [];
        if (this.expandClickArr.length > 0) {
          const newInitData = this.assemblyExpandData(this.initData, this.expandArr);
          this.setScrollLength(this.initData.length + this.expandArr.length);
          this.visibleNodes = simDeepClone(newInitData.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount));
          this.singleToggled();
        } else {
          this.setScrollLength(this.initData.length);
          this.setVisibleNodes(this.initData.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount), false);
        }
      }
    }

    this.getVisibleDataOrder(this.visibleNodes);
    this.getVisibleDataLevel(this.visibleNodes);
    this.dataTable.cancelEditingStatus();
  }

  getVisibleDataOrder(visibleNodes) {
    for (let i = 0; i < visibleNodes.length; i++) {
      const index = this.treeTableArray.findIndex((v) => v.node_id === visibleNodes[i].node_id);
      visibleNodes[i].by_order = index + 1;
    }
  }

  getVisibleDataLevel(visibleNodes) {
    visibleNodes.forEach(arr => {
      this.itemLevel = 1;
      if (arr.parent_node_id) {
        this.getParentNodeLevel(arr.parent_node_id, 1);
        arr.level = this.itemLevel;
      } else {
        arr.level = 1;
      }
    });
  }

  getParentNodeLevel(parent_node_id, level) {
    this.itemLevel = level + 1;
    const data: any = highPerformanceFilter(this.treeTableArray, item => item.node_id === parent_node_id);
    if (data.length > 0) {
      this.getParentNodeLevel(data[0].parent_node_id, this.itemLevel);
    }
  }

  singleExpend(recordArr, status) {
    const keyArr = [];
    for (let i = 0; i < recordArr.length; i++) {
      if (status === 'search') {
        keyArr.push(recordArr[i].parent_node_id);
      } else {
        keyArr.push(recordArr[i].node_id);
      }
    }
    for (let i = 0; i < this.visibleNodes.length; i++) {
      if (keyArr.includes(this.visibleNodes[i].node_id)) { this.visibleNodes[i].expand = false; }
    }
  }

  singleToggled() {
    const visibleNodesKeys = this.visibleNodes.map(item => item.node_id);
    let node_id;
    for (let i = 0; i < this.expandClickArr.length; i++) {
      node_id = this.expandClickArr[i].node_id;
      if (node_id && visibleNodesKeys.indexOf(node_id) > -1) {
        this.visibleNodes.filter(o => o.node_id === node_id)[0].expand = true;
      }
    }
  }

  assemblyExpandData(InitData, expandArr) {
    const newExpandArr = [];
    let parent_node_id;
    for (let i = 0; i < expandArr.length; i++) {
      parent_node_id = expandArr[i].parent_node_id;
      const pos = InitData.findIndex((v) => v.node_id === parent_node_id);
      if (pos !== -1) {
        this.getPeersDataNum(InitData, pos, parent_node_id);
        const realDataPos = this.treeTableArray.findIndex((v) => v.node_id === expandArr[i].node_id);
        if (realDataPos !== -1) {
          const realExpandData = this.treeTableArray[realDataPos];
          InitData.splice(pos + 1 + this.peersNum, 0, realExpandData);
          this.peersNum = 0;
        }
      } else {
        newExpandArr.push(expandArr[i]);
      }
    }
    if (newExpandArr.length > 0) {
      this.assemblyExpandData(InitData, newExpandArr);
    } else {
      return InitData;
    }
  }

  getPeersDataNum(InitData, pos, parent_node_id) {
    const checkDataPos = pos + 1;
    if (InitData[checkDataPos]) {
      const checkDataParent = InitData[checkDataPos].parent_node_id;
      if (checkDataParent === parent_node_id) {
        this.peersNum++;
        this.getPeersDataNum(InitData, checkDataPos, parent_node_id);
      } else {
        return;
      }
    } else {
      return;
    }
  }

  assemblyToggledData(arrayData, toggledArr) {
    let node_id;
    for (let i = 0; i < toggledArr.length; i++) {
      node_id = toggledArr[i].node_id;
      const pos = arrayData.findIndex((v) => v.node_id === node_id);
      if (pos !== -1) {
        arrayData.splice(pos, 1);
      }
    }
    return arrayData;
  }

  scroll(e) {
    e.preventDefault();
    const event = e;
    const wheelDelta = event.wheelDelta;
    const step = (wheelDelta === 0 ? 0 : wheelDelta / Math.abs(wheelDelta)) * (-this.itemSize);
    document.getElementById('data-table-virtual-tree-scroll').scrollBy(0, step);
  }
  onBodyScroll() {
    this.getVisiableNodes();
  }
  toggleAllNodesExpand(e) {
    this.isOpenAll = e;
    this.getVisiableNodes();
  }


  toggleNodeExpand(node: TreeNodeInterface, $event: boolean, isRefresh = true): void {
    if (this.isSearch) {
      this.operationSearchArr(node, $event ? 'add' : 'del');
    } else {
      this.isOpenAll ? this.operationToggledArr(node, $event ? 'add' : 'del') : this.operationExpandArr(node, $event ? 'add' : 'del');
    }
    isRefresh && this.getVisiableNodes();

    if (!node.expand && node.node_id === this.visibleNodes[this.visibleNodes.length - 1].node_id) {
      this.scrollToLastItem();
    }
  }

  scrollToLastItem() {
    document.getElementById('data-table-virtual-tree-scroll').scrollBy(0, this.itemSize * (this.itemCount - 1));
  }

  operationSearchArr(node, status) {
    if (status === 'add') {
      this.publicSingleRecordAdd(node, this.searchArr);
    } else {
      this.publicSingleRecordDel(node, 'search');
    }
  }

  operationExpandArr(node, status) {
    if (status === 'add') {
      const showNodes = this.findChild.getChildrenOfItem(node, this.treeTableArray);
      this.expandArr = distinct(this.expandArr, showNodes);
      this.expandClickArr = distinct(this.expandClickArr, [node]);
    } else {
      const inNodeData = [];
      inNodeData.push(node);
      this.spliceExpandArrData(inNodeData);
      const allChild = this.getAllChildArr(node);
      let node_id;
      for (let i = 0; i < allChild.length; i++) {
        node_id = allChild[i].node_id;
        const pos = this.expandClickArr.findIndex((v) => v.node_id === node_id);
        if (pos !== -1) {
          this.expandClickArr.splice(pos, 1);
        }
      }
    }
  }

  spliceExpandArrData(inNodeData) {
    let nodeChildData = [];
    for (let i = 0; i < inNodeData.length; i++) {
      const selectData = this.expandArr.filter(item => {
        if (item.parent_node_id === inNodeData[i].node_id) {
          return item;
        }
      });
      nodeChildData = [...nodeChildData, ...selectData];
    }
    if (nodeChildData.length > 0) {
      for (let i = 0; i < nodeChildData.length; i++) {
        const node_id = nodeChildData[i].node_id;
        const index = this.expandArr.findIndex((v) => v.node_id === node_id);
        this.expandArr.splice(index, 1);
      }
      this.spliceExpandArrData(nodeChildData);
    } else {
      return;
    }
  }

  operationToggledArr(node, status) {
    if (status === 'add') {
      this.publicSingleRecordAdd(node, this.toggledArr);
      for (let i = 0; i < this.toggledClickArr.length; i++) {
        if (node.node_id === this.toggledClickArr[i].node_id) {
          this.toggledClickArr.splice(i, 1);
        }
      }
    } else {
      this.publicSingleRecordDel(node, 'away');
      const allChild = this.getAllChildArr(node);
      this.toggledClickArr = distinct(this.toggledClickArr, allChild);
    }
  }

  getAllChildArr(node) {
    const allChildCol = this.findChild.getAllChildrenOfItem(node, this.treeTableArray);
    let allChild = distinct(allChildCol, []);
    allChild = allChild.filter(item => item.node_type === 1);
    return allChild;
  }

  publicSingleRecordAdd(node, recordArr) {
    const showNodes = this.findChild.getChildrenOfItem(node, this.treeTableArray);
    const toggledArrKey = recordArr.map(item => item.node_id);
    let node_id;
    for (let i = 0; i < showNodes.length; i++) {
      node_id = showNodes[i].node_id;
      if (node_id && toggledArrKey.indexOf(node_id) > -1) {
        const index = recordArr.findIndex((v) => v.node_id === node_id);
        recordArr.splice(index, 1);
      }
    }
  }

  publicSingleRecordDel(node, status) {
    const inNodeData = [];
    inNodeData.push(node);
    this.spliceToggledArrData(inNodeData, status);
  }

  spliceToggledArrData(inNodeData, status) {
    let nodeChild = [];
    for (let i = 0; i < inNodeData.length; i++) {
      const inNodeDataChild = this.findChild.getChildrenOfItem(inNodeData[i], this.treeTableArray);
      if (status === 'away') {
        nodeChild = this.toggledArrChange(inNodeDataChild, nodeChild);
      } else {
        nodeChild = this.searchArrChange(inNodeDataChild, nodeChild);
      }
    }

    if (nodeChild.length > 0) {
      this.spliceToggledArrData(nodeChild, status);
    } else {
      return;
    }
  }

  toggledArrChange(inNodeDataChild, nodeChild) {
    this.toggledArr = distinct(this.toggledArr, inNodeDataChild);
    nodeChild = this.getNodeChild(inNodeDataChild, nodeChild);
    return nodeChild;
  }

  searchArrChange(inNodeDataChild, nodeChild) {
    const searchNode =  [];
    for (let k = 0; k < inNodeDataChild.length; k++) {
      const node_id = inNodeDataChild[k].node_id;
      const pos = this.searchRes.findIndex((v) => v.node_id === node_id);
      if (pos !== -1) {
        searchNode.push(inNodeDataChild[k]);
      }
    }
    this.searchArr = distinct(this.searchArr, searchNode);
    nodeChild = this.getNodeChild(searchNode, nodeChild);
    return nodeChild;
  }

  getNodeChild(childData, nodeChild) {
    for (let k = 0; k < childData.length; k++) {
      if (childData[k].node_type) {
        nodeChild.push(childData[k]);
      }
    }
    return nodeChild;
  }

  beforeEditStart = (rowItem, field) => {
    return true;
  };

  beforeEditEnd = (rowItem, field) => {
    return rowItem && rowItem[field].length >= 3;
  };

  onEditEnd(rowItem, field) {
    const cloneRow = simDeepClone(rowItem);

    const editSelectField = [];
    Object.keys(this.editOption).forEach(arr => {
      editSelectField.push(arr + 'Edit');
    });

    if (editSelectField.includes(field)) {
      this.dataTable.cancelEditingStatus();
    }

    const treeTablePos = this.treeTableArray.findIndex((v) => v.node_id === cloneRow.node_id);
    this.treeTableArray.splice(treeTablePos, 1, cloneRow);
  }

  searchSelectChange() {
    this.search(this.beforeSearchTarget);
  }

  search(searchTarget) {
    const res = this.virtualScrollTreeTableSearch.search(searchTarget, this.searchAttr, this.treeTableArray);
    this.beforeSearchTarget = res.beforeSearchTarget;
    this.searchRes = res.searchRes;
    this.searchArr = res.searchArr;
    this.isSearch = res.isSearch;
    this.getVisiableNodes();
  }

  addGolbal(status, addTemplate?) {
    event.stopPropagation();
    if(addTemplate) {
      this.treeTableArray = this.virtualScrollTreeTableAdd.addGolbal(status, this.treeTableArray, addTemplate);
    } else {
      this.treeTableArray = this.virtualScrollTreeTableAdd.addGolbal(status, this.treeTableArray);
    }
    this.getVisiableNodes();
    setTimeout(() => {
      this.addAutoScroll();
    });
  }

  addOperation(rowItem, status, addTemplate?) {
    if(addTemplate) {
      this.treeTableArray = this.virtualScrollTreeTableAdd.addOperation(rowItem, status, this.treeTableArray, addTemplate);
    } else {
      this.treeTableArray = this.virtualScrollTreeTableAdd.addOperation(rowItem, status, this.treeTableArray);
    }
    this.getVisiableNodes();

    if (!this.isOpenAll) {
      const changeStatus = (status === 'addDataFolder' || status === 'addDataNode') ? 'add' : 'insert';
      this.againExpandNode(changeStatus, rowItem);
    }
  }

  againExpandNode(changeStatus, rowItem) {
    let recordExpNode = [];
    if (changeStatus === 'add') {
      recordExpNode = this.recordExpandChild(rowItem);
      this.changeSingleExpand(rowItem);
    } else {
      const parent_node_id = rowItem.parent_node_id;
      if (parent_node_id) {
        const pos = this.treeTableArray.findIndex((v) => v.node_id === parent_node_id);
        recordExpNode = this.recordExpandChild(this.treeTableArray[pos]);
        this.changeSingleExpand(this.treeTableArray[pos]);
      }
    }

    for (let i = 0; i < recordExpNode.length; i++) {
      this.toggleNodeExpand(recordExpNode[i], true);
    }
  }

  changeSingleExpand(row) {
    this.toggleNodeExpand(row, false);
    this.toggleNodeExpand(row, true);
  }

  recordExpandChild(row) {
    const recordExpNode = [];
    const allChildCol = this.findChild.getAllChildrenOfItem(row, this.treeTableArray);
    const allChild = highPerformanceFilter(distinct(allChildCol, []), item => (item.node_id !== row.node_id && item.node_type));
    const allChildNodeId = allChild.map(item => item.node_id);
    for (let i = 0; i < this.expandClickArr.length; i++) {
      const node_id = this.expandClickArr[i].node_id;
      if (node_id && allChildNodeId.indexOf(node_id) > -1) {
        recordExpNode.push(this.expandClickArr[i]);
      }
    }
    return recordExpNode;
  }

  addAutoScroll() {
    document.getElementById('data-table-virtual-tree-scroll').scrollTo(0, (this.itemSize * this.scrollArray.length));
  }

  copyAndCut(rowItem, status) {
    this.saveCopyClickNode = [];
    this.saveCutNode = [];
    const res = this.virtualScrollTreeTableCopy.copyAndCut(rowItem, status);
    this.saveCopyClickNode = res.saveCopyClickNode;
    this.saveCutNode = res.saveCutNode;
    this.copyRowNodeId = res.copyRowNodeId;
  }

  paste(rowItem, status) {
    const spliceArr = {
      expandArr: this.expandArr,
      toggledArr: this.toggledArr,
      expandClickArr: this.expandClickArr,
      toggledClickArr: this.toggledClickArr,
      searchRes: this.searchRes,
      searchArr: this.searchArr
    };

    const res = this.virtualScrollTreeTableCopy.paste(rowItem, status, this.treeTableArray, spliceArr);
    this.saveCopyClickNode = res.saveCopyClickNode;
    this.copyRowNodeId = res.copyRowNodeId;
    this.treeTableArray = res.treeTableArray;

    if (this.saveCutNode.length > 0) {
      this.expandArr = res.spliceArr.expandArr;
      this.toggledArr = res.spliceArr.toggledArr;
      this.expandClickArr = res.spliceArr.expandClickArr;
      this.toggledClickArr = res.spliceArr.toggledClickArr;
      this.searchRes = res.spliceArr.searchRes;
      this.searchArr = res.spliceArr.searchArr;
    }

    this.getVisiableNodes();
    if (status === 'paste') {
      this.changeSingleExpand(rowItem);
    } else {
      setTimeout(() => {
        this.addAutoScroll();
      });
    }
  }

  delete(rowItem) {
    const spliceArr = {
      expandArr: this.expandArr,
      toggledArr: this.toggledArr,
      expandClickArr: this.expandClickArr,
      toggledClickArr: this.toggledClickArr,
      searchRes: this.searchRes,
      searchArr: this.searchArr
    };
    const res = this.virtualScrollTreeTableDelete.delete(rowItem, this.treeTableArray, spliceArr);
    this.treeTableArray = res.treeTableArray;
    this.expandArr = res.spliceArr.expandArr;
    this.toggledArr = res.spliceArr.toggledArr;
    this.expandClickArr = res.spliceArr.expandClickArr;
    this.toggledClickArr = res.spliceArr.toggledClickArr;
    this.searchRes = res.spliceArr.searchRes;
    this.searchArr = res.spliceArr.searchArr;
    this.getVisiableNodes();
  }

  onDragOver(e: any) {
    const scrollBoxY = document.getElementById('data-table-virtual-tree-scroll').getBoundingClientRect().y;
    if (scrollBoxY - e.y > 0) {
      document.getElementById('data-table-virtual-tree-scroll').scrollBy(0, -this.itemSize);
    }
    if (e.y - scrollBoxY > this.itemSize * (this.itemCount - 1) - 10) {
      document.getElementById('data-table-virtual-tree-scroll').scrollBy(0, this.itemSize);
    }
  }

  onDrop(e: any) {
    const res = this.virtualScrollTreeTableDrop.onDrop(e, this.visibleNodes, this.itemCount, this.treeTableArray, this.expandArr);
    this.expandArr = res.expandArr;
    this.treeTableArray = res.treeTableArray;

    const newDropParentNode = this.visibleNodes[e.dropIndex - 1];
    if (!newDropParentNode || !newDropParentNode.parent_node_id) {
      if (newDropParentNode ?.node_type === 1 && newDropParentNode ?.expand) {
        this.dropUpdateExpandFolder(newDropParentNode, true);
      } else {
        this.getVisiableNodes();
      }
    } else if (newDropParentNode.parent_node_id) {
      if (newDropParentNode.node_type === 1 && newDropParentNode.expand) {
        this.dropUpdateExpandFolder(newDropParentNode, true);
      } else {
        this.dropUpdateExpandFolder(newDropParentNode, false);
      }
    }
  }

  dropUpdateExpandFolder(newDropParentNode, isParent) {
    setTimeout(() => {
      let recordExpNode = [];
      if (!isParent) {
        const parent_node_id = newDropParentNode.parent_node_id;
        if (parent_node_id) {
          const pos = this.treeTableArray.findIndex((v) => v.node_id === parent_node_id);
          recordExpNode = this.recordExpandChild(this.treeTableArray[pos]);
          this.changeSingleExpand(this.treeTableArray[pos]);
        }
      } else {
        recordExpNode = this.recordExpandChild(newDropParentNode);
        this.changeSingleExpand(newDropParentNode);
      }

      for (let i = 0; i < recordExpNode.length; i++) {
        this.toggleNodeExpand(recordExpNode[i], true);
      }
    });
  }

  saveBtn() {
    this.save.emit(this.treeTableArray);
  }
}
