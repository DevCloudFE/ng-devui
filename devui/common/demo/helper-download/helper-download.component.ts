import { HttpClient, HttpProgressEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { HelperUtils } from 'ng-devui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-common-helper-download',
  templateUrl: './helper-download.component.html',
})
export class HelperDownloadDemoComponent {
  downError: string;
  sub: Subscription;
  constructor(private httpClient: HttpClient) {}

  download() {
    HelperUtils.downloadFile(
      'assets/Frameworks.png',
      { method: 'POST', params: { name: 'frameworks', mycode: '3344' }, iframename: 'my_iframe' },
      this.downloadError
    );
  }

  downloadFileByHttpClient() {
    this.sub = HelperUtils.downloadFileByHttpClient(
      this.httpClient,
      'assets/Frameworks.png',
      { method: 'POST', params: { name: 'frameworks', mycode: '3344' }, header: { 'X-lang': 'en' } },
      this.downloadError
    );
  }

  downloadError = (response) => {
    this.downError = response;
  };

  downloadProgress = (response: HttpProgressEvent) => {
    if (this.sub && response.loaded > 100) {
      /* Can be used to cancel the request if needed */
      this.sub.unsubscribe();
    }
  };
}
