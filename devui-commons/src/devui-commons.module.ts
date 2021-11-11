import { NgModule } from '@angular/core';
import { CodeCopyModule } from './codecopy/codecopy.module';
import { HeaderModule } from './header';
import { SidebarModule } from './sidebar';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    HeaderModule,
    SidebarModule,
    CodeCopyModule
  ]
})
export class DevuiCommonsModule { }
