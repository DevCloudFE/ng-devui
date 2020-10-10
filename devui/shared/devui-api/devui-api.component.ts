import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data, Router } from '@angular/router';
import * as marked from 'marked/lib/marked';
import * as hljs from 'highlight.js/lib/highlight';

@Component({
  selector: 'd-api',
  templateUrl: './devui-api.component.html',
  preserveWhitespaces: false,
})
export class DevUIApiComponent implements OnInit, AfterViewInit, OnDestroy {
  sub: Subscription;
  @Input() api: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.data.subscribe(data => {
      this.api = data.api;
    });
  }

  markdown() {
    const md = this.api.replace(/[\[]{2}[^\]]*[\]]{2}/g, function (s) {
      let list = s.substr(2, s.length - 4);
      if (list.length <= 2) {
        return '';
      }

      if (list[0] === '\'') {
        list = list.substr(1);
      }
      if (list[list.length - 1] === '\'') {
        list = list.substr(0, list.length - 1);
      }

      return list.length ? '<code>' + list.replace(/[']*[\s]*\|[\s]*[']*/g, '</code>〝<code>') + '</code>' : '';
    });
    return marked(md);
  }

  ngAfterViewInit() {
    const that = this;
    Array.from<HTMLElement>(document.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block);
    });
    Array.from(document.querySelectorAll('a')).forEach((link) => {
      if (link.href.includes('/components')) {
        const hrefValue = link.getAttribute('href');
        link.onclick = function ($event) {
          $event.preventDefault();
          that.router.navigateByUrl(hrefValue);
        };
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
