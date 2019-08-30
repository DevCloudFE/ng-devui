import {
  Component,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { DevUIConfig } from 'ng-devui/devui.config';
@Component({
  selector: 'd-uploaded-files',
  exportAs: 'dUploadFiles',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.scss']
})
export class UploadedFilesComponent {
  @Input() uploadedFiles: Array<Object> = [];
  @Input() uploadedFilesRef: TemplateRef<any>;
  @Input() filePath: string;
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter();
  UPLOADED: string;
  DELETE: string;

  constructor(private devUIConfig: DevUIConfig) {
    this.UPLOADED = this.devUIConfig['uploadCN'].UPLOAD_STATUS.UPLOADED;
    this.DELETE = this.devUIConfig['uploadCN'].DELETE;
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
