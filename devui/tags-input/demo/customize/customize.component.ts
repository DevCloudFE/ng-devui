import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-tags-input-customize',
  templateUrl: './customize.component.html',
})
export class TagsInputDemoCustomizeComponent implements OnInit {
  tagList = [];
  suggestionList = [];

  ngOnInit() {
    this.tagList = [{ name: 'item1' }];
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

  customCheck = (tag: string | { name: string }) => {
    const str = typeof tag === 'string' ? tag : tag.name;
    return str.indexOf('item') >= 0;
  };

  getTagValue(value) {
    console.log(value);
  }
}
