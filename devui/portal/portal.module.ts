import {NgModule} from '@angular/core';
import {PortalComponent} from './portal.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PortalComponent,
    ],
    exports: [
        PortalComponent,
    ],
})
export class PortalModule {
}
