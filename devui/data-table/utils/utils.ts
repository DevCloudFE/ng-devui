export const simDeepClone = obj => {
  if (obj === null) { return null; }
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  } else if (typeof obj === 'string') {
    try {
      return JSON.parse(obj);
    } catch (e) {
      console.error(e);
    }
  } else {
    return obj;
  }
};

export const highPerformanceFilter = (arr, func) => {
  let res = [];
  const arrLength = arr.length;
  // 经过调查，在小于10000或大于99999条数据的时候，for循环速度比filter速度会快7至8倍左右
  if (arrLength < 10000 || arrLength > 99999) {
    for (let a = 0; a < arrLength; a++) {
      if (func(arr[a],a)) {
        res.push(arr[a]);
      }
    }
  } else {
    res = arr.filter(func);
  }
  return res;
};


// 生成随机Id
export const generateId = () => {
  let timeStamp = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    timeStamp += performance.now();
  }
  const id = 'aaaaaaaaaaaaaaabaaaaaaaaaaaaaaa'.replace(/[ab]/g, function (item) {
    const res = (timeStamp + Math.random() * 16) % 16 | 0;
    timeStamp = Math.floor(timeStamp / 16);
    return (item === 'a' ? res : (res & 0x3 | 0x8)).toString(16);
  });
  return id;
};

export const highPerformanceExpandObjectInArray = (oldObj, attr) => {
  oldObj[Symbol.iterator] = function() {
    return {
      next:function() {
        const array = Reflect.ownKeys(oldObj);
        if (this.index < array.length-1) {
          const key = array[this.index];
          this.index++;
          return { value: oldObj[key] };
        } else {
          return { done: true };
        }
      },
      index:0
    };
  };
  if(attr) {
    const newObj=[];
    for(let i=0;i<attr.length;i++) {
      if(oldObj.hasOwnProperty(attr[i])) {
        newObj.push(oldObj[attr[i]]);
      }
    }
    return newObj;
  }
  return [...oldObj];
};


// 将一些公共方法拆分出来
export const getNodeIndex = (nodeId, treeTableArray) => { // 找到节点在总数据中的位置的方法
  return treeTableArray.findIndex((v) => v.node_id === nodeId);
};

export class FindChild { // 寻找子节点
  allChildCol: any = [];

  getChildrenOfItem(node, treeTableArray) { // 找到节点下的子节点的方法
    const data: any = highPerformanceFilter(treeTableArray, item => item.parent_node_id === node.node_id);
    return data;
  }

  getAllChildrenOfItem(node, treeTableArray) { // 找到节点下所有子集的方法
    this.allChildCol = [];
    this.getAllChildrenData(node, treeTableArray);
    return this.allChildCol;
  }

  getAllChildrenData(node, treeTableArray) {
    const childData = this.getChildrenOfItem(node, treeTableArray);
    const newArray = [...childData];
    newArray.push(node);
    this.allChildCol = [...this.allChildCol, ...newArray];
    for(let i=0; i<childData.length; i++) {
      if(childData[i].node_type) {
        this.getAllChildrenData(childData[i], treeTableArray);
      }
    }
  }
}

export const distinct = (recordArr, nodeArr) => { // 数组去重的方法
  const arr = recordArr.concat(nodeArr);
  const result = [];
  const obj = {};
  for(const i of arr) {
    if(!obj[i.node_id]) {
      result.push(i);
      obj[i.node_id] = 1;
    }
  }
  return result;
};

export const highPerformanceMap = (arr, func) => {
  let res = [];
  const arrLength = arr.length;
  if (arrLength < 10000 || arrLength > 99999) {
    for (let a = 0; a < arrLength; a++) {
      const rs=func(arr[a],a);
      if (rs) {
        res.push(rs);
      }
    }
  } else {
    res = arr.map(func);
  }
  return res;
};
