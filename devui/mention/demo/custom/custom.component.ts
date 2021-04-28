import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-mention-custom',
  templateUrl: './custom.component.html',
})
export class CustomComponent implements OnInit {
  suggestions = [
    {
      name: 'C#',
      id: 1
    },
    {
      name: 'C',
      id: 2
    },
    {
      name: 'C++',
      id: 3
    },
    {
      name: 'Python',
      id: 4
    },
    {
      name: 'Java',
      id: 5
    },
    {
      name: 'JavaScript',
      id: 6
    },
    {
      name: 'Go',
      id: 7
    }
  ];

  valueWith = (data) => data.name;

  constructor() {}

  ngOnInit() {

  }
}
