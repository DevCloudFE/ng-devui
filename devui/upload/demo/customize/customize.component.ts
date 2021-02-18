import { Component } from '@angular/core';
import { IFileOptions, IUploadOptions } from 'ng-devui/upload';

@Component({
  selector: 'd-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent {
  additionalParameter2 = {
    name: 'tom',
    age: 11
  };
  uploadOptions2: IUploadOptions = {
    uri: '/upload',
    additionalParameter: this.additionalParameter2,
    maximumSize: 20,
    checkSameName: true
  };
  fileOptions2: IFileOptions = {
    multiple: true,
    accept: '.xls,.xlsx,.pages,.mp3,.png',
  };
  uploadedFiles2: Array<Object> = [];
  UPLOADED: string;
  FAILED: string;
  DELETE: string;
  PRELOAD: string;
  UPLOADING: string;
  UPLOAD: string;

  constructor() {
    this.UPLOAD = 'Upload';
    this.PRELOAD = 'preLoad';
    this.UPLOADING = 'Uploading';
    this.UPLOADED = 'Uploaded';
    this.FAILED = 'Upload Failed';
    this.DELETE = 'Delete';
  }

  onSuccess3(result) {
    console.log(result);
  }

  onError3(error) {
    console.log(error);
  }

  deleteUploadedFile3(filePath: string) {
    console.log(`delete ${filePath}`);
  }
  setCustomUploadOptions(file, options) {
    let uploadOptions = options;
    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      uploadOptions = {
        uri: '/upload',
        additionalParameter: this.additionalParameter2,
        maximumSize: 0.1,
        checkSameName: true
      };
    }
    if (file.type  === 'image/png') {
      uploadOptions = {
        uri: '/upload',
        additionalParameter: this.additionalParameter2,
        maximumSize: 0.5,
        checkSameName: true
      };
    }
    return uploadOptions;
  }
}
