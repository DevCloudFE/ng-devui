// 注意需要在使用的NgModule中 import { HttpClientModule  } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IFileOptions, IUploadOptions } from 'ng-devui/upload';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent {
  public beforeUploadFn: Function;
  additionalParameter = {
    name: 'tom',
    age: 11
  };
  fileOptions: IFileOptions = {
    multiple: false,
    accept: '.xls,.xlsx,.pages,.mp3,.png',
  };
  uploadedFiles: Array<Object> = [];
  uploadOptions: IUploadOptions = {
    uri: '/upload',
    headers: {},
    additionalParameter: this.additionalParameter,
    maximumSize: 0.5,
    method: 'POST',
    fileFieldName: 'dFile'
  };

  constructor(private http: HttpClient) {
    this.beforeUploadFn = this.beforeUpload2.bind(this);
  }

  onSuccess(result) {
    console.log(result);
  }

  beforeUpload(file) {
    console.log(this); // this指向SingleUploadComponent
    console.log(file);
    return true;
  }

  beforeUpload2(file) {
    console.log(this); // this指向BasicComponent
    console.log(file);
    return true;
  }

  onError(error) {
    console.log(error);
  }

  deleteUploadedFile(filePath: string) {
    this.http.delete(`/files/${filePath}`).subscribe(() => {
      console.log(`delete ${filePath}`);
    });
  }

  fileDrop(files) {
    console.log(files);
  }
  fileOver(event) {
    console.log(event);
  }
}
