import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayContainerModule } from 'ng-devui/overlay-container';
import { PortalModule } from 'ng-devui/portal';
import { DrawerComponent, DrawerContentDirective } from './drawer.component';
import { DrawerService } from './drawer.service';


@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
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
