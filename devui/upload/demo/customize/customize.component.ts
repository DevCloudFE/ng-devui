import { Component } from '@angular/core';
import { IFileOptions, IUploadOptions } from 'ng-devui';
import { DevUIConfig } from 'ng-devui/devui.config';

@Component({
  selector: 'd-demo-upload-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent {
  additionalParameter2 = {
    name: 'tom',
    age: 11
  };
  uploadOptions2: IUploadOptions = {
    uri: 'http://localhost:9000/files',
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

  constructor(private devuiConfig: DevUIConfig) {
    this.UPLOAD = this.devuiConfig['uploadCN'].UPLOAD;
    this.PRELOAD = this.devuiConfig['uploadCN'].UPLOAD_STATUS.PRELOAD;
    this.UPLOADING = this.devuiConfig['uploadCN'].UPLOAD_STATUS.UPLOADING;
    this.UPLOADED = this.devuiConfig['uploadCN'].UPLOAD_STATUS.UPLOADED;
    this.FAILED = this.devuiConfig['uploadCN'].UPLOAD_STATUS.FAILED;
    this.DELETE = this.devuiConfig['uploadCN'].DELETE;
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
}
