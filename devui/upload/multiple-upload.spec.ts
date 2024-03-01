import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomHelper } from '../utils/testing/dom-helper';
import { IFileOptions, IUploadOptions, UploadStatus } from './file-uploader.types';
import { MultipleUploadComponent } from './multiple-upload.component';
import { SliceUploadService } from './slice-upload.service';
import { UploadModule } from './upload.module';
@Component({
  template: `
    <d-multiple-upload
      #multipleUpload
      [fileOptions]="fileOptions"
      [uploadedFiles]="uploadedFiles"
      [uploadOptions]="uploadOptions"
      [filePath]="'name'"
      [autoUpload]="autoUpload"
      [beforeUpload]="beforeUpload"
      (successEvent)="onSuccess($event)"
      (deleteUploadedFileEvent)="deleteUploadedFile($event)"
      (errorEvent)="onError($event)"
      [ngModel]="files"
      [showTip]="true"
      [oneTimeUpload]="oneTimeUpload"
    >
    </d-multiple-upload>
  `,
})
class TestUploadComponent {
  @ViewChild('multipleUpload') multipleUpload: MultipleUploadComponent;
  fileOptions: IFileOptions = {
    multiple: true,
    accept: '.xls,.xlsx,.pages,.mp3,.png',
    webkitdirectory: true,
  };
  additionalParameter = {
    name: 'tom',
    age: 11,
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
    responseType: 'json',
  };
  files = [];
  autoUpload = false;
  oneTimeUpload = false;

  constructor(public sliceUploadService: SliceUploadService) {}

  dynamicUploadOptionsFn(file, options) {
    let uploadOptions = options;
    if (file.type === 'application/pdf') {
      uploadOptions = {
        uri: '/upload',
        headers: {},
        additionalParameter: this.additionalParameter,
        maximumSize: 50,
        method: 'POST',
        fileFieldName: 'dFile',
        withCredentials: true,
        responseType: 'json',
      };
    }
    return uploadOptions;
  }

  beforeUpload(file) {
    return true;
  }

  onSuccess = jasmine.createSpy('upload successfully');
  deleteUploadedFile = jasmine.createSpy('deleUploadedFile');
  onError = jasmine.createSpy('upload failed');
}

