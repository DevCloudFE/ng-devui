import { NgModule } from '@angular/core';
import { WindowRefModule } from 'ng-devui/window-ref';
import { StickyComponent } from './sticky.component';

@NgModule({
    imports: [
      WindowRefModule
    ],
    declarations: [
        StickyComponent
    ],
    exports: [
        StickyComponent,
    ],
})

export class StickyModule {}
