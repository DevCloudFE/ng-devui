import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CategorySearchModule } from "ng-devui/category-search";
import { SelectModule } from "ng-devui/select";
import { DevUIApiComponent } from "ng-devui/shared/devui-api/devui-api.component";
import { DevUIApiModule } from "ng-devui/shared/devui-api/devui-api.module";
import { DevUICodeboxModule } from "ng-devui/shared/devui-codebox";
import { TranslateModule } from "@ngx-translate/core";
import { DDemoNavModule } from "devui-commons/src/demo-nav/d-demo-nav.module";
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
    SelectModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        redirectTo: "demo",
        pathMatch: "full"
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
