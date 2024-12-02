import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IExampleData } from 'ng-devui/shared/helpers';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import * as hljs from 'highlight.js/lib/core';
import { Subscription, fromEvent } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComponentDataService } from './component.data.service';

['javascript', 'typescript'].forEach((langName) => {
  // Using require() here because import() support hasn't landed in Webpack yet
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});

@Component({
  selector: 'd-demo-cell',
  styleUrls: ['./example-panel.component.scss'],
  templateUrl: './example-panel.component.html',
})
export class ExamplePanelComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: IExampleData;
  @ViewChildren('html') html: QueryList<ElementRef>;
  @ViewChildren('typescript') typescript: QueryList<ElementRef>;
  @ViewChildren('documentation') documentation: QueryList<ElementRef>;
  componentName: string;
  componentTab: string | number;
  description: string;
  tmw: string;
  componentPath: string;
  document: Document;
  subs: Subscription = new Subscription();
  showHeaderWrapper = false;
  imgPrefix: string;
  srcPrefix = environment.deployPrefix + 'assets';
  componentsData = [];
  curComponentData: any;
  tabWidth: string;
  footer: any;
  tabContainerWidth: string;
  showDesignTab = false;
  showTabComponents = ['button', 'auto-complete', 'select', 'text-input'];
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private comDataService: ComponentDataService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
    this.comDataService.getComData().subscribe((value) => {
      this.componentsData = value;
    });
    this.setI18n();
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.setI18n();
    });
  }
  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  ngOnInit(): void {
    const array = this.router.url.split('/');
    this.componentPath = array[array.length - 2];
    this.componentsData.forEach((item) =>
      item.children.forEach((child) => {
        if (child.link === this.componentPath) {
          this.curComponentData = child;
        }
      })
    );
    this.showDesignTab = this.showTabComponents.includes(this.componentPath);
    this.getData(this.translate.translations[this.translate.currentLang]);
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.getData(event.translations);
    });
    this.route.url.subscribe((UrlSegments) => {
      const fragmentIndex = this.router.url.split('/').pop().indexOf('#');
      this.componentTab =
        fragmentIndex === -1 ? this.router.url.split('/').pop() : this.router.url.split('/').pop().slice(0, fragmentIndex);
    });
    if (this.subs) {
      this.subs.unsubscribe();
    }
    this.subs = new Subscription();
    this.addScrollEvent();
    this.imgPrefix = './' + this.srcPrefix + '/overview/';
  }

  setI18n() {
    this.footer = this.translate.instant('footer') || {};
  }

  addScrollEvent() {
    this.subs.add(
      fromEvent(window, 'scroll').subscribe((value) => {
        if ((value.target as Document).documentElement.scrollTop > 270) {
          this.showHeaderWrapper = true;
        } else {
          this.showHeaderWrapper = false;
        }
      })
    );
  }

  getData(translations) {
    if (translations && Object.prototype.hasOwnProperty.call(translations.components, this.componentPath)) {
      const component = translations.components[this.componentPath];
      this.componentName = component.name;
      this.description = component.description;
      this.tmw = component.tmw;
    }
  }

  activeTabChange(tab: string | number) {
    const navigation = this.router.url.split('/');
    navigation.pop();
    navigation.push(tab as string);
    this.router.navigate(navigation);
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    const tabContainer = this.document.querySelector('.devui-tabs-containter');
    const tabCount = this.showDesignTab ? 3 : 2;
    this.tabContainerWidth = tabContainer.clientWidth + 'px';
    this.tabWidth = Math.floor(tabContainer.clientWidth / tabCount) + 'px';
    this.document.body.scrollTop = this.document.documentElement.scrollTop = 0;
    if ((this.typescript.last || ({} as any)).nativeElement) {
      hljs.highlightBlock(this.typescript.last.nativeElement);
    }

    if ((this.documentation.last || ({} as any)).nativeElement) {
      hljs.highlightBlock(this.documentation.last.nativeElement);
    }

    this.html.changes.subscribe((html) => {
      if (html.last) {
        hljs.highlightBlock(html.last.nativeElement);
      }
    });

    this.typescript.changes.subscribe((typescript) => {
      if (typescript.last) {
        hljs.highlightBlock(typescript.last.nativeElement);
      }
    });
  }

  imgError(event) {
    const img = event.srcElement;
    img.src = this.imgPrefix + 'default.png';
    img.onerror = null;
  }
}
