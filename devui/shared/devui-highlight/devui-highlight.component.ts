import { Input, Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as HighLight from 'highlight.js/lib/highlight';

['xml', 'css', 'typescript'].forEach((langName) => {
  // Using require() here because import() support hasn't landed in Webpack yet
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  HighLight.registerLanguage(langName, langModule);
});

@Component({
  selector     : 'd-highlight',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <pre [ngClass]="'language-'+language"><code #codeEl [innerText]="code"></code></pre>
  `
})
export class DevUIHighlightComponent implements OnInit, AfterViewInit {
  // response: HighlightResult;
  _code;
  @ViewChild('codeEl') codeElement: ElementRef;
  @Input() language: string;

  @Input()
  get code() {
    return this._code || '';
  }

  set code(value) {
    this._code = value;
  }

  ngAfterViewInit() {
    (<any>HighLight).highlightBlock(this.codeElement.nativeElement);
  }

  constructor() {
  }

  ngOnInit() {
  }

  // onHighlight(e) {
  //   this.response = {
  //     language: e.language,
  //     r: e.r,
  //     second_best: '{...}',
  //     top: '{...}',
  //     value: '{...}'
  //   };
  // }
}
