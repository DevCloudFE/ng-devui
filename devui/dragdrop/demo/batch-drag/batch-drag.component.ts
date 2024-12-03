import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'd-batch-drag',
  templateUrl: './batch-drag.component.html',
  styleUrls: ['./batch-drag.component.scss'],
})
export class BatchDragComponent {
  lists = [
    {
      name: 'IDE',
      list: [
        { name: 'Visual Studio Code', isSelected: false },
        { name: 'WebStorm', isSelected: false },
        { name: 'Sublime Text', isSelected: false },
        { name: 'Atom', isSelected: false },
        { name: 'Notepad++', isSelected: false },
      ],
    },
    {
      name: 'Browser',
      list: [
        { name: 'Chrome', isSelected: false },
        { name: 'Firefox', isSelected: false },
        { name: 'Opera', isSelected: false },
        { name: 'Edge', isSelected: false },
        { name: 'Internet Explorer', isSelected: false },
        { name: 'Safari', isSelected: false },
      ],
    },
    {
      name: 'OS',
      list: [
        { name: 'Linux', isSelected: false },
        { name: 'Windows', isSelected: false },
        { name: 'Mac OS', isSelected: false },
        { name: 'DOS', isSelected: false },
        { name: 'Chrome OS', isSelected: false },
      ],
    },
    {
      name: 'Mobile OS',
      list: [
        { name: 'Android', isSelected: false },
        { name: 'IOS', isSelected: false },
        { name: 'BlackBerry', isSelected: false },
        { name: 'Symbian', isSelected: false },
      ],
    },
    {
      name: 'Whatever',
      list: [],
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

  batchDrop(e, targetArray: Array<any>) {
    let fromIndexLessThanDropIndexCount = 0;
    e.batchDragData
      .map((dragData) => {
        const index = targetArray.indexOf(dragData.item);
        if (index > -1 && index < e.dropIndex) {
          fromIndexLessThanDropIndexCount++;
        }
        return dragData;
      })
      .forEach((dragData) => {
        this.removeItem(dragData.item, dragData.parent);
      });
    targetArray.splice(e.dropIndex - fromIndexLessThanDropIndexCount, 0, ...e.batchDragData.map((batchitem) => batchitem.item));
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
    this.lists.forEach((list) =>
      list.list.forEach((item) => {
        item.isSelected = false;
      })
    );
  }
}
