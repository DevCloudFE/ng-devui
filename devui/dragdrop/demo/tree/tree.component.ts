import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  list1 = [
    { name: 'Visual Studio Code' },
    { name: 'Sublime' },
    { name: 'Atom' }
  ];

  list2 = [
    { name: 'WebStorm' , children: [{ name: 'notepadd++'}]},
  ];
  constructor() {

  }

  ngOnInit() {
  }

  onDrop(e: any, target) {
    const item = e.dragData.item;
    const parent = e.dragData.parentList;
    const indexOfParent = e.dragData.index;
    const dropIndex = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    const dropOnItem = e.dropOnItem;

    // 同表排序的情况下index会有变化, 跨表不会有变化
    let index = dropIndex;
    if ( target === parent && dropIndex > fromIndex) {
      index--;
    }
    // 源数组移除
    parent.splice(indexOfParent, 1);
    // 插入
    if (dropOnItem) {
      target[index].children = target[index].children || [];
      target[index].children.push(item);
      return;
    }
    if (index < 0) {
      target.push(item);
      return;
    }
    target.splice(index, 0, item);
  }

}
