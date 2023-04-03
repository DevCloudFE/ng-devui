import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropDownModule } from 'ng-devui/dropdown';
import { TabCloseablePipe } from './tab-closeable-pipe';
import { TabContentDirective } from './tab-content.directive';
import { TabTitleDirective } from './tab-title.directive';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [CommonModule, DropDownModule],
  exports: [TabsComponent, TabComponent, TabTitleDirective, TabContentDirective],
  declarations: [TabsComponent, TabComponent, TabTitleDirective, TabContentDirective, TabCloseablePipe],
  providers: [],
})
export class TabsModule {}
