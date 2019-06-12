import {NgModule} from '@angular/core';

import { MultipleUploadViewComponent } from './multiple-upload-view.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button';
import { SingleUploadViewComponent } from './single-upload-view.component';
import { SingleUploadComponent } from './single-upload.component';
import { MultipleUploadComponent } from './multiple-upload.component';
import { UploadedFilesComponent } from './uploaded-files.component';
import { SelectFiles } from './select-files.utils';
import { ModalModule } from '../modal/modal.module';
import { FileDropDirective } from './file-drop.directive';


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    ModalModule,
  ],
  exports: [
    MultipleUploadViewComponent,
    SingleUploadViewComponent,
    SingleUploadComponent,
    MultipleUploadComponent,
    UploadedFilesComponent,
    FileDropDirective
  ],
  declarations: [
    MultipleUploadViewComponent,
    SingleUploadViewComponent,
    SingleUploadComponent,
    MultipleUploadComponent,
    UploadedFilesComponent,
    FileDropDirective
  ],
  entryComponents: [
    MultipleUploadViewComponent,
    SingleUploadViewComponent
  ],
  providers: [SelectFiles],
})
export class UploadModule {
}
