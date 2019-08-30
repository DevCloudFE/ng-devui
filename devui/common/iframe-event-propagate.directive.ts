import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
@Directive({
  selector: 'ng2-ueditor, [dIframeEventPropagate]'
})
export class IframeEventPropagateDirective implements AfterViewInit {
  @Input() event = 'click';
  element: HTMLSelectElement;
  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngAfterViewInit() {
    this.element.addEventListener('DOMSubtreeModified', this.AddIframeContentDocumentClickListener);
    if (this.element.querySelector('iframe') !== null ) {
        this.AddIframeContentDocumentClickListener();
    }
  }
  AddIframeContentDocumentClickListener = () => {
      const iframe = this.element.querySelector('iframe');

      if (iframe !== null ) {
        if (iframe.contentDocument !== null) {
          iframe.contentDocument.addEventListener(this.event, this.dispatchClickEvent);
        } else {
          const loadHandler =  () => {
              iframe.contentDocument.addEventListener(this.event, this.dispatchClickEvent);
              iframe.removeEventListener('load', loadHandler);
          };
          iframe.addEventListener('load', loadHandler);
        }

        this.element.removeEventListener('DOMSubtreeModified', this.AddIframeContentDocumentClickListener);
      }
  }

  dispatchClickEvent = ($event) => {
    const event = document.createEvent('MouseEvents');
    event.initEvent(this.event, true, true);
    event['originEvent'] = $event;
    this.element.dispatchEvent(event);
  }
}
