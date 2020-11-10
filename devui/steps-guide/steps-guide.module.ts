import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafePipeModule } from 'ng-devui/utils';
import { PositioningModule } from 'ng-devui/position';

import { StepsGuideComponent } from './steps-guide.component';
import { StepsGuideDirective } from './steps-guide.directive';
import { StepsGuideService } from './steps-guide.service';

@NgModule({
  imports: [
    CommonModule,
    SafePipeModule,
    PositioningModule
  ],
  declarations: [StepsGuideComponent, StepsGuideDirective],
  exports: [StepsGuideDirective],

  providers: [StepsGuideService]
})
export class StepsGuideModule { }
