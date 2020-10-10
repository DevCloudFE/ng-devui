import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'd-batch-drag',
  templateUrl: './batch-drag.component.html',
  styleUrls: ['./batch-drag.component.scss']
})
export class BatchDragComponent {
  lists = [
    {
      name: 'IDE',
      list:   [
        { name: 'Visual Studio Code' },
        { name: 'WebStorm' },
        { name: 'Sublime Text' },
        { name: 'Atom' },
        { name: 'Notepad++' },
      ]
    },
    {
      name: 'Browser',
      list:   [
        { name: 'Chrome' },
        { name: 'Firefox' },
        { name: 'Opera' },
        { name: 'Edge' },
        { name: 'Internet Explorer' },
        { name: 'Safari' },
      ]
    },
    {
      name: 'OS',
      list: [
        {name: 'Linux'},
        {name: 'Windows'},
        {name: 'Mac OS'},
        {name: 'DOS'},
        {name: 'Chrome OS'},
      ]
    },
    {
      name: 'Mobile OS',
      list:  [
        {name: 'Android'},
        {name: 'IOS'},
        {name: 'BlackBerry'},
        {name: 'Symbian'},
      ]
    },
    {
      name: 'Whatever',
      list:   [
      ]
    },
  ];
  showOriginPlaceholder = false;
  switchWhileCrossEdge = false;
  constructor(private cdr: ChangeDetectorRef) {}

  onDrop(e: any, targetArray: Array<any>) {
    if (e.dropOnOrigin) {
      return;
    }
    if (e.batchDragData) {
      this.batchDrop(e, targetArray);
      return;
    }
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    const parentArray = e.dragData.parent;
    const item = e.dragData.item;
    if (-1 !== index) {
      if (-1 !== fromIndex && index > fromIndex) { index--; }
      targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
    } else {
      targetArray.push(item);
    }
    if (-1 === fromIndex) {
      this.removeItem(item, parentArray);
    }
  }

  batchDrop(e, targetArray: Array<any>) {
    let fromIndexLessThanDropIndexCount = 0;
    e.batchDragData.map((dragData) => {
      const index = targetArray.indexOf(dragData.item);
      if (index > -1 && index < e.dropIndex) {
        fromIndexLessThanDropIndexCount++;
      }
      return dragData;
    }).forEach((dragData) => {
      this.removeItem(dragData.item, dragData.parent);
    });
    targetArray.splice(e.dropIndex - fromIndexLessThanDropIndexCount, 0, ...(e.batchDragData.map(batchitem => batchitem.item)));
    return;
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }
  batchSelect(item) {
    item.isSelected = !(item.isSelected || false);
    this.cdr.detectChanges();
  }

  batchSelectCheck(event: MouseEvent, item) {
    if (event.ctrlKey) {
      this.batchSelect(item);
    }
  }

  cleanBatch() {
    this.lists.forEach(list => list.list.forEach(
      item => item['isSelected'] = false
    ));
  }
}
