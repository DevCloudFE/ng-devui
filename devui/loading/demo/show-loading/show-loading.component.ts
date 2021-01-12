import { Component } from '@angular/core';

@Component({
  selector: 'd-show-loading',
  templateUrl: './show-loading.component.html',
  styleUrls: ['./show-loading.component.scss']
})
export class ShowLoadingComponent {
  showLoading = false;
  tableNames: string[][] = [[]];
  view = {
    top: '50px',
    left: '50%'
  };
  constructor() {

  }

  controlLoading() {
    this.showLoading = true;
    setTimeout(() => {
      this.showLoading = false;
    }, 1000);
  }

}
