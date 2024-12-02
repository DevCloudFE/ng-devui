import { Component } from '@angular/core';

@Component({
  selector: 'd-drop-scroll',
  templateUrl: './drop-scroll.component.html',
  styleUrls: ['./drop-scroll.component.scss'],
})
export class DropScrollComponent {
  lists = [
    {
      name: 'IDE',
      list: [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime Text' }, { name: 'Atom' }, { name: 'Notepad++' }],
    },
    {
      name: 'Browser',
      list: [
        { name: 'Chrome' },
        { name: 'Firefox' },
        { name: 'Opera' },
        { name: 'Edge' },
        { name: 'Internet Explorer' },
        { name: 'Safari' },
      ],
    },
    {
      name: 'OS',
      list: [{ name: 'Linux' }, { name: 'Windows' }, { name: 'Mac OS' }, { name: 'DOS' }, { name: 'Chrome OS' }],
    },
    {
      name: 'Mobile OS',
      list: [{ name: 'Android' }, { name: 'IOS' }, { name: 'BlackBerry' }, { name: 'Symbian' }],
    },
    {
      name: 'Website',
      list: [],
    },
    {
      name: 'Search Engine',
      list: [],
    },
    {
      name: 'Technology Stack',
      list: [],
    },
    {
      name: 'Language',
      list: [],
    },
    {
      name: 'Whatever',
      list: [],
    },
  ];
  showDropScrollArea = false;

  onDrop(e: any, targetArray: Array<any>) {
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

  removeItem(item: any, list: Array<any>) {
    const index = list.map((e) => e.name).indexOf(item.name);
    list.splice(index, 1);
  }
}
