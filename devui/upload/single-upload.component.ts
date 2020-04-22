import {
  Component,
  ViewChild,
  TemplateRef,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import {
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  UploadStatus,
  IUploadOptions,
  IFileOptions
} from './file-uploader.types';
import { SingleUploadViewComponent } from './single-upload-view.component';
import {
  SelectFiles
} from './select-files.utils';
import {
  ModalService,
  ModalAlertComponent
} from 'ng-devui/modal';
import { last, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { I18nInterface, I18nService } from 'ng-devui/i18n';


@Component({
  selector: 'd-single-upload',
  templateUrl: './single-upload.component.html',
  exportAs: 'dSingleUpload',
  styleUrls: ['./upload-view.component.scss'],
})
export class SingleUploadComponent implements OnDestroy {
  dSingleUploadView;
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
  @Input() confirmText: string;
  @Input() beforeUpload: (file) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() enableDrop = false;
  @Output() successEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() fileDrop: EventEmitter<any> = new EventEmitter<any>();
  @Output() fileOver: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dSingleUploadView', { static: true }) singleUploadViewComponent: SingleUploadViewComponent;
  UploadStatus = UploadStatus;
  isDropOVer = false;
  i18nText: I18nInterface['upload'];
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  constructor(private modalService: ModalService,
    private i18n: I18nService,
    private selectFiles: SelectFiles) {
    this.i18nText = this.i18n.getI18nText().upload;
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.upload;
      this.i18nCommonText = data.common;
    });
  }

  _dealFiles(observale) {
    observale.pipe(map(file => {
      this.singleUploadViewComponent.addFile(<File>file);
      return file;
    })).subscribe(
      () => {
        this.singleUploadViewComponent.uploadedFilesComponent.cleanUploadedFiles();
        if (this.autoUpload) {
          this.upload();
        }
      },
      (error: Error) => {
        this.alertMsg(error.message);
      }
    );
  }

  onClick($event) {
    this._dealFiles(this.selectFiles.triggerSelectFiles(this.fileOptions, this.uploadOptions));
  }

  get filename() {
    return (this.singleUploadViewComponent.getFiles()[0] || {} as File).name || '';
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

  upload() {
    this.canUpload().then((canUpload) => {
      if (!canUpload) {
        return;
      }
      this.singleUploadViewComponent
        .upload()
        .pipe(
          last()
        ).subscribe(
          (results: Array<{ file: File, response: any }>) => {
            this.successEvent.emit(results);
            results.forEach((result) => {
              this.singleUploadViewComponent.deleteFile(result.file);
              this.singleUploadViewComponent.uploadedFilesComponent.addAndOverwriteFile(result.file);
            });
          },
          (error) => {
            this.singleUploadViewComponent.uploadedFilesComponent.cleanUploadedFiles();
            this.errorEvent.emit(error);
          }
        );
    });
  }

  canUpload() {
    let uploadResult = Promise.resolve(true);
    if (this.beforeUpload) {
      const result: any = this.beforeUpload(this.singleUploadViewComponent.getFiles()[0] || {} as File);
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
  deleteFile($event) {
    $event.stopPropagation();
    const files = this.singleUploadViewComponent.getFiles();
    this.singleUploadViewComponent.deleteFile(files[0]);
  }
  alertMsg(errorMsg) {
    const results = this.modalService.open({
      width: '300px',
      backdropCloseable: false,
      showAnimate: true,
      component: ModalAlertComponent,
      data: {
        content: errorMsg,
        cancelBtnText: this.confirmText ? this.confirmText : this.i18nCommonText.btnConfirm,
        onClose: (event) => {
          results.modalInstance.hide();
        },
      },
    });
  }
  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();

    }
  }
}
