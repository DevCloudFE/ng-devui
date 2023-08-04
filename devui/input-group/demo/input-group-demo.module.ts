import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DropDownModule } from 'ng-devui/dropdown';
import { IconModule } from 'ng-devui/icon';
import { InputGroupModule } from 'ng-devui/input-group';
import { SelectModule } from 'ng-devui/select';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TabsModule } from 'ng-devui/tabs';
import { TextInputModule } from 'ng-devui/text-input';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { EmbedComponent } from './embed/embed.component';
import { InputGroupDemoComponent } from './input-group-demo.component';
import { InputGroupDesignComponent } from './input-group-design.component';
import { ResponsiveComponent } from './responsive/responsive.component';

@NgModule({
  imports: [
    InputGroupModule,
    ButtonModule,
    CommonModule,
    DropDownModule,
    FormsModule,
    IconModule,
    SelectModule,
    TabsModule,
    TextInputModule,
    TranslateModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: InputGroupDesignComponent,
      },
      { path: 'demo', component: InputGroupDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
        },
      },
    ]),
  ],
  exports: [InputGroupDemoComponent],
  declarations: [InputGroupDemoComponent, InputGroupDesignComponent, BasicComponent, EmbedComponent, ResponsiveComponent],
})
export class InputGroupDemoModule {}
