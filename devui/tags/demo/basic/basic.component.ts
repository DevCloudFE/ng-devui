import {
  Component, OnInit
} from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})

export class BasicComponent {
  tagList: any = ['标签1', '标签2', '标签3', '标签4', '标签5', '标签6', '标签7'];
  tagList2: any = [
    { id: 918, name: '标签颜色1', labelStyle: 'blue-w98' }, { id: 1769, name: '标签颜色2', labelStyle: 'green-w98' },
     { id: 555, name: '标签颜色3', labelStyle: 'yellow-w98' }, { id: 668, name: '标签颜色4', labelStyle: 'orange-w98' }
    ];
  tagList_custom: any = [
    { id: 1, name: '测试1', labelStyle: 'blue-w98' }, { id: 2, name: '测试2', labelStyle: 'green-w98' },
    { id: 3, name: '测试3', labelStyle: 'yellow-w98' }, { id: 4, name: '测试4', labelStyle: 'orange-w98' }];
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
