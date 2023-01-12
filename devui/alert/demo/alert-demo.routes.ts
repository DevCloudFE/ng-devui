import { Routes } from "@angular/router";
import { DevUIApiComponent } from "ng-devui/shared/devui-api/devui-api.component";
import { AlertDemoComponent } from "./alert-demo.component";

export default [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: AlertDemoComponent },
  {
    path: 'api', component: DevUIApiComponent, data: {
      'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
      'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
    }
  }
] as Routes;
