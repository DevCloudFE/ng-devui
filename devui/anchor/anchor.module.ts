
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnchorDirective } from './anchor.directive';
import { AnchorBoxDirective } from './anchor-box.directive';
import { AnchorLinkDirective } from './anchor-link.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AnchorLinkDirective,
        AnchorBoxDirective,
        AnchorDirective
    ],
    exports: [
        AnchorLinkDirective,
        AnchorBoxDirective,
        AnchorDirective
    ],
})

export class AnchorModule {}
