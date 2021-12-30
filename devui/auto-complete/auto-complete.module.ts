import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from 'ng-devui/loading';
import { PositioningModule } from 'ng-devui/position';
import { HighlightModule, LazyLoadModule } from 'ng-devui/utils';
import { AutoCompleteConfig } from './auto-complete-config';
import { AutoCompletePopupComponent } from './auto-complete-popup.component';
import { AutoCompleteDirective } from './auto-complete.directive';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, LazyLoadModule, LoadingModule, PositioningModule, HighlightModule],
  exports: [AutoCompleteDirective, AutoCompletePopupComponent],
  declarations: [AutoCompleteDirective, AutoCompletePopupComponent],
  providers: [AutoCompleteConfig],

})
export class AutoCompleteModule { }
