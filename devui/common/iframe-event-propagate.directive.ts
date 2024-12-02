import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Input } from '@angular/core';
@Directive({
  selector: '[dIframeEventPropagate]',
})
export class IframeEventPropagateDirective implements AfterViewInit {
  @Input() event = 'click';
  element: HTMLSelectElement;
  document: Document;
  constructor(el: ElementRef, @Inject(DOCUMENT) private doc: any) {
    this.element = el.nativeElement;
    this.document = this.doc;
  }

  ngAfterViewInit() {
    this.element.addEventListener('DOMSubtreeModified', this.AddIframeContentDocumentClickListener);
    if (this.element.querySelector('iframe') !== null) {
      this.AddIframeContentDocumentClickListener();
    }
  }
  AddIframeContentDocumentClickListener = () => {
    const iframe = this.element.querySelector('iframe');

    if (iframe !== null) {
      if (iframe.contentDocument !== null) {
        iframe.contentDocument.addEventListener(this.event, this.dispatchClickEvent);
      } else {
        const loadHandler = () => {
          iframe.contentDocument.addEventListener(this.event, this.dispatchClickEvent);
          iframe.removeEventListener('load', loadHandler);
        };
        iframe.addEventListener('load', loadHandler);
      }

      this.element.removeEventListener('DOMSubtreeModified', this.AddIframeContentDocumentClickListener);
    }
  };

  dispatchClickEvent = ($event) => {
    const event: any = this.document.createEvent('MouseEvents');
    event.initEvent(this.event, true, true);
    event.originEvent = $event;
    this.element.dispatchEvent(event);
  };
}
