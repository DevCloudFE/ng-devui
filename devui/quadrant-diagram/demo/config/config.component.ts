import { Component } from '@angular/core';
import { IAxisConfigs, ILabelDataConfigs, IQuadrantConfigs, IViewConfigs } from 'ng-devui/quadrant-diagram';

@Component({
  selector: 'd-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  xWeight = 2;
  yWeight = 1;
  view: IViewConfigs = {
    height: 900,
    width: 950,
  };
  list: Array<ILabelDataConfigs> = [
    { title: 'Mark', x: 0, y: 0, content: '' },
    { title: 'Jacob', x: 0, y: 0, content: '' },
    { title: 'John', x: 0, y: 0, content: '' },
    { title: 'Lily', x: 0, y: 0, content: '' },
  ];
  axisConfigs: IAxisConfigs = {
    xAxisLabel: 'Potential',
    yAxisLabel: 'Ability',
    xWeight: this.xWeight,
    yWeight: this.yWeight,
  };
  quadrantConfigs: Array<IQuadrantConfigs> = [
    {

      title: 'Perfect',
      backgroundColor: 'rgba(232,240,253,0.4)',
      color: 'rgba(81,112,255,0.5)',
    },
    {

      title: 'Excellent',
      backgroundColor: 'rgba(232,240,253,0.2)',
      color: 'rgba(81,112,255,0.5)',
    },
    {

      title: 'Keep it up',
      backgroundColor: 'rgba(243,246,248,0.4)',
      color: 'rgba(149,158,178,0.5)',
    },
    {

      title: 'Full of potential',
      backgroundColor: 'rgba(232,240,253,0.2)',
      color: 'rgba(81,112,255,0.5)',
    },
  ];
  labelData = [{ title: 'Rose', x: 80, y: 20, content: '<p>Rose的能力</p><p>能力值：20</p><p>潜力值：80</p>', id: 'Rose' }];

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
    if (fromIndex === -1) {
      this.removeItem(item, e.dragData.parent);
    }
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.map((e) => e.title).indexOf(item.title);
    list.splice(index, 1);
    this.labelData = Object.assign([], list);
  }

  dropEvent(item) {
    console.log(item);
    const droppedItem = this.list.map((e) => e.title).indexOf(item.dragData.item.title);
    if (droppedItem !== -1) {
      this.list.splice(droppedItem, 1);
    }
    const label = {
      title: item.dragData.item.title,
      content: `<p>${item.dragData.item.title}的能力</p><p>能力值：${item.yAxisValue * this.yWeight}</p><p>潜力值：${
        item.xAxisValue * this.xWeight
      }</p>`,
      x: item.xAxisValue,
      y: item.yAxisValue,
      progress: item.dragData.item.progress,
      id: item.dragData.item.title,
    };
    const labelIndex = this.labelData.map((e) => e.id).indexOf(label.id);
    if (labelIndex !== -1) {
      this.labelData.splice(labelIndex, 1);
    }
    // Place the dragged data on the quadrant graph to display
    this.labelData.push(label);
  }

}
