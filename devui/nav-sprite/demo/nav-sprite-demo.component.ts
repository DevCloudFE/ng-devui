import { Component, OnDestroy, OnInit } from "@angular/core";
import { DevuiSourceData } from "ng-devui/shared/devui-codebox";
import { TranslateService, TranslationChangeEvent } from "@ngx-translate/core";
import { Subscription } from "rxjs";
@Component({
    selector: "d-nav-sprite-demo",
    templateUrl: "./nav-sprite-demo.component.html",
    standalone: false
})
export class NavSpriteDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    {
      title: "HTML",
      language: "xml",
      code: require("./basic/basic.component.html?raw"),
    },
    {
      title: "TS",
      language: "typescript",
      code: require("./basic/basic.component.ts?raw"),
    },
    {
      title: "SCSS",
      language: "css",
      code: require("./basic/basic.component.scss?raw"),
    },
  ];
  scrollSource: Array<DevuiSourceData> = [
    {
      title: "HTML",
      language: "xml",
      code: require("./scroll-container/scroll-container.component.html?raw"),
    },
    {
      title: "TS",
      language: "typescript",
      code: require("./scroll-container/scroll-container.component.ts?raw"),
    },
    {
      title: "SCSS",
      language: "css",
      code: require("./scroll-container/scroll-container.component.scss?raw"),
    },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}
  ngOnInit() {
    this.subs.add(
      this.translate
        .get("components.nav-sprite.anchorLinkValues")
        .subscribe((res) => {
          this.setNavValues(res);
        })
    );
    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant(
          "components.nav-sprite.anchorLinkValues"
        );
        this.setNavValues(values);
      })
    );
  }
  setNavValues(values) {
    this.navItems = [
      {
        dAnchorLink: "basic",
        value: values["basic-usage"],
      },
      {
        dAnchorLink: "scroll",
        value: values["scroll-usage"],
      },
    ];
  }
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
