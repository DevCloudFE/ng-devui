import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-splitter-demo-shrink',
  templateUrl: './shrink.component.html',
  styleUrls: ['./shrink.component.scss'],
})
export class SplitterDemoMenuFoldComponent implements OnInit {
  // splitter input
  orientation = 'horizontal';
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

interface IMenuType {
  title: string;
  active: boolean;
  children?: Array<{
    title: string;
    active: boolean;
  }>;
  icon?: string;
}
