import { Component } from '@angular/core';
import { ICategorySearchTagItem } from 'ng-devui/category-search';
import { cloneDeep } from 'lodash-es';
import { demoData } from '../demo-data';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  category = cloneDeep(demoData.slice(0, -2));
  defaultSearchField = ['creator', 'status'];
  selectedTags: ICategorySearchTagItem[] = [
    {
      label: 'status',
      field: 'status',
      value: {
        status: 'developing',
        value: 'developing',
      },
    },
  ];
  finalSearchItems: any;
  finalSearchKey: any;
  rules = [
    { required: true },
    { whitespace: true },
    { minlength: 3 },
    { maxlength: 16 },
    { pattern: /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/, message: 'The value cannot contain characters except uppercase and lowercase letters.' },
  ];

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

  toggleEvent = (dropdown, tag, currentSelectTag) => {
    if (dropdown.isOpen) {
      console.log('selected and clicked tag:', tag);
      console.log('unassigned tag:', currentSelectTag);
    }
  };
}
