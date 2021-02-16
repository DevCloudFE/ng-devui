import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafePipeModule } from 'ng-devui/utils';
import { ToastComponent } from './toast.component';

@NgModule({
  imports: [
    CommonModule,
    SafePipeModule
  ],
  exports: [ToastComponent],
  declarations: [ToastComponent],
  providers: []
})
export class ToastModule { }
