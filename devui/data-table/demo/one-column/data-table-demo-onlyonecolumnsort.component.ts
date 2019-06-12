import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { DataTableComponent, LoadingType } from 'ng-devui';
import { EMPTY } from 'rxjs';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'ave-datatable-demo-onlyonecolumnsort',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-table-demo-onlyonecolumnsort.component.html'
})
export class DatatableDemoOnlyOneColumnSortComponent implements OnInit {
  @HostBinding('attr.ave-ui') aveUi = true;
    sortableDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
    multiSort = [];
    sortedColumn = [];

     total = 20;
   next = 1;
   complete = false;
   lazyDataSource = [];
   loading: LoadingType;

    loadMore(datatable: DataTableComponent) {
        if (this.next > this.total) {
            return;
        }

        const end = this.next + 20;
        const dataSource = [];
        for (; this.next < end; this.next++) {
            dataSource.push({
                firstName: 'Danni',
                lastName: 'Yu',
                gender: 'Female',
                dob: new Date(1991, 3, 1),
                detail: '这是另外一个行详情'
            });
        }
        this.lazyDataSource = this.lazyDataSource.concat(dataSource);
        this.complete = this.next > this.total;
        datatable.loadFinish(this.complete);
        if (this.complete) {
            this.loading = EMPTY;
        }
        console.log(`load more`, this.next, this.complete);
    }

    multiSortChange(multiSort) {
        this.multiSort = multiSort;
        console.log('multiSort selected', multiSort);
    }


    ngOnInit() {
    }
}
