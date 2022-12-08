import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import ANCHOR_DEMO_ROUTES from './anchor-demo.routes';

@NgModule({
  imports: [
    RouterModule.forChild(ANCHOR_DEMO_ROUTES),
  ]
})
export class AnchorDemoModule {}
