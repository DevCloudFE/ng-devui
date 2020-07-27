import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipeModule } from 'ng-devui/utils';
import { StepsGuideComponent } from './steps-guide.component';
import { StepsGuideDirective } from './steps-guide.directive';
import { StepsGuideService } from './steps-guide.service';

@NgModule({
  imports: [
    CommonModule,
    SafePipeModule
  ],
  declarations: [StepsGuideComponent, StepsGuideDirective],
  exports: [StepsGuideDirective],
  entryComponents: [StepsGuideComponent],
  providers: [StepsGuideService]
})
export class StepsGuideModule { }
