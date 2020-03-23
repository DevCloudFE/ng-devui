import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevuiCodeboxComponent } from './devui-codebox.component';
import { DevUIHighlightModule } from '../devui-highlight/devui-highlight.module';
import { TooltipModule } from 'ng-devui/tooltip';
import { TabsModule } from 'ng-devui/tabs';


@NgModule({
  imports: [
    CommonModule,
    DevUIHighlightModule,
    TooltipModule,
    TabsModule
  ],
  declarations: [DevuiCodeboxComponent],
  exports: [DevuiCodeboxComponent]
})
export class DevUICodeboxModule { }
