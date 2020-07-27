import {
  Component
} from '@angular/core';

@Component({
  selector: 'd-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent {
  pager = {
    total: 306,
    pageIndex: 5,
    pageSize: 10,
    pageSizeOptions: [10, 20, 30, 40, 50]
  };
  pageIndexChange(pageIndex) {
    this.checkCount(pageIndex);
  }
  pageSizeChange(pageSize) {
    this.pager.pageIndex = 1;
    this.checkCount(this.pager.pageIndex);
  }

  pageIndexChangeWithoutFix(pageIndex) {
    this.checkCount(pageIndex);
  }
  pageSizeChangeWithoutFix(pageSize) {
    this.pager.pageIndex = 1;
    this.checkCount(this.pager.pageIndex);
  }
  checkCount(pageIndex) {
    console.log('check number of the function calls and show current pageIndex', pageIndex);
  }
}
