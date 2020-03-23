import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from 'ng-devui/loading';
import { ButtonComponent, BtnAutoFocusDirective } from './button.component';

@NgModule({
  imports: [CommonModule, LoadingModule],
  exports: [ButtonComponent],
  declarations: [ButtonComponent, BtnAutoFocusDirective],
  providers: [],
})
export class ButtonModule {
}
