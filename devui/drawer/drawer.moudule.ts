import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { DrawerComponent } from './drawer.component';
import { PortalModule } from 'ng-devui/portal';
import { DrawerService } from './drawer.service';
import { OverlayContainerModule } from 'ng-devui/overlay-container';
import { DrawerContentDirective } from './drawer.component';

@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
    PortalModule,
    OverlayContainerModule,
  ],
  exports: [DrawerComponent],
  declarations: [
    DrawerComponent,
    DrawerContentDirective
  ],
  providers: [DrawerService],
  entryComponents: [DrawerComponent]
})
export class DrawerModule {
}
