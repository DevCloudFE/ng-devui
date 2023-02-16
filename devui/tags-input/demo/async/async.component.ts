import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-tags-input-async',
  templateUrl: './async.component.html',
})
export class TagsInputDemoAsyncComponent implements OnInit {
  tagList: any = [];
  taskTagConfig: any;
  suggestionList: any = [];

  ngOnInit() {
    this.tagList = [{ name: 'item4' }, { name: 'item8' }];
    this.taskTagConfig = {
      displayProperty: 'name',
      maxLength: 25,
      minLength: 1,
      maxTags: 3,
      placeholder: 'Add a tag',
    };
    setTimeout(() => {
      this.suggestionList = [
        { name: 'item1' },
        { name: 'item2' },
        { name: 'item3' },
        { name: 'item5' },
        { name: 'item6' },
        { name: 'item7' },
        { name: 'item8' },
      ];
    }, 1000);
  }

  getTagValue(value) {
    console.log(value);
  }
}
