import {
  AfterViewInit, Component,
  ComponentFactoryResolver,
  ElementRef, Input,
  OnInit,
  QueryList, ViewChildren
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import * as hljs from 'highlight.js/lib/core';
import { IExampleData } from 'ng-devui/shared/helpers';

['javascript', 'typescript'].forEach((langName) => {
  // Using require() here because import() support hasn't landed in Webpack yet
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});

@Component({
  selector: 'app-demo-cell',
  styleUrls: [
    './example-panel.component.scss'
  ],
  templateUrl: './example-panel.component.html'
})
export class ExamplePanelComponent implements OnInit, AfterViewInit {
  @Input() data: IExampleData;
  @ViewChildren('html') html: QueryList<ElementRef>;
  @ViewChildren('typescript') typescript: QueryList<ElementRef>;
  @ViewChildren('documentation') documentation: QueryList<ElementRef>;
  componentName: string;
  componentTab: string;
  description: string;
  tmw: string;
  componentPath: string;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private router: Router, private route: ActivatedRoute, private translate: TranslateService) {
  }

  ngOnInit(): void {
    const array = this.router.url.split('/');
    this.componentPath  = array[array.length - 2];
    this.getData(this.translate.translations[this.translate.currentLang]);
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        this.getData(event.translations);
    });
    this.route.url.subscribe(UrlSegments => {
      const fragmentIndex = this.router.url.split('/').pop().indexOf('#');
      this.componentTab = fragmentIndex === -1
        ? this.router.url.split('/').pop() : this.router.url.split('/').pop().slice(0, fragmentIndex);
    });
  }

  getData (translations) {
    if (translations && translations['components'].hasOwnProperty(this.componentPath)) {
      const component = translations['components'][this.componentPath];
      this.componentName = component.name;
      this.description = component.description;
      this.tmw = component.tmw;
    }
  }

  activeTabChange(tab: string) {
    const navigation = this.router.url.split('/');
    navigation.pop();
    navigation.push(tab);
    this.router.navigate(navigation);
  }

  ngAfterViewInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if ((this.typescript.last || {} as any).nativeElement) {
      hljs.highlightBlock(this.typescript.last.nativeElement);
    }

    if ((this.documentation.last || {} as any).nativeElement) {
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
}
