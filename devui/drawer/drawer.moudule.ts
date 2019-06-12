import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawerComponent } from './drawer.component';
import { PortalModule } from '../portal';
import { DrawerService } from './drawer.service';
import { OverlayContainerModule } from '../overlay-container';
import { DrawerContentDirective } from './drawer.component';

@NgModule({
  imports: [
    CommonModule,
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
