import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'ng-devui/button';
import { DropDownModule } from 'ng-devui/dropdown';
import { PopoverModule } from 'ng-devui/popover';
import { TooltipModule } from 'ng-devui/tooltip';
import { GanttBarParentComponent } from './gantt-bar-parent/gantt-bar-parent.component';
import { GanttBarComponent } from './gantt-bar/gantt-bar.component';
import { GanttMarkerDirective } from './gantt-marker.directive';
import { GanttMilestoneComponent } from './gantt-milestone/gantt-milestone.component';
import { GanttScaleComponent } from './gantt-scale/gantt-scale.component';
import { GanttToolsComponent } from './gantt-tools/gantt-tools.component';
import { GanttService } from './gantt.service';
import { ResizeHandleDirective } from './resize-handle.directive';

@NgModule({
  declarations: [
    GanttScaleComponent,
    GanttBarComponent,
    GanttMarkerDirective,
    GanttMilestoneComponent,
    GanttBarParentComponent,
    ResizeHandleDirective,
    GanttToolsComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PopoverModule,
    TooltipModule,
    ButtonModule,
    DropDownModule
  ],
  providers: [GanttService],
  exports: [
    GanttScaleComponent,
    GanttBarComponent,
    GanttMilestoneComponent,
    GanttBarParentComponent,
    ResizeHandleDirective,
    GanttToolsComponent
  ]
})
export class GanttModule { }
