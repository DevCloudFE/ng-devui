import {
  Component,
  TemplateRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  IUploadOptions,
  IFileOptions
} from './file-uploader.types';
import { MultipleUploadViewComponent } from './multiple-upload-view.component';
import {
  SelectFiles
} from './select-files.utils';
import { map, last, debounceTime } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { I18nInterface, I18nService } from 'ng-devui/i18n';

@Component({
  selector: 'd-multiple-upload',
  templateUrl: './multiple-upload.component.html',
  exportAs: 'dMultipleUpload',
  styleUrls: ['./upload-view.component.scss'],
})
export class MultipleUploadComponent implements OnDestroy {
  @Input() uploadOptions: IUploadOptions;
  @Input() fileOptions: IFileOptions;
  @Input() autoUpload = false;
  @Input() withoutBtn = false;
  @Input() uploadedFiles: Array<Object> = [];
  @Input() uploadedFilesRef: TemplateRef<any>;
  @Input() preloadFilesRef?: TemplateRef<any>;
  @Input() filePath: string;
  @Input() placeholderText: string;
  @Input() uploadText: string;
  /**
   * @deprecated
   */
  @Input() confirmText: string;
  @Input() oneTimeUpload = false;
  @Input() disabled = false;
  @Input() beforeUpload: (files) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() setCustomUploadOptions: (files, uploadOptions) => IUploadOptions;
  @Input() enableDrop = false;
  @Output() successEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() fileDrop: EventEmitter<any> = new EventEmitter<any>();
  @Output() fileOver: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dMultipleUploadView', { static: true }) multipleUploadViewComponent: MultipleUploadViewComponent;
  i18nCommonText: I18nInterface['common'];
  i18nText: I18nInterface['upload'];
  isDropOVer = false;
  i18nSubscription: Subscription;
  errorMsg = [];
  constructor(
    private selectFiles: SelectFiles,
    private i18n: I18nService, ) {
    this.i18nText = this.i18n.getI18nText().upload;
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.upload;
      this.i18nCommonText = data.common;
    });
  }

  _dealFiles(observale) {
    this.multipleUploadViewComponent.resetSameNameFiles();
    observale.pipe(
      map(file => this.multipleUploadViewComponent.addFile(file)),
      debounceTime(100)
    )
      .subscribe(
        () => {
          this.checkValid();
          const sameNameFiles = this.multipleUploadViewComponent.getSameNameFiles();
          if (this.autoUpload) {
            this.upload();
          }
          if (this.uploadOptions.checkSameName && sameNameFiles.length) {
            this.alertMsg(this.i18nText.getExistSameNameFilesMsg(sameNameFiles));
          }
        },
        (error: Error) => {
          this.alertMsg(error.message);
        }
      );
  }

  checkValid() {
    let totalFileSize = 0;
    this.multipleUploadViewComponent.fileUploaders.forEach(fileUploader => {
      totalFileSize += fileUploader.file.size;
      const checkResult = this.selectFiles._validateFiles(fileUploader.file, this.fileOptions.accept, fileUploader.uploadOptions);
      if (checkResult.checkError) {
        this.multipleUploadViewComponent.deletePreUploadFile(fileUploader.file);
        this.alertMsg(checkResult.errorMsg);
        return;
      }
    });

    if (this.oneTimeUpload) {
      const checkResult = this.selectFiles.checkAllFilesSize(totalFileSize, this.uploadOptions.maximumSize);
      if (checkResult.checkError) {
        this.multipleUploadViewComponent.removeFiles();
        this.alertMsg(checkResult.errorMsg);
      }
    }
  }

  onClick(event) {
    if (this.disabled) {
      return;
    }
    this._dealFiles(this.selectFiles.triggerSelectFiles(this.fileOptions, this.uploadOptions));
  }

  onFileDrop(files) {
    this.isDropOVer = false;
    this._dealFiles(this.selectFiles.triggerDropFiles(this.fileOptions, this.uploadOptions, files));
    this.fileDrop.emit(files);
  }

  onFileOver(event) {
    this.isDropOVer = event;
    this.fileOver.emit(event);
  }

  upload() {
    this.canUpload().then((canUpload) => {
      if (!canUpload) {
        this.multipleUploadViewComponent.removeFiles();
        return;
      }
      const uploadObservable = this.oneTimeUpload ?
        this.multipleUploadViewComponent.oneTimeUpload() :
        this.multipleUploadViewComponent.upload();
      uploadObservable
        .pipe(
          last()
        )
        .subscribe(
          (results: Array<{ file: File, response: any }>) => {
            this.successEvent.emit(results);
            results.forEach((result) => {
              this.multipleUploadViewComponent.deleteFile(result.file);
              this.multipleUploadViewComponent.uploadedFilesComponent.addFile(result.file);
            });
          },
          (error) => {
            this.errorEvent.emit(error);
          }
        );
    });
  }

  canUpload() {
    let uploadResult = Promise.resolve(true);
    if (this.beforeUpload) {
      const result: any = this.beforeUpload(this.multipleUploadViewComponent.getFullFiles());
      if (typeof result !== 'undefined') {
        if (result.then) {
          uploadResult = result;
        } else if (result.subscribe) {
          uploadResult = (result as Observable<boolean>).toPromise();
        } else {
          uploadResult = Promise.resolve(result);
        }
      }
    }
    return uploadResult;
  }

  _onDeleteUploadedFile(filePath: string) {
    this.deleteUploadedFileEvent.emit(filePath);
  }

  alertMsg(errorMsg) {
    this.errorMsg = [{ severity: 'warn', summary: this.i18nText.warning, detail: errorMsg }];
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();

    }
  }
}

