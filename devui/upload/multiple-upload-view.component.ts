import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

import {
  IUploadOptions,
  UploadStatus
} from './file-uploader.types';
import { UploadComponent } from './upload.class';
import { FileUploader } from './file-uploader.class';
import { UploadedFilesComponent } from './uploaded-files.component';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-multiple-upload-view',
  templateUrl: './multiple-upload-view.component.html',
  styleUrls: ['./multiple-upload-view.component.scss'],
})
export class MultipleUploadViewComponent extends UploadComponent implements OnDestroy {
  @ViewChild('dUploadedFiles', { static: true }) uploadedFilesComponent: UploadedFilesComponent;
  @Input() uploadOptions: IUploadOptions;
  @Input() preloadFilesRef: TemplateRef<any>;
  @Input() uploadedFiles: Array<Object> = [];
  @Input() uploadedFilesRef: TemplateRef<any>;
  @Input() filePath: string;
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter();
  UploadStatus = UploadStatus;
  fileUploaders: Array<FileUploader> = [];
  i18nText: I18nInterface['upload'];
  i18nSubscription: Subscription;
  constructor(private i18n: I18nService) {
    super();
    this.i18nText = this.i18n.getI18nText().upload;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.upload;
    });
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
  ngOnDestroy(): void {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();

    }
  }
}

