import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
@Component({
    selector: 'd-demo-time-axis-template-content',
    templateUrl: './time-axis-template-content.component.html',
    standalone: false
})
export class TimeAxisTemplateContentComponent implements AfterViewInit {
  @ViewChild('yearShow') yearShow: TemplateRef<any>;
  timeAxisTemplate = {
    direction: 'horizontal',
    model: 'template',
    horizontalAlign: 'left',
    list: [
      {
        text: 'hello',
        dotColor: 'var(--devui-success)',
        lineStyle: {style: 'dashed'},
        extraElement: {},
        data: { title: '第四季度交付版本1.0', date: '2019/11/01', status: '已发布', color: 'var(--devui-success)', position: 'bottom'}
      },
      {
        text: 'world',
        dotColor: 'var(--devui-danger)',
        lineStyle: {style: 'dashed'},
        data: { title: '第一季度交付版本2.0', date: '2020/03/01', status: '未开始', color: 'var(--devui-danger)',
          backgroundColor: 'rgba(255, 230, 230, 0.2)', position: 'top'}
      },
      {
        text: 'nihao',
        dotColor: 'var(--devui-warning)',
        lineStyle: {style: 'dashed'},
        data: { title: '第二季度交付版本1.0', date: '2020/05/01', status: '进行中', color: 'var(--devui-warning)', position: 'bottom'}
      },
      {
        text: 'DevUI',
        dotColor: 'var(--devui-danger)',
        lineStyle: {style: 'dashed'},
        data: { title: '第三季度交付版本1.0', date: '2020/09/01', status: '未开始', color: 'var(--devui-danger)', position: 'top'}
      },
      {
        text: 'Awesome',
        dotColor: 'var(--devui-success)',
        lineStyle: {style: 'dashed'},
        data: { title: '第三季度交付版本1.0', date: '2020/09/01', status: '已发布', color: 'var(--devui-success)', position: 'bottom'}
      },
    ]
  };

  constructor() {
  }

  ngAfterViewInit() {
    this.timeAxisTemplate.list[0].extraElement = this.yearShow;
  }

}
