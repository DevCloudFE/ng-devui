import { Component } from '@angular/core';

@Component({
  selector: 'd-origin-placeholder',
  templateUrl: './origin-placeholder.component.html',
  styleUrls: ['./origin-placeholder.component.scss']
})
export class OriginPlaceholderComponent {
  list1 =  [
    { name: 'Visual Studio Code' },
    { name: 'WebStorm' },
    { name: 'Sublime Text' },
    { name: 'Atom' },
    { name: 'Notepad++' },
  ];

  list2 = [
    { name: 'Chrome' },
    { name: 'Firefox' },
    { name: 'Opera' },
    { name: 'Edge' },
    { name: 'Internet Explorer' },
    { name: 'Safari' },
  ];
  list3 = [
    {name: 'Linux'},
    {name: 'Windows'},
    {name: 'Mac OS'},
    {name: 'DOS'},
    {name: 'Chrome OS'},
  ];

  onDrop(e: any, targetArray) {
    console.log(e);
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    const item = e.dragData.item;
    if (-1 !== index) {
      /*修正同一个container排序，往下拖动index多了1个位置*/
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
    } else {
      targetArray.push(item);
    }
    if (-1 === fromIndex) {
      this.removeItem(item, e.dragData.parent);
    }
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }
}
