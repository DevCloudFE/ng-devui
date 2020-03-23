import {
  Component,
  OnInit
} from '@angular/core';
import { timer } from 'rxjs';
import {LoadingType} from 'ng-devui/loading';

@Component({
  selector: 'd-promise',
  templateUrl: './promise.component.html'
})
export class PromiseComponent implements OnInit {
  loading3: LoadingType;
  showLoading = false;
  tableNames: string[][] = [[]];
  constructor() {
    this.loading3 = undefined;
  }

  ngOnInit() {
  }

  fetchMultiplePromise() {
    this.loading3 = [
      timer(3500).toPromise(),
      timer(3000).toPromise(),
    ];
  }

}
