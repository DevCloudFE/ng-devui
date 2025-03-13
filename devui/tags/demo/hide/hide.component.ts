import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'd-hide',
    templateUrl: './hide.component.html',
    standalone: false
})
export class HideComponent implements OnInit {
  tagList3: any = [
    { id: 911, name: 'default Color', labelStyle: '' },
    { id: 918, name: 'label color1', labelStyle: 'blue-w98' },
    { id: 1769, name: 'label color2', labelStyle: 'green-w98' },
    { id: 555, name: 'label color4', labelStyle: 'yellow-w98' },
    { id: 668, name: 'custom label5', labelStyle: 'pink-w98' },
    { id: 777, name: 'custom label6', labelStyle: 'purple-w98' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
