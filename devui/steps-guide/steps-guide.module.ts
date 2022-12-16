import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { PositioningModule } from 'ng-devui/position';
import { SafePipe } from 'ng-devui/utils';
import { StepsGuideComponent } from './steps-guide.component';
import { StepsGuideDirective } from './steps-guide.directive';
import { StepsGuideService } from './steps-guide.service';

@NgModule({
  imports: [
    CommonModule,
    SafePipe,
    PositioningModule
  ],
  declarations: [StepsGuideComponent, StepsGuideDirective],
  exports: [StepsGuideDirective],

  providers: [
    OverlayContainerRef,
    StepsGuideService
  ]
})
export class StepsGuideModule { }
