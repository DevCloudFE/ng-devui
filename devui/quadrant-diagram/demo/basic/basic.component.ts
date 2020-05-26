import { Component, OnInit } from '@angular/core';
import { ILabelDataConfigs } from 'ng-devui/quadrant-diagram';


@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  labelData: Array<ILabelDataConfigs> = [];
  list = [
    { title: '一级目标', content: '<p>一级目标</p><p>价值度：3</p><p>紧急度：3</p><p>优先级：3</p>', progress: 40 },
    { title: '特性目标', content: '<p>特性目标</p><p>价值度：3</p><p>紧急度：3</p><p>优先级：3</p>', progress: 30 },
    { title: '二级目标', content: '<p>二级目标</p><p>价值度：3</p><p>紧急度：3</p><p>优先级：3</p>', progress: 20 },
    { title: '三级目标', content: '<p>三级目标</p><p>价值度：3</p><p>紧急度：3</p><p>优先级：3</p>', progress: 10 }
  ];

  constructor() { }
  ngOnInit(): void {
  }
  dropEvent(item) {
    const droppedItem = this.list.map(function (e) {
      return e.title;
    }).indexOf(item.dragData.item.title);
    if (droppedItem !== -1) {
      this.list.splice(droppedItem, 1);
    }
    const label = {
      title: item.dragData.item.title,
      content: item.dragData.item.content,
      x: item.xAxisValue,
      y: item.yAxisValue,
      progress: item.dragData.item.progress
    };
    const labelIndex = this.labelData.map(function (e) {
      return e.title;
    }).indexOf(label.title);
    if (labelIndex !== -1) {
      this.labelData.splice(labelIndex, 1);
    }
    this.labelData.push(label); // 将拖拽的数据放到象限图上显示
  }
}

