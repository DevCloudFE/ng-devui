import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import * as marked from 'marked';
import * as hljs from 'highlight.js/lib/highlight';

@Component({
  selector: 'd-api',
  templateUrl: './devui-api.component.html',
  styleUrls: ['./devui-api.component.css']
})
export class DevUIApiComponent implements OnInit, AfterViewInit, OnDestroy {
  sub: Subscription;
  @Input() api: any;

  constructor(private route: ActivatedRoute) { }

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

      return list.length ? '<code>' + list.replace(/[']*[\s]*\|[\s]*[']*/g, '</code>、<code>') + '</code>' : '';
    });
    return marked(md);
  }

  ngAfterViewInit() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
