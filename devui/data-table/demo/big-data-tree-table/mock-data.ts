
const treeTableDataSource1 = {};
const treeTableArray = [];
const treeTableMap = {};

for (let i = 0; i < 10000; i++) {
  const obj = {
   'key': (i + 1).toString(),
   'title': '树一级' + (i + 1),
   'age': 21,
   'date': '2020-' + Math.ceil(Math.random() * 12) + '-17 10:35:28',
   'gender': 'Male',
   'lock': true,
   'type': 'string',
   'level': 1,
   'expand': false,
   'isLeaf': false,
   'isDelete': false,
   '_children': [(i + 1) + '-' + '1']
  };

  const objChild1 = {
    'key': (i + 1) + '-' + '1',
    'title': '树二级' + (i + 1),
    'age': 26,
    'date': '2020-' + Math.ceil(Math.random() * 12) + '-20 10:35:28',
    'gender': 'Female',
    'lock': false,
    'type': 'number',
    'level': 2,
    'expand': false,
    'isLeaf': false,
    'isDelete': false,
    'parentKey': (i + 1).toString(),
    '_children': [(i + 1) + '-' + '1' + '-' + '1'],
  };

  const objChild2 = {
    'key': (i + 1) + '-' + '1' + '-' + '1',
    'title': '树三级' + (i + 1),
    'age': 30,
    'date': '2020-' + Math.ceil(Math.random() * 12) + '-20 10:35:28',
    'gender': 'Male',
    'lock': true,
    'type': 'string',
    'level': 3,
    'expand': false,
    'isLeaf': false,
    'isDelete': false,
    'parentKey': (i + 1) + '-' + '1',
    '_children': [(i + 1) + '-' + '1' + '-' + '1' + '-' + '1'],
  };

  const objChild3 = {
    'key': (i + 1) + '-' + '1' + '-' + '1' + '-' + '1',
    'title': '树四级' + (i + 1),
    'age': 35,
    'date': '2020-' + Math.ceil(Math.random() * 12) + '-20 10:35:28',
    'gender': 'Female',
    'lock': false,
    'type': 'number',
    'level': 4,
    'expand': false,
    'isLeaf': true,
    'isDelete': false,
    'parentKey': (i + 1) + '-' + '1' + '-' + '1'
  };

  treeTableArray.push(obj);
  treeTableArray.push(objChild1);
  treeTableArray.push(objChild2);
  treeTableArray.push(objChild3);
}

treeTableArray.forEach(arr => {
treeTableMap[arr.key] = arr;
});

treeTableDataSource1['treeTableArray'] = treeTableArray;
treeTableDataSource1['treeTableMap'] = treeTableMap;

export const treeTableDataSource = JSON.stringify(treeTableDataSource1);
