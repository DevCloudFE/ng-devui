import { Component, Inject, NgZone, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEVUI_LANG, EN_US, I18nService, ZH_CN } from 'ng-devui/i18n';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { VERSION } from '../../devui/version';
import { LinkMap } from '../../devui-commons/src/constant';

@Component({
  selector: 'd-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
  })
export class AppComponent implements OnInit, OnDestroy {
  version;
  clickSub: Subscription = new Subscription();
  currentLang: string;
  innerMenuList = [
    {
      name: '设计规范',
      enName: 'DevUI Design',
      href: '/design-cn/start'
    },
    {
      name: '组件',
      enName: 'Components',
      href: '/components/overview',
      target: '_self'
    },
    {
      name: '版本历程',
      enName: 'Changelog',
      href: LinkMap.versionRelease
    },
  ];
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
    this.innerMenuList.find(menu => menu.href === '/components/overview').href = `/components/${this.currentLang}/overview`;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const pathArray = this.router.url.split('/');
        const langParam = pathArray[2];
        if (!Object.prototype.hasOwnProperty.call(this.i18n.i18nConfig, langParam)) {
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
  }
  toggleLanguage(lang) {
    this.i18n.toggleLang(lang);
    this.currentLang = lang;
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
