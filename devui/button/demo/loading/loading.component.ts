import { Component } from '@angular/core';

@Component({
  selector: 'd-button-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  showLoading = false;
  constructor() {}

  toggleLoading() {
    this.showLoading = true;
    setTimeout(() => {
      this.showLoading = false;
    }, 1000);
  }
}
