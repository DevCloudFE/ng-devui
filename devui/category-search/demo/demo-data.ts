import { ICategorySearchTagItem } from 'ng-devui/category-search';

export const demoData: ICategorySearchTagItem[] = [
  {
    label: 'status',
    field: 'status',
    type: 'radio',
    group: 'Basic',
    filterKey: 'status',
    options: [
      {
        status: 'new',
      },
      {
        status: 'developing',
      },
      {
        status: 'completed',
      },
      {
        status: 'under acceptance',
      },
      {
        status: 'closed-loop',
      },
    ],
  },
  {
    label: 'creator',
    field: 'creator',
    type: 'radio',
    group: 'Personnel-related',
    filterKey: 'name',
    options: [
      {
        name: 'Jack',
      },
      {
        name: 'Tom',
      },
      {
        name: 'Jerry',
      },
    ],
  },
  {
    label: 'create time',
    field: 'creatTime',
    type: 'dateRange',
    group: 'Time-related',
    showTime: true,
  },
  {
    label: 'modified time',
    field: 'modifiedTime',
    type: 'dateRange',
    group: 'Time-related',
    showTime: false,
  },
  {
    label: 'role',
    field: 'role',
    type: 'radio',
    group: 'User-defined',
    filterKey: 'role',
    options: [
      {
        role: 'Admin',
      },
      {
        role: 'User',
      },
      {
        role: 'Guest',
      },
    ],
  },
  {
    label: 'checker',
    field: 'checker',
    type: 'checkbox',
    group: 'Personnel-related',
    filterKey: 'name',
    showSelectAll: true,
    options: [
      {
        name: 'Jack',
      },
      {
        name: 'Tom',
      },
      {
        name: 'Jerry',
      },
    ],
  },
  {
    label: 'committer',
    field: 'committer',
    type: 'checkbox',
    group: 'Personnel-related',
    filterKey: 'name',
    options: [
      {
        name: 'Jack',
      },
      {
        name: 'Tom',
      },
      {
        name: 'Jerry',
      },
    ],
  },
  {
    label: 'tag',
    field: 'tag',
    type: 'label',
    group: 'Basic',
    filterKey: 'label',
    colorKey: 'color',
    options: [
      {
        label: 'Bug',
        color: '#f66f6a',
      },
      {
        label: 'Epic',
        color: '#5e7ce0',
      },
      {
        label: 'Story',
        color: '#50d4ab',
      },
    ],
  },
  {
    label: 'release version',
    field: 'releaseVersion',
    type: 'textInput',
    group: 'Basic',
    maxLength: 10,
    validateRules: [
      { required: true },
      { whitespace: true },
      { minlength: 3 },
      { maxlength: 10 },
      {
        pattern: /^[0-9.]+$/,
        message: {
          'zh-cn': '只能包含数字',
          'en-us': 'The value can contain only digits.',
          default: '只能包含数字',
        },
      },
    ],
  },
  {
    label: 'commit number',
    field: 'commitNumber',
    type: 'numberRange',
    group: 'User-defined',
    min: {
      left: 0,
    },
    max: {
      left: 30,
      right: 50,
    },
    step: {
      left: 2,
      right: 3,
    },
    placeholder: {
      left: 'min',
      right: 'max',
    },
  },
  {
    label: 'module',
    field: 'module',
    type: 'treeSelect',
    group: 'User-defined',
    searchable: true,
    searchPlaceholder: 'Search Input',
    options: [
      {
        title: 'parent 1',
        id: 1,
      },
      {
        title: 'parent 2',
        children: [
          {
            title: 'parent 2-1',
            children: [
              {
                title: 'leaf 2-1-1',
                id: 3,
              },
              {
                title: 'leaf 2-1-2',
                id: 4,
              },
            ],
            id: 2,
          },
          {
            title: 'parent 2-2',
            children: [
              {
                title: 'leaf 2-2-1',
                id: 6,
              },
              {
                title: 'leaf 2-2-2',
                id: 7,
              },
            ],
            id: 5,
          },
        ],
        id: 18,
      },
      {
        title: 'parent 3',
        open: true,
        children: [
          {
            title: 'leaf 3-1',
            id: 9,
          },
          {
            title: 'leaf 3-2',
            id: 10,
          },
          {
            title: 'leaf 3-3',
            id: 11,
          },
        ],
        id: 8,
      },
      {
        title: 'parent 4',
        children: [
          {
            title: 'leaf 4-1',
            id: 13,
          },
          {
            title: 'leaf 4-2',
            id: 14,
          },
        ],
        id: 12,
      },
      {
        title: 'parent 5',
        children: [
          {
            title: 'leaf 5-1',
            id: 16,
          },
          {
            title: 'leaf 5-2',
            id: 17,
          },
        ],
        id: 15,
      },
    ],
  },
  {
    label: 'title',
    field: 'title',
    type: 'radio',
    customTemplate: undefined,
    options: [
      {
        label: 'title1',
      },
      {
        label: 'title2',
      },
      {
        label: 'title3',
      },
      {
        label: 'title4',
      },
      {
        label: 'title5',
      },
      {
        label: 'title6',
      },
      {
        label: 'title7',
      },
    ],
  },
  {
    label: 'traffic sources',
    field: 'trafficSources',
    customTemplate: undefined,
  },
];
