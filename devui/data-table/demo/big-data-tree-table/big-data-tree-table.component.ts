import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { treeTableDataSource } from './mock-data';
import { highPerformanceFilter, simDeepClone } from './utils/utils';

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
  selector: 'd-big-data-tree-table',
  templateUrl: './big-data-tree-table.component.html',
  styleUrls: ['./big-data-tree-table.component.scss']
})
export class BigDataTreeTableComponent implements OnInit {
  itemSize = 40;
  itemCount = 10;
  tableHeight = '100%';
  get initData() {
    return highPerformanceFilter(this.treeTableArray, item => !item.parentKey);
  }
  get allTableData() {
    return simDeepClone(this.treeTableArray);
  }
  isOpenAll = false;
  treeTableMap: { [key: string]: TreeNodeInterface } = {};
  treeTableArray: TreeNodeInterface[] = [];
  visibleNodes: TreeNodeInterface[] = [];
  iconParentOpen: string;
  iconParentClose: string;
  basicDataSource: any = JSON.parse(treeTableDataSource);
  expandArr: Array<any> = [];
  expandItemKeys: Array<any> = [];
  awayArr: Array<any> = [];
  awayItemKeys: Array<any> = [];
  countNum: any = 0;
  totleItem: Number = 0;
  scrollArray: Array<any> = [];
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  tableWidthConfig: TableWidthConfig[] = [
    {
      field: '#',
      width: '150px'
    },
    {
      field: 'title',
      width: '200px'
    },
    {
      field: 'lock',
      width: '20%'
    },
    {
      field: 'type',
      width: '20%'
    },
    {
      field: 'age',
      width: '30%'
    },
    {
      field: 'gender',
      width: '20%'
    },
    {
      field: 'date',
      width: '30%'
    }
  ];
  dataTableOptions = {
    columns: [
      {
        field: 'lock',
        header: 'Lock'
      },
      {
        field: 'type',
        header: 'Type'
      },
      {
        field: 'age',
        header: 'Age'
      },
      {
        field: 'gender',
        header: 'Gender'
      },
      {
        field: 'date',
        header: 'Date of birth'
      }
    ]
  };

