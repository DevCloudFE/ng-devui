import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng-devui/modal';
import { SafePipeModule } from 'ng-devui/utils';
import { TooltipModule } from 'ng-devui/tooltip';

import { DImagePreviewComponent } from './image-preview.component';
import { ImagePreviewDirective } from './image-preview.directive';

@NgModule({
  declarations: [DImagePreviewComponent, ImagePreviewDirective],
  imports: [
    CommonModule,
    ModalModule,
    SafePipeModule,
    TooltipModule
  ],
  exports: [
    ImagePreviewDirective
  ],
  entryComponents: [
    DImagePreviewComponent
  ]
})

export class ImagePreviewModule { }
