import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from 'ng-devui/i18n';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import * as hljs from 'highlight.js/lib/core';
import { marked } from 'marked';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-api',
  templateUrl: './devui-api.component.html',
  styleUrls: ['./devui-api.component.scss'],
  preserveWhitespaces: false,
})
export class DevUIApiComponent implements OnInit, AfterViewInit, OnDestroy {
  subs: Subscription = new Subscription();
  _api: any;
  @Input() set api(api: any) {
    const newApi = (api.default || api)
      .replace(/<table>/g, `<div class="devui-api-table-wrapper"><table>`)
      .replace(/<\/table>/g, `</table></div>`);
    this._api = newApi;
  }

  get api() {
    return this._api;
  }

  apiData: any;
  navSpriteInstance = null;
  document: Document;
  scrollContainer;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private i18n: I18nService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
    this.scrollContainer = this.document.documentElement;
  }

  ngOnInit() {
    this.subs.add(
      this.route.data.subscribe((data) => {
        this.apiData = data;
        this.setApi(localStorage.getItem('lang') || 'zh-cn');
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        this.setApi(event.lang);
        setTimeout(() => {
          if (this.navSpriteInstance) {
            this.navSpriteInstance.getNavData(false);
          }
        }, 500);
      })
    );
  }

  setApi(lang) {
    if (Object.prototype.hasOwnProperty.call(this.i18n.i18nConfig, lang)) {
      this.api = this.apiData[lang];
      setTimeout(() => {
        this.refreshView();
      });
    }
  }

  refreshView() {
    Array.from<HTMLElement>(this.document.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block);
    });
    const that = this;
    Array.from(this.elementRef.nativeElement.querySelectorAll('a')).forEach((link: HTMLElement) => {
      let hrefValue = link.getAttribute('href');
      if (hrefValue && hrefValue.indexOf('demo') === 0) {
        hrefValue = this.baseUrl.replace(/\/((?!\/).)*$/, '/' + hrefValue);
        link.setAttribute('href', hrefValue);
        link.onclick = ($event) => {
          $event.preventDefault();
          that.router.navigateByUrl(hrefValue);
        };
      } else if (hrefValue && hrefValue.indexOf('#') === 0) {
        hrefValue = this.baseUrl + hrefValue;
        link.setAttribute('href', hrefValue);
      }
    });
  }

  markdown() {
    const md = this.api.replace(/[\[]{2}[^\]]*[\]]{2}/g, (s) => {
      let list = s.substr(2, s.length - 4);
      if (list.length <= 2) {
        return '';
      }
      if (list[0] === "'") {
        list = list.substr(1);
      }
      if (list[list.length - 1] === "'") {
        list = list.substr(0, list.length - 1);
      }

      return list.length ? '<code>' + list.replace(/[']*[\s]*\|[\s]*[']*/g, '</code>〝<code>') + '</code>' : '';
    });
    return marked(md);
  }

  ngAfterViewInit() {
    this.refreshView();
    setTimeout(() => {
      if (this.navSpriteInstance) {
        this.navSpriteInstance.getNavData();
      }
    }, 500);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  afterNavInit(e) {
    this.navSpriteInstance = e;
  }

  get baseUrl() {
    if (typeof window === 'undefined') {
      return '';
    }
    return window.location.pathname.replace(window.location.hash, '');
  }
}
