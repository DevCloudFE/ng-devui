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
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DevUICodeboxModule,
        DevUIApiModule,
        ToggleModule,
        ModalModule,
        DDemoNavModule,
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
    
    providers: [],
})
export class ToggleDemoModule {
}
