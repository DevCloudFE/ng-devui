import { Component } from '@angular/core';
import { FileUploader, IFileOptions, IUploadOptions } from 'ng-devui/upload';

@Component({
  selector: 'd-customize-area-upload',
  templateUrl: './customize-area-upload.component.html',
  styleUrls: ['./customize-area-upload.component.scss']
})

export class CustomizeAreaUploadComponent {
  message: Array<Object> = [];
  uploadedFiles: Array<Object> = [];
  fileUploaders: Array<FileUploader> = [];
  isDropOver = false;
  uploadOptions: IUploadOptions = {
    uri: '/upload',
    maximumSize: 50,
    checkSameName: true
  };
  fileOptions: IFileOptions = {
    multiple: true
  };
  UPLOADED: string;
  CANCELUPLOAD: string;

  constructor() {
    this.UPLOADED = '上传成功';
    this.CANCELUPLOAD = '取消上传';
  }
  dynamicUploadOptionsFn(file, options) {
    let uploadOptions = options;
    if (file.type  === 'image/png') {
      uploadOptions = {
        uri: '/upload',
        maximumSize: 0.5,
        checkSameName: true
      };
    }
    return uploadOptions;
  }
  onSuccess(event) {
    console.log(event);
  }
  onError(event) {
    console.log(event);
  }
  fileDrop(files) {
    this.isDropOver = false;
    console.log(files);
  }
  fileOver(event) {
    this.isDropOver = event;
    console.log(event);
  }
  fileSelect(files) {
    console.log(files);
  }
  alertMsg(event) {
    this.message = event;
  }
  deleteFile(currFile) {
    this.fileUploaders = this.fileUploaders.filter((fileUploader) => {
      return currFile !== fileUploader;
    });
  }
}
