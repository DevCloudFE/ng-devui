import { toArray } from 'rxjs/operators';
import { from, merge } from 'rxjs';

import {
  FileUploader
} from './file-uploader.class';
import {UploadStatus} from './file-uploader.types';

export class UploadComponent {
  fileUploaders: Array<FileUploader> = [];

  addFile(file, options) {
    if (options.checkSameName) {
      if (this.checkFileSame(file.name)) {
        this.fileUploaders.push(new FileUploader(file, options));
      }
    } else {
      this.fileUploaders.push(new FileUploader(file, options));
    }
  }
  checkFileSame(fileName) {
    let checkRel = true;
    for (let i = 0; i < this.fileUploaders.length; i++) {
      if (fileName === this.fileUploaders[i].file.name) {
        checkRel = false;
        break;
      }
    }
    return checkRel;
  }

  getFiles() {
    return this.fileUploaders.map(fileUploader => {
      return fileUploader.file;
    });
  }

  upload() {
    const uploads = this.fileUploaders
      .filter((fileUploader) => fileUploader.status !== UploadStatus.uploaded)
      .map((fileUploader) => {
        return from(fileUploader.send());
      });

    if (uploads.length > 0) {
      return merge(...uploads).pipe(toArray());
    }

    return from(Promise.reject('no files'));
  }

  deleteFile(file) {
    this.fileUploaders = this.fileUploaders.filter((fileUploader) => {
      return file !== fileUploader.file;
    });
  }

  // 清空已选文件
  removeFiles() {
    this.fileUploaders = [];
  }
}
