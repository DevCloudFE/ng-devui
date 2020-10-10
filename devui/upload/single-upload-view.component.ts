import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  IUploadOptions,
  UploadStatus
} from './file-uploader.types';
import {UploadComponent} from './upload.class';
import {FileUploader} from './file-uploader.class';
import {UploadedFilesComponent} from './uploaded-files.component';

@Component({
  selector: 'd-single-upload-view',
  exportAs: 'dSingleUploadView',
  templateUrl: './single-upload-view.component.html',
  styleUrls: ['./single-upload-view.component.scss'],
  preserveWhitespaces: false,
})
export class SingleUploadViewComponent extends UploadComponent {
  @Input() uploadOptions: IUploadOptions;
  @Input() preloadFilesRef: TemplateRef<any>;
  @Input() uploadedFiles: Array<Object> = [];
  @Input() uploadedFilesRef: TemplateRef<any>;
  @Input() filePath: string;
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dUploadedFiles', { static: true }) uploadedFilesComponent: UploadedFilesComponent;

  UploadStatus = UploadStatus;
  fileUploaders: Array<FileUploader> = [];

  addFile(file: File) {
    this.fileUploaders = [];
    super.addFile(file, this.uploadOptions);
  }

  deleteFile(file: File) {
    super.deleteFile(file);
    this.deleteUploadedFileEvent.emit(file);
  }

  deletePreUploadFile(file) {
    super.deleteFile(file);
  }

  // 解决templateContext 传递method.bind(this)引发模板中内嵌组件initialize问题
  deleteFileProxy = file => {
    this.deleteFile(file);
  }

  _onDeleteUploadedFile(filePath: string) {
    this.deleteUploadedFileEvent.emit(filePath);
  }
}

