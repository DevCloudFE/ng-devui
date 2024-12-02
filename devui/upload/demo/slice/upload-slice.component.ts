import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { IFileOptions, IUploadOptions, SingleUploadComponent } from 'ng-devui/upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'd-demo-upload-slice',
  templateUrl: './upload-slice.component.html',
  styleUrls: ['./upload-slice.component.scss'],
})
export class UploadSliceComponent implements OnInit {
  @ViewChild('singleuploadDrag', { static: true }) singleuploadDrag: SingleUploadComponent;
  public beforeUploadFn: (file: any) => boolean | Observable<boolean> | Promise<boolean>;
  additionalParameter = {
    name: 'tom',
    age: 11,
  };
  // accept all file types
  fileOptions: IFileOptions = {
    multiple: false,
  };
  uploadedFiles: Array<Object> = [];
  uploadOptions: IUploadOptions = {
    uri: 'http://localhost:8080/upload',
    // chunkSize:1024*500,
    isChunked: true,
    headers: {},
    additionalParameter: this.additionalParameter,
    maximumSize: 10000,
    method: 'POST',
    fileFieldName: 'dFile',
    withCredentials: true,
    responseType: 'json',
  };
  selectedFiles: any;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private doc: any) {
    this.beforeUploadFn = this.beforeUpload2.bind(this);
  }

  ngOnInit() {
    this.doc.getElementById('fileInput').addEventListener('change', (event) => {
      this.selectedFiles = (event.target as HTMLInputElement).files;
    });
  }

  dynamicUploadOptionsFn(file, options, chunkedFileIndex?) {
    let uploadOptions = options;
    if (file.type === 'application/pdf') {
      uploadOptions = {
        uri: 'http://localhost:8080/upload',
        headers: {},
        additionalParameter: this.additionalParameter,
        maximumSize: 10000,
        method: 'POST',
        fileFieldName: 'dFile',
        withCredentials: true,
        responseType: 'json',
      };
    }
    if (chunkedFileIndex) {
      /* 分片上传时分片序号从 1 开始，用于给不同分片添加自定义参数 */
      console.log(`this is slice : ${chunkedFileIndex}`);
      uploadOptions.count = chunkedFileIndex;
    }
    return uploadOptions;
  }

  onSuccess(result) {
    console.log(result);
  }

  beforeUpload(file) {
    console.log(this);
    console.log(file);
    return true;
  }

  beforeUpload2(file) {
    console.log(this);
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
