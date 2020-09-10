import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttScaleComponent } from './gantt-scale/gantt-scale.component';
import { GanttBarComponent } from './gantt-bar/gantt-bar.component';
import { GanttService } from './gantt.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopoverModule } from 'ng-devui/popover';
import { GanttMarkerDirective } from './gantt-marker.directive';
import { ResizeHandleDirective } from './resize-handle.directive';
import { GanttMilestoneComponent } from './gantt-milestone/gantt-milestone.component';
import { GanttBarParentComponent } from './gantt-bar-parent/gantt-bar-parent.component';

@NgModule({
  declarations: [
    GanttScaleComponent,
    GanttBarComponent,
    GanttMarkerDirective,
    GanttMilestoneComponent,
    GanttBarParentComponent,
    ResizeHandleDirective
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PopoverModule
  ],
  providers: [GanttService],
  exports: [
    GanttScaleComponent,
    GanttBarComponent,
    GanttMilestoneComponent,
    GanttBarParentComponent,
    ResizeHandleDirective
  ]
})
export class GanttModule { }
