import { IFileOptions, IUploadOptions } from './file-uploader.types';
import { Observable, from, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as mime from 'mime-db';
import { Injectable } from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { endsWith } from 'lodash-es';

@Injectable()
export class SelectFiles {
  NOT_ALLOWED_FILE_TYPE_MSG: string;
  BEYOND_MAXIMAL_FILE_SIZE_MSG: string;
  i18nText: I18nInterface['upload'];
  i18nSubscription: Subscription;
  constructor(private i18n: I18nService) {
    this.i18nText = this.i18n.getI18nText().upload;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.upload;
    });
  }

  selectFiles = ({ multiple, accept }: IFileOptions): Promise<File[]> => {
    return new Promise((resolve) => {
      const tempNode = document.getElementById('d-upload-temp');
      if (tempNode) {
        document.body.removeChild(tempNode);
      }
      const input = document.createElement('input');

      input.style.position = 'fixed';
      input.style.left = '-2000px';
      input.style.top = '-2000px';

      input.setAttribute('id', 'd-upload-temp');
      input.setAttribute('type', 'file');
      if (multiple) {
        input.setAttribute('multiple', '');
      }
      if (accept) {
        input.setAttribute('accept', accept);
      }

      input.addEventListener('change', event => {
        resolve(Array.prototype.slice.call((event.target as HTMLInputElement).files));
      });
      document.body.appendChild(input); // Fix campatability issue with Internet Explorer 11
      this.simulateClickEvent(input);
    });
  }

  isAllowedFileType = (accept: string, file: File) => {
    if (accept) {
      const acceptArr = accept.split(',');
      return acceptArr.reduce((result: boolean, item: string) => {
        // 浏览器的文件嗅探会对难以识别的文件type赋值为空，因此需要通过简单的后缀名判断处理
        if (file.type === '' || !mime[file.type] || !mime[file.type].extensions || item.includes('*')) {
          return result || file.type.indexOf(item.replace(/[\.*]/g, '')) > -1 || endsWith(file.name, item.replace(/[\.*]/g, ''));
        } else {
          return result || mime[file.type].extensions.indexOf(item.replace(/\./g, '')) > -1;
        }
      }, false);
    }
    return true;
  }

  beyondMaximalSize = (fileSize, maximumSize) => {
    if (maximumSize) {
      return fileSize > 1024 * 1024 * maximumSize;
    }
    return false;
  }

  beyondAllFilesMaximalSize = (fileSize, maximumSize) => {
    if (maximumSize) {
      return fileSize > 1024 * 1024 * maximumSize;
    }
    return false;
  }

  triggerSelectFiles = (fileOptions: IFileOptions, uploadOptions: IUploadOptions) => {
    const { multiple, accept } = fileOptions;
    return from(this.selectFiles({ multiple, accept })).pipe(mergeMap(file => <any>file));
  }


  triggerDropFiles = (fileOptions: IFileOptions, uploadOptions: IUploadOptions, files: any) => {
    return new Observable(observer => observer.next(files)).pipe(mergeMap(file => <any>file));

  }

  checkAllFilesSize(fileSize, maximumSize) {
    if (this.beyondMaximalSize(fileSize, maximumSize)) {
      this.BEYOND_MAXIMAL_FILE_SIZE_MSG = this.i18nText.getAllFilesBeyondMaximalFileSizeMsg(maximumSize);
      return { checkError: true, errorMsg: this.BEYOND_MAXIMAL_FILE_SIZE_MSG };
    }
  }

  _validateFiles(file, accept, uploadOptions) {
    if (!this.isAllowedFileType(accept, <File>file)) {
      this.NOT_ALLOWED_FILE_TYPE_MSG = this.i18nText.getNotAllowedFileTypeMsg((<File>file).name, accept);
      return { checkError: true, errorMsg: this.NOT_ALLOWED_FILE_TYPE_MSG };
    }
    if (this.beyondMaximalSize((<File>file).size, uploadOptions.maximumSize)) {
      this.BEYOND_MAXIMAL_FILE_SIZE_MSG = this.i18nText.getBeyondMaximalFileSizeMsg((<File>file).name, uploadOptions.maximumSize);
      return { checkError: true, errorMsg: this.BEYOND_MAXIMAL_FILE_SIZE_MSG };
    }
    return { checkError: false, errorMsg: undefined };
  }

  simulateClickEvent(input) {
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    input.dispatchEvent(evt);
  }
}
