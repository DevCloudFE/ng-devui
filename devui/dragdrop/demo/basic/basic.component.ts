import { Component } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent {
  list1 = [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime' }, { name: 'Atom (disable dragging)', disabled: true }];
  list2 = [];
  list3 = [];

  onDrop(e: any, targetArray) {
    console.log(e);
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    const item = e.dragData.item;
    if (-1 !== index) {
      /* 修正同一个container排序，往下拖动index多了1个位置*/
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
    } else {
      targetArray.push(item);
    }
    if (fromIndex === -1) {
      this.removeItem(item, e.dragData.parent);
    }
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.map((e) => e.name).indexOf(item.name);
    list.splice(index, 1);
  }

  log(...v) {
    console.log(...v);
  }
}
