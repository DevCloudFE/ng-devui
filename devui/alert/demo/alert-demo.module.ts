import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import ALERT_DEMO_ROUTES from './alert-demo.routes';

@NgModule({
  imports: [
    RouterModule.forChild(ALERT_DEMO_ROUTES)
  ]
})
export class AlertDemoModule { }
