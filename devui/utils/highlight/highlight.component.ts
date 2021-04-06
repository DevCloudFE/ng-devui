import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'd-highlight',
  template: ``,
  styleUrls: ['./highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightComponent implements OnChanges {
  @HostBinding('style.display') display = 'inline';
  @Input() value: string;
  @Input() term: string;
  /**
   * @deprecated
   */
  @Input() highlightClass = 'devui-match-highlight';
  constructor(private translateHtml: DomSanitizer, private eleRef: ElementRef) {}
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
    const regExp = new RegExp('(' + term + ')', 'gi');
    const temp = value.split(regExp);
    function createHighLight(text) {
      const spanDOM = document.createElement('span');
      spanDOM.classList.add('devui-match-highlight');
      spanDOM.textContent = text;
      return spanDOM;
    }

    temp.forEach(function (element, index) {
      if (index % 2 === 0) {
        container.appendChild(document.createTextNode(element));
      } else {
        container.appendChild(createHighLight(element));
      }
    });
  }
}
