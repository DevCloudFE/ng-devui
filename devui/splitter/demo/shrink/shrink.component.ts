import { Component } from '@angular/core';

@Component({
  selector: 'd-splitter-demo-shrink',
  templateUrl: './shrink.component.html',
  styleUrls: ['./shrink.component.scss'],
})
export class SplitterDemoMenuFoldComponent {
  // splitter input
  orientation = 'horizontal';
  splitBarSize = '2px';
  disabledBarSize = '1px';

  // splitter pane input
  size = '20%';
  minSize = '10%';
  maxSize = '60%';

  hoverMenuItem;
  isPaneShrink = false;
  hoverIcon = false;
  hoverCardLeft;
  hoverCardTop;

  menu: Array<IMenuType> = [
    {
      title: '内容一',
      active: false,
      children: [
        { title: '子内容1', active: false },
        { title: '子内容2', active: false },
        { title: '子内容3', active: false },
      ],
        icon: 'icon-share',
    },
    {
      title: '内容二',
        icon: 'icon-gps',
      active: false,
    },
    {
      title: '内容三',
        icon: 'icon-go-module',
      active: false,
    },
    {
      title: '内容四',
        icon: 'icon-layout',
      active: false,
    },
    {
      title: '内容五',
        icon: 'icon-op-delete',
      active: false,
    },
  ];

  constructor() {}

  sizeChange(size) {
    console.log(size);
  }

  collapsedChange(event) {
    console.log(event);
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
  }

  paneShrinkStatus(status) {
    this.isPaneShrink = status;
  }

  iconMouseEnter(event, hoverItem) {
    this.hoverMenuItem = hoverItem;
    this.hoverIcon = true;

    const targetLi = event.target;
    const { x, y, width, height } = targetLi.getBoundingClientRect();
    this.hoverCardLeft = x + width;
    this.hoverCardTop = y + height / 2;
  }

  iconMouseLeave(_) {
    this.hoverIcon = false;
  }

  isChildrenActive(item) {
    const isActive = item.children && item.children.some((child) => child.active);
    return isActive;
  }
}

interface IMenuType {
  title: string;
  active: boolean;
  children?: Array<{
    title: string;
    active: boolean;
  }>;
  icon?: string;
}
