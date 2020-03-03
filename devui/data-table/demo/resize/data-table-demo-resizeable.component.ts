import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,
  ViewChild, ElementRef, AfterContentInit, HostBinding } from '@angular/core';
import { LoadingType } from 'ng-devui/loading';
import { Observable } from 'rxjs';
import { originSource, SourceType } from '../mock-data';

const pagerSource = JSON.parse(JSON.stringify(originSource));

@Component({
  selector: 'd-datatable-demo-resizeable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./data-table-demo.component.scss'],
  templateUrl: './data-table-demo-resizeable.component.html'
})

export class DatatableDemoResizeableComponent implements OnInit, AfterContentInit {
  @ViewChild('detailTemplateRef', { static: true }) detailTemplateRef: ElementRef;
  hideColumn = [];
  hideColumnOptions = [];
  // Lazy Load
  total = 20;
  next = 1;
  complete = false;
  showSortIcon = true;
  lazyDataSource = [];
  loading: LoadingType;
  showFilterWin = false;
  resizeableDataSource: Array<SourceType> = pagerSource.slice(0, 6);
  selectedTitle = [
    {
      name: 'firstName',
      selected: false
    },
    {
      name: 'lastName',
      selected: false
    },
    {
      name: 'gender',
      selected: false
    },
    {
      name: 'dob',
      selected: false
    }
  ];

  // Pagination Setting
  pager = {
    total: 12,
    pageSize: 6,
    componentSize: 'sm'
  };

  // Column Render
  columnDefs = [{
    render: (data, row) => {
      return data + '(' + row['firstName'] + ')';
    },
    target: 'lastName'
  }];

  multiSort = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.loading = Observable.create((function (observer) {
      if (this.complete) {
        observer.onNext(this.complete);
        observer.onCompleted();
      }
    }).bind(this));
  }

  ngAfterContentInit() {
    this.resizeableDataSource[0]['expandConfig'] = { expandTemplateRef: this.detailTemplateRef };
  }

  ChangeIcon() {
    this.showSortIcon = !this.showSortIcon;
  }

  detailToggle($event) {
    console.log('detail toggle', $event);
  }


  changePageContent($event) {
    this.resizeableDataSource = pagerSource.slice(($event.pageIndex - 1) * $event.pageSize, $event.pageIndex * $event.pageSize - 1);
  }



  multiSortChange(multiSort) {
    this.multiSort = multiSort;
    console.log('multiSort selected', multiSort);
  }

  updateHideColumn() {
    const hideColumnTmp = [];
    this.selectedTitle.forEach((title) => {
      if (title.selected) {
        hideColumnTmp.push(title.name);
      }
    });
    this.hideColumn = hideColumnTmp;
  }

  onResize(event) {
    console.log(event);
  }

  ngOnInit() {
  }
}
