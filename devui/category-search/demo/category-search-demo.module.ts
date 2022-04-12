import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CategorySearchModule } from "ng-devui/category-search";
import { LoadingModule } from "ng-devui/loading";
import { SearchModule } from "ng-devui/search";
import { DevUIApiComponent } from "ng-devui/shared/devui-api/devui-api.component";
import { DevUIApiModule } from "ng-devui/shared/devui-api/devui-api.module";
import { DevUICodeboxModule } from "ng-devui/shared/devui-codebox";
import { LazyLoadModule } from "ng-devui/utils";
import { TranslateModule } from "@ngx-translate/core";
import { DDemoNavModule } from "src/app/component/d-demo-nav.module";
import { AutoScrollComponent } from "./auto-scroll/auto-scroll.component";
import { BasicComponent } from "./basic/basic.component";
import { CategorySearchDemoComponent } from "./category-search-demo.component";
@NgModule({
  declarations: [
    CategorySearchDemoComponent,
    BasicComponent,
    AutoScrollComponent,
  ],
  imports: [
    TranslateModule,
    CommonModule,
    DDemoNavModule,
    DevUICodeboxModule,
    DevUIApiModule,
    CategorySearchModule,
    LoadingModule,
    LazyLoadModule,
    SearchModule,
    RouterModule.forChild([
      {
        path: "",
        redirectTo: "demo",
      },
      {
        path: "demo",
        component: CategorySearchDemoComponent,
      },
      {
        path: "api",
        component: DevUIApiComponent,
        data: {
          "zh-cn": require("!html-loader!markdown-loader!../doc/api-cn.md"),
          "en-us": require("!html-loader!markdown-loader!../doc/api-en.md"),
        },
      },
    ]),
  ],
})
export class CategorySearchDemoModule {}
