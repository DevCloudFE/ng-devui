import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PositioningModule } from 'ng-devui/position';
import { HighlightModule, LazyLoadModule } from 'ng-devui/utils';
import { LoadingModule } from 'ng-devui/loading';
import { AutoCompleteConfig } from './auto-complete-config';
import { AutoCompleteDirective } from './auto-complete.directive';
import { AutoCompletePopupComponent } from './auto-complete-popup.component';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, LazyLoadModule, LoadingModule, PositioningModule, HighlightModule],
  exports: [AutoCompleteDirective, AutoCompletePopupComponent],
  declarations: [AutoCompleteDirective, AutoCompletePopupComponent],
  providers: [AutoCompleteConfig],

})
export class AutoCompleteModule { }
