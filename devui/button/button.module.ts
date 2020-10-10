import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from 'ng-devui/loading';
import { ButtonComponent } from './button.component';
import { DCommonModule } from 'ng-devui/common';
import { ButtonGroupComponent } from './button-group.component';

@NgModule({
  imports: [CommonModule, LoadingModule, DCommonModule],
  exports: [ButtonComponent, ButtonGroupComponent],
  declarations: [ButtonComponent, ButtonGroupComponent],
  providers: [],
})
export class ButtonModule {
}
