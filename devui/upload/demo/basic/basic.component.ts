// 注意需要在使用的NgModule中 import { HttpClientModule  } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IFileOptions, IUploadOptions, SingleUploadComponent } from 'ng-devui/upload';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  @ViewChild('singleuploadDrag', { static: true }) singleuploadDrag: SingleUploadComponent;
  public beforeUploadFn: Function;
  additionalParameter = {
    name: 'tom',
    age: 11
  };
  // accept all file types
  fileOptions: IFileOptions = {
    multiple: false,
  };
  fileOptions2: IFileOptions = {
    multiple: false,
    accept: '.png,.zip',
  };
  uploadedFiles: Array<Object> = [];
  uploadOptions: IUploadOptions = {
    uri: '/upload',
    headers: {},
    additionalParameter: this.additionalParameter,
    maximumSize: 0.5,
    method: 'POST',
    fileFieldName: 'dFile',
    withCredentials: true,
    responseType: 'json'
  };

  selectedFiles: any;

  constructor(private http: HttpClient) {
    this.beforeUploadFn = this.beforeUpload2.bind(this);
  }

  dynamicUploadOptionsFn(file, options) {
    let uploadOptions = options;
    if (file.type  === 'application/pdf') {
      uploadOptions = {
        uri: '/upload',
        headers: {},
        additionalParameter: this.additionalParameter,
        maximumSize: 50,
        method: 'POST',
        fileFieldName: 'dFile',
        withCredentials: true,
        responseType: 'json'
      };
    }
    return uploadOptions;
  }
  ngOnInit() {
    document.getElementById('fileInput').addEventListener('change', event => {
      this.selectedFiles = (event.target as HTMLInputElement).files;
    });
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
    setTimeout(() => {
      console.log(this.selectedFiles);
    });
  }

  fileDrop(files) {
    console.log(files);
  }

  fileOver(event) {
    console.log(event);
  }

  fileSelect(files) {
    console.log(files);
    console.log(this.selectedFiles);
  }

  customUploadEvent() {
    this.singleuploadDrag.upload();
  }
}
