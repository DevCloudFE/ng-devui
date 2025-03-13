import { Component, OnInit } from '@angular/core';
import { IFileOptions, IUploadOptions } from 'ng-devui/upload';
@Component({
    selector: 'd-dynamic-upload-options',
    templateUrl: './dynamic-upload-options.component.html',
    standalone: false
})
export class DynamicUploadOptionsComponent implements OnInit {
  additionalParameter = {
    name: 'tom',
    age: 11
  };
  uploadOptions: IUploadOptions = {
    uri: '/upload',
    method: 'post',
    additionalParameter: this.additionalParameter,
    maximumSize: 20,
    checkSameName: true
  };
  fileOptions: IFileOptions = {
    multiple: true,
    accept: '.xls,.xlsx,.pages,.mp3,.png',
  };
  uploadedFiles: Array<Object> = [];

  constructor() { }

  ngOnInit() {
  }

  onSuccess2(result) {
    console.log(result);
  }

  onError2(error) {
    console.log(error);
  }

  deleteUploadedFile2(filePath: string) {
    console.log(`delete ${filePath}`);
  }

  fileDrop(files) {
    console.log(files);
  }
  fileOver(event) {
    console.log(event);
  }
  beforeUpload = (files) => {
    if (!files || !files.length) {
      return;
    }
    files[0].uploadOptions.uri = '/upload2';
    console.log(files);
    return true;
  };
}
