import { NgModule } from '@angular/core';
import {
  ModalComponent,
} from './modal.component';
import { ModalContainerComponent } from './modal-container.component';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { OverlayContainerModule } from '../overlay-container';
import {
  ModalContainerDirective,
  ModalContentDirective
} from './modal.directive';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalAlertComponent } from './modal-alert.component';
import { DialogService } from './dialog.service';
import { DocumentRef } from '../window-ref/document-ref.service';
import {ButtonModule} from '../button';
import { AveDraggableDirective } from './draggable';

@NgModule({
  imports: [
    CommonModule,
    OverlayContainerModule,
    ButtonModule
  ],
  declarations: [
    ModalComponent,
    ModalContainerComponent,
    ModalContainerDirective,
    ModalContentDirective,
    ModalHeaderComponent,
    ModalFooterComponent,
    ModalAlertComponent,
    AveDraggableDirective
  ],
  exports: [
    ModalComponent,
    ModalContainerComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    ModalAlertComponent,
  ],
  providers: [
    ModalService,
    DialogService,
    DocumentRef,
  ],
  entryComponents: [
    ModalComponent,
    ModalContainerComponent,
    ModalAlertComponent,
  ]
})
export class ModalModule {
}
