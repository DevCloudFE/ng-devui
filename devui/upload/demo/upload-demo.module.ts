import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui';
import { ButtonModule } from 'ng-devui/button';
import { ProgressModule } from 'ng-devui/progress';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { ToastModule } from 'ng-devui/toast';
import { UploadModule } from 'ng-devui/upload';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { UploadAutoComponent } from './auto/auto.component';
import { BasicComponent } from './basic/basic.component';
import { CustomizeAreaUploadComponent } from './customize-area-upload/customize-area-upload.component';
import { CustomizeComponent } from './customize/customize.component';
import { DynamicUploadOptionsComponent } from './dynamic-upload-options/dynamic-upload-options.component';
import { MultiComponent } from './multi/multi.component';
import { UploadSliceComponent } from './slice/upload-slice.component';
import { UploadDemoComponent } from './upload-demo.component';
import { UploadDesignComponent } from './upload-design.component';

@NgModule({ exports: [UploadDemoComponent],
    declarations: [
        UploadDemoComponent,
        UploadDesignComponent,
        BasicComponent,
        MultiComponent,
        CustomizeComponent,
        UploadAutoComponent,
        DynamicUploadOptionsComponent,
        CustomizeAreaUploadComponent,
        UploadSliceComponent
    ], imports: [TranslateModule,
        CommonModule,
        UploadModule,
        DevUIModule,
        DevUICodeboxModule,
        DevUIApiModule,
        FormsModule,
        ButtonModule,
        DDemoNavModule,
        ToastModule,
        ProgressModule,
        RouterModule.forChild([
            { path: '', redirectTo: 'demo', pathMatch: 'full' },
            {
                path: 'design',
                component: UploadDesignComponent,
            },
            { path: 'demo', component: UploadDemoComponent },
            { path: 'api', component: DevUIApiComponent, data: {
                    'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
                    'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
                } }
        ])], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class UploadDemoModule {
}
