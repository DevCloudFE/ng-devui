import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PanelComponent} from './panel.component';
import {PanelBodyComponent} from './panel-body.component';
import {PanelFooterComponent} from './panel-footer.component';
import {PanelHeaderComponent} from './panel-header.component';

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
  providers: [],
})
export class PanelModule {
}
