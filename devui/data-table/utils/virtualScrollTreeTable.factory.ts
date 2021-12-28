import {
  distinct, FindChild, generateId, getNodeIndex, highPerformanceExpandObjectInArray, highPerformanceFilter, simDeepClone
} from './utils';


// 删除
export class VirtualScrollTreeTableDelete {
  findChild: any;

  delete(rowItem, treeTableArray, spliceArr) {
    this.findChild = new FindChild();
    const allChildCol = this.findChild.getAllChildrenOfItem(rowItem, treeTableArray);
    const allChild = distinct(allChildCol, []);
    this.deleteChooseData(allChild, treeTableArray);
    this.deleteAllRecord(allChild, spliceArr);
    return {treeTableArray: treeTableArray, spliceArr: spliceArr};
  }

  deleteChooseData(allChild, treeTableArray) {
    for(let i=0; i<allChild.length; i++) {
      const node_id = allChild[i].node_id;
      const pos = treeTableArray.findIndex((v) => v.node_id === node_id);
      if(pos !== -1) {
        treeTableArray.splice(pos, 1);
      }
    }
  }

  deleteAllRecord(allChild, spliceArr) {
    spliceArr.expandArr = this.deleteRecordArrData(allChild, spliceArr.expandArr);
    spliceArr.toggledArr = this.deleteRecordArrData(allChild, spliceArr.toggledArr);
    spliceArr.expandClickArr = this.deleteRecordArrData(allChild, spliceArr.expandClickArr);
    spliceArr.toggledClickArr = this.deleteRecordArrData(allChild, spliceArr.toggledClickArr);
    spliceArr.searchRes = this.deleteRecordArrData(allChild, spliceArr.searchRes);
    spliceArr.searchArr = this.deleteRecordArrData(allChild, spliceArr.searchArr);
  }

  deleteRecordArrData(allChild, arr) {
    if(arr.length > 0) {
      const allChildNodeId = allChild.map(item => item.node_id);
      let node_id;
      for(let i=0; i<arr.length; i++) {
        node_id = arr[i].node_id;
        if(node_id && allChildNodeId.indexOf(node_id) > -1) {
          arr[i].node_id = "";
        }
      }
      arr = highPerformanceFilter(arr, item => item.node_id !== "");
    }
    return arr;
  }
}


// 新增
export class VirtualScrollTreeTableAdd {
  findChild: any;

  addGolbal(status, treeTableArray, addTemplate?) {
    if(addTemplate) {
      treeTableArray = this.addData(status, treeTableArray, addTemplate);
    } else {
      treeTableArray = this.addData(status, treeTableArray);
    }
    return treeTableArray;
  }

  addOperation(rowItem, status, treeTableArray, addTemplate?) {
    let dataObj: any;
    if(addTemplate) {
      dataObj = this.addData(status, treeTableArray, addTemplate);
    } else {
      dataObj = this.addData(status, treeTableArray);
    }
    const lastDataObj = this.getoperationAddData(status, rowItem, dataObj);
    this.changeOperationAdd(lastDataObj, treeTableArray);
    return treeTableArray;
  }

  addData(type, treeTableArray, addTemplate?) {
    const newType = (type==='node' || type==='addDataNode' || type==='insertDataNode') ? "node" : "folder";
    const properties = this.getAddDataProperties(newType, treeTableArray);
    let obj: any = {};
    if(addTemplate) {
      obj = {...properties, ...addTemplate};
    } else {
      obj = {
        "id": properties.id,
        "type": properties.type,
        "name": properties.name,
        "property": "",
        "description": "",
        "locked": 0,
        "create_user": "张三",
        "create_time": "2021-08-31T00:00:00.000+00:00",
        "update_user": "李四",
        "update_time": "2021-08-31T00:00:00.000+00:00",
        "node_type": properties.node_type,
        "node_id": properties.node_id,
        "by_order": properties.by_order,
        "category": "Static",
        "update_time_string": "2021-08-31 00:00:00",
        "create_time_string": "2021-08-31 00:00:00"
      };
    }
    if(type === 'node' || type === 'folder') {
      treeTableArray.push(obj);
      return treeTableArray;
    } else {
      return obj;
    }
  }

  getAddDataProperties(type, treeTableArray) {
    return {
      id: generateId(),
      node_id: generateId(),
      node_type: type === 'node' ? 0 : 1,
      type: type === 'node'? 'String' : '',
      name: this.getAddName(type, treeTableArray),
      by_order: treeTableArray.length + 1
    };
  }

