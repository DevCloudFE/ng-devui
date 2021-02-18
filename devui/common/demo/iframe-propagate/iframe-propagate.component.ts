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
        <p>Child container: iframe</p>
        <p>Click iframe to trigger parent's click event, which will change the background color</p>
    `;
    this.el.nativeElement.querySelector('iframe.content-box').contentDocument.body.appendChild(divElement);
  }

  hostClick(event) {
    event.target.style.background = '#56c3f6';
  }
}
