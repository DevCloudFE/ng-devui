import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'ng-devui/input-number';
import { ModalModule } from 'ng-devui/modal';
import { TooltipModule } from 'ng-devui/tooltip';
import { SafePipeModule } from 'ng-devui/utils';

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

})

export class ImagePreviewModule { }
