import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HelperUtils } from '../../helper-utils';

@Component({
  selector: 'd-common-helper-download',
  templateUrl: './helper-download.component.html',
})
export class HelperDownloadDemoComponent {
  downError: string;
  constructor(private httpClient: HttpClient) {}

  download() {
    HelperUtils.downloadFile(
      'assets/Frameworks.png',
      { method: 'POST', params: { name: 'frameworks', mycode: '3344' }, iframename: 'my_iframe' },
      this.downloadError
    );
  }

  download2() {
    HelperUtils.downloadFileByHttpClient(
      this.httpClient,
      'assets/Frameworks.png',
      { method: 'POST', params: { name: 'frameworks', mycode: '3344' }, header: { 'X-lang': 'en' } },
      this.downloadError
    );
  }

  downloadError = (response) => {
    this.downError = response;
  }
}
