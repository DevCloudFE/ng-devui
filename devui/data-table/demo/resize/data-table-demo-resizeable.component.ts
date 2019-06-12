import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DataTableComponent, LoadingType } from 'ng-devui';
import { EMPTY, Observable } from 'rxjs';
import { originSource, SourceType } from '../mock-data';

const pagerSource = JSON.parse(JSON.stringify(originSource));

@Component({
    selector: 'ave-datatable-demo-resizeable',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./data-table-demo.component.scss'],
    templateUrl: './data-table-demo-resizeable.component.html'
})

export class DatatableDemoResizeableComponent implements OnInit {

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
            name: 'index',
            selected: false
        },
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
        this.loading = new Observable((function (observer) {
            if (this.complete) {
                observer.onNext(this.complete);
                observer.onCompleted();
            }
        }).bind(this));
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

    updateHideColumn($event, title) {
         const role = title.name;
         title.selected = $event;

        if (role.length > 0 && $event === true) {
             this.hideColumnOptions.push(role);
        } else {
            this.hideColumnOptions.splice(this.hideColumnOptions.indexOf(role), 1);
        }

        // 将index转换成$index;
        const hideCoumn = [...this.hideColumnOptions];
        if (this.hideColumnOptions.indexOf('index') !== -1) {
            hideCoumn[this.hideColumnOptions.indexOf('index')] = '$index';
        }
        this.hideColumn = hideCoumn;
    }

    @HostListener('click', ['$event'])
    onClick(event) {
        if (event.target.id === 'setRoleFilter') {
           this.showFilterWin = !this.showFilterWin;
            return;
        }

        if (!(event.target.id === 'filter_box' || event.target.closest('#filter_box'))) {
             this.showFilterWin = false;
            return;
        }
    }

    onResize(event) {
        console.log(event);
    }

    ngOnInit() {
    }
}
