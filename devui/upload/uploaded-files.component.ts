import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { DevUIConfig } from '../devui.config';
@Component({
  selector: 'ave-uploaded-files',
  exportAs: 'aveUploadFiles',
  templateUrl: './uploaded-files.component.html',
})
export class UploadedFilesComponent {
  @Input() uploadedFiles: Array<Object> = [];
  @Input() uploadedFilesRef: TemplateRef<any>;
  @Input() filePath: string;
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter();
  UPLOADED: string;
  DELETE: string;

  constructor(private devuiConfig: DevUIConfig) {
    this.UPLOADED = this.devuiConfig['uploadCN'].UPLOAD_STATUS.UPLOADED;
    this.DELETE =  this.devuiConfig['uploadCN'].DELETE;
  }

  cleanUploadedFiles() {
    this.uploadedFiles = [];
  }

  addAndOverwriteFile(file: Object) {
    this.cleanUploadedFiles();
    this.uploadedFiles.push(file);
  }

  addFile(file: Object) {
    this.uploadedFiles.push(file);
  }

  deleteFile(filePath: string) {
    this.uploadedFiles = this.uploadedFiles.filter((file) => {
      return filePath !== (file as any)[this.filePath];
    });
    this.deleteUploadedFileEvent.emit(filePath);
  }

  // 解决templateContext 传递method.bind(this)引发模板中内嵌组件initialize问题
  deleteFileProxy = filePath => {
    this.deleteFile(filePath);
  }
}
