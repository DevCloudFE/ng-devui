import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuadrantDiagramComponent } from './quadrant-diagram.component';
import { QuadrantDiagramAxisComponent } from './quadrant-axis/quadrant-axis.component';

import { DragDropModule } from 'ng-devui/dragdrop';
import { ProgressModule } from 'ng-devui/progress';
import { PopoverModule } from 'ng-devui/popover';
import { FullscreenModule } from 'ng-devui/fullscreen';
import { QuadrantLabelComponent } from './quadrant-label/quadrant-label.component';
import { SafePipeModule } from 'ng-devui/utils';
import { QuadrantRegionComponent } from './quadrant-region/quadrant-region.component';
import { QuadrantDiagramService } from './quadrant-diagram.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    ProgressModule,
    PopoverModule,
    ProgressModule,
    FullscreenModule,
    SafePipeModule
  ],
  exports: [
    QuadrantDiagramComponent
  ],
  declarations: [
    QuadrantDiagramComponent,
    QuadrantDiagramAxisComponent,
    QuadrantRegionComponent,
    QuadrantLabelComponent
  ],
  providers: [QuadrantDiagramService]
})
export class QuadrantDiagramModule { }
