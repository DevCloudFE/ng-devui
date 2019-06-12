import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  list1 = [
    { name: 'Visual Studio Code' },
    { name: 'WebStorm' },
    { name: 'Sublime' },
    { name: 'Atom' }
  ];

  list2 = [];
  constructor() {

  }

  ngOnInit() {
  }

  onDrop(e: any) {
    console.log(e);
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    if (-1 !== index) {
      /*修正同一个container排序，往下拖动index多了1个位置*/
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      this.list2.splice(index, 0, fromIndex === -1 ? e.dragData : this.list2.splice(fromIndex, 1)[0]);
    } else {
      this.list2.push(e.dragData);
    }
    if (-1 === fromIndex) {
      this.removeItem(e.dragData, this.list1);
    }
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.map(function (e) {
      return e.name;
    }).indexOf(item.name);
    list.splice(index, 1);
  }

}
