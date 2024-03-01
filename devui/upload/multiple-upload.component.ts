import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { ToastService } from 'ng-devui/toast';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { from, Observable, Subscription } from 'rxjs';
import { debounceTime, last, map, mergeMap } from 'rxjs/operators';
import { IFileOptions, IUploadOptions, UploadStatus } from './file-uploader.types';
import { MultipleUploadViewComponent } from './multiple-upload-view.component';
import { SelectFiles } from './select-files.utils';
import { SliceUploadService } from './slice-upload.service';

@Component({
  selector: 'd-multiple-upload',
  templateUrl: './multiple-upload.component.html',
  exportAs: 'dMultipleUpload',
  styleUrls: ['./upload-view.component.scss'],
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleUploadComponent),
      multi: true,
    },
  ],
})
export class MultipleUploadComponent implements OnDestroy, OnInit {
  @Input() uploadOptions: IUploadOptions;
  @Input() fileOptions: IFileOptions;
  @Input() autoUpload = false;
  @Input() withoutBtn = false;
  @Input() showTip = false;
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
  @Input() setCustomUploadOptions: (file, uploadOptions, chunkedFileIndex?) => IUploadOptions;
  @Input() enableDrop = false;
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  @Output() successEvent: EventEmitter<Array<{ file: File; response: any }>> = new EventEmitter<Array<{ file: File; response: any }>>();
  @Output() errorEvent: EventEmitter<Array<{ file: File; response: any }>> = new EventEmitter<Array<{ file: File; response: any }>>();
  @Output() errorChunkEvent: EventEmitter<{ file: File; response: any }> = new EventEmitter<{ file: File; response: any }>();
  @Output() deleteUploadedFileEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() fileDrop: EventEmitter<any> = new EventEmitter<any>();
  @Output() fileOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() fileSelect: EventEmitter<File[]> = new EventEmitter<File[]>();
  @ViewChild('dMultipleUploadView', { static: true }) multipleUploadViewComponent: MultipleUploadViewComponent;
  i18nCommonText: I18nInterface['common'];
  i18nText: I18nInterface['upload'];
  isDropOVer = false;
  i18nSubscription: Subscription;
  errorMsg = [];
  UploadStatus = UploadStatus;
  uploadTips: string;
  document: Document;

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(
    private selectFiles: SelectFiles,
    private i18n: I18nService,
    @Inject(DOCUMENT) private doc: any,
    private sliceUploadService: SliceUploadService,
    private devConfigService: DevConfigService,
    private toastService: ToastService
  ) {
    this.document = this.doc;
  }
  ngOnInit(): void {
    this.i18nText = this.i18n.getI18nText().upload;
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.upload;
      this.i18nCommonText = data.common;
    });
  }

  writeValue(files: any): void {
    if (files) {
      const simulateFiles = from(this.simulateSelectFiles(files)).pipe(mergeMap((file) => <any>file));
      this._dealFiles(simulateFiles);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  simulateSelectFiles(files) {
    return new Promise((resolve) => {
      resolve(Array.prototype.slice.call(files));
    });
  }

  _dealFiles(observale) {
    this.multipleUploadViewComponent.resetSameNameFiles();
    observale
      .pipe(
        map((file) => this.multipleUploadViewComponent.addFile(file)),
        debounceTime(100)
      )
      .subscribe(
        () => {
          this.checkValid();
          const sameNameFiles = this.multipleUploadViewComponent.getSameNameFiles();
          if (this.uploadOptions.checkSameName && sameNameFiles.length) {
            this.alertMsg(this.i18nText.getExistSameNameFilesMsg(sameNameFiles));
          }
          this.onChange(this.multipleUploadViewComponent.fileUploaders.map((fileUploader) => fileUploader.file));
          const selectedFiles = this.multipleUploadViewComponent.fileUploaders
            .filter((fileUploader) => fileUploader.status === UploadStatus.preLoad)
            .map((fileUploader) => fileUploader.file);
          this.onFileSelect(selectedFiles);
          if (this.autoUpload) {
            this.upload();
          }
        },
        (error: Error) => {
          this.alertMsg(error.message);
        }
      );
  }

  checkValid() {
    let totalFileSize = 0;
    this.multipleUploadViewComponent.fileUploaders.forEach((fileUploader) => {
      totalFileSize += fileUploader.file.size;
      const checkResult = this.selectFiles._validateFiles(
        this.multipleUploadViewComponent.fileUploaders.length,
        fileUploader.file,
        this.fileOptions.accept,
        fileUploader.uploadOptions
      );
      if (checkResult && checkResult.checkError) {
        this.multipleUploadViewComponent.deletePreUploadFile(fileUploader.file);
        this.alertMsg(checkResult.errorMsg);
        return;
      }
    });

    if (this.oneTimeUpload) {
      const checkResult = this.selectFiles.checkAllFilesSize(totalFileSize, this.uploadOptions.maximumSize);
      if (checkResult && checkResult.checkError) {
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

  onFileSelect(files) {
    this.fileSelect.emit(files);
  }

  handleOneTimeUpload(uploadObservable) {
    uploadObservable.pipe(last()).subscribe(
      (results: Array<{ file: File; response: any }>) => {
        this.successEvent.emit(results);
        results.forEach((result) => {
          this.multipleUploadViewComponent.uploadedFilesComponent.addFile(result.file);
        });
      },
      (error) => {
        this.errorEvent.emit(error);
      }
    );
  }

  handleUpload(uploadObservable) {
    uploadObservable.pipe(last()).subscribe((results: Array<{ file: File; response: any; status: UploadStatus }>) => {
      const successResult = results
        .filter((item) => item.status === UploadStatus.uploaded)
        .map((item) => {
          return { file: item.file, response: item.response };
        });
      const failResult = results
        .filter((item) => item.status === UploadStatus.failed)
        .map((item) => {
          return { file: item.file, response: item.response };
        });
      if (failResult.length) {
        this.errorEvent.emit(failResult);
      }

      if (successResult.length) {
        this.successEvent.emit(successResult);
        successResult.forEach((result) => {
          this.multipleUploadViewComponent.uploadedFilesComponent.addFile(result.file);
        });
      }
    });
  }

  upload(event?, fileUploader?) {
    if (event) {
      event.stopPropagation();
    }
    this.canUpload().then((canUpload) => {
      if (!canUpload) {
        this.multipleUploadViewComponent.removeFiles();
        return;
      }
      const tempNode = this.document.getElementById('d-upload-temp');
      if (tempNode) {
        this.document.body.removeChild(tempNode);
      }
      if (
        this.uploadOptions.isChunked &&
        this.sliceUploadService.isNeedChunk(this.multipleUploadViewComponent.fileUploaders, this.uploadOptions)
      ) {
        this.sliceUploadService.sliceUpload(this, this.multipleUploadViewComponent);
      } else if (this.oneTimeUpload) {
        const oneTimeUploadObservable = this.multipleUploadViewComponent.oneTimeUpload();
        this.handleOneTimeUpload(oneTimeUploadObservable);
      } else {
        const uploadObservable = this.multipleUploadViewComponent.upload(fileUploader, true);
        this.handleUpload(uploadObservable);
      }
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
    this.onChange(this.multipleUploadViewComponent.fileUploaders.map((fileUploader) => fileUploader.file));
  }

  deleteFile($event, file) {
    $event.stopPropagation();
    this.multipleUploadViewComponent.deleteFile(file);
  }

  alertMsg(errorMsg) {
    this.toastService.open({
      value: [{ severity: 'warn', content: errorMsg }],
    });
  }

  getStatus() {
    let uploadingCount = 0;
    let uploadedCount = 0;
    let failedCount = 0;
    const filesCount = this.multipleUploadViewComponent.fileUploaders.length;
    this.multipleUploadViewComponent.fileUploaders.forEach((fileUploader) => {
      if (fileUploader.status === UploadStatus.uploading) {
        uploadingCount++;
      } else if (fileUploader.status === UploadStatus.uploaded) {
        uploadedCount++;
      } else if (fileUploader.status === UploadStatus.failed) {
        failedCount++;
      }
    });
    if (failedCount > 0) {
      this.uploadTips = this.i18nText.getFailedFilesCount(failedCount);
      return 'failed';
    }
    if (uploadingCount > 0) {
      this.uploadTips = this.i18nText.getUploadingFilesCount(uploadingCount, filesCount);
      return 'uploading';
    }
    if (uploadedCount === filesCount && uploadedCount !== 0) {
      return 'uploaded';
    }
    if (filesCount !== 0) {
      this.uploadTips = this.i18nText.getSelectedFilesCount(filesCount);
      return 'selected';
    }
  }

  cancelUpload() {
    this.multipleUploadViewComponent.fileUploaders
      .filter((fileUploader) => fileUploader.status === UploadStatus.uploading)
      .forEach((fileUploader) => {
        fileUploader.status = UploadStatus.failed;
      });
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
