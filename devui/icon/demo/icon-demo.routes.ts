import { Routes } from "@angular/router";
import { DevUIApiComponent } from "ng-devui/shared/devui-api/devui-api.component";
import { IconDemoComponent } from "./icon-demo.component";

export default [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: IconDemoComponent },
  {
    path: 'api', component: DevUIApiComponent, data: {
      'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
      'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
    }
  }
] as Routes;
