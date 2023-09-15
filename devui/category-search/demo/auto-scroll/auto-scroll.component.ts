import { Component } from '@angular/core';
import { ICategorySearchTagItem } from 'ng-devui/category-search';
import { cloneDeep } from 'lodash-es';
import { demoData } from '../demo-data';

@Component({
  selector: 'd-auto-scroll',
  templateUrl: './auto-scroll.component.html',
  styles: [
  `
      section {
        padding-top: 16px;
      }

      i.icon {
        margin-right: 8px;
      }
    `,
  ],
  })
export class AutoScrollComponent {
  category = cloneDeep(demoData.slice(0, -2));
  groupOrderConfig = ['Basic', 'Personnel-related', 'Time-related', 'User-defined'];
  defaultSearchField = ['creator', 'status'];
  selectedTags: ICategorySearchTagItem[] = [
    {
      label: 'status',
      field: 'status',
      type: 'radio',
      group: 'Basic',
      filterKey: 'status',
      value: {
        status: 'developing',
      },
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
      value: {
        name: 'Jack',
      },
      title: 'creator: Jack',
    },
    {
      label: 'checker',
      field: 'checker',
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
      title: 'checker: Jack,Tom,Jerry',
      value: {
        value: [
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
        name: 'Jack,Tom,Jerry',
      },
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
      value: {
        value: [
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
        name: 'Jack,Tom,Jerry',
      },
      title: 'committer:Jack,Tom,Jerry',
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
          $label: 'Bug_#f66f6a',
        },
        {
          label: 'Epic',
          color: '#5e7ce0',
          $label: 'Epic_#5e7ce0',
        },
        {
          label: 'Story',
          color: '#50d4ab',
          $label: 'Story_#50d4ab',
        },
      ],
      value: {
        value: [
          {
            label: 'Bug',
            color: '#f66f6a',
            $label: 'Bug_#f66f6a',
          },
          {
            label: 'Epic',
            color: '#5e7ce0',
            $label: 'Epic_#5e7ce0',
          },
          {
            label: 'Story',
            color: '#50d4ab',
            $label: 'Story_#50d4ab',
          },
        ],
        label: 'Bug,Epic,Story',
      },
      title: 'tag:Bug,Epic,Story',
    },
    {
      label: 'IP address',
      field: 'ip',
      type: 'radio',
      group: 'User-defined',
      filterKey: 'ip',
      options: [
        {
          ip: '110.110.110.1',
        },
        {
          ip: '110.110.110.2',
        },
        {
          ip: '110.110.110.3',
        },
      ],
      title: 'IP address:110.110.110.3',
      value: {
        ip: '110.110.110.3',
      },
    },
    {
      label: 'release version',
      field: 'releaseVersion',
      type: 'textInput',
      group: 'Basic',
      value: {
        value: '9.64.9',
        label: '9.64.9',
      },
      title: 'release version: 9.64.9',
    },
    {
      label: 'commit number',
      field: 'commitNumber',
      type: 'numberRange',
      group: 'User-defined',
      title: 'commit number: 2 - 4',
      value: {
        value: [2, 4],
        label: '2 - 4',
      },
    },
    {
      field: 'creatTime',
      label: 'create time',
      title: 'create time: 2021/01/01 - 2021/02/03',
      type: 'dateRange',
      group: 'Time-related',
      value: {
        value: [new Date('01/01/2021 00:00'), new Date('02/03/2021 00:00')],
        label: '2021/01/01 - 2021/02/03',
      },
    },
  ];
  finalSearchItems: any;
  finalSearchKey: any;
  extendedConfig = { more: { show: true } };

  searchEvent(event) {
    console.log('search items', event);
    this.finalSearchItems = event ? event.selectedTags : {};
    this.finalSearchKey = event ? event.searchKey : '';
  }

  createFilter(event) {
    console.log('create filter', event);
  }

  searchKeyChange($event) {
    console.log('search key change', $event);
  }

  selectedTagsChange(event) {
    console.log('selectedTagsChange', event);
  }

  clearAllEvent(event) {
    console.log('clear all', event);
  }

  toggleEvent(dropdown, tag) {
    if (!dropdown.isOpen && tag) {
      console.log(tag);
    }
  }
}