  getAddName(type, treeTableArray) {
    let name = "";
    const namePrefix = type === 'node'? 'New_Variable_' : 'New_Folder_';
    const arr = treeTableArray;
    const newDataArr = highPerformanceFilter(arr, item => {
      if(item.name.includes(namePrefix)) {return item;}
    });
    if(newDataArr.length > 0) {
      const newDataNumArr = [];
      newDataArr.forEach(item => {
        newDataNumArr.push(Number(item.name.split('_')[2]));
      });
      newDataNumArr.sort((a, b) => {
        return a - b;
      });
      name = namePrefix + (newDataNumArr[newDataNumArr.length - 1] + 1).toString();
    } else {
      name = namePrefix + "1";
    }
    return name;
  }

  getoperationAddData(type, rowItem, dataObj) {
    const parent_node_id = this.getAddParentId(type, rowItem);
    if(parent_node_id) {
      dataObj.parent_node_id = parent_node_id;
    } else {
      dataObj.posId = rowItem.node_id;
    }
    dataObj.by_order = 0;
    return dataObj;
  }

  getAddParentId(type, rowItem) {
    let parent_node_id = "";
    if(type === 'addDataNode' || type === 'addDataFolder') {
      parent_node_id = rowItem.node_id;
    } else {
      if(rowItem.parent_node_id) {
        parent_node_id = rowItem.parent_node_id;
      }
    }
    return parent_node_id;
  }

  changeOperationAdd(data, treeTableArray) {
    const parent_node_id = data.parent_node_id;
    let pos;
    if(parent_node_id) {
      pos = treeTableArray.findIndex((v) => v.node_id === parent_node_id);
    } else {
      const posId = data.posId;
      pos = treeTableArray.findIndex((v) => v.node_id === posId);
    }
    this.insertData(data, pos, treeTableArray);
  }

  insertData(data, pos, treeTableArray) {
    if(pos !== -1) {
      this.findChild = new FindChild();
      const allChildCol = this.findChild.getAllChildrenOfItem(treeTableArray[pos], treeTableArray);
      const childData = distinct(allChildCol, []);
      if(childData.length > 0) {
        const realPos = pos + childData.length;
        if(Array.isArray(data)) {
          for(let i=0; i<data.length; i++) {
            treeTableArray.splice(realPos + i, 0, data[i]);
          }
        } else {
          treeTableArray.splice(realPos, 0, data);
        }
      } else {
        if(Array.isArray(data)) {
          for(let i=0; i<data.length; i++) {
            treeTableArray.splice(pos + 1 + i, 0, data[i]);
          }
        } else {
          treeTableArray.splice(pos + 1, 0 ,data);
        }
      }
    }
  }
}


// 复制、粘贴
export class VirtualScrollTreeTableCopy {
  findChild: any;

  saveCopyClickNode: any = [];
  saveCopyNode: any = [];
  copyRowNodeId = '';
  saveCutNode: any = [];
  saveCopyRowChild: any = [];
  isAgainCopy = false;

  treeTableArray: any = [];

  spliceArr: any = {};

  copyAndCut(rowItem, status) {
    this.isAgainCopy = true;
    this.saveCopyClickNode = [];
    this.saveCutNode = [];
    this.saveCopyClickNode.push(rowItem);
    if(status === 'cut') {
      this.saveCutNode.push(rowItem);
    }
    this.copyRowNodeId = rowItem.node_id;

    return {saveCopyClickNode: this.saveCopyClickNode, saveCutNode: this.saveCutNode, copyRowNodeId: this.copyRowNodeId};
  }

  paste(rowItem, status, treeTableArray, spliceArr) {
    this.spliceArr = spliceArr;
    this.treeTableArray = treeTableArray;
    this.copyData();
    this.pastData(rowItem, status);
    this.isAgainCopy = false;
    return {
      saveCopyClickNode: this.saveCopyClickNode,
      copyRowNodeId: this.copyRowNodeId,
      treeTableArray: this.treeTableArray,
      spliceArr: this.spliceArr
    };
  }

  copyData() {
    this.saveCopyNode = [];
    let copyStatus;
    if(this.saveCutNode.length > 0) {
      copyStatus = 'cut';
    } else {
      copyStatus = 'copy';
    }
    this.saveCopyNode.push(this.changeCopyNodeName(this.saveCopyClickNode[0], copyStatus));
    this.saveCopyNode = this.saveCopyNode.flat(Infinity);
  }

