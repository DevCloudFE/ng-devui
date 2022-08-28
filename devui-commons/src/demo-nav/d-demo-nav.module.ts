import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnchorModule } from 'ng-devui/anchor';
import { StickyModule } from 'ng-devui/sticky';
import { DDemoNavComponent } from './d-demo-nav.component';

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
export class DDemoNavModule {}
