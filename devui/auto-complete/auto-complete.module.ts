import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PositionService } from 'ng-devui/position';
import { WindowRef } from 'ng-devui/window-ref';
import { DocumentRef } from 'ng-devui/window-ref';
import { LazyLoadModule } from 'ng-devui/utils';
import { LoadingModule } from 'ng-devui/loading';

import { AutoCompleteConfig } from './auto-complete-config';
import { AutoCompleteDirective } from './auto-complete.directive';
import { AutoCompletePopupComponent } from './auto-complete-popup.component';
import { HighlightComponent } from './highlight.component';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, LazyLoadModule, LoadingModule],
  exports: [AutoCompleteDirective, AutoCompletePopupComponent, HighlightComponent],
  declarations: [AutoCompleteDirective, AutoCompletePopupComponent, HighlightComponent],
  providers: [DocumentRef, WindowRef, PositionService, AutoCompleteConfig],
  entryComponents: [AutoCompletePopupComponent]
})
export class AutoCompleteModule { }
