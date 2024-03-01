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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { ToastService } from 'ng-devui/toast';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { from, Observable, Subscription } from 'rxjs';
import { last, map, mergeMap } from 'rxjs/operators';
import { IFileOptions, IUploadOptions, UploadStatus } from './file-uploader.types';
import { SelectFiles } from './select-files.utils';
import { SingleUploadViewComponent } from './single-upload-view.component';
import { SliceUploadService } from './slice-upload.service';

@Component({
  selector: 'd-single-upload',
  templateUrl: './single-upload.component.html',
  exportAs: 'dSingleUpload',
  styleUrls: ['./upload-view.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleUploadComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
})
export class SingleUploadComponent implements OnDestroy, OnInit, ControlValueAccessor {
  dSingleUploadView;
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
  @Input() beforeUpload: (file) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() dynamicUploadOptionsFn: (files, uploadOptions) => IUploadOptions;
  @Input() enableDrop = false;
  @Input() disabled = false;
  @Output() successEvent: EventEmitter<Array<{ file: File; response: any }>> = new EventEmitter<Array<{ file: File; response: any }>>();
  @Output() errorEvent: EventEmitter<{ file: File; response: any }> = new EventEmitter<{ file: File; response: any }>();
  @Output() errorChunkEvent: EventEmitter<{ file: File; response: any }> = new EventEmitter<{ file: File; response: any }>();
  @Output() deleteUploadedFileEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() fileDrop: EventEmitter<any> = new EventEmitter<any>();
  @Output() fileOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() fileSelect: EventEmitter<File> = new EventEmitter<File>();
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  @ViewChild('dSingleUploadView', { static: true }) singleUploadViewComponent: SingleUploadViewComponent;
  UploadStatus = UploadStatus;
  isDropOVer = false;
  i18nText: I18nInterface['upload'];
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  errorMsg = [];
  document: Document;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(
    private i18n: I18nService,
    private selectFiles: SelectFiles,
    @Inject(DOCUMENT) private doc: any,
    private toastService: ToastService,
    private sliceUploadService: SliceUploadService,
    private devConfigService: DevConfigService
  ) {
    this.document = this.doc;
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

  ngOnInit(): void {
    this.i18nText = this.i18n.getI18nText().upload;
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.upload;
      this.i18nCommonText = data.common;
    });
  }

  _dealFiles(observale) {
    observale
      .pipe(
        map((file) => {
          this.singleUploadViewComponent.addFile(<File>file);
          return file;
        })
      )
      .subscribe(
        () => {
          this.singleUploadViewComponent.uploadedFilesComponent.cleanUploadedFiles();
          this.checkValid();
          const file = this.singleUploadViewComponent.fileUploaders[0]?.file;
          this.onChange(file);
          if (file) {
            this.onFileSelect(file);
          }
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
    this.singleUploadViewComponent.fileUploaders.forEach((fileUploader) => {
      const checkResult = this.selectFiles._validateFiles(
        this.singleUploadViewComponent.fileUploaders.length,
        fileUploader.file,
        this.fileOptions.accept,
        fileUploader.uploadOptions
      );
      if (checkResult.checkError) {
        this.singleUploadViewComponent.deletePreUploadFile(fileUploader.file);
        this.alertMsg(checkResult.errorMsg);
      }
    });
  }

  onClick($event) {
    if (
      this.disabled ||
      (this.singleUploadViewComponent.fileUploaders[0] && this.singleUploadViewComponent.fileUploaders[0].status === UploadStatus.uploading)
    ) {
      return;
    }
    this._dealFiles(this.selectFiles.triggerSelectFiles(this.fileOptions, this.uploadOptions));
  }

  get filename() {
    return (this.singleUploadViewComponent.getFiles()[0] || ({} as File)).name || '';
  }

  onFileDrop(files) {
    this.isDropOVer = false;
    this._dealFiles(this.selectFiles.triggerDropFiles(this.fileOptions, this.uploadOptions, files));
    this.fileDrop.emit(files[0]);
  }

  onFileOver(event) {
    this.isDropOVer = event;
    this.fileOver.emit(event);
  }

  onFileSelect(file) {
    this.fileSelect.emit(file);
  }

  upload() {
    this.canUpload().then((canUpload) => {
      if (!canUpload) {
        return;
      }
      const tempNode = this.document.getElementById('d-upload-temp');
      if (tempNode) {
        this.document.body.removeChild(tempNode);
      }
      if (
        this.uploadOptions.isChunked &&
        this.sliceUploadService.isNeedChunk(this.singleUploadViewComponent.fileUploaders, this.uploadOptions)
      ) {
        this.sliceUploadService.sliceUpload(this, this.singleUploadViewComponent);
      } else {
        this.singleUploadViewComponent
          .upload()
          .pipe(last())
          .subscribe(
            (results: Array<{ file: File; response: any }>) => {
              this.successEvent.emit(results);
              results.forEach((result) => {
                this.singleUploadViewComponent.uploadedFilesComponent.addAndOverwriteFile(result.file);
              });
            },
            (error) => {
              if (this.singleUploadViewComponent.fileUploaders[0]) {
                this.singleUploadViewComponent.fileUploaders[0].percentage = 0;
              }
              this.singleUploadViewComponent.uploadedFilesComponent.cleanUploadedFiles();
              this.errorEvent.emit(error);
            }
          );
      }
    });
  }

  canUpload() {
    let uploadResult = Promise.resolve(true);
    if (this.beforeUpload) {
      const result: any = this.beforeUpload(this.singleUploadViewComponent.getFullFiles()[0] || ({} as File));
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
    this.onChange(null);
  }

  deleteFile($event) {
    $event.stopPropagation();
    const files = this.singleUploadViewComponent.getFiles();
    this.singleUploadViewComponent.deleteFile(files[0]);
  }

  alertMsg(errorMsg) {
    this.toastService.open({
      value: [{ severity: 'warn', content: errorMsg }],
    });
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
