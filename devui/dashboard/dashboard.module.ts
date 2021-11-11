import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardLibraryPanelDirective } from './widget-library/library-panel.directive';
import { DashboardLibraryTrashDirective } from './widget-library/library-trash.directive';
import { DashboardLibraryWidgetDirective } from './widget-library/library-widget.directive';
import { DashboardWidgetComponent } from './widget/widget.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardLibraryWidgetDirective,
    DashboardLibraryTrashDirective,
    DashboardLibraryPanelDirective,
  ],
  declarations: [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardLibraryWidgetDirective,
    DashboardLibraryTrashDirective,
    DashboardLibraryPanelDirective,
  ]
})
export class DashboardModule {}
