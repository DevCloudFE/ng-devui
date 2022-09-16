import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as HighLight from 'highlight.js/lib/core';

['xml', 'css', 'typescript'].forEach((langName) => {
  // Using require() here because import() support hasn't landed in Webpack yet
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  HighLight.registerLanguage(langName, langModule);
});

@Component({
  selector: 'd-highlight',
  encapsulation: ViewEncapsulation.None,
  template: ` <pre [ngClass]="'language-' + language"><code #codeEl [innerText]="code"></code></pre> `,
  preserveWhitespaces: false,
})
export class DevUIHighlightComponent implements AfterViewInit {
  // response: HighlightResult;
  _code;
  @ViewChild('codeEl', { static: true }) codeElement: ElementRef;
  @Input() language: string;

  @Input()
  get code() {
    return this._code || '';
  }

  set code(value) {
    this._code = value;
  }

  ngAfterViewInit() {
    HighLight.highlightBlock(this.codeElement.nativeElement);
  }

  constructor() {}
}
