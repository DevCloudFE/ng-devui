import { Component, OnInit } from '@angular/core';
import {
  ILabelDataConfigs,
  IAxisConfigs,
  IQuadrantConfigs,
  IViewConfigs
} from 'ng-devui/quadrant-diagram';


@Component({
  selector: 'd-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  xWeight = 2;
  yWeight = 1;
  view: IViewConfigs = {
    height: 900,
    width: 950
  };
  list: Array<ILabelDataConfigs> = [
    { title: 'Mark', x: 0, y: 0, content: '' },
    { title: 'Jacob', x: 0, y: 0, content: '' },
    { title: 'John', x: 0, y: 0, content: '' },
    { title: 'Lily', x: 0, y: 0, content: '' }
  ];
  axisConfigs: IAxisConfigs = {
    xAxisLabel: '潜力',
    yAxisLabel: '能力',
    xWeight: this.xWeight,
    yWeight: this.yWeight
  };
  quadrantConfigs: Array<IQuadrantConfigs> = [
    {

      title: '完美',
      backgroundColor: 'rgba(232,240,253,0.4)',
      color: 'rgba(81,112,255,0.3)'
    },
    {

      title: '优秀',
      backgroundColor: 'rgba(232,240,253,0.2)',
      color: 'rgba(81,112,255,0.3)'
    },
    {

      title: '继续努力',
      backgroundColor: 'rgba(243,246,248,0.4)',
      color: 'rgba(149,158,178,0.3)'
    },
    {

      title: '富有潜力',
      backgroundColor: 'rgba(232,240,253,0.2)',
      color: 'rgba(81,112,255,0.3)'
    },
  ];
  labelData = [{ title: 'Rose', x: 80, y: 20, content: '<p>Rose的能力</p><p>能力值：20</p><p>潜力值：80</p>', id: 'Rose' }];
  constructor() { }

  ngOnInit(): void {
  }

  onDrop(e: any, targetArray) {
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    e.dragData.item.x = 0;
    e.dragData.item.y = 0;
    const item = e.dragData.item;
    if (-1 !== index) {
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
    const index = list.map(function (e) {
      return e.title;
    }).indexOf(item.title);
    list.splice(index, 1);
    this.labelData = Object.assign([], list);
  }

  dropEvent(item) {
    console.log(item);
    const droppedItem = this.list.map(function (e) {
      return e.title;
    }).indexOf(item.dragData.item.title);
    if (droppedItem !== -1) {
      this.list.splice(droppedItem, 1);
    }
    const label = {
      title: item.dragData.item.title,
      content: '<p>' + item.dragData.item.title + '的能力</p><p>能力值：' + item.yAxisValue * this.yWeight
        + '</p><p>潜力值：' + item.xAxisValue * this.xWeight + '</p>',
      x: item.xAxisValue,
      y: item.yAxisValue,
      progress: item.dragData.item.progress,
      id: item.dragData.item.title
    };
    const labelIndex = this.labelData.map(function (e) {
      return e.id;
    }).indexOf(label.id);
    if (labelIndex !== -1) {
      this.labelData.splice(labelIndex, 1);
    }
    this.labelData.push(label); // 将拖拽的数据放到象限图上显示
  }

}

