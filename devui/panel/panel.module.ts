import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PanelBodyComponent} from './panel-body.component';
import {PanelFooterComponent} from './panel-footer.component';
import {PanelHeaderComponent} from './panel-header.component';
import {PanelComponent} from './panel.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    PanelComponent,
    PanelHeaderComponent,
    PanelBodyComponent,
    PanelFooterComponent
  ],
  declarations: [
    PanelComponent,
    PanelHeaderComponent,
    PanelBodyComponent,
    PanelFooterComponent,
  ],
  providers: []
})
export class PanelModule {
}
