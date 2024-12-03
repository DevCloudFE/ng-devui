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
      value: {
        status: 'developing',
        value: { status: 'developing' },
      },
    },
    {
      label: 'creator',
      field: 'creator',
      value: {
        name: 'Jack',
        value: { name: 'Jack' },
      },
    },
    {
      label: 'checker',
      field: 'checker',
      value: {
        name: 'Jack,Tom,Jerry',
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
      },
    },
    {
      label: 'committer',
      field: 'committer',
      value: {
        name: 'Jack,Tom,Jerry',
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
      },
    },
    {
      label: 'tag',
      field: 'tag',
      value: {
        label: 'Bug,Epic,Story',
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
      },
    },
    {
      label: 'role',
      field: 'role',
      value: {
        role: 'Guest',
        value: { role: 'Guest' },
      },
    },
    {
      label: 'release version',
      field: 'releaseVersion',
      value: {
        label: '9.64.9',
        value: '9.64.9',
      },
    },
    {
      label: 'commit number',
      field: 'commitNumber',
      value: {
        label: '2 - 4',
        value: [2, 4],
      },
    },
    {
      field: 'creatTime',
      label: 'create time',
      value: {
        label: '2021/01/01 - 2021/02/03',
        value: [new Date('01/01/2021 00:00'), new Date('02/03/2021 00:00')],
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
