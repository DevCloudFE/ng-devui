import { Component, OnInit } from '@angular/core';
import { SplitterOrientation } from 'ng-devui/splitter';

interface IMenuType {
  title: string;
  active: boolean;
  children?: Array<{
    title: string;
    active: boolean;
  }>;
  icon?: string;
}

@Component({
  selector: 'd-splitter-demo-shrink',
  templateUrl: './shrink.component.html',
  styleUrls: ['./shrink.component.scss'],
})
export class SplitterDemoMenuFoldComponent implements OnInit {
  // splitter input
  orientation: SplitterOrientation = 'horizontal';
  splitBarSize = '2px';
  disabledBarSize = '1px';

  // splitter pane input
  size = '20%';
  minSize = '10%';
  maxSize = '60%';
  collapsed = false;
  isPaneShrink = false;
  hoverCard: Array<any> = [];

  menu: Array<IMenuType> = [
    {
      title: 'item1',
      active: false,
      children: [
        { title: 'child1', active: false },
        { title: 'child2', active: false },
        { title: 'child3', active: false },
      ],
      icon: 'icon-share',
    },
    {
      title: 'item2',
      icon: 'icon-gps',
      active: false,
    },
    {
      title: 'item3',
      icon: 'icon-go-module',
      active: false,
    },
    {
      title: 'item4',
      icon: 'icon-layout',
      active: false,
    },
    {
      title: 'item5',
      icon: 'icon-op-delete',
      active: false,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.menu.forEach((item) => {
      if (item.children) {
        let childTitle = `<span>${item.title}</span>`;
        item.children.forEach((child) => {
          childTitle += `<li>${child.title}</li>`;
        });
        this.hoverCard.push(childTitle);
      } else {
        this.hoverCard.push(item.title);
      }
    });
  }

  sizeChange(size) {
    console.log(size);
  }

  collapsedChange(event) {
    console.log(event);
    this.collapsed = event;
  }

  selectItem(selectedItem) {
    this.menu.forEach((item) => {
      if (item === selectedItem) {
        item.active = true;
      } else {
        item.active = false;
        if (item.children) {
          item.children.forEach((child) => {
            child.active = false;
          });
        }
      }
    });
    this.collapsedChange(false);
  }

  paneShrinkStatus(status) {
    this.isPaneShrink = status;
  }

  isChildrenActive(item) {
    const isActive = item.children && item.children.some((child) => child.active);
    return isActive;
  }
}
