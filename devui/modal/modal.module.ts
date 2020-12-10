import { NgModule } from '@angular/core';
import {
  ModalComponent,
} from './modal.component';
import { ModalContainerComponent } from './modal-container.component';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { OverlayContainerModule } from 'ng-devui/overlay-container';
import {
  ModalContainerDirective,
  ModalContentDirective
} from './modal.directive';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalFooterComponent } from './modal-footer.component';
import { DialogService } from './dialog.service';
import { DocumentRef } from 'ng-devui/window-ref';
import { ButtonModule } from 'ng-devui/button';
import { MovableDirective } from './movable.directive';

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
    MovableDirective
  ],
  exports: [
    ModalComponent,
    ModalContainerComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    MovableDirective
  ],
  providers: [
    ModalService,
    DialogService,
    DocumentRef,
  ],
  
})
export class ModalModule {
}
