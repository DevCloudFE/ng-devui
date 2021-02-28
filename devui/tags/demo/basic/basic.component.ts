import { Component } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  tagList: any = ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7'];
  tagList2: any = [
    { id: 918, name: 'label color1', labelStyle: 'blue-w98' },
    { id: 1769, name: 'label color2', labelStyle: 'green-w98' },
    { id: 555, name: 'label color3', labelStyle: 'yellow-w98' },
    { id: 668, name: 'custom color', customColor: '#f50' },
  ];
  tagList3: any = [
    { id: 918, name: 'label color1', labelStyle: 'blue-w98' },
    { id: 1769, name: 'label color2', labelStyle: 'green-w98' },
    { id: 555, name: 'label color3', labelStyle: 'yellow-w98' },
    { id: 668, name: 'custom color', customColor: '#f50' },
  ];
  tagList_custom: any = [
    { id: 1, name: 'test1', labelStyle: 'blue-w98' },
    { id: 2, name: 'test2', labelStyle: 'green-w98' },
    { id: 3, name: 'test3', labelStyle: 'yellow-w98' },
    { id: 4, name: 'test4', labelStyle: 'orange-w98' },
  ];

  getTagValue(value) {
    console.log(this.tagList_custom);
    console.log(value.tag);
  }
  deleteTag(index) {
    this.tagList2.splice(index, 1);
  }
  deleteTagCustom(index) {
    this.tagList_custom.splice(index, 1);
  }
}
