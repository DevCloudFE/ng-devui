import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayContainerModule } from 'ng-devui/overlay-container';
import { PortalModule } from 'ng-devui/portal';
import { SplitterModule } from 'ng-devui/splitter';
import { DrawerComponent, DrawerContentDirective } from './drawer.component';
import { DrawerService } from './drawer.service';

@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
    SplitterModule,
    PortalModule,
    OverlayContainerModule
  ],
  exports: [DrawerComponent],
  declarations: [
    DrawerComponent,
    DrawerContentDirective
  ],
  providers: [DrawerService],

})
export class DrawerModule {
}
