import {
  Component,
  TemplateRef,
  ViewChild,
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
import {
  ModalAlertComponent,
  ModalService
} from 'ng-devui/modal';
import {MultipleUploadViewComponent} from './multiple-upload-view.component';
import {
  SelectFiles
} from './select-files.utils';
import { DevUIConfig } from 'ng-devui/devui.config';
import { map, last } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'd-multiple-upload',
  templateUrl: './multiple-upload.component.html',
  exportAs: 'dMultipleUpload',
  styleUrls: ['./upload-view.component.scss'],
})
export class MultipleUploadComponent {
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
  @Input() CHOOSE_FILES: string;
  /**
   * 【可选】上传按钮文字
   */
  @Input() uploadText: string;
  /**
   * 【可选】错误信息弹出框中确认按钮文字
   */
  @Input() confirmText: string;
  @Input() beforeUpload: (files) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() enableDrop = false;

  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteUploadedFileEvent: EventEmitter<any> = new EventEmitter();
  @Output() fileDrop: EventEmitter<any> = new EventEmitter();
  @Output() fileOver: EventEmitter<any> = new EventEmitter();
  @ViewChild('dMultipleUploadView') multipleUploadViewComponent: MultipleUploadViewComponent;


  isDropOVer = false;
  constructor(private modalService: ModalService,
             private devUIConfig: DevUIConfig,
              private selectFiles: SelectFiles) {
    this.uploadText = this.devUIConfig['uploadCN'].UPLOAD;
    this.confirmText = this.devUIConfig['modalCN'].BUTTON_TEXT.OK;
    this.CHOOSE_FILES = this.devUIConfig['uploadCN'].CHOOSE_FILES;
  }

  _dealFiles(observale) {
    observale.pipe(
      map(file => this.multipleUploadViewComponent.addFile(file)),
      last()
      )
    .subscribe(
      () => {
        if (this.autoUpload) {
          this.upload();
        }
      },
      (error: Error) => {
        this.alertMsg(error.message);
      }
    );
  }

  onClick(event) {
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
        // 检验失败，清理已选文件
        this.multipleUploadViewComponent.removeFiles();
        return;
      }
      this.multipleUploadViewComponent.upload()
      .pipe(
        last()
      )
      .subscribe(
        (results: Array<{file: File, response: any}>) => {
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
      const result: any = this.beforeUpload(this.multipleUploadViewComponent.getFiles());
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

