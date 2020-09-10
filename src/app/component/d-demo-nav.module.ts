import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DDemoNavComponent } from './d-demo-nav.component';
import { StickyModule } from 'ng-devui/sticky';
import { AnchorModule } from 'ng-devui/anchor';



@NgModule({
  imports: [
    CommonModule,
    StickyModule,
    AnchorModule
  ],
  declarations: [
    DDemoNavComponent
  ],
  exports: [
    DDemoNavComponent,
    StickyModule,
    AnchorModule
  ]
})
export class DDemoNavModule { }
