export const curYear = new Date().getFullYear();

export interface SourceType {
  id?: string;
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

export const basicData = [
  {
    id: '1',
    title: 'title1',
    startDate: new Date(curYear, 4, 5),
    endDate: new Date(curYear, 4, 10),
    progressRate: 30
  },
  {
    id: '2',
    title: 'title2',
    startDate: new Date(curYear, 4, 6),
    endDate: new Date(curYear, 4, 9),
    progressRate: 30
  },
  {
    id: '3',
    title: 'title3',
    startDate: new Date(curYear, 4, 10),
    endDate: new Date(curYear, 4, 12),
    progressRate: 30
  },
  {
    id: '4',
    title: 'title4',
    startDate: new Date(curYear, 4, 7),
    endDate: new Date(curYear, 4, 10),
    progressRate: 30
  },
  {
    id: '5',
    title: 'title5',
    startDate: new Date(curYear, 4, 8),
    endDate: new Date(curYear, 4, 12),
    progressRate: 30
  }
];

export const treeDataSource: SourceType[] = [
  {
    id: '1',
    title: 'table title0',
    lastName: 'Mark',
    status: 'done',
    startDate: new Date(curYear, 4, 5),
    endDate: new Date(curYear, 4, 10),
    ganttType: 'parentProgress',
    $isChildTableOpen: true,
    progressRate: 30,
    progressDisabled: true,
    children: [
      {
        id: '2',
        title: 'table title01',
        lastName: 'Mark',
        status: 'done',
        startDate: new Date(curYear, 4, 5),
        endDate: new Date(curYear, 4, 10),
        ganttType: 'progress',
        progressRate: 30,
        $isChildTableOpen: true
      }
    ]
  },
  {
    id: '6',
    title: 'table title1',
    lastName: 'Mark',
    status: 'done',
    startDate: new Date(curYear, 4, 4),
    endDate: new Date(curYear, 4, 8),
    ganttType: 'progress',
  },
  {
    id: '7',
    title: 'table title2',
    lastName: 'Mark',
    status: 'done',
    startDate: new Date(curYear, 4, 6),
    endDate: new Date(curYear, 4, 9),
    ganttType: 'progress',
  },
  {
    id: '8',
    title: 'table title3',
    lastName: 'Mark',
    status: 'done',
    detail: 'This is a line detail',
    startDate: new Date(curYear, 4, 7),
    endDate: new Date(curYear, 4, 10),
    ganttType: 'progress',
  },
  {
    id: '9',
    title: 'Milestone',
    ganttType: 'milestone',
    lastName: 'Mark',
    status: 'done',
    startDate: new Date(curYear, 4, 10),
    endDate: new Date(curYear, 4, 10),
  },
  {
    id: '10',
    title: 'table title4',
    lastName: 'Mark',
    status: 'done',
    ganttType: 'progress',
    startDate: new Date(curYear, 5, 1),
    endDate: new Date(curYear, 5, 3),
  }
];
