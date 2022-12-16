import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayContainerModule } from 'ng-devui/overlay-container';
import { SafePipe } from 'ng-devui/utils';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
@NgModule({
  imports: [
    CommonModule,
    SafePipe,
    OverlayContainerModule
  ],
  exports: [ToastComponent],
  declarations: [ToastComponent],
  providers: [ToastService]
})
export class ToastModule { }
