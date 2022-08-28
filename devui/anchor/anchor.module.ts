
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AnchorBoxHashSupportDirective } from './anchor-box-hash.directive';
import { AnchorBoxDirective } from './anchor-box.directive';
import { AnchorLinkDirective } from './anchor-link.directive';
import { AnchorDirective } from './anchor.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    AnchorLinkDirective,
    AnchorBoxDirective,
    AnchorDirective,
    AnchorBoxHashSupportDirective
  ],
  exports: [
    AnchorLinkDirective,
    AnchorBoxDirective,
    AnchorDirective,
    AnchorBoxHashSupportDirective
  ],
})

export class AnchorModule {}
