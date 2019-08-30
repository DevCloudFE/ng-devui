import {
  Component
} from '@angular/core';

@Component({
  selector: 'd-pagination-demo-widgets',
  templateUrl: './widgets.component.html'
})
export class PaginationDemoWidgetsComponent {
  pager = {
    total: 306,
    pageIndex: 5,
    pageSize: 10,
    pageSizeOptions: [10, 20, 30, 40, 50]
  };
  pageIndexChange(pageIndex) { }
  pageSizeChange(pageSize) { }
}
