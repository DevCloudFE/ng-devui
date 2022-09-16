import { Component } from '@angular/core';
import { LoadingType } from 'ng-devui/loading';
import { timer } from 'rxjs';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
})
export class CustomComponent {
  loading1: LoadingType;
  loading2: LoadingType;
  showLoading = true;
  tableNames: string[][] = [[]];
  view = {
    top: '50px',
    left: '50%',
  };
  constructor() {
    this.loading1 = undefined;
    this.loading2 = undefined;
  }

  fetchCustomLoading1() {
    this.loading1 = timer(3500).toPromise();
  }
  fetchCustomLoading2() {
    this.loading2 = timer(3500).toPromise();
  }
}
