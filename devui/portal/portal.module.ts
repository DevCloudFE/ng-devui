import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PortalComponent} from './portal.component';

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
