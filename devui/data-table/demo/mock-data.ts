export interface SourceType {
  id?: number;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  detail?: string;
  $checked?: boolean;
  expandConfig?: any;
  children?: any;
}

export const originSource = [
  {
    id: 1,
    firstName: 'Mark',
    lastName: 'Otto',
    dob: new Date(1990, 12, 1),
    gender: 'Male',
  },
  {
    id: 2,
    firstName: 'Jacob',
    lastName: 'Thornton',
    gender: 'Female',
    dob: new Date(1989, 1, 1),
  },
  {
    id: 3,
    firstName: 'Danni',
    lastName: 'Chen',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
    expandConfig: {description: 'Danni is here'}
  },
  {
    id: 4,
    firstName: 'green',
    lastName: 'gerong',
    gender: 'Male',
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
    gender: { id: 1, label: 'male' },
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
    gender: { id: 1, label: 'male' },
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
    gender: { id: 1, label: 'male' },
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
      title: '公共方案',
      lastName: '张三',
      dob: new Date(1990, 12, 1),
      status: '已关闭',
      children: [
        {
            title: '前端框架',
            lastName: '张三',
            status: '已关闭',
            dob: new Date(1989, 1, 1),
            children: [
              {
                  title: 'angular框架',
                  lastName: '张三',
                  status: '已关闭',
                  dob: new Date(1989, 1, 1),
              },
              {
                  title: 'vue框架',
                  lastName: '张三',
                  status: '已关闭',
                  dob: new Date(1991, 3, 1),
                  children: [
                    {
                        title: 'vue组件',
                        lastName: '张三',
                        status: '已关闭',
                        dob: new Date(1989, 1, 1),
                        children: []
                    },
                    {
                      title: 'vue文档',
                      lastName: '张三',
                      status: '已关闭',
                      dob: new Date(1989, 1, 1),
                    }
                  ]
              }
            ]
        },
        {
            title: '组件库',
            lastName: '张三',
            status: '已关闭',
            dob: new Date(1991, 3, 1)
        }
      ]
  },
  {
      title: '架构设计',
      lastName: '张三',
      status: '已关闭',
      dob: new Date(1989, 1, 1),
  },
  {
      title: '代码评审',
      lastName: '张三',
      status: '已关闭',
      dob: new Date(1991, 3, 1),
  },
  {
      title: '性能优化',
      lastName: '张三',
      status: '已关闭',
      dob: new Date(1991, 3, 1),
      detail: '这是一个行详情'
  },
  {
      title: '数据统计',
      lastName: '张三',
      status: '已关闭',
      dob: new Date(1991, 3, 1)
  }
];
