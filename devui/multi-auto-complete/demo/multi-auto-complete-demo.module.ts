import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIModule } from 'ng-devui';
import { DataTableModule } from 'ng-devui/data-table';
import { MultiAutoCompleteModule } from 'ng-devui/multi-auto-complete';
import { MultiAutoCompleteDemoComponent } from './multi-auto-complete-demo.component';
import { MultiAutoCompleteDemoDefaultComponent } from './default/multi-auto-complete-demo-default.component';
import { MultiAutoCompleteDemoArrayComponent } from './array/multi-auto-complete-demo-array.component';
import { MultiAutoCompleteDemoDisabledComponent } from './disabled/multi-auto-complete-demo-disabled.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    CommonModule,
    MultiAutoCompleteModule,
    FormsModule,
    DevUIModule,
    DevUIApiModule,
    DataTableModule,
    DevUICodeboxModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: MultiAutoCompleteDemoComponent },
      {
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md')
        }
      }
    ])
  ],
  exports: [MultiAutoCompleteDemoComponent],
  declarations: [
    MultiAutoCompleteDemoComponent,
    MultiAutoCompleteDemoDefaultComponent,
    MultiAutoCompleteDemoArrayComponent,
    MultiAutoCompleteDemoDisabledComponent,
  ],
  providers: [],
  
})
export class MultiAutoCompleteDemoModule { }