describe('upload', () => {
  let fixture: ComponentFixture<TestUploadComponent>;
  let debugEl: DebugElement;
  let component: TestUploadComponent;
  let domHelper: DomHelper<TestUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UploadModule, FormsModule, NoopAnimationsModule],
      declarations: [TestUploadComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUploadComponent);
    domHelper = new DomHelper(fixture);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('basic', () => {
    it('should render upload component correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should upload file successfully', fakeAsync(() => {
      const file1 = new File(['upload'], 'upload1.png');
      const file2 = new File(['upload'], 'upload2.png');
      component.multipleUpload.multipleUploadViewComponent.addFile(file1);
      component.multipleUpload.multipleUploadViewComponent.addFile(file2);
      component.multipleUpload.multipleUploadViewComponent.fileUploaders.forEach((FileUploader) => {
        spyOn(FileUploader, 'sendMultiple').and.callFake(() => {
          return Promise.resolve({ file: FileUploader.file, response: 'successful', status: UploadStatus.uploaded });
        });
      });
      const el: HTMLElement = debugEl.query(By.css('.devui-btn-default.devui-btn-common')).nativeElement;
      el.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.onSuccess).toHaveBeenCalled();
    }));
    it('should upload file filed', fakeAsync(() => {
      const file1 = new File(['upload'], 'upload1.png');
      const file2 = new File(['upload'], 'upload2.png');
      component.multipleUpload.multipleUploadViewComponent.addFile(file1);
      component.multipleUpload.multipleUploadViewComponent.addFile(file2);
      component.multipleUpload.multipleUploadViewComponent.fileUploaders.forEach((FileUploader) => {
        spyOn(FileUploader, 'sendMultiple').and.callFake(() => {
          return Promise.reject({ file: FileUploader.file, response: 'error', status: UploadStatus.failed });
        });
      });
      const el: HTMLElement = debugEl.query(By.css('.devui-btn-default.devui-btn-common')).nativeElement;
      el.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.onError).toHaveBeenCalled();
    }));

    it('should delete file successfully', fakeAsync(() => {
      const file1 = new File(['upload'], 'upload1.png');
      const file2 = new File(['upload'], 'upload2.png');
      component.multipleUpload.multipleUploadViewComponent.addFile(file1);
      component.multipleUpload.multipleUploadViewComponent.addFile(file2);
      component.multipleUpload.multipleUploadViewComponent.fileUploaders.forEach((FileUploader) => {
        spyOn(FileUploader, 'sendMultiple').and.callFake(() => {
          return Promise.resolve({ file: FileUploader.file, response: 'successful', status: UploadStatus.uploaded });
        });
      });
      const el: HTMLElement = debugEl.query(By.css('.devui-btn-default.devui-btn-common')).nativeElement;
      el.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.onSuccess).toHaveBeenCalled();
      const deleteIcon: HTMLElement = debugEl.query(By.css('.devui-file-tag .devui-upload-remove')).nativeElement;
      deleteIcon.dispatchEvent(new Event('click'));
      expect(component.deleteUploadedFile).toHaveBeenCalled();
      expect(component.multipleUpload.multipleUploadViewComponent.fileUploaders.length).toEqual(1);
    }));

    it('should write value correctly', fakeAsync(() => {
      expect(component).toBeTruthy();
      component.files = [new File(['upload'], 'upload1.png'), new File(['upload'], 'upload2.png')];
      tick();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      // 避免第一次进入writeValue时值为空的错误判断
      if (component.files) {
        expect(component.multipleUpload.multipleUploadViewComponent.fileUploaders[0].file.name).toEqual(component.files[0].name);
        expect(component.multipleUpload.multipleUploadViewComponent.fileUploaders[1].file.name).toEqual(component.files[1].name);
      }
    }));

    it('should one time upload file successfully', fakeAsync(() => {
      component.oneTimeUpload = true;
      const file1 = new File(['upload'], 'upload1.png');
      const file2 = new File(['upload'], 'upload2.png');
      component.multipleUpload.multipleUploadViewComponent.addFile(file1);
      component.multipleUpload.multipleUploadViewComponent.addFile(file2);
      component.multipleUpload.multipleUploadViewComponent.fileUploaders.forEach((FileUploader) => {
        spyOn(FileUploader, 'send').and.callFake(() => {
          return Promise.resolve({ file: FileUploader.file, response: 'successful', status: UploadStatus.uploaded });
        });
      });
      fixture.detectChanges();
      const el: HTMLElement = debugEl.query(By.css('.devui-btn-default.devui-btn-common')).nativeElement;
      el.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.onSuccess).toHaveBeenCalled();
    }));

    it('should chunk upload correctly', fakeAsync(() => {
      expect(component).toBeTruthy();
      component.sliceUploadService.defaultChunkSize = 1;
      component.uploadOptions.isChunked = true;
      const file = new File(['upload'], 'upload.txt');
      component.multipleUpload.multipleUploadViewComponent.addFile(file);
      const chunkFiles = component.sliceUploadService.createFileChunk(file, component.uploadOptions);
      chunkFiles.forEach((FileUploader) => {
        spyOn(FileUploader, 'send').and.callFake(() => {
          return Promise.resolve({ file: FileUploader.file, response: 'successful' });
        });
      });
      spyOn(component.sliceUploadService, 'createFileChunk').and.callFake(() => {
        return chunkFiles;
      });
      const el: HTMLElement = debugEl.query(By.css('.devui-btn-default.devui-btn-common')).nativeElement;
      el.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.onSuccess).toHaveBeenCalled();
    }));
  });
});
