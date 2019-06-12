export interface SourceType {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  detail?: string;
  $checked?: boolean;
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
      detail: '这是一个行详情',
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
