import { Component, OnDestroy, OnInit } from "@angular/core";
import { DevuiSourceData } from "ng-devui/shared/devui-codebox/devui-source-data";
import { TranslateService, TranslationChangeEvent } from "@ngx-translate/core";
import { Subscription } from "rxjs";
@Component({
    templateUrl: "./fullscreen-demo.component.html",
    standalone: false
})
export class FullscreenDemoComponent implements OnInit, OnDestroy {
  FullscreenDemoNormal: DevuiSourceData[] = [
    {
      title: "HTML",
      language: "xml",
      code: require("./normal/normal.component.html?raw"),
    },
    {
      title: "TS",
      language: "typescript",
      code: require("./normal/normal.component.ts?raw"),
    },
  ];
  FullscreenDemoImmersive: DevuiSourceData[] = [
    {
      title: "HTML",
      language: "xml",
      code: require("./immersive/immersive.component.html?raw"),
    },
    {
      title: "TS",
      language: "typescript",
      code: require("./immersive/immersive.component.ts?raw"),
    },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}
  ngOnInit() {
    this.subs.add(
      this.translate
        .get("components.fullscreen.anchorLinkValues")
        .subscribe((res) => {
          this.setNavValues(res);
        })
    );
    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant(
          "components.fullscreen.anchorLinkValues"
        );
        this.setNavValues(values);
      })
    );
  }
  setNavValues(values) {
    this.navItems = [
      {
        dAnchorLink: "immersive-full-screen",
        value: values["immersive-full-screen"],
      },
      {
        dAnchorLink: "general-full-screen",
        value: values["general-full-screen"],
      },
    ];
  }
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
