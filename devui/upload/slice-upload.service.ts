import { Injectable } from '@angular/core';
import { from, merge, of } from 'rxjs';
import { concatMap, last, toArray } from 'rxjs/operators';
import { FileUploader } from './file-uploader.class';
import { IUploadOptions, UploadStatus } from './file-uploader.types';
import { MultipleUploadViewComponent } from './multiple-upload-view.component';
import { MultipleUploadComponent } from './multiple-upload.component';
import { SingleUploadViewComponent } from './single-upload-view.component';
import { SingleUploadComponent } from './single-upload.component';

@Injectable()
export class SliceUploadService {
  defaultChunkSize = 1024 * 1024 * 20; // 单位是byte 默认分片大小 20兆。

  isNeedChunk(fileUploaders: Array<FileUploader>, uploadOptions: IUploadOptions) {
    return (fileUploaders || []).some((item: FileUploader) => item?.file.size > (uploadOptions?.chunkSize || this.defaultChunkSize));
  }

  async sliceUpload(
    instance: SingleUploadComponent | MultipleUploadComponent,
    viewInstance: SingleUploadViewComponent | MultipleUploadViewComponent
  ) {
    const fileUploaders = viewInstance.fileUploaders;
    const customizeFunc =
      (instance as SingleUploadComponent).dynamicUploadOptionsFn || (instance as MultipleUploadComponent).setCustomUploadOptions;
    for (let i = 0; i < fileUploaders.length; i++) {
      // 判断不需要切片的文件不调用自定义参数方法
      const file = fileUploaders[i].file;
      const isNeedChunk = file.size > (instance.uploadOptions?.chunkSize || this.defaultChunkSize);
      const fileChunkList = this.createFileChunk(
        file,
        fileUploaders[i].uploadOptions || instance.uploadOptions,
        isNeedChunk ? customizeFunc : undefined
      );
      const currentFile = fileUploaders[i];
      const uploadObservable = this.uploadChunkList(fileChunkList, currentFile, instance, viewInstance);
      (await uploadObservable).subscribe(
        (results: Array<{ file: File; response: any }>) => {
          currentFile.percentage = 100;
          currentFile.status = UploadStatus.uploaded;
          const successRes = [
            {
              file: currentFile.file,
              response: results[0].response,
              chunkList: results,
            },
          ];
          instance.successEvent.emit(successRes);
          results.forEach((result) => viewInstance.uploadedFilesComponent.addAndOverwriteFile(result.file));
        },
        (error) => {
          error.file = currentFile.file;
          this.chunkRequestError(error, currentFile, instance, viewInstance, false);
        }
      );
    }
  }

  async uploadChunkList(
    fileChunkList: Array<FileUploader>,
    currentFile: FileUploader,
    instance: SingleUploadComponent | MultipleUploadComponent,
    viewInstance: SingleUploadViewComponent | MultipleUploadViewComponent
  ) {
    let uploads: any[] = [];
    const chunkPercentage = (1 / fileChunkList.length) * 100;
    currentFile.status = UploadStatus.uploading;
    currentFile.percentage = 0;
    if (instance.uploadOptions.chunkInSequence) {
      return of(...fileChunkList).pipe(
        concatMap((uploader) => {
          let result;
          if (currentFile.status === UploadStatus.failed) {
            result = from(Promise.reject(new Error('upload canceled')));
            if (uploads.length === 0) {
              uploads.push(result);
            }
          } else {
            result = from(uploader.send());
            result.subscribe(
              () => {
                currentFile.percentage = currentFile.percentage + chunkPercentage;
              },
              (error) => this.chunkRequestError(error, currentFile, instance, viewInstance)
            );
            uploads.push(result);
          }
          return result;
        }),
        // last的过滤函数直接返回false，从而使用默认值uploads返回
        last(() => false, uploads)
      );
    } else {
      uploads = fileChunkList.map((fileUploader) => {
        fileUploader.percentage = 0;
        return from(fileUploader.send());
      });
      if (uploads.length > 0) {
        const uploadObservable = merge(...uploads);
        (await uploadObservable).subscribe(
          (results) => {
            currentFile.percentage = currentFile.percentage + chunkPercentage;
          },
          (error) => this.chunkRequestError(error, currentFile, instance, viewInstance)
        );
        return merge(...uploads).pipe(toArray());
      }
    }
    return from(Promise.reject(new Error('no files')));
  }

  // 生成分片上传的数组
  createFileChunk(file: File, uploadOptions: IUploadOptions, uploadOptionsFunc?: Function) {
    const chunkSize = uploadOptions.chunkSize || this.defaultChunkSize;
    const { name, type, lastModified, size } = file;
    const fileId = new Date().getTime();
    const fileChunkList: Array<FileUploader> = [];
    let fileSliceStart = 0;
    let chunkedFileIndex = 0;
    const chunks = Math.ceil(size / chunkSize);
    while (fileSliceStart < file.size) {
      chunkedFileIndex = chunkedFileIndex + 1;
      const currentUploadOptions = uploadOptionsFunc?.(file, uploadOptions, chunkedFileIndex) || uploadOptions;
      const slicedFile = file.slice(fileSliceStart, fileSliceStart + chunkSize);
      const newChunkFile = new File([slicedFile], `${fileId}-${chunkedFileIndex}-${chunks}-${size}-${lastModified}-${name}`, { type });
      fileChunkList.push(new FileUploader(newChunkFile, currentUploadOptions));
      fileSliceStart += chunkSize;
    }
    return fileChunkList;
  }

  chunkRequestError(
    error: any,
    currentFile: FileUploader,
    instance: SingleUploadComponent | MultipleUploadComponent,
    viewInstance: SingleUploadViewComponent | MultipleUploadViewComponent,
    isChunk = true
  ) {
    currentFile.status = UploadStatus.failed;
    viewInstance.uploadedFilesComponent.cleanUploadedFiles();
    if (isChunk) {
      instance.errorChunkEvent.emit(error);
    } else {
      instance.errorEvent.emit(error);
    }
  }
}
