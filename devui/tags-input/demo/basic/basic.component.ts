import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-tags-input-basic',
  templateUrl: './basic.component.html',
})
export class TagsInputDemoBasicComponent implements OnInit {
  taskTagConfig: any;
  tagList = [];
  suggestionList = [];

  ngOnInit() {
    this.tagList = [{ id: 1769, name: 'inputTag' }];
    this.taskTagConfig = {
      displayProperty: 'name',
      maxLength: 24,
      minLength: 1,
      maxTags: 4,
      maxHeight: '84px',
      multiline: false,
      placeholder: 'Add a tag',
      spellcheck: false,
      caseSensitivity: false,
      isAddBySpace: true,
    };
    this.suggestionList = [
      { name: 'item1' },
      { name: 'item2' },
      { name: 'item3' },
      { name: 'item4' },
      { name: 'item5' },
      { name: 'item6' },
      { name: 'item7' },
      { name: 'item8' },
    ];
  }

  getTagValue(value) {
    console.log(value);
  }
}
