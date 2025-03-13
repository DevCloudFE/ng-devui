import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'd-tags-input-virtual-scroll',
    templateUrl: './virtual-scroll.component.html',
    standalone: false
})
export class TagsInputDemoVirtualScrollComponent implements OnInit {
  tagList = <any>[{ id: 0, name: 'virtual-scroll-item0' }];
  taskTagConfig: any;
  suggestionList = <any>[];

  ngOnInit() {
    this.taskTagConfig = {
      displayProperty: 'name',
      maxLength: 25,
      minLength: 1,
      maxTags: 6,
      placeholder: 'virtual scroll list',
    };
    for (let i = 0; i < 1000; i++) {
      this.suggestionList.push({ id: i, name: `virtual-scroll-item${i}` });
    }
  }

  getTagValue(value) {
    console.log(value);
  }
}
