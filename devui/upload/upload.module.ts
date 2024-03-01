import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'ng-devui/button';
import { ProgressModule } from 'ng-devui/progress';
import { ToastModule } from 'ng-devui/toast';
import { FileDropDirective } from './file-drop.directive';
import { MultipleUploadViewComponent } from './multiple-upload-view.component';
import { MultipleUploadComponent } from './multiple-upload.component';
import { SelectFiles } from './select-files.utils';
import { SingleUploadViewComponent } from './single-upload-view.component';
import { SingleUploadComponent } from './single-upload.component';
import { SliceUploadService } from './slice-upload.service';
import { UploadDirective } from './upload.directive';
import { UploadedFilesComponent } from './uploaded-files.component';

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
    UploadDirective,
  ],
  declarations: [
    MultipleUploadViewComponent,
    SingleUploadViewComponent,
    SingleUploadComponent,
    MultipleUploadComponent,
    UploadedFilesComponent,
    FileDropDirective,
    UploadDirective,
  ],

  providers: [SelectFiles, SliceUploadService],
})
export class UploadModule {}
