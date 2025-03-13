import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'd-highlight',
    template: ``,
    styleUrls: ['./highlight.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HighlightComponent implements OnChanges {
  @HostBinding('style.display') display = 'inline';
  @Input() value: string;
  @Input() term: string;
  /**
   * @deprecated
   */
  @Input() highlightClass = 'devui-match-highlight';
  document: Document;

  constructor(private translateHtml: DomSanitizer, private eleRef: ElementRef, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.addDom(this.value, this.term);
  }
  addDom(value: string, term: string): any {
    if (value && term) {
      this.highlight(value, term);
    } else {
      const container = this.eleRef.nativeElement;
      this.emptyChildren(container);
      container.textContent = value;
    }
  }
  emptyChildren(container) {
    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
  }

  highlight(value: string, term: string) {
    const container = this.eleRef.nativeElement;
    this.emptyChildren(container);
    const reg = (str) => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regExp = new RegExp('(' + reg(term) + ')', 'gi');
    const temp = value.split(regExp);
    const createHighLight = (text) => {
      const spanDOM = this.document.createElement('span');
      spanDOM.classList.add('devui-match-highlight');
      spanDOM.textContent = text;
      return spanDOM;
    };

    temp.forEach((element, index) => {
      if (index % 2 === 0) {
        container.appendChild(this.document.createTextNode(element));
      } else {
        container.appendChild(createHighLight(element));
      }
    });
  }
}
