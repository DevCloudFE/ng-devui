import {
  Input,
  ViewContainerRef,
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { IExampleData } from '../../../devui/shared/helpers';

import * as hljs from 'highlight.js/lib/highlight';
import { Router, ActivatedRoute } from '@angular/router';

['javascript', 'typescript'].forEach((langName) => {
  // Using require() here because import() support hasn't landed in Webpack yet
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});

@Component({
  selector: 'ave-demo-cell',
  styles: [`
:host /deep/ section h4,
:host /deep/ section h5 {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.4);
}

:host /deep/ section {
  margin-bottom: 50px;
}

.examples-viewer-wrapper {
  padding: 0 20% 100px 20%;

}

.examples-viewer-title {
  display: flex;
  padding: 8px 20px;
  font-size: 18px;
  font-weight: bold;
}

.examples {
  position: relative;
  padding: 30px;
  background: #fff;
}

div.html, div.typescript, div.markdown {
  padding: 0;
}

.html pre, .typescript pre, .markdown pre {
  padding: 26.5px;
}

:host /deep/ pre table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
}
`],
  templateUrl: './example-panel.component.html'
})
export class ExamplePanelComponent implements OnInit, AfterViewInit {
  @Input() data: IExampleData;
  @ViewChildren('html') html: QueryList<ElementRef>;
  @ViewChildren('typescript') typescript: QueryList<ElementRef>;
  @ViewChildren('documentation') documentation: QueryList<ElementRef>;
  componentName: string;
  componentTab: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(UrlSegments => {
      const names = UrlSegments[0].path.split('-').map((urlSegment) => {
        return `${urlSegment.charAt(0).toUpperCase()}${urlSegment.slice(1)}`;
      });
      this.componentName = names.join(' ');
      this.componentTab = this.router.url.split('/').pop();
    });

    this.route.data.subscribe((data: IExampleData) => {
      this.data = data;
    });

  }

  activeTabChange (tab: string) {
    const navigation = this.router.url.split('/');
    navigation.pop();
    navigation.push(tab);
    this.router.navigate(navigation);
  }

  ngAfterViewInit(): void {
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

