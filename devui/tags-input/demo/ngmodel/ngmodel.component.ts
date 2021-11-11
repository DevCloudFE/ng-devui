import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-tags-input-ngmodel',
  templateUrl: './ngmodel.component.html',
})
export class TagsInputDemoNgModelComponent implements OnInit {
  tagList: any = [];
  suggestionList: any = [];

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
    ];
  }

  customCheck = (newtag: string) => {
    return true;
  }

  getTagValue(value) {
    console.log(value);
  }

  btnClick() {
    console.log(this.tagList);
  }
}
