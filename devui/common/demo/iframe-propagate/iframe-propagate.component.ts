import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'd-common-iframe-propagate',
  templateUrl: './iframe-propagate.component.html',
})
export class IframPropagateDemoComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const divElement = document.createElement('div');
    divElement.innerHTML = `
        <p>Child container: iframe<br>子容器：iframe</p>
        <p>点击iframe区域内容触发宿主元素的click事件（改变背景颜色）</p>
    `;
    this.el.nativeElement.querySelector('iframe.content-box').contentDocument.body.appendChild(divElement);
  }

  hostClick(event) {
    event.target.style.background = '#56c3f6';
  }
}
