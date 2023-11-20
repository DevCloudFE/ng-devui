import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import * as hljs from 'highlight.js/lib/core';

['bash', 'typescript', 'json'].forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});

@Component({
  template: `
    <div dCodeCopy class="get-start">
      <div class="readme">
        <div [innerHTML]="readMe | safe: 'html'" #documentation></div>
      </div>
    </div>
  `,
  styles: [
    `
      .readme {
        box-sizing: border-box;
      }
    `,
  ],
})
export class ThemeGuideComponent implements OnInit, AfterViewInit {
  _readMe: HTMLElement;

  @Input() set readMe(readMe: any) {
    this._readMe = readMe.default || readMe;
    setTimeout(() => {
      this.refreshView();
    });
  }
  get readMe() {
    return this._readMe;
  }
  document: Document;
  @ViewChildren('documentation') documentation: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute, private translate: TranslateService, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  ngOnInit() {
    const lang = localStorage.getItem('lang');
    this.setReadMe(lang);
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.setReadMe(event.lang);
    });
  }

  setReadMe(lang) {
    const currLang = lang === 'en-us' ? 'en' : 'cn';
    this.readMe = require(`!html-loader!markdown-loader!./themeGuide-${currLang}.md`);
  }

  ngAfterViewInit(): void {
    this.refreshView();
  }

  refreshView() {
    Array.from<HTMLElement>(this.document.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
}
