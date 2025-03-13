import { Component } from '@angular/core';

@Component({
    selector: 'd-inner-list-template',
    templateUrl: './inner-list-template.component.html',
    styleUrls: ['./inner-list-template.component.css'],
    standalone: false
})
export class InnerListTemplateComponent {
  menu = [{
    title: 'Content 1',
    children: [],
    content: 'Child Content of Content 1'
  }, {
    title: 'Content 2',
    children: [],
    content: 'Child Content of Content 2'
  }];

  itemClick(event) {
    event.clicktimes = (event.clicktimes || 0) + 1;
  }

  menuToggle(event) {
    console.log('item click' + JSON.stringify(event));
  }
}
