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
      .get-start{
        overflow: auto;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
        margin-top: 3px;
        padding:0 20%;
      }
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
    if ((this.documentation.last || {} as any).nativeElement) {
      hljs.highlightBlock(this.documentation.last.nativeElement);
    }
  }
}
