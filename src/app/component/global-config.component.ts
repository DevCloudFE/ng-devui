import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from 'ng-devui/i18n';
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
        margin-bottom: 40px;
      }
    `,
  ],
})
export class GlobalConfigComponent implements OnInit, AfterViewInit {
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private i18n: I18nService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
  }
  ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    this.setReadMe(lang);
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.setReadMe(event.lang);
    });
  }

  setReadMe(lang) {
    const currLang = lang === 'en-us' ? 'en' : 'cn';
    this.readMe = require(`!html-loader!markdown-loader!./globalConfig-${currLang}.md`);
  }

  refreshView() {
    Array.from<HTMLElement>(this.document.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block);
    });
    Array.from(this.elementRef.nativeElement.querySelectorAll('a')).forEach((link: HTMLElement) => {
      let hrefValue = link.getAttribute('href');
      if (hrefValue && hrefValue.indexOf('#') === 0) {
        hrefValue = this.baseUrl + hrefValue;
        link.setAttribute('href', hrefValue);
      }
    });
  }
  get baseUrl() {
    if (typeof window === 'undefined') {
      return '';
    }
    return window.location.pathname.replace(window.location.hash, '');
  }

  ngAfterViewInit(): void {
    this.refreshView();
  }
}
