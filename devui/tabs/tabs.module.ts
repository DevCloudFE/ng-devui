import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsComponent } from './tabs.component';
import { TabTitleDirective } from './tab-title.directive';
import { TabContentDirective } from './tab-content.directive';
import { TabComponent } from './tab.component';

@NgModule({
  imports: [CommonModule],
  exports: [TabsComponent, TabComponent, TabTitleDirective, TabContentDirective],
  declarations: [TabsComponent, TabComponent, TabTitleDirective, TabContentDirective],
  providers: [],
})
export class TabsModule {
}
