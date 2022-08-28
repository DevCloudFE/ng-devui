export interface SourceType {
  id?: number;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  detail?: string;
  $checked?: boolean;
  $expandConfig?: any;
  children?: any;
  chosen?: boolean;
  $isChildTableOpen?: boolean;
}

export const originSource = [
  {
    id: 1,
    firstName: 'Mark',
    lastName: 'Otto',
    dob: new Date(1990, 12, 1),
    gender: 'Male',
    description: 'handsome man'
  },
  {
    id: 2,
    firstName: 'Jacob',
    lastName: 'Thornton',
    gender: 'Female',
    dob: new Date(1989, 1, 1),
    description: 'interesting man'
  },
  {
    id: 3,
    firstName: 'Danni',
    lastName: 'Chen',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
    description: 'pretty man',
    expandConfig: {description: 'Danni is here'}
  },
  {
    id: 4,
    firstName: 'green',
    lastName: 'gerong',
    gender: 'Male',
    description: 'interesting man',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 5,
    firstName: 'po',
    lastName: 'lang',
    gender: 'Male',
    dob: new Date(1991, 3, 1),
    description: 'lang is here',
  },
  {
    id: 6,
    firstName: 'john',
    lastName: 'li',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
    description: 'pretty man',
  },
  {
    id: 7,
    firstName: 'peng',
    lastName: 'li',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 8,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 9,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
    detail: '这是另外一个行详情'
  },
  {
    id: 10,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 11,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 12,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
];

export const editableOriginSource = [
  {
    id: 1,
    firstName: 'Mark',
    lastName: 'Otto',
    dob: new Date(1990, 12, 1),
    gender: { id: 1, label: 'Male' },
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 2,
    firstName: 'Jacob',
    lastName: 'Thornton',
    gender: { id: 2, label: 'Female' },
    dob: new Date(1989, 1, 1),
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 3,
    firstName: 'Danni',
    lastName: 'Chen',
    gender: { id: 2, label: 'Female' },
    dob: new Date(2018, 3, 1),
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 4,
    firstName: 'green',
    lastName: 'gerong',
    gender: { id: 1, label: 'Male' },
    dob: new Date(2018, 3, 1),
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 5,
    firstName: 'po',
    lastName: 'lang',
    gender: { id: 1, label: 'Male' },
    dob: new Date(2018, 3, 1),
    detail: '这是一个行详情',
    age: 24,
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 6,
    firstName: 'john',
    lastName: 'li',
    gender: { id: 2, label: 'Female' },
    dob: new Date(2018, 3, 1),
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 7,
    firstName: 'peng',
    lastName: 'li',
    gender: { id: 2, label: 'Female' },
    dob: new Date(2018, 3, 1),
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 8,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: { id: 2, label: 'Female' },
    dob: new Date(2018, 3, 1),
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 9,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: { id: 2, label: 'Female' },
    dob: new Date(2018, 3, 1),
    detail: '这是另外一个行详情',
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 10,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: { id: 2, label: 'Female' },
    dob: new Date(2018, 3, 1),
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 11,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: { id: 2, label: 'Female' },
    dob: new Date(2018, 3, 1),
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
  {
    id: 12,
    firstName: 'Danni',
    lastName: 'Yu',
    gender: { id: 2, label: 'Female' },
    dob: new Date(2018, 3, 1),
    age: 24,
    hobby: [{ id: 1, name: 'music' },
      { id: 2, name: 'football' }],
    duty: [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }]
  },
];

export const genderSource = [
  { id: 1, label: 'Male' },
  { id: 2, label: 'Female' }
];

export const hobbySource = [
  { id: 1, name: 'music' },
  { id: 2, name: 'football' },
  { id: 3, name: 'game' },
  { id: 4, name: 'anime' }
];

export const DutySource = [
  {
    'id': 8,
    'title': '维护',
    'open': true,
    'halfChecked': true,
    'children': [
      {
        'title': '前端维护',
        'id': 9
      }, {
        'title': '后台维护',
        'disabled': true,
        'isChecked': true,
        'id': 10
      },
      {
        'title': '数据库维护',
        'disabled': true,
        'id': 11
      }
    ]
  },
  {
    'id': 15,
    'title': '管理',
    'children':
      [
        {
          'title': '向导',
          'id': 16
        }, {
          'title': '配置',
          'id': 17
        }
      ]
  }
];

export const treeDataSource = [
  {
    title: 'table title0',
    lastName: 'Mark',
    dob: new Date(1990, 12, 1),
    status: 'done',
    startDate: new Date(2020, 1, 5),
    endDate: new Date(2020, 1, 8),
    children: [
      {
        title: 'table title01',
        lastName: 'Mark',
        status: 'done',
        dob: new Date(1989, 1, 1),
        children: [
          {
            title: 'table title011',
            lastName: 'Mark',
            status: 'done',
            dob: new Date(1989, 1, 1),
          },
          {
            title: 'table title012',
            lastName: 'Mark',
            status: 'done',
            dob: new Date(1991, 3, 1),
            children: [
              {
                title: 'table title0121',
                lastName: 'Mark',
                status: 'done',
                dob: new Date(1989, 1, 1)
              },
              {
                title: 'table title0122',
                lastName: 'Mark',
                status: 'done',
                dob: new Date(1989, 1, 1)
              }
            ]
          }
        ]
      },
      {
        title: 'table title02',
        lastName: 'Mark',
        status: 'done',
        dob: new Date(1991, 3, 1)
      }
    ]
  },
  {
    title: 'table title1',
    lastName: 'Mark',
    status: 'done',
    dob: new Date(1989, 1, 1),
    startDate: new Date(2020, 1, 4),
    endDate: new Date(2020, 1, 8),
    children: []
  },
  {
    title: 'table title2',
    lastName: 'Mark',
    status: 'done',
    dob: new Date(1991, 3, 1),
    startDate: new Date(2020, 1, 6),
    endDate: new Date(2020, 1, 9),
  },
  {
    title: 'table title3',
    lastName: 'Mark',
    status: 'done',
    dob: new Date(1991, 3, 1),
    detail: '这是一个行详情',
    startDate: new Date(2020, 1, 7),
    endDate: new Date(2020, 1, 10),
  },
  {
    title: 'table title4',
    lastName: 'Mark',
    status: 'done',
    dob: new Date(1991, 3, 1),
    startDate: new Date(2020, 1, 7),
    endDate: new Date(2020, 1, 12),
  }
];
