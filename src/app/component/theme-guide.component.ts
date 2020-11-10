import {
    AfterViewInit,
    Component,
    ElementRef,
    QueryList,
    ViewChildren
  } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import * as hljs from 'highlight.js/lib/highlight';

  ['bash', 'typescript', 'json'].forEach((langName) => {
    const langModule = require(`highlight.js/lib/languages/${langName}`);
    hljs.registerLanguage(langName, langModule);
  });

  @Component({
    template: `
      <div class="get-start">
      <div class="readme">
      <div [innerHTML]="readMe | safe: 'html'" #documentation></div>
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
  export class ThemeGuideComponent implements AfterViewInit {
    readMe: HTMLElement = require('!html-loader!markdown-loader!./themeGuide.md');
    @ViewChildren('documentation') documentation: QueryList<ElementRef>;

    constructor(private route: ActivatedRoute) {
    }

    ngAfterViewInit(): void {
      Array.from<HTMLElement>(document.querySelectorAll('pre code')).forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }

