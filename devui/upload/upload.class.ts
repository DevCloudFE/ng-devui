import { from, merge, of } from 'rxjs';
import { catchError, toArray } from 'rxjs/operators';
import { FileUploader } from './file-uploader.class';
import { UploadStatus } from './file-uploader.types';

export class UploadComponent {
  fileUploaders: Array<FileUploader> = [];
  filesWithSameName = [];

  addFile(file, options) {
    if (options && options.checkSameName) {
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
        if (this.filesWithSameName.indexOf(fileName) === -1) {
          this.filesWithSameName.push(fileName);
        }
        break;
      }
    }
    return checkRel;
  }

  getFiles() {
    return this.fileUploaders.map((fileUploader) => {
      return fileUploader.file;
    });
  }

  getFullFiles() {
    return this.fileUploaders.map((fileUploader) => {
      return fileUploader;
    });
  }

  upload(oneFile?, isMultipleUpload = false) {
    let uploads: any[] = [];
    if (oneFile) {
      oneFile.percentage = 0;
      uploads.push(from(oneFile.send()));
    } else {
      const preFiles = this.fileUploaders.filter((fileUploader) => fileUploader.status === UploadStatus.preLoad);
      const failedFiles = this.fileUploaders.filter((fileUploader) => fileUploader.status === UploadStatus.failed);
      const uploadFiles = preFiles.length > 0 ? preFiles : failedFiles;
      uploads = uploadFiles.map((fileUploader) => {
        fileUploader.percentage = 0;
        if (isMultipleUpload) {
          return from(fileUploader.sendMultiple()).pipe(catchError((error) => of(error)));
        } else {
          return from(fileUploader.send());
        }
      });
    }
    if (uploads.length > 0) {
      return merge(...uploads).pipe(toArray());
    }

    return from(Promise.reject('no files'));
  }

  oneTimeUpload() {
    const uploads = this.fileUploaders.filter((fileUploader) => fileUploader.status !== UploadStatus.uploaded);
    return from(this.dealOneTimeUploadFiles(uploads));
  }

  async dealOneTimeUploadFiles(uploads) {
    if (!uploads || !uploads.length) {
      return Promise.reject('no files');
    }
    // 触发文件上传
    let finalUploads = [];
    await uploads[0].send(uploads).finally(() =>
    // 根据uploads[0]的上传状态为其他file设置状态
    {
      finalUploads = uploads.map((file) => {
        file.status = uploads[0].status;
        file.percentage = uploads[0].percentage;
        return { file: file.file, response: uploads[0].response };
      });
    }
    );
    return finalUploads;
  }

  deleteFile(file) {
    this.fileUploaders = this.fileUploaders.filter((fileUploader) => {
      return file !== fileUploader.file;
    });
  }

  removeFiles() {
    this.fileUploaders = [];
    this.filesWithSameName = [];
  }

  getSameNameFiles() {
    return this.filesWithSameName.join();
  }

  resetSameNameFiles() {
    this.filesWithSameName = [];
  }
}
