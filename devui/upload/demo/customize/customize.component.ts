import { Component } from '@angular/core';
import { IFileOptions, IUploadOptions } from 'ng-devui';

@Component({
  selector: 'd-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
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
    this.UPLOAD = '上传';
    this.PRELOAD = '预加载';
    this.UPLOADING = '上传中';
    this.UPLOADED = '已上传';
    this.FAILED = '上传失败';
    this.DELETE = '删除';
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