  changeCopyNodeName(rowItem, status) {
    const copyRowItem = simDeepClone(rowItem);
    if(copyRowItem.node_type) {
      let copyRows;
      if(this.isAgainCopy) {
        copyRows = this.getCopyRows(copyRowItem);
        this.saveCopyRowChild = copyRows;
      } else {
        copyRows = this.saveCopyRowChild;
      }
      if(status === 'copy') {
        const newRows = this.changeCopyDataParent(copyRows);
        return newRows;
      } else {
        copyRows.forEach(arr => {
          arr.by_order = 0;
        });
        return copyRows;
      }
    } else {
      if(status === 'copy') {
        this.changeCopyData(copyRowItem);
      } else {
        copyRowItem["by_order"] = 0;
      }
      return copyRowItem;
    }
  }

  getCopyRows(copyRowItem) {
    this.findChild = new FindChild();
    const allChildCol = this.findChild.getAllChildrenOfItem(copyRowItem, this.treeTableArray);
    const allChildLen = distinct(allChildCol, []).length;
    const slicePos = (this.treeTableArray.findIndex((v) => v.node_id === copyRowItem.node_id));
    const copyRows = simDeepClone(this.treeTableArray.slice(slicePos, slicePos + allChildLen));
    return copyRows;
  }


  changeCopyDataParent(copyRows) {
    const newRows = simDeepClone(copyRows);
    for(let i=0; i<newRows.length; i++) {
      this.changeCopyData(newRows[i]);
      highPerformanceFilter(copyRows, (item, index) => {
        if(item.parent_node_id === copyRows[i].node_id) {
          newRows[index].parent_node_id = newRows[i].node_id;
        }
      });
    }
    return newRows;
  }

  changeCopyData(rowData) {
    rowData["id"] = generateId();
    rowData["name"] = this.getCopyName(rowData['name']);
    rowData["node_id"] = generateId();
    rowData["by_order"] = 0;
  }

  getCopyName(name) {
    let newName = name + '_';
    const newDataArr = highPerformanceFilter(this.treeTableArray, item => {
      if(item.name.includes(newName)) {return item;}
    });
    if(newDataArr.length > 0) {
      const newDataNumArr = [];
      newDataArr.forEach(arr => {
        const numArr = arr.name.split('_');
        let num = Number(numArr[numArr.length - 1]);
        if(!num) {
          num = 0;
        }
        newDataNumArr.push(num);
      });
      newDataNumArr.sort((a, b) => {
        return a - b;
      });
      newName = newName + (newDataNumArr[newDataNumArr.length - 1] + 1).toString();
    } else {
      newName = newName + '1';
    }
    return newName;
  }

  pastData(rowItem, status) {
    if(this.saveCutNode.length > 0) {
      const cutPos = this.treeTableArray.findIndex((v) => v.node_id === this.saveCutNode[0].node_id);
      this.findChild = new FindChild();
      const allChildCol = this.findChild.getAllChildrenOfItem(this.treeTableArray[cutPos], this.treeTableArray);
      const childData = distinct(allChildCol, []);
      for(let i=0; i<childData.length; i++) {
        const pos = this.treeTableArray.findIndex((v) => v.node_id === childData[i].node_id);
        if(pos !== -1) {
          this.treeTableArray.splice(pos, 1);
        }
      }
      this.spliceArr = this.deleteAllRecord(childData, this.spliceArr);

      this.pastPublicOperation(rowItem, status);
      this.saveCopyClickNode = [];
      this.copyRowNodeId = "";
    } else {
      this.pastPublicOperation(rowItem, status);
    }
  }

  pastPublicOperation(rowItem, status) {
    if(status === 'paste') {
      this.pastChangeCopyData(rowItem);
    } else {
      this.pastToRootChangeCopyData();
    }
  }

  pastChangeCopyData(rowItem) {
    this.saveCopyNode[0].parent_node_id = rowItem.node_id;
    const pos = this.treeTableArray.findIndex((v) => v.node_id === rowItem.node_id);
    this.insertData(this.saveCopyNode, pos);
  }

