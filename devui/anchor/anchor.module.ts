
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnchorDirective } from './anchor.directive';
import { AnchorBoxDirective } from './anchor-box.directive';
import { AnchorLinkDirective } from './anchor-link.directive';
import { AnchorBoxHashSupportDirective } from './anchor-box-hash.directive';
import { RouterModule } from '@angular/router';

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
