import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Message } from 'ng-devui/toast';
import { from, Observable, Subscription } from 'rxjs';
import { debounceTime, last, map, mergeMap } from 'rxjs/operators';
import { FileUploader } from './file-uploader.class';
import { IFileOptions, IUploadOptions, UploadStatus } from './file-uploader.types';
import { SelectFiles } from './select-files.utils';
import { UploadComponent } from './upload.class';
@Directive({
  selector: '[dUpload]',
  exportAs: 'dUpload',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadDirective),
      multi: true
    }
  ],
})
export class UploadDirective extends UploadComponent implements OnDestroy {
  @Input() uploadOptions: IUploadOptions;
  @Input() fileOptions: IFileOptions;
  @Input() uploadedFiles: Array<Object> = [];
  @Input() fileUploaders: Array<FileUploader> = [];
  @Input() enableDrop = false;
  @Input() dynamicUploadOptionsFn: (files, uploadOptions) => IUploadOptions;
  @Input() beforeUpload: (file) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() public fileOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public fileDrop: EventEmitter<any> = new EventEmitter<any>();
  @Output() successEvent: EventEmitter<Array<{ file: File; response: any }>> = new EventEmitter<Array<{ file: File; response: any }>>();
  @Output() errorEvent: EventEmitter<{ file: File; response: any }> = new EventEmitter<{ file: File; response: any }>();
  @Output() alertMsgEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  @Output() fileSelect: EventEmitter<File[]> = new EventEmitter<File[]>();

  errorMsg = [];
  protected element: ElementRef;
  i18nText: I18nInterface['upload'];
  i18nSubscription: Subscription;
  private onChange = (_: any) => null;
  private onTouched = () => null;
  constructor(private selectFiles: SelectFiles, private i18n: I18nService, element: ElementRef) {
    super();
    this.element = element;
    this.i18nText = this.i18n.getI18nText().upload;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.upload;
    });
  }
  writeValue(files: any): void {
    if (files) {
      const simulateFiles = from(this.simulateSelectFiles(files)).pipe(mergeMap(file => <any>file));
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

  @HostListener('click')
  onClick() {
    this._dealFiles(this.selectFiles.triggerSelectFiles(this.fileOptions, this.uploadOptions));
  }

  _dealFiles(observale) {
    super.resetSameNameFiles();
    observale.pipe(
      map(file => {
        let uploadOptions = this.uploadOptions;
        if (this.dynamicUploadOptionsFn) {
          uploadOptions = this.dynamicUploadOptionsFn(file, this.uploadOptions);
        }
        super.addFile(file, uploadOptions);
      }),
      debounceTime(100)
    )
      .subscribe(
        () => {
          this.checkValid();
          this.checkSameName();
          const selectedFiles = this.fileUploaders
            .filter(fileUploader => fileUploader.status === UploadStatus.preLoad)
            .map(fileUploader => fileUploader.file);
          this.onFileSelect(selectedFiles);
          this.uploadFiles();
        },
        (error: Error) => {
          this.errorMsg = [{ severity: 'warn', detail: error.message }];
          this.alertMsgEvent.emit(this.errorMsg);
        }
      );
  }

  checkSameName() {
    const sameNameFiles = super.getSameNameFiles();
    if (this.uploadOptions.checkSameName && sameNameFiles.length) {
      this.errorMsg = [{
        severity: 'warn',
        detail: this.i18nText.getExistSameNameFilesMsg(sameNameFiles)
      }];
      this.alertMsgEvent.emit(this.errorMsg);
    }
  }

  // 文件大小、类型是否符合上传条件
  checkValid() {
    let totalFileSize = 0;
    this.fileUploaders.forEach(fileUploader => {
      totalFileSize += fileUploader.file.size;
      const checkResult =  this.selectFiles._validateFiles(this.fileUploaders.length,fileUploader.file, this.fileOptions.accept, fileUploader.uploadOptions);
      if (checkResult && checkResult.checkError) {
        super.deleteFile(fileUploader.file);
        this.errorMsg = [{ severity: 'warn', detail: checkResult.errorMsg }];
        this.alertMsgEvent.emit(this.errorMsg);
        return;
      }
    });
  }
  uploadFiles() {
    this.canUpload().then((canUpload) => {
      if (!canUpload) {
        return;
      }
      const uploadObservable = super.upload();
      uploadObservable
        .pipe(
          last()
        )
        .subscribe(
          (results: Array<{ file: File; response: any }>) => {
            this.successEvent.emit(results);
            results.forEach((result) => {
              this.uploadedFiles.push(result.file);
            });
          },
          (error) => {
            this.errorEvent.emit(error);
          }
        );
    });
  }

  onFileSelect(files) {
    this.fileSelect.emit(files);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any): void {
    if (!this.enableDrop) {
      return;
    }
    const transfer = this._getTransfer(event);
    if (!transfer) {
      return;
    }
    this._preventAndStop(event);
    this._dealFiles(this.selectFiles.triggerDropFiles(this.fileOptions, this.uploadOptions, transfer.files));
    this.fileDrop.emit(transfer.files);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any): void {
    if (!this.enableDrop) {
      return;
    }
    const transfer = this._getTransfer(event);
    if (!this._haveFiles(transfer.types)) {
      return;
    }

    this._preventAndStop(event);
    this.fileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any): any {
    if (!this.enableDrop) {
      return;
    }
    if ((this as any).element) {
      if (event.currentTarget === (this as any).element[0]) {
        return;
      }
    }

    this._preventAndStop(event);
    this.fileOver.emit(false);
  }

  protected _getTransfer(event: any): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  protected _preventAndStop(event: any): any {
    event.preventDefault();
    event.stopPropagation();
  }

  protected _haveFiles(types: any): any {
    if (!types) {
      return false;
    }

    if (types.indexOf) {
      return types.indexOf('Files') !== -1;
    } else if (types.contains) {
      return types.contains('Files');
    } else {
      return false;
    }
  }

  canUpload() {
    let uploadResult = Promise.resolve(true);
    if (this.beforeUpload) {
      const result: any = this.beforeUpload(this.fileUploaders);
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

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
