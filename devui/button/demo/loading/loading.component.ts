import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'd-button-loading',
    templateUrl: './loading.component.html',
    standalone: false
})
export class LoadingComponent implements OnInit {
  showLoading = false;
  constructor() { }

  ngOnInit() {
  }

  toggleLoading() {
    this.showLoading = true;
    setTimeout(() => {
      this.showLoading = false;
    }, 1000);
  }

}
