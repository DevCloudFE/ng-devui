import { Component } from '@angular/core';
import { IFileOptions, IUploadOptions } from '../../file-uploader.types';

@Component({
  selector: 'd-demo-upload-auto',
  templateUrl: './auto.component.html'
})
export class UploadAutoComponent {
  additionalParameter1 = {
    name: 'tom',
    age: 11
  };

  fileOptions1: IFileOptions = {
    multiple: false,
    accept: '.xls,.xlsx,.pages,.mp3,.png',
  };

  uploadOptions1: IUploadOptions = {
    uri: 'http://localhost:8080',
    headers: {},
    additionalParameter: this.additionalParameter1,
    maximumSize: 0.5,
    method: 'GET',
    fileFieldName: 'dFile'
  };

  constructor() {
  }

  success(result) {
    console.log(result);
  }

  error(error) {
    console.log(error);
  }
}
