import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamplePanelComponent } from './example-panel.component';
import { AppContentComponent } from './app-content.component';
import { routesConfig } from './component.route';
import { GetStartedComponent } from './get-started.component';
import { DevUIModule } from 'ng-devui';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { SafePipeModule } from 'ng-devui/utils';
import { ColorComponent } from './color/color.component';
import { ThemeGuideComponent } from './theme-guide.component';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'html', func: xml}
  ];
}

@NgModule({
  declarations: [
    ExamplePanelComponent,
    AppContentComponent,
    GetStartedComponent,
    ThemeGuideComponent,
    ColorComponent
  ],
  imports: [
    CommonModule,
    SafePipeModule,
    DevUIModule.forRoot(),
    RouterModule.forChild([
      {
          path: '',
          component: AppContentComponent,
          data: {},
          children: routesConfig
      },
    ]),
  ]
})
export class AppContentModule {
  constructor() {}
}
