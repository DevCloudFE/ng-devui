import {
  Component,
  OnInit
} from '@angular/core';
import { timer } from 'rxjs';
import { LoadingType } from 'ng-devui/loading';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {
  loading1: LoadingType;
  loading2: LoadingType;
  showLoading = true;
  tableNames: string[][] = [[]];
  view = {
    top: '50px',
    left: '50%'
  };
  constructor() {
    this.loading1 = undefined;
    this.loading2 = undefined;
  }

  ngOnInit() {
  }

  fetchCustomLoading1() {
    this.loading1 = timer(3500).toPromise();
  }
  fetchCustomLoading2() {
    this.loading2 = timer(3500).toPromise();
  }

}
