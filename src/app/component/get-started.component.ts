import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as hljs from 'highlight.js/lib/highlight';

['bash', 'typescript'].forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});

@Component({
  template: `
    <div class="get-start">
    <div class="readme">
    <div [innerHTML]="readMe" #documentation></div>
    </div>
    </div>
  `,
    styles: [
      `
      .readme {
        box-sizing:border-box;
      }
      `
    ],
})
export class GetStartedComponent implements AfterViewInit {
  readMe: HTMLElement = require('!html-loader!markdown-loader!./getStarted.md');
  @ViewChildren('documentation') documentation: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('pre code').forEach((block) => {
      console.log(block);
      hljs.highlightBlock(block);
    });
  }
}
