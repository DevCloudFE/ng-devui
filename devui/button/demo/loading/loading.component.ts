import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
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
