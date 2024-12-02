import { Component, OnInit, ViewChild } from '@angular/core';
import { TagsInputComponent } from 'ng-devui/tags-input';

@Component({
  selector: 'd-tags-input-customize',
  templateUrl: './customize.component.html',
})
export class TagsInputDemoCustomizeComponent implements OnInit {
  @ViewChild(TagsInputComponent) tagInputItem: TagsInputComponent;
  tagList = [];
  suggestionList = [];
  maxLength = 12;
  errorMsg = `A maximum of ${this.maxLength} characters are allowed.`;
  isError = false;
  canGenerate = true;

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
    const result = str.indexOf('item') >= 0;
    if (this.tagInputItem) {
      this.tagInputItem.generateOptionFromInput = result;
    }
    return result;
  };

  getSearchValue(value) {
    this.isError = value.length === this.maxLength;
  }

  getTagValue(value) {
    console.log(value);
  }
}
