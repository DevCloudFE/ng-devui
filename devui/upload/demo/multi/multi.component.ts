import { Component } from '@angular/core';
import { IUploadOptions, IFileOptions } from 'ng-devui';

@Component({
  selector: 'd-multi',
  templateUrl: './multi.component.html'
})
export class MultiComponent {

  additionalParameter2 = {
    name: 'tom',
    age: 11
  };
  uploadOptions2: IUploadOptions = {
    uri: '/upload',
    method: 'post',
    additionalParameter: this.additionalParameter2,
    maximumSize: 20,
    checkSameName: true
  };
  fileOptions2: IFileOptions = {
    multiple: true,
    accept: '.xls,.xlsx,.pages,.mp3,.png',
  };
  uploadedFiles2: Array<Object> = [];

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
}
