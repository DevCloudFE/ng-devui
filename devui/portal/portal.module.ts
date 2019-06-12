import {NgModule} from '@angular/core';
import {PortalComponent} from './portal';
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
