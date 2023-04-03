import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-tags-input-customize',
  templateUrl: './customize.component.html',
})
export class TagsInputDemoCustomizeComponent implements OnInit {
  tagList = [];
  suggestionList = [];

  ngOnInit() {
    this.suggestionList = [
      { name: 'item1', isOption: true },
      { name: 'item2', isOption: true },
      { name: 'item3', isOption: true },
      { name: 'item4', isOption: true },
      { name: 'item5', isOption: true },
      { name: 'item6', isOption: true },
      { name: 'item7', isOption: true },
      { name: 'item8', isOption: true },
    ];
    this.tagList = this.suggestionList.slice(0, 1);
  }

  customCheck = (tag: string | { name: string }) => {
    const str = typeof tag === 'string' ? tag : tag.name;
    return str.indexOf('item') >= 0;
  };

  getTagValue(value) {
    console.log(value);
  }
}
