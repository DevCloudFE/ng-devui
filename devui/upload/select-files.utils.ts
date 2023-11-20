import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Observable, Subscription, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IFileOptions, IUploadOptions } from './file-uploader.types';

@Injectable()
export class SelectFiles {
  NOT_ALLOWED_FILE_TYPE_MSG: string;
  BEYOND_MAXIMAL_FILE_SIZE_MSG: string;
  BEYOND_MAXIMAL_FILE_COUNT_MSG: string;
  i18nText: I18nInterface['upload'];
  i18nSubscription: Subscription;
  document: Document;

  constructor(private i18n: I18nService, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
    this.i18nText = this.i18n.getI18nText().upload;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.upload;
    });
  }

  selectFiles = ({ multiple, accept, webkitdirectory }: IFileOptions): Promise<File[]> => {
    return new Promise((resolve) => {
      const tempNode = this.document.getElementById('d-upload-temp');
      if (tempNode) {
        this.document.body.removeChild(tempNode);
      }
      const input = this.document.createElement('input');

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

      if (webkitdirectory) {
        input.setAttribute('webkitdirectory', '');
      }

      input.addEventListener('change', event => {
        resolve(Array.prototype.slice.call((event.target as HTMLInputElement).files));
      });
      this.document.body.appendChild(input); // Fix compatibility issue with Internet Explorer 11
      this.simulateClickEvent(input);
    });
  };

  isAllowedFileType = (accept: string, file: File) => {
    if (accept) {
      const acceptArr = accept.split(',');
      const baseMimeType = file.type.replace(/\/.*$/, '');
      return acceptArr.some((type: string) => {
        const validType = type.trim();
        //  suffix name (e.g. '.png,.xlsx')
        if (validType.startsWith('.')) {
          return (
            file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.toLowerCase().length - validType.toLowerCase().length) > -1
          );
          // mime type like 'image/*'
        } else if (/\/\*$/.test(validType)) {
          return baseMimeType === validType.replace(/\/.*$/, '');
        }
        //  mime type like 'text/plain,application/json'
        return file.type === validType;
      });
    }
    return true;
  };

  beyondMaximalSize = (fileSize, maximumSize) => {
    if (maximumSize) {
      return fileSize > 1024 * 1024 * maximumSize;
    }
    return false;
  };

  beyondAllFilesMaximalSize = (fileSize, maximumSize) => {
    if (maximumSize) {
      return fileSize > 1024 * 1024 * maximumSize;
    }
    return false;
  };

  beyondMaximumFileCount = (files, maximumCount) => {
    if (maximumCount) {
      return files > maximumCount;
    }
    return false;
  };

  triggerSelectFiles = (fileOptions: IFileOptions, uploadOptions: IUploadOptions) => {
    const { multiple, accept, webkitdirectory } = fileOptions;
    return from(this.selectFiles({ multiple, accept, webkitdirectory })).pipe(mergeMap(file => <any>file));
  };

  triggerDropFiles = (fileOptions: IFileOptions, uploadOptions: IUploadOptions, files: any) => {
    return new Observable(observer => observer.next(files)).pipe(mergeMap(file => <any>file));

  };

  checkAllFilesSize(fileSize, maximumSize) {
    if (this.beyondMaximalSize(fileSize, maximumSize)) {
      this.BEYOND_MAXIMAL_FILE_SIZE_MSG = this.i18nText.getAllFilesBeyondMaximalFileSizeMsg(maximumSize);
      return { checkError: true, errorMsg: this.BEYOND_MAXIMAL_FILE_SIZE_MSG };
    }
  }

  _validateFiles(filesLen, currentFile, accept, uploadOptions) {
    if (!this.isAllowedFileType(accept, <File>currentFile)) {
      this.NOT_ALLOWED_FILE_TYPE_MSG = this.i18nText.getNotAllowedFileTypeMsg((<File>currentFile).name, accept);
      return { checkError: true, errorMsg: this.NOT_ALLOWED_FILE_TYPE_MSG };
    }
    if (this.beyondMaximalSize((<File>currentFile).size, uploadOptions.maximumSize)) {
      this.BEYOND_MAXIMAL_FILE_SIZE_MSG = this.i18nText.getBeyondMaximalFileSizeMsg((<File>currentFile).name, uploadOptions.maximumSize);
      return { checkError: true, errorMsg: this.BEYOND_MAXIMAL_FILE_SIZE_MSG };
    }
    if (this.beyondMaximumFileCount(filesLen, uploadOptions.maximumCount)) {
      this.BEYOND_MAXIMAL_FILE_COUNT_MSG = this.i18nText.getBeyondMaximumFileCountMsg(uploadOptions.maximumCount);
      return { checkError: true, errorMsg: this.BEYOND_MAXIMAL_FILE_COUNT_MSG };
    }
    return { checkError: false, errorMsg: undefined };
  }

  simulateClickEvent(input) {
    const evt = new MouseEvent('click');
    evt.stopPropagation();
    input.dispatchEvent(evt);
  }
}
