import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng-devui/modal';
import { SafePipeModule } from 'ng-devui/utils';
import { TooltipModule } from 'ng-devui/tooltip';
import { InputNumberModule } from 'ng-devui/input-number';

import { DImagePreviewComponent } from './image-preview.component';
import { ImagePreviewDirective } from './image-preview.directive';

@NgModule({
  declarations: [DImagePreviewComponent, ImagePreviewDirective],
  imports: [
    CommonModule,
    ModalModule,
    SafePipeModule,
    TooltipModule,
    FormsModule,
    InputNumberModule
  ],
  exports: [
    ImagePreviewDirective
  ],
  entryComponents: [
    DImagePreviewComponent
  ]
})

export class ImagePreviewModule { }
