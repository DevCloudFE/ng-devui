import {
  Component,
  OnInit
} from '@angular/core';
import { timer } from 'rxjs';
import {LoadingType} from 'ng-devui/loading';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {
  loading2: LoadingType;
  showLoading = false;
  tableNames: string[][] = [[]];
  constructor() {
    this.loading2 = undefined;
  }

  ngOnInit() {
  }

  fetchCustomLoading() {
    this.loading2 = timer(3500).toPromise();
  }

}
