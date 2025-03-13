import { Component } from '@angular/core';

@Component({
    selector: 'd-multi-level',
    templateUrl: './multi-level.component.html',
    styleUrls: ['./multi-level.component.css'],
    standalone: false
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
