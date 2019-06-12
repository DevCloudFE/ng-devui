import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollToAnchorDirective, ScrollToAnchorBoxDirective, TargetAnchorDirective } from './scroll-to-anchor.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ScrollToAnchorDirective,
        ScrollToAnchorBoxDirective,
        TargetAnchorDirective
    ],
    exports: [
        ScrollToAnchorDirective,
        ScrollToAnchorBoxDirective,
        TargetAnchorDirective
    ],
})

export class AnchorModule {}
