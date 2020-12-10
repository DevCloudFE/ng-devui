import {
  Component,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-uploaded-files',
  exportAs: 'dUploadFiles',
  templateUrl: './uploaded-files.component.html',
  preserveWhitespaces: false,
})
export class UploadedFilesComponent implements OnDestroy, OnInit {
  @Input() uploadedFiles: Array<Object> = [];
  @Input() uploadedFilesRef: TemplateRef<any>;
  @Input() filePath: string;
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter<any>();
  i18nText: I18nInterface['upload'];
  i18nSubscription: Subscription;
  constructor(private i18n: I18nService) {

  }
  ngOnInit(): void {
    this.i18nText = this.i18n.getI18nText().upload;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.upload;
    });
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
  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();

    }
  }
}
