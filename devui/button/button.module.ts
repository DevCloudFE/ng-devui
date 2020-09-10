import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from 'ng-devui/loading';
import { ButtonComponent } from './button.component';
import { DCommonModule } from 'ng-devui/common';

@NgModule({
  imports: [CommonModule, LoadingModule, DCommonModule],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
  providers: [],
})
export class ButtonModule {
}
