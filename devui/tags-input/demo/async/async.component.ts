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
    this.tagList = [{ id: 918, name: '11111' }, { name: 'item4' }];
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
        { id: 918, name: '11111' },
      ];
    }, 1000);
  }

  customCheck = (newtag: string) => {
    return true;
  };

  getTagValue(value) {
    console.log(value);
  }
}
