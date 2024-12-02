import { Component } from '@angular/core';

@Component({
  selector: 'd-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent {
  list1 = [{ name: 'Visual Studio Code' }];
  list2 = [{ name: 'WebStorm' }];
  list3 = [{ name: 'Sublime' }];
  list4 = [{ name: 'Atom' }];

  onDrop(e: any, targetArray: Array<any>) {
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    const parentArray = e.dragData.parent;
    const item = e.dragData.item;
    if (-1 !== index) {
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
    } else {
      targetArray.push(item);
    }
    if (fromIndex === -1) {
      this.removeItem(item, parentArray);
    }
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.map((e) => e.name).indexOf(item.name);
    list.splice(index, 1);
  }
}
