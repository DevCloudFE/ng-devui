import {NgModule} from '@angular/core';

import { MultipleUploadViewComponent } from './multiple-upload-view.component';
import { CommonModule } from '@angular/common';
import { SingleUploadViewComponent } from './single-upload-view.component';
import { SingleUploadComponent } from './single-upload.component';
import { MultipleUploadComponent } from './multiple-upload.component';
import { UploadedFilesComponent } from './uploaded-files.component';
import { SelectFiles } from './select-files.utils';
import { FileDropDirective } from './file-drop.directive';
import { UploadDirective } from './upload.directive';
import { ButtonModule } from 'ng-devui/button';
import { ToastModule } from 'ng-devui/toast';
import { ProgressModule } from 'ng-devui/progress';
@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    ProgressModule
  ],
  exports: [
    MultipleUploadViewComponent,
    SingleUploadViewComponent,
    SingleUploadComponent,
    MultipleUploadComponent,
    UploadedFilesComponent,
    FileDropDirective,
    UploadDirective
  ],
  declarations: [
    MultipleUploadViewComponent,
    SingleUploadViewComponent,
    SingleUploadComponent,
    MultipleUploadComponent,
    UploadedFilesComponent,
    FileDropDirective,
    UploadDirective
  ],
  
  providers: [SelectFiles],
})
export class UploadModule {
}
