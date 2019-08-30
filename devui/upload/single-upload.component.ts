import {
  Component,
  ViewChild,
  TemplateRef,
  HostBinding,
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
import {SingleUploadViewComponent} from './single-upload-view.component';
import {
  SelectFiles
} from './select-files.utils';
import {
  ModalService,
  ModalAlertComponent
} from 'ng-devui/modal';
import { last, map } from 'rxjs/operators' ;
import { DevUIConfig } from 'ng-devui/devui.config';
import { Observable } from 'rxjs';


@Component({
  selector: 'd-single-upload',
  templateUrl: './single-upload.component.html',
  exportAs: 'dSingleUpload',
  styleUrls: ['./upload-view.component.scss'],
})
export class SingleUploadComponent {
  dSingleUploadView;
  @Input() uploadOptions: IUploadOptions;
  @Input() fileOptions: IFileOptions;
  @Input() autoUpload = false;
  @Input() withoutBtn = false;
  @Input() uploadedFiles: Array<Object> = [];
  @Input() uploadedFilesRef: TemplateRef<any>;
  @Input() preloadFilesRef?: TemplateRef<any>;
  @Input() filePath: string;
  // i18n
  /**
   * 【可选】上传输入框中的Placeholder文字
   */
  @Input() CHOOSE_FILE: string;
  /**
   * 【可选】上传按钮文字
   */
  @Input() uploadText: string;
  /**
   * 【可选】错误信息弹出框中确认按钮文字
   */
  @Input() confirmText: string;
  @Input() beforeUpload: (file) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() enableDrop = false;
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter();
  @Output() fileDrop: EventEmitter<any> = new EventEmitter();
  @Output() fileOver: EventEmitter<any> = new EventEmitter();
  @ViewChild('dSingleUploadView') singleUploadViewComponent: SingleUploadViewComponent;
  UploadStatus = UploadStatus;
  isDropOVer = false;

  constructor(private modalService: ModalService,
private devUIConfig: DevUIConfig,
              private selectFiles: SelectFiles) {
    this.uploadText = this.devUIConfig['uploadCN'].UPLOAD;
    this.confirmText = this.devUIConfig['modalCN'].BUTTON_TEXT.OK;
    this.CHOOSE_FILE = this.devUIConfig['uploadCN'].CHOOSE_FILE;
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
          (results: Array<{file: File, response: any}>) => {
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

  alertMsg(errorMsg) {
    const results = this.modalService.open({
      width: '300px',
      backdropCloseable: false,
      showAnimate: true,
      component: ModalAlertComponent,
      data: {
        content: errorMsg,
        cancelBtnText: this.confirmText,
        onClose: (event) => {
          results.modalInstance.hide();
        },
      },
    });
  }
}
