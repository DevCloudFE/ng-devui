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
  pageIndexChange(pageIndex) { }
  pageSizeChange(pageSize) { }
}
