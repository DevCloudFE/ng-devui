import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RateDemoComponent } from './rate-demo.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { RateModule } from '../rate.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { RateDemoCustomizeComponent } from './customize/customize.component';
import { RateDemoBasicComponent } from './basic/basic.component';
import { RateDemoOnlyReadComponent } from './onlyread/onlyread.component';
import { TypeComponent } from './type/type.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RateModule,
        DevUIApiModule,
        DevUICodeboxModule,
        DDemoNavModule,
        RouterModule.forChild([
            { path: '', redirectTo: 'demo' },
            { path: 'demo', component: RateDemoComponent },
            {
                path: 'api', component: DevUIApiComponent, data: {
                    api: require('!html-loader!markdown-loader!../doc/api.md')
                }
            }
        ])
    ],
    exports: [RateDemoComponent],
    declarations: [
        RateDemoComponent,
        RateDemoBasicComponent,
        RateDemoOnlyReadComponent,
        RateDemoCustomizeComponent,
        TypeComponent
    ],

})
export class RateDemoModule {
}