  insertData(data, pos) {
    if(pos !== -1) {
      this.findChild = new FindChild();
      const allChildCol = this.findChild.getAllChildrenOfItem(this.treeTableArray[pos], this.treeTableArray);
      const childData = distinct(allChildCol, []);
      if(childData.length > 0) {
        const realPos = pos + childData.length;
        if(Array.isArray(data)) {
          for(let i=0; i<data.length; i++) {
            this.treeTableArray.splice(realPos + i, 0, data[i]);
          }
        } else {
          this.treeTableArray.splice(realPos, 0, data);
        }
      } else {
        if(Array.isArray(data)) {
          for(let i=0; i<data.length; i++) {
            this.treeTableArray.splice(pos + 1 + i, 0, data[i]);
          }
        } else {
          this.treeTableArray.splice(pos + 1, 0 ,data);
        }
      }
    }
  }

  pastToRootChangeCopyData() {
    if(this.saveCopyNode[0].parent_node_id) {
      delete this.saveCopyNode[0].parent_node_id;
    }
    this.treeTableArray = [...this.treeTableArray, ...this.saveCopyNode];
  }

  deleteAllRecord(allChild, spliceArr) {
    spliceArr.expandArr = this.deleteRecordArrData(allChild, spliceArr.expandArr);
    spliceArr.toggledArr = this.deleteRecordArrData(allChild, spliceArr.toggledArr);
    spliceArr.expandClickArr = this.deleteRecordArrData(allChild, spliceArr.expandClickArr);
    spliceArr.toggledClickArr = this.deleteRecordArrData(allChild, spliceArr.toggledClickArr);
    spliceArr.searchRes = this.deleteRecordArrData(allChild, spliceArr.searchRes);
    spliceArr.searchArr = this.deleteRecordArrData(allChild, spliceArr.searchArr);
    return spliceArr;
  }

  deleteRecordArrData(allChild, arr) {
    if(arr.length > 0) {
      const allChildNodeId = allChild.map(item => item.node_id);
      let node_id;
      for(let i=0; i<arr.length; i++) {
        node_id = arr[i].node_id;
        if(node_id && allChildNodeId.indexOf(node_id) > -1) {
          arr[i].node_id = "";
        }
      }
      arr = highPerformanceFilter(arr, item => item.node_id !== "");
    }
    return arr;
  }
}

// 拖拽
export class VirtualScrollTreeTableDrop {
  findChild: any;

  visibleNodes: any;
  itemCount: any;
  expandArr: any;
  treeTableArray: any;

  onDrop(e: any, visibleNodes, itemCount, treeTableArray, expandArr) {
    this.visibleNodes = visibleNodes;
    this.itemCount = itemCount;
    this.expandArr = expandArr;
    this.treeTableArray = treeTableArray;

    const dragFromIndex = e.dragFromIndex;
    let dropIndex = e.dropIndex; let realToIndex;

    if(dropIndex < 0) {
      dropIndex = 0;
    } else if(dropIndex > itemCount) {
      dropIndex = itemCount;
    }

    if (dropIndex < dragFromIndex) {
      dropIndex++;
    }

    const realFromIndex = getNodeIndex(e.dragData.node_id, this.treeTableArray);
    realToIndex = dropIndex < this.itemCount ?
      getNodeIndex(this.visibleNodes[dropIndex].node_id, this.treeTableArray)
      : getNodeIndex(this.visibleNodes[dropIndex - 1].node_id, this.treeTableArray);
    if (realToIndex > realFromIndex && dropIndex < dragFromIndex) {
      realToIndex--;
    }
    if (realToIndex < realFromIndex && dropIndex > dragFromIndex) {
      realToIndex++;
    }
    const newDropParentNode = this.visibleNodes[dropIndex - 1];
    this.changeNodeInfoByDrop(newDropParentNode, realFromIndex);

    const moveCount = dragFromIndex === dropIndex ? 0
      : !this.visibleNodes[dropIndex] || realToIndex > realFromIndex ? 1
        : getNodeIndex(this.visibleNodes[dropIndex].node_id, this.treeTableArray)
        - getNodeIndex(this.visibleNodes[dropIndex - 1].node_id, this.treeTableArray);
    const targetIndex = dropIndex < this.itemCount ? realToIndex - moveCount : realToIndex;
    this.treeTableArray.splice(
      targetIndex,
      0,
      realFromIndex === -1 ? e.dragData : this.treeTableArray.splice(realFromIndex, 1)[0]
    );

    return {expandArr: this.expandArr, treeTableArray: this.treeTableArray};
  }

