import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { SafePipeModule } from 'ng-devui/utils';

@NgModule({
  imports: [
    CommonModule,
    SafePipeModule
  ],
  exports: [ToastComponent],
  declarations: [ToastComponent],
  providers: [ToastService]
})
export class ToastModule { }
