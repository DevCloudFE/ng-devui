import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AutoCompleteDirective } from './auto-complete.directive';
import { AutoCompletePopupComponent } from './auto-complete-popup.component';
import { HightlightComponent } from './hightlight.component';
import { DevUIConfig } from 'ng-devui/devui.config';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [AutoCompleteDirective, AutoCompletePopupComponent, HightlightComponent],
  declarations: [AutoCompleteDirective, AutoCompletePopupComponent, HightlightComponent],
  providers: [
    DevUIConfig],
  entryComponents: [AutoCompletePopupComponent]
})
export class AutoCompleteModule {
}
