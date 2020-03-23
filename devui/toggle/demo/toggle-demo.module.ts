import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToggleModule } from '..';
import { ToggleDemoComponent } from './toggle-demo.component';
import { BasicComponent } from './basic/basic.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { ModalModule } from 'ng-devui/modal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DevUICodeboxModule,
        DevUIApiModule,
        ToggleModule,
        ModalModule,
        RouterModule.forChild([
          { path: '',  redirectTo: 'demo' },
          { path: 'demo', component: ToggleDemoComponent},
          { path: 'api', component: DevUIApiComponent, data: {
            api: require('!html-loader!markdown-loader!../doc/api.md')
          }}
        ])
        ],
    exports: [ToggleDemoComponent],
    declarations: [
        ToggleDemoComponent,
        BasicComponent
    ],
    entryComponents: [ToggleDemoComponent],
    providers: [],
})
export class ToggleDemoModule {
}
