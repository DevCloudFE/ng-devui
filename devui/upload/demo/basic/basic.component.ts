import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IFileOptions, IUploadOptions } from 'ng-devui';

@Component({
  selector: 'd-demo-upload-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent {
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
    uri: 'http://localhost:3000/upload',
    headers: {},
    additionalParameter: this.additionalParameter,
    maximumSize: 0.5,
    method: 'POST',
    fileFieldName: 'dFile'
  };

  constructor(private http: HttpClient) {
  }

  onSuccess(result) {
    console.log(result);
  }

  beforeUpload(file) {
    console.log(file);
    return true;
  }

  onError(error) {
    console.log(error);
  }

  deleteUploadedFile(filePath: string) {
    this.http.delete(`http://localhost:9000/files/${filePath}`).subscribe(() => {
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