  changeNodeInfoByDrop(newDropParentNode, realFromIndex) {
    const findIndex = this.expandArr.findIndex(value => value.node_id === this.treeTableArray[realFromIndex].node_id);
    if (!newDropParentNode || !newDropParentNode.parent_node_id) {
      this.dropToRoot(findIndex, realFromIndex, newDropParentNode);
    } else if (newDropParentNode.parent_node_id) {
      this.dropToChild(findIndex, realFromIndex, newDropParentNode);
    }
  }

  dropToRoot(findIndex, realFromIndex, newDropParentNode) {
    if (newDropParentNode?.node_type === 1 && newDropParentNode?.expand) {
      this.treeTableArray[realFromIndex].parent_node_id = newDropParentNode.node_id;
      findIndex > -1 ?
        this.expandArr[findIndex].parent_node_id = newDropParentNode.node_id
        :
        this.expandArr.push(this.treeTableArray[realFromIndex]);
    } else {
      if (this.treeTableArray[realFromIndex].parent_node_id) {
        delete this.treeTableArray[realFromIndex].parent_node_id;
        if (findIndex > -1) {
          this.expandArr.splice(findIndex, 1);
        }
      }
    }
  }

  dropToChild(findIndex, realFromIndex, newDropParentNode) {
    if (newDropParentNode.node_type === 1 && newDropParentNode.expand) {
      this.treeTableArray[realFromIndex].parent_node_id = newDropParentNode.node_id;
      findIndex > -1 ?
        this.expandArr[findIndex].parent_node_id = newDropParentNode.node_id
        :
        this.expandArr.push(this.treeTableArray[realFromIndex]);
    } else {
      this.treeTableArray[realFromIndex].parent_node_id = newDropParentNode.parent_node_id;
      if (findIndex > -1) {
        this.expandArr[findIndex].parent_node_id = newDropParentNode.parent_node_id;
      }
    }
  }
}

// 搜索
export class VirtualScrollTreeTableSearch {
  beforeSearchTarget: any;
  searchRes: Array<any> = [];
  searchArr: Array<any> = [];
  isSearch = false;
  searchKeyArr: Array<any> = [];
  parentData: Array<any> = [];
  searchAttr: any = {};
  treeTableArray: any;

  search(searchTarget, searchAttr, treeTableArray) {
    this.searchAttr = searchAttr;
    this.treeTableArray = treeTableArray;

    this.beforeSearchTarget = searchTarget;
    this.searchRes = [];
    this.searchArr = [];
    if (searchTarget) {
      this.isSearch = true;
      const attr = this.searchAttr.value;
      if (this.treeTableArray.length < 100) {
        this.getSearchDataLittle(this.treeTableArray, searchTarget, attr);
      } else {
        this.getSearchData(this.treeTableArray, this.treeTableArray.length, searchTarget, attr);
      }
      this.searchKeyArr = [];
    } else {
      this.isSearch = false;
    }

    return {beforeSearchTarget: this.beforeSearchTarget, searchRes: this.searchRes, searchArr: this.searchArr, isSearch: this.isSearch};
  }

  getSearchDataLittle(data, searchTarget, attr) {
    const lowSearchTarget = searchTarget.toLowerCase();
    if(attr === 'all') {
      for(let i=0; i<data.length; i++) {
        const searchProper = highPerformanceExpandObjectInArray(data[i], ['name', 'property', 'category', 'description']).join("丅");
        const searchScope = JSON.stringify(searchProper).toLowerCase().includes(lowSearchTarget);
        this.searchResData(searchTarget, searchScope, data[i]);
      }
    } else {
      for(let i=0; i<data.length; i++) {
        const searchProper = highPerformanceExpandObjectInArray(data[i], [attr]).join("丅");
        const searchScope = JSON.stringify(searchProper).toLowerCase().includes(lowSearchTarget);
        this.searchResData(searchTarget, searchScope, data[i]);
      }
    }
  }

