import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuadrantDiagramAxisComponent } from './quadrant-axis/quadrant-axis.component';
import { QuadrantDiagramComponent } from './quadrant-diagram.component';

import { DragDropModule } from 'ng-devui/dragdrop';
import { FullscreenModule } from 'ng-devui/fullscreen';
import { PopoverModule } from 'ng-devui/popover';
import { ProgressModule } from 'ng-devui/progress';
import { SafePipe } from 'ng-devui/utils';
import { QuadrantDiagramService } from './quadrant-diagram.service';
import { QuadrantLabelComponent } from './quadrant-label/quadrant-label.component';
import { QuadrantRegionComponent } from './quadrant-region/quadrant-region.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    ProgressModule,
    PopoverModule,
    ProgressModule,
    FullscreenModule,
    SafePipe
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
