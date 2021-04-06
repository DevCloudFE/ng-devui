import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { DevUIModule } from 'ng-devui';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DevUIModule
  ],
  exports: [
    SidebarComponent
  ],
  declarations: [
    SidebarComponent
  ]
})
export class SidebarModule { }
