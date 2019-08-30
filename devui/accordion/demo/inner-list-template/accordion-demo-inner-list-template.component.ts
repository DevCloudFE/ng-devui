import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-accordion-demo-inner-list-template',
  templateUrl: './accordion-demo-inner-list-template.component.html',
  styleUrls: ['./accordion-demo-inner-list-template.component.css']
})
export class AccordionDemoInnerListTemplateComponent {
  menu = [{
    title: '内容一',
    content: '内容一的内容'
  }, {
    title: '内容二',
    content: '内容二的内容'
  }];

  itemClick(event) {
    event.clicktimes = ( event.clicktimes || 0 ) + 1;
  }

  menuToggle(event) {
    console.log('item click' + JSON.stringify(event));
  }
}
