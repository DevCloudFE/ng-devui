import { Component } from '@angular/core';
import { AccordionComponent } from 'ng-devui/accordion';

@Component({
  selector: 'd-inner-list-template',
  standalone: true,
  imports: [AccordionComponent],
  templateUrl: './inner-list-template.component.html',
  styleUrls: ['./inner-list-template.component.css']
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
