import { Component, NgZone, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from 'ng-devui/i18n';
import { fromEvent, Subscription } from 'rxjs';
import { VERSION } from '../../devui/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  version;
  clickSub: Subscription = new Subscription();
  currentLang: string;
  versionOptions = [];
  currentOption;
  constructor(private renderer2: Renderer2, private ngZone: NgZone, private router: Router, private i18n: I18nService) {
    const oldHandler = this.router.errorHandler;
    this.router.errorHandler =  (err: any) => {
      // 加载失败的时候刷新重试一次
      if (err.stack && err.stack.indexOf('Error: Loading chunk') >= 0) {
        if (localStorage.getItem('lastChunkError') !== err.stack) {
          localStorage.setItem('lastChunkError', err.stack);
          window.location.reload();
        } else {
          console.error(`We really don't find the chunk...`);
        }
      }
      oldHandler(err);
    };
  }
  ngOnInit(): void {
    this.version = VERSION.full;
    this.versionOptions = [
      { name: this.version, link: '/components/get-start', target: '_self' },
      { name: '8.2.0', link: '/8.2.0/', target: '_self' }
    ];
    this.currentOption = this.versionOptions[0];
    this.ngZone.runOutsideAngular(() => {
      const headerMenu = document.querySelector('#headerMenu');
      const headerNode = headerMenu.parentNode;
      const containerNode = document.querySelector('.app-container');
      this.clickSub.add(fromEvent(headerMenu, 'click').subscribe(e => {
        if (headerMenu.classList.contains('active')) {
          this.renderer2.removeClass(headerMenu, 'active');
          this.renderer2.removeClass(headerNode, 'active');
        } else {
          this.renderer2.addClass(headerMenu, 'active');
          this.renderer2.addClass(headerNode, 'active');
        }
      }));
      this.clickSub.add(fromEvent(containerNode, 'click').subscribe(e => {
        if (headerMenu.classList.contains('active') && !(<any>headerNode).contains(e.target)) {
          this.renderer2.removeClass(headerMenu, 'active');
          this.renderer2.removeClass(headerNode, 'active');
        }
      }));
    });
    this.currentLang = localStorage.getItem('lang') || 'zh-cn';
  }
  toggleLanguage() {
    this.currentLang === 'zh-cn' ? this.currentLang = 'en-us' : this.currentLang = 'zh-cn';
    this.i18n.toggleLang(this.currentLang);
  }
  ngOnDestroy(): void {
    if (this.clickSub) {
      this.clickSub.unsubscribe();
    }
  }
  jumpTo($event) {
    window.open($event.link, $event.target);
  }
}
