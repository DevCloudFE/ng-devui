import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'ng-devui/button';
import { OverlayContainerModule } from 'ng-devui/overlay-container';
import { DocumentRef } from 'ng-devui/window-ref';
import { DialogService } from './dialog.service';
import { ModalContainerComponent } from './modal-container.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import {
  ModalComponent,
} from './modal.component';
import {
  ModalContainerDirective,
  ModalContentDirective
} from './modal.directive';
import { ModalService } from './modal.service';
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
