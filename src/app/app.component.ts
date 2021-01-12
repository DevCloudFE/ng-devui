import { Component, Inject, NgZone, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DEVUI_LANG, EN_US, I18nService, ZH_CN } from 'ng-devui/i18n';
import { TranslateService } from '@ngx-translate/core';
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
  constructor(private renderer2: Renderer2, private ngZone: NgZone, private router: Router, private translate: TranslateService,
              private i18n: I18nService, @Inject(DEVUI_LANG) private appLang) {
    translate.addLangs([ZH_CN, EN_US]);
    translate.setDefaultLang(this.appLang ? this.appLang : ZH_CN);
    const oldHandler = this.router.errorHandler;
    this.router.errorHandler = (err: any) => {
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
    this.currentLang = localStorage.getItem('lang') || this.appLang;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const pathArray = this.router.url.split('/');
        const langParam = pathArray[2];
        if (!this.i18n.i18nConfig.hasOwnProperty(langParam)) {
          this.currentLang = this.i18n.DEFAULT_LANG;
          localStorage.setItem('lang', this.i18n.DEFAULT_LANG);
          pathArray[2] = this.i18n.DEFAULT_LANG;
          this.router.navigateByUrl(pathArray.join('/'));
        } else {
          this.currentLang = langParam;
          document.body.setAttribute('ui-lang', langParam);
          this.i18n.toggleLang(langParam);
          this.translate.use(langParam);
        }
      }
    });
    this.version = VERSION.full;
    const versionArr = this.version.split('.');
    this.versionOptions = [
      { name: this.version, link: '/components/get-start', target: '_self' },
      { name: '9.3.0', link: '/9.3.0/', target: '_self' },
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
  }
  toggleLanguage() {
    this.currentLang === ZH_CN ? this.currentLang = EN_US : this.currentLang = ZH_CN;
    const url = this.router.url;
    const pathArray = url.split('/');
    pathArray[2] = this.currentLang;
    this.router.navigateByUrl(pathArray.join('/'));
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
