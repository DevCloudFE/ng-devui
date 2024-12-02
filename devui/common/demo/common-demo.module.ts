import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DCommonModule } from 'ng-devui/common';
import { DataTableModule } from 'ng-devui/data-table';
import { I18nModule } from 'ng-devui/i18n';
import { LoadingModule } from 'ng-devui/loading';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TextInputModule } from 'ng-devui/text-input';
import { LazyLoadModule } from 'ng-devui/utils';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { ClipboardDemoComponent } from './clipboard/clipboard.component';
import { CommonDemoComponent } from './common-demo.component';
import { CommonDesignComponent } from './common-design.component';
import { HelperBrowserComponent } from './helper-browser/helper-browser.component';
import { HelperDownloadDemoComponent } from './helper-download/helper-download.component';
import { HelperJumpDemoComponent } from './helper-jump/helper-jump.component';
import { IframPropagateDemoComponent } from './iframe-propagate/iframe-propagate.component';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { DatePipeDemoComponent } from './pipe/date-pipe/date-pipe.component';
import { SafeNullPipeComponent } from './pipe/safe-null-pipe/safe-null-pipe.component';
import { ShapeIconHoverableDemoComponent } from "./shapeIconHoverable/shapeIconHoverable.component";
import { PopoverModule } from "ng-devui";

@NgModule({ exports: [CommonDemoComponent],
    declarations: [
        DatePipeDemoComponent,
        SafeNullPipeComponent,
        CommonDemoComponent,
        CommonDesignComponent,
        HelperBrowserComponent,
        HelperJumpDemoComponent,
        HelperDownloadDemoComponent,
        IframPropagateDemoComponent,
        LazyLoadComponent,
        ClipboardDemoComponent,
        ShapeIconHoverableDemoComponent
    ], imports: [TranslateModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        DevUICodeboxModule,
        DevUIApiModule,
        DCommonModule,
        DDemoNavModule,
        LazyLoadModule,
        LoadingModule,
        I18nModule,
        DataTableModule,
        TextInputModule,
        PopoverModule,
        RouterModule.forChild([
            { path: '', redirectTo: 'demo', pathMatch: 'full' },
            {
                path: 'design',
                component: CommonDesignComponent,
            },
            { path: 'demo', component: CommonDemoComponent },
            {
                path: 'api',
                component: DevUIApiComponent,
                data: {
                    'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
                    'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
                },
            },
        ])], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CommonDemoModule {}