  constructor() { }
  ngOnInit() {
    new Promise((resolve, reject) => {
      try {
        this.basicDataSource = simDeepClone(this.basicDataSource);
        this.treeTableArray = this.basicDataSource.treeTableArray;
        this.totleItem = this.treeTableArray.length;
        this.treeTableMap = this.basicDataSource.treeTableMap;
        this.countNum = this.initData.length;
        this.scrollArray = Array.from(this.initData.keys());
        resolve(true);
      } catch (error) {
        reject(error);
      }

    }).then(() => {
      this.visibleNodes = simDeepClone(this.initData.slice(0, this.itemCount));
    });
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
    if (this.isOpenAll) {
      this.expandArr = [];
      if (this.awayArr.length > 0) {
        this.setScrollLength(originalDataLength - this.awayArr.length);
        const newTreeTableArray = this.assemblyAwayData(this.allTableData, this.awayArr);
        this.setVisibleNodes(newTreeTableArray.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount), true);
        const keyArr = [];
        for (let i = 0; i < this.awayArr.length; i++) {
          keyArr.push(this.awayArr[i].parentKey);
        }
        for (let i = 0; i < this.visibleNodes.length; i++) {
          if (keyArr.includes(this.visibleNodes[i].key)) { this.visibleNodes[i].expand = false; }
        }
      } else {
        this.setScrollLength(this.treeTableArray.length);
        this.setVisibleNodes(this.treeTableArray.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount), true);
      }
    } else {
      this.awayArr = [];
      if (this.expandArr.length > 0) {
        this.setScrollLength(this.initData.length + this.expandArr.length);
        const newInitData = this.assemblyExpandData(this.initData, this.expandArr);
        this.visibleNodes = simDeepClone(newInitData.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount));
        const visibleNodesKeys = this.visibleNodes.map(item => item.key);
        let parentKey;
        for (let i = 0; i < this.expandArr.length; i++) {
          parentKey = this.expandArr[i].parentKey;
          if (parentKey && visibleNodesKeys.indexOf(parentKey) > -1) {
            this.visibleNodes.filter(o => o.key === parentKey)[0].expand = true;
          }
        }
      } else {
        this.setScrollLength(this.initData.length);
        this.setVisibleNodes(this.initData.slice(firstVisibleIndex, firstVisibleIndex + this.itemCount), false);

      }
    }
  }

  assemblyExpandData(InitData, expandArr) {
    const newExpandArr = [];
    let parentKey;
    for (let i = 0; i < expandArr.length; i++) {
      parentKey = expandArr[i].parentKey;
      const pos = InitData.findIndex((v) => v.key === parentKey);
      if (pos !== -1) {
        InitData.splice(pos + 1, 0, expandArr[i]);
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

  assemblyAwayData(arrayData, awayArr) {
    let key;
    for (let i = 0; i < awayArr.length; i++) {
      key = awayArr[i].key;
      const pos = arrayData.findIndex((v) => v.key === key);
      if (pos !== -1) {
        arrayData.splice(pos, 1);
      }
    }
    return arrayData;
  }

  scrollFunc(e) {
    const event = e || window.event;
    const wheelDelta = event.wheelDelta;
    const step = (wheelDelta === 0 ? 0 : wheelDelta / Math.abs(wheelDelta)) * (-this.itemSize);
    document.getElementById('big-data-tree-table-virtualScroll').scrollBy(0, step);
  }
  onBodyScroll() {
    this.getVisiableNodes();
  }
  toggleAllNodesExpand(e) {
    this.isOpenAll = e;
    this.getVisiableNodes();
  }
  getNodeIndex = (key) => {
    return this.treeTableArray.findIndex((v) => v.key === key);
  }
  toggleNodeExpand(node: TreeNodeInterface, index: number, $event: boolean): void {
    this.isOpenAll ? this.operationAwayArr(node, $event ? 'add' : 'del') : this.operationExpandArr(node, $event ? 'add' : 'del');
    this.getVisiableNodes();

    if (!node.expand && node.key === this.visibleNodes[this.visibleNodes.length - 1].key) {
      this.autoScrollBy();
    }
  }

  autoScrollBy() {
    document.getElementById('big-data-tree-table-virtualScroll').scrollBy(0, this.itemSize * 5);
  }

  operationExpandArr(node, status) {
    if (status === 'add') {
      const showNodes = this.getChildrenOfItem(node);
      this.expandArr.push.apply(this.expandArr, showNodes);
      this.expandArr = [...new Set(this.expandArr)];
      this.expandItemKeys = [...new Set([...this.expandItemKeys, node.key])];
    } else {
      this.expandArr = this.expandArr.filter(items => {
        if (!items.key.startsWith(node.key + '-')) { return items; }
      });
      this.expandItemKeys = this.expandItemKeys.filter(items => {
        if (!items.startsWith(node.key)) { return items; }
      });
    }
  }

  getChildrenOfItem(node) {
    const currentItemPos = this.getNodeIndex(node.key) + 1;
    return this.treeTableArray.slice(
      currentItemPos, currentItemPos + node._children.length
    );
  }

  operationAwayArr(node, status) {
    if (status === 'add') {
      const showNodes = this.getChildrenOfItem(node);
      const awayArrKey = this.awayArr.map(item => item.key);
      let key;
      for (let i = 0; i < showNodes.length; i++) {
        key = showNodes[i].key;
        if (key && awayArrKey.indexOf(key) > -1) {
          const index = this.awayArr.findIndex((v) => v.key === key);
          this.awayArr.splice(index, 1);
        }
      }
      this.expandItemKeys = [...new Set([...this.expandItemKeys, node.key])];
    } else {
      const endKey = (Number((node.key).split('-')[0]) + 1).toString();
      const endPos = this.getNodeIndex(endKey);
      const showNodes = this.treeTableArray.slice(this.getNodeIndex(node.key) + 1, endPos);
      this.awayArr = [...new Set([...this.awayArr, ...showNodes])];
    }
  }
}
