import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
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
import { DevUIConfig } from 'ng-devui/devui.config';
@Component({
  selector: 'd-multiple-upload-view',
  templateUrl: './multiple-upload-view.component.html',
  styleUrls: ['./multiple-upload-view.component.scss'],
})
export class MultipleUploadViewComponent extends UploadComponent {
  @ViewChild('dUploadedFiles') uploadedFilesComponent: UploadedFilesComponent;
  @Input() uploadOptions: IUploadOptions;
  @Input() preloadFilesRef: TemplateRef<any>;
  @Input() uploadedFiles: Array<Object> = [];
  @Input() uploadedFilesRef: TemplateRef<any>;
  @Input() filePath: string;
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter();
  UploadStatus = UploadStatus;
  fileUploaders: Array<FileUploader> = [];
  PRELOAD: string;
  UPLOADING: string;
  UPLOADED: string;
  FAILED: string;
  DELETE: string;
  constructor(private devUIConfig: DevUIConfig) {
    super();
    this.PRELOAD = this.devUIConfig['uploadCN'].UPLOAD_STATUS.PRELOAD;
    this.UPLOADING = this.devUIConfig['uploadCN'].UPLOAD_STATUS.UPLOADING;
    this.UPLOADED = this.devUIConfig['uploadCN'].UPLOAD_STATUS.UPLOADED;
    this.FAILED = this.devUIConfig['uploadCN'].UPLOAD_STATUS.FAILED;
    this.DELETE = this.devUIConfig['uploadCN'].DELETE;
}

  addFile(file) {
    super.addFile(file, this.uploadOptions);
  }

  deleteFile(file) {
    super.deleteFile(file);
    this.deleteUploadedFileEvent.emit(file);
  }

  removeFiles() {
    super.removeFiles();
  }

  // 解决templateContext 传递method.bind(this)引发模板中内嵌组件initialize问题
  deleteFileProxy = file => {
    this.deleteFile(file);
  }

  _onDeleteUploadedFile(filePath: string) {
    this.deleteUploadedFileEvent.emit(filePath);
  }
}

