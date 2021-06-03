import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
@Component({
    selector: 'd-demo-time-axis-template-content',
    templateUrl: './time-axis-template-content.component.html'
})
export class TimeAxisTemplateContentComponent implements AfterViewInit {
  @ViewChild('yearShow') yearShow: TemplateRef<any>;
  timeAxisTemplate = {
    direction: 'horizontal',
    model: 'template',
    list: [
      {
        text: 'hello',
        type: 'success',
        lineStyle: {style: 'dashed'},
        extraElement: {},
        data: { title: '第四季度交付版本1.0', date: '2019/11/01', status: '已发布', color: '#50d4ab'}
      },
      {
        text: 'world',
        type: 'danger',
        lineStyle: {style: 'dashed'},
        data: { title: '第一季度交付版本2.0', date: '2020/03/01', status: '未开始', color: '#f66f6a', backgroundColor: 'rgba(255, 230, 230, 0.2)'}
      },
      {
        text: 'nihao',
        type: 'warning',
        lineStyle: {style: 'dashed'},
        data: { title: '第二季度交付版本1.0', date: '2020/05/01', status: '进行中', color: '#fac20a'}
      },
      {
        text: 'DevUI',
        type: 'danger',
        lineStyle: {style: 'dashed'},
        data: { title: '第三季度交付版本1.0', date: '2020/09/01', status: '未开始', color: '#f66f6a'}
      },
      {
        text: 'Awesome',
        type: 'success',
        lineStyle: {style: 'dashed'},
        data: { title: '第三季度交付版本1.0', date: '2020/09/01', status: '已发布', color: '#50d4ab'}
      },
    ]
  };

  constructor() {
  }

  ngAfterViewInit() {
    this.timeAxisTemplate.list[0].extraElement = this.yearShow;
  }

}
