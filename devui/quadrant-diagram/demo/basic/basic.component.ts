import { Component } from '@angular/core';
import { ILabelDataConfigs } from 'ng-devui/quadrant-diagram';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent {
  labelData: Array<ILabelDataConfigs> = [];
  list = [
    { title: 'First level', content: '<p>First level target</p><p>Value 3</p><p>Urgency 3</p><p>Priority 3</p>', progress: 40 },
    { title: 'Feature target', content: '<p>Feature target</p><p>Value 3</p><p>Urgency 3</p><p>Priority 3</p>', progress: 30 },
    { title: 'Secondary', content: '<p>Secondary target</p><p>Value：3</p><p>Urgency 3</p><p>Priority 3</p>', progress: 20 },
    { title: 'Three-level', content: '<p>Three-level target</p><p>Value：3</p><p>Urgency 3</p><p>Priority 3</p>', progress: 10 },
  ];

  dropEvent(item) {
    const droppedItem = this.list.map((e) => e.title).indexOf(item.dragData.item.title);
    if (droppedItem !== -1) {
      this.list.splice(droppedItem, 1);
    }
    const label = {
      title: item.dragData.item.title,
      content: item.dragData.item.content,
      x: item.xAxisValue,
      y: item.yAxisValue,
      progress: item.dragData.item.progress,
    };
    const labelIndex = this.labelData.map((e) => e.title).indexOf(label.title);
    if (labelIndex !== -1) {
      this.labelData.splice(labelIndex, 1);
    }
    this.labelData.push(label); // Place the dragged data on the quadrant graph to display
  }
}
