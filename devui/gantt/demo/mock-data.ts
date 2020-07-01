export interface SourceType {
  id?: number;
  title?: string;
  ganttType?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  detail?: string;
  $checked?: boolean;
  $expandConfig?: any;
  children?: any;
  startDate?: Date;
  endDate?: Date;
  ganttBarPositionOffset?: number;
  ganttBarWidth?: number;
  status?: string;
  progressRate?: number;
  $isChildTableOpen?: boolean;
  progressDisabled?: boolean;
}

export const treeDataSource: SourceType[] = [
  {
      id: 1,
      title: 'table title0',
      lastName: 'Mark',
      status: 'done',
      startDate: new Date(2020, 1, 5),
      endDate: new Date(2020, 1, 10),
      ganttType: 'parentProgress',
      $isChildTableOpen: true,
      progressRate: 30,
      progressDisabled: true,
      children: [
        {
            id: 2,
            title: 'table title01',
            lastName: 'Mark',
            status: 'done',
            startDate: new Date(2020, 1, 5),
            endDate: new Date(2020, 1, 10),
            ganttType: 'progress',
            progressRate: 30,
            $isChildTableOpen: true
        }
      ]
  },
  {
      id: 6,
      title: 'table title1',
      lastName: 'Mark',
      status: 'done',
      startDate: new Date(2020, 1, 4),
      endDate: new Date(2020, 1, 8),
      ganttType: 'progress',
  },
  {
      id: 7,
      title: 'table title2',
      lastName: 'Mark',
      status: 'done',
      startDate: new Date(2020, 1, 6),
      endDate: new Date(2020, 1, 9),
      ganttType: 'progress',
  },
  {
      id: 8,
      title: 'table title3',
      lastName: 'Mark',
      status: 'done',
      detail: '这是一个行详情',
      startDate: new Date(2020, 1, 7),
      endDate: new Date(2020, 1, 10),
      ganttType: 'progress',
  },
  {
    id: 9,
    title: '里程碑',
    ganttType: 'milestone',
    lastName: 'Mark',
    status: 'done',
    startDate: new Date(2020, 1, 10),
    endDate: new Date(2020, 1, 10),
  },
  {
      id: 10,
      title: 'table title4',
      lastName: 'Mark',
      status: 'done',
      ganttType: 'progress',
      startDate: new Date(2020, 2, 1),
      endDate: new Date(2020, 2, 3),
  }
];
