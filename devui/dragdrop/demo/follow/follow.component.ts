import { Component } from '@angular/core';

@Component({
  selector: 'd-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
})
export class FollowComponent {
  list1 = [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime' }, { name: 'Atom' }];
  list2 = [];
  appendToBody = false;

  onDrop(e: any) {
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    if (-1 !== index) {
      /* 修正同一个container排序，往下拖动index多了1个位置*/
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      this.list2.splice(index, 0, fromIndex === -1 ? e.dragData : this.list2.splice(fromIndex, 1)[0]);
    } else {
      this.list2.push(e.dragData);
    }
    if (fromIndex === -1) {
      this.removeItem(e.dragData, this.list1);
    }
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.map((e) => e.name).indexOf(item.name);
    list.splice(index, 1);
  }
}