  getSearchData(data, len, searchTarget, attr) {
    const lowSearchTarget = searchTarget.toLowerCase();
    const loopNum = this.calculationDataNum(len);
    for (let i = 0; i < len;) {
      const preparationData = this.sliceToGroupData(data, loopNum, len, i, attr, lowSearchTarget);
      const searchData = preparationData[0];
      const inArr = preparationData[1];
      if (inArr) {
        if (loopNum <= 10) {
          this.searchRes.push.apply(this.searchRes, this.getLastSearchData(searchData, attr, searchTarget, lowSearchTarget));
        } else {
          this.getSearchData(searchData, searchData.length, searchTarget, attr);
        }
      }
      if (len - i >= loopNum) {
        i += loopNum;
      } else {
        i = len;
      }
    }
  }

  sliceToGroupData(data, groupNum, len, num, attr, lowSearchTarget) {
    let sliceNum = groupNum;
    if (len - num < groupNum) {
      sliceNum = 0;
    }
    const preparationData = this.batchFilterData(data, num, sliceNum, attr, lowSearchTarget);
    return preparationData;
  }

  batchFilterData(data, num, sliceNum, attr, lowSearchTarget) {
    const rtnData = [];
    let everySearchData;
    if (sliceNum > 0) {
      everySearchData = data.slice(num, num + sliceNum);
    } else {
      everySearchData = data.slice(num);
    }
    let everySearchDataAttr;
    if(attr === 'all') {
      everySearchDataAttr = everySearchData.filter(
        item => highPerformanceExpandObjectInArray(item, ['name', 'property', 'category', 'description']).join("丅")
      );
    } else {
      everySearchDataAttr = everySearchData.filter(item => highPerformanceExpandObjectInArray(item, [attr]).join("丅"));
    }
    const inArr = (JSON.stringify(everySearchDataAttr).toLowerCase()).includes(lowSearchTarget);
    rtnData.push(everySearchData, inArr);
    return rtnData;
  }

  getLastSearchData(lastSearchData, attr, searchTarget, lowSearchTarget) {
    let searchRes = [];
    if(attr === 'all') {
      for (let m = 0; m < lastSearchData.length; m++) {
        const searchProper = highPerformanceExpandObjectInArray(
          lastSearchData[m], ['name', 'property', 'category', 'description']
        ).join("丅");
        const searchScope = JSON.stringify(searchProper).toLowerCase().includes(lowSearchTarget);
        searchRes = this.searchResData(searchTarget, searchScope, lastSearchData[m], searchRes);
      }
    } else {
      for (let m = 0; m < lastSearchData.length; m++) {
        const searchProper = highPerformanceExpandObjectInArray(lastSearchData[m], [attr]).join("丅");
        const searchScope = JSON.stringify(searchProper).toLowerCase().includes(lowSearchTarget);
        searchRes = this.searchResData(searchTarget, searchScope, lastSearchData[m], searchRes);
      }
    }
    return searchRes;
  }

  searchResData(searchTarget, searchScope, data, searchRes?) {
    if (searchTarget && searchScope) {
      this.getLastSearchParentData(data);
      if (this.parentData.length > 0) {
        if(searchRes) {
          searchRes = [...searchRes, ...this.parentData];
        } else {
          this.searchRes = [...this.searchRes, ...this.parentData];
        }
        this.parentData = [];
      }
      if (this.searchKeyArr.indexOf(data.node_id) === -1) {
        if(searchRes) {
          searchRes.push(data);
        } else {
          this.searchRes.push(data);
        }
        this.searchKeyArr.push(data.node_id);
      }
    }
    if(searchRes) {
      return searchRes;
    }
  }

  getLastSearchParentData(data) {
    const parent_node_id = data.parent_node_id;
    if (parent_node_id) {
      const getData = highPerformanceFilter(this.treeTableArray, item => item.node_id === parent_node_id);
      if (this.searchKeyArr.indexOf(getData[0].node_id) === -1) {
        this.parentData.push(getData[0]);
        this.searchKeyArr.push(getData[0].node_id);
      }
      if (getData[0].parent_node_id) {
        this.getLastSearchParentData(getData[0]);
      } else {
        this.parentData.reverse();
      }
    }
  }

  calculationDataNum(len) {
    const lenStr = len.toString();
    const countNum = lenStr.substr(0, 1);
    const remainderNum = lenStr.substr(1, lenStr.length - 1);
    let loopNum = '1';
    if (Number(remainderNum) === 0 && Number(countNum) === 1) {
      for (let i = 0; i < remainderNum.length - 1; i++) {
        loopNum += '0';
      }
    } else {
      for (let i = 0; i < remainderNum.length; i++) {
        loopNum += '0';
      }
    }
    return Number(loopNum);
  }
}
