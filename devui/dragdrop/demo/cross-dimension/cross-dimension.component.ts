import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'd-cross-dimension',
  templateUrl: './cross-dimension.component.html',
  styleUrls: ['./cross-dimension.component.scss'],
})
export class CrossDimensionComponent {
  lists = {
    listA1: [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime Text' }, { name: 'Atom' }, { name: 'Notepad++' }],
    listA2: [
      { name: 'Chrome' },
      { name: 'Firefox' },
      { name: 'Opera' },
      { name: 'Edge' },
      { name: 'Internet Explorer' },
      { name: 'Safari' },
    ],
    listA3: [],
    listB1: [{ name: 'Linux' }, { name: 'Windows' }, { name: 'Mac OS' }, { name: 'DOS' }, { name: 'Chrome OS' }],
    listB2: [{ name: 'Android' }, { name: 'IOS' }, { name: 'BlackBerry' }, { name: 'Symbian' }],
    listB3: [],
    listC1: [],
    listC2: [],
    listC3: [],
  };
  owners = [
    {
      id: 'not-assign',
      name: 'Not Assign',
      collapse: false,
    },
    {
      id: 'available',
      name: 'Available',
      collapse: false,
    },
    {
      id: 'not-available',
      name: 'Not Available',
      collapse: false,
    },
  ];
  listCol = [
    {
      id: 'group1',
      name: 'Group 1',
    },
    {
      id: 'group2',
      name: 'Group 2',
    },
    {
      id: 'group3',
      name: 'Group 3',
    },
  ];
  ownerListMap = {
    'not-assign': {
      group1: this.lists.listA1,
      group2: this.lists.listA2,
      group3: this.lists.listA3,
    },
    available: {
      group1: this.lists.listB1,
      group2: this.lists.listB2,
      group3: this.lists.listB3,
    },
    'not-available': {
      group1: this.lists.listC1,
      group2: this.lists.listC2,
      group3: this.lists.listC3,
    },
  };

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
    if (index !== -1) {
      if (fromIndex !== -1 && index > fromIndex) {
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
    Object.keys(this.lists)
      .map((key) => this.lists[key])
      .forEach((list) =>
        list.forEach((item) => {
          item.isSelected = false;
        })
      );
  }
}
