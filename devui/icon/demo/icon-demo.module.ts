import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import ICON_DEMO_ROUTES from './icon-demo.routes';

@NgModule({
  imports: [
    RouterModule.forChild(ICON_DEMO_ROUTES),
  ]
})
export class IconDemoModule { }
