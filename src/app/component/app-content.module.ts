import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui';
import { LazyLoadDirective, SafePipe } from 'ng-devui/utils';
import { TranslateModule } from '@ngx-translate/core';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { DevuiCommonsModule } from '../../../devui-commons/src/public-api';
import { AppContentComponent } from './app-content.component';
import { ComponentDataService } from './component.data.service';
import { routesConfig } from './component.route';
import { ExamplePanelComponent } from './example-panel.component';
import { GetStartedComponent } from './get-started.component';
import { GlobalConfigComponent } from './global-config.component';
import { ComponentsOverviewComponent } from './overview.component';
import { ThemeGuideComponent } from './theme-guide.component';

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'html', func: xml },
  ];
}

@NgModule({
  declarations: [
    ExamplePanelComponent,
    AppContentComponent,
    ComponentsOverviewComponent,
    GetStartedComponent,
    ThemeGuideComponent,
    GlobalConfigComponent,
  ],
  imports: [
    CommonModule,
    LazyLoadDirective,
    SafePipe,
    TranslateModule,
    DevuiCommonsModule,
    DevUIModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: AppContentComponent,
        data: {},
        children: routesConfig,
      },
    ]),
  ],
  providers: [ComponentDataService],
})
export class AppContentModule {}
