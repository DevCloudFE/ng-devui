import {NgModule} from '@angular/core';

import { MultipleUploadViewComponent } from './multiple-upload-view.component';
import { CommonModule } from '@angular/common';
import { SingleUploadViewComponent } from './single-upload-view.component';
import { SingleUploadComponent } from './single-upload.component';
import { MultipleUploadComponent } from './multiple-upload.component';
import { UploadedFilesComponent } from './uploaded-files.component';
import { SelectFiles } from './select-files.utils';
import { FileDropDirective } from './file-drop.directive';
import { ModalModule } from 'ng-devui/modal';
import { ButtonModule } from 'ng-devui/button';
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
