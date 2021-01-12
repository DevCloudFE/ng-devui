import { Component } from '@angular/core';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
})
export class CustomComponent {
  deleteTagName1 = 'tag1';
  deleteTagName2 = 'tag2';
  tagName = 'bug';

  tagList = [
    {
      checked: false,
      type: 'blue-w98',
      name: '标签颜色1',
    },
    {
      checked: false,
      type: 'aqua-w98',
      name: '标签颜色2',
    },
    {
      checked: false,
      type: 'olivine-w98',
      name: '标签颜色3',
    },
    {
      checked: false,
      type: 'green-w98',
      name: '标签颜色4',
    },
    {
      checked: false,
      type: 'yellow-w98',
      name: '标签颜色5',
    },
    {
      checked: false,
      type: '',
      custumColor: '#f50',
      name: '自定义颜色#F50',
    },
  ];

  getTagValue(value) {
    console.log(value.tag);
  }
  deleteTag(tag) {
    console.log(tag);
  }

  changeChecked($event) {
    console.log($event);
  }
}
