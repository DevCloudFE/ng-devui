import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-inner-list-template',
  templateUrl: './inner-list-template.component.html',
  styleUrls: ['./inner-list-template.component.css']
})
export class InnerListTemplateComponent {
  menu = [{
    title: '内容一',
    children: [],
    content: '内容一的内容'
  }, {
    title: '内容二',
    children: [],
    content: '内容二的内容'
  }];

  itemClick(event) {
    event.clicktimes = ( event.clicktimes || 0 ) + 1;
  }

  menuToggle(event) {
    console.log('item click' + JSON.stringify(event));
  }
}
