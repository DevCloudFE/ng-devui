import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DevUIHighlightComponent } from './devui-highlight.component';

@NgModule({
  imports     : [ CommonModule ],
  declarations: [ DevUIHighlightComponent ],
  exports     : [ DevUIHighlightComponent ]
})
export class DevUIHighlightModule {

}
