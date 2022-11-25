import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionComponent } from 'ng-devui/accordion';
import { ToggleModule } from 'ng-devui/toggle';

@Component({
  selector: 'd-multi-level',
  standalone: true,
  imports: [AccordionComponent, FormsModule, ToggleModule],
  templateUrl: './multi-level.component.html',
  styleUrls: ['./multi-level.component.css']
})
export class MultiLevelComponent {
  autoOpenActiveMenu = false;
  menu = [{
    title: 'Content 1 (as a leaf menu)',
  }, {
    title: 'Content 2 (as a parent menu, has children)',
    children: [
      {title: 'Child Content 1'},
      {title: 'Child Content 2'},
      {title: 'Child Content 3'},
    ]
  }, {
    title: 'Content 3 (as a parent menu, has children)',

    children: [{
      title: 'Child Content 1 (has children)',
      children: [
        {title: 'Child Content 1'},
        {title: 'Child Content 2', active: true},
        {title: 'Child Content 3'},
      ]
    }, {
      title: 'Child Content 2 (has children',
      children: [
        {title: 'Child Content 1'},
        {
          title: 'Child Content 2 (has children',
          children: [
            {title: 'Child Content 1'},
            {title: 'Child Content 2'},
            {title: 'Child Content 3'},
          ]
        },
        {title: 'Child Content 3'},
      ]
    },
    {title: 'Child Content 2'},
    {title: 'Child Content 3'},
    ]
  }, {
    title: 'Content 4 (as a parent menu, has no child)',
    children: []
  }];

}
