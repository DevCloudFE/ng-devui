import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject } from '@angular/core';

@Component({
  selector: 'd-common-iframe-propagate',
  templateUrl: './iframe-propagate.component.html',
})
export class IframPropagateDemoComponent implements AfterViewInit {
  document: Document;
  constructor(private el: ElementRef, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  ngAfterViewInit() {
    const divElement = this.document.createElement('div');
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
