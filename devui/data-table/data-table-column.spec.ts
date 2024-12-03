import { ChangeDetectorRef, Component, DebugElement, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ng-devui/avatar';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DataTableComponent, DataTableHeadComponent, DataTableRowComponent, TableCheckOptions } from 'ng-devui/data-table';
import { DatepickerComponent, DatepickerModule } from 'ng-devui/datepicker';
import { DropDownMenuDirective, DropDownToggleDirective } from 'ng-devui/dropdown';
import { InputNumberComponent, InputNumberModule } from 'ng-devui/input-number';
import { SelectModule } from 'ng-devui/select';
import { TooltipModule } from 'ng-devui/tooltip';
import { LoadingType } from '..';
import { I18nModule } from '../i18n';
import { createMouseEvent } from '../utils/testing/event-helper';
import { DataTableModule } from './data-table.module';
import { SourceType, editableOriginSource, genderSource, originSource, treeDataSource } from './demo/mock-data';
const dataTableOptions = {
  columns: [
    {
      field: 'firstName',
      header: 'First Name',
      fieldType: 'text',
      sortable: true,
      order: 1,
    },
    {
      field: 'lastName',
      header: 'Last Name',
      fieldType: 'text',
      sortable: true,
      order: 2,
    },
    {
      field: 'gender',
      header: 'gender',
      fieldType: 'text',
      sortable: true,
      order: 3,
    },
    {
      field: 'dob',
      header: 'Date of birth',
      fieldType: 'date',
      sortable: true,
      order: 4,
    },
  ],
};

// column: basic & checkable
@Component({
  template: `
    <d-data-table
      #datatable
      [checkable]="checkable"
      [dataSource]="basicDataSource"
      [type]="'striped'"
      [checkOptions]="checkOptions"
      [generalRowHoveredData]="true"
    >
      <d-column field="$index" header="#" [width]="'50px'"></d-column>
      <d-column
        *ngFor="let colOption of dataTableOptions.columns"
        [field]="colOption.field"
        [header]="colOption.header"
        [fieldType]="colOption.fieldType"
        [order]="colOption.order"
        [width]="'150px'"
      >
      </d-column>
    </d-data-table>
  `,
})
class TestDataTableColumnBasicComponent {
  @ViewChild('datatable') datatable;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = dataTableOptions;
  checkable = false;
  checkTotalData = jasmine.createSpy('call totalData function');

  checkOptions: TableCheckOptions[] = [
    {
      label: '全选所有数据',
      onChecked: this.checkTotalData.bind(this),
    },
    {
      label: '全选当前页数据',
      onChecked: undefined,
    },
  ];
}

// column: checkable, sortable, filterable
@Component({
  template: `
    <d-data-table
      [dataSource]="sortableDataSource"
      [onlyOneColumnSort]="onlyOneColumnSort"
      [(multiSort)]="sortedColumn"
      (multiSortChange)="multiSortChange($event)"
      [scrollable]="true"
      [resizeable]="true"
      [showSortIcon]="true"
      [checkable]="true"
      [hideColumn]="hideColumn"
      (pageIndexChange)="changePageContent($event)"
      (resize)="onResize($event)"
      (cellClick)="cellClick($event)"
      (cellDBClick)="cellDBClick($event)"
      (rowDBClick)="rowDBClick($event)"
      (rowClick)="rowClick($event)"
    >
      <d-column field="$index" header="#" [width]="'50px'"></d-column>
      <d-column
        field="firstName"
        header="First Name"
        [sortable]="true"
        [width]="'150px'"
        [filterable]="true"
        [filterList]="filterList"
        [beforeFilter]="beforeFilter"
        (filterChange)="filterChangeMultiple($event)"
      ></d-column>
      <d-column
        field="lastName"
        header="Last Name"
        [sortable]="true"
        [width]="'150px'"
        [minWidth]="'100px'"
        [maxWidth]="'200px'"
        [filterable]="true"
        [filterList]="filterList2"
        [filterIconActive]="filterIconActive"
        [customFilterTemplate]="customFilterTemplate"
      ></d-column>
      <d-column field="gender" header="Gender" [sortable]="true" [width]="'100px'"></d-column>
      <d-column
        field="dob"
        header="Date of birth"
        [fieldType]="'date'"
        [extraOptions]="{ dateFormat: 'MM-dd-yyyy' }"
        [width]="'20000px'"
      ></d-column>
      <d-column field="hidden" header="hidden" [width]="'100px'">hidden</d-column>
    </d-data-table>
    <ng-template #customFilterTemplate let-filterList="filterListDisplay" let-dropdown="dropdown" let-column="column">
      <div class="custom-filter-content">
        <div class="filter-options">
          <div *ngFor="let item of checkboxList" class="checkbox-group">
            <d-checkbox
              [label]="item.lastName"
              [(ngModel)]="item.chosen"
              [labelTemplate]="myCheckbox"
              (change)="onCheckboxChange($event, item.lastName)"
            >
              <ng-template #myCheckbox let-label="label">
                <d-avatar [name]="label" [width]="16" [height]="16"></d-avatar>
                <span class="label-style">{{ label }}</span>
              </ng-template>
            </d-checkbox>
          </div>
        </div>
        <div class="line"></div>
        <div>
          <span class="button-style" style="border-right: 1px solid #e8f0fd; margin-left: 10px;" (click)="filterSource(dropdown)"
            >CONFIRM</span
          >
          <span class="button-style" (click)="cancelFilter(dropdown)">CANCEL</span>
        </div>
      </div>
    </ng-template>
  `,
})
class TestDataTableAdvancedColumnComponent implements OnInit {
  constructor(private ref: ChangeDetectorRef) {}

  @ViewChild(DataTableComponent) datatable: DataTableComponent;
  pagerSource = JSON.parse(JSON.stringify(originSource));
  sortableDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  onlyOneColumnSort = true;
  sortedColumn = [
    {
      field: 'lastName',
      direction: 'ASC',
    },
  ];
  filterList = [
    {
      name: 'Mark',
      value: 'Mark',
    },
    {
      name: 'Jacob',
      value: 'Jacob',
    },
    {
      name: 'Danni',
      value: 'Danni',
    },
    {
      name: 'green',
      value: 'green',
    },
    {
      name: 'po',
      value: 'po',
    },
    {
      name: 'john',
      value: 'john',
    },
  ];
  filterList2 = [
    {
      name: 'Clear',
      value: 'Clear',
    },
    {
      name: 'Male',
      value: 'Male',
    },
    {
      name: 'Female',
      value: 'Female',
    },
  ];
  filterListMulti = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  hideColumn = ['hidden'];
  total = 20;
  next = 1;
  complete = false;
  lazyDataSource = [];
  loading: LoadingType;
  checkboxList = [];
  allChecked = false;
  halfChecked = false;

  // record values to be test
  testCellClickEvent = null;
  testCellDbClickEvent = null;
  testRowClickEvent = null;
  testRowDblClickEvent = null;
  resizeEvent = null;

  multiSortChange = jasmine.createSpy('multi sort change');

  cellClick(e) {
    this.testCellClickEvent = e;
  }

  cellDBClick(e) {
    this.testCellDbClickEvent = e;
  }

  rowClick(e) {
    this.testRowClickEvent = e;
  }

  rowDBClick(e) {
    this.testRowDblClickEvent = e;
  }

  ngOnInit() {
    this.checkboxList = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  }

  changePageContent($event) {
    this.sortableDataSource = this.pagerSource.slice(($event.pageIndex - 1) * $event.pageSize, $event.pageIndex * $event.pageSize - 1);
  }

  onResize(event) {
    this.resizeEvent = event;
  }

  filterChangeMultiple($event) {
    const filterList = $event.map((item) => item.name);
    const dataDisplay = [];
    JSON.parse(JSON.stringify(originSource.slice(0, 6))).forEach((item) => {
      if (filterList.includes(item.firstName)) {
        dataDisplay.push(item);
      }
    });
    this.sortableDataSource = dataDisplay;
  }

  beforeFilter = (currentValue) => {
    this.filterListMulti = this.filterList;
    this.ref.detectChanges();
    return true;
  };

  getCheckedRows() {
    return this.datatable.getCheckedRows();
  }

  onCheckboxChange($event, name) {
    this.setHalfChecked();
  }

  setHalfChecked() {
    this.halfChecked = false;
    const chosen = this.checkboxList.filter((item) => item.chosen);
    if (chosen.length === this.checkboxList.length) {
      this.allChecked = true;
    } else if (chosen.length > 0) {
      this.halfChecked = true;
    } else {
      this.allChecked = false;
      this.halfChecked = false;
    }
  }
}

// column: edit
@Component({
  template: `
    <d-data-table
      #dataTable
      [dataSource]="basicDataSource"
      fixHeader="true"
      maxHeight="150px"
      (cellEditEnd)="thisCellEditEnd($event)"
      [scrollable]="true"
    >
      <d-column field="lastName" header="Last Name" [width]="'100px'" [editable]="true">
        <d-cell-edit>
          <ng-template let-rowItem="rowItem" let-column="column">
            <div class="customized-editor edit-padding-fix">
              <input class="devui-form-control" [(ngModel)]="rowItem[column.field]" maxlength="5" />
            </div>
          </ng-template>
        </d-cell-edit>
      </d-column>
      <d-column field="dob" header="Date of birth" [editable]="true" [width]="'150px'">
        <d-cell>
          <ng-template let-cellItem="cellItem">
            {{ cellItem | i18nDate : 'full' : false }}
          </ng-template>
        </d-cell>
        <d-cell-edit>
          <ng-template let-rowItem="rowItem" let-column="column">
            <form class="form-inline edit-padding-fix">
              <div class="devui-form-group">
                <div class="devui-input-group">
                  <input
                    class="devui-form-control search"
                    [name]="column.field"
                    [(ngModel)]="rowItem[column.field]"
                    dDatepicker
                    appendToBody
                    [dateFormat]="yyyy - MM - DD"
                    #datePicker="datepicker"
                    [showTime]="true"
                    [autoOpen]="true"
                  />
                  <div class="devui-input-group-addon" (click)="datePicker.toggle($event, true)">
                    <i class="icon icon-calendar"></i>
                  </div>
                </div>
              </div>
            </form>
          </ng-template>
        </d-cell-edit>
      </d-column>
      <d-column field="age" fieldType="number" header="Age" [width]="'100px'" [editable]="true">
        <d-cell-edit>
          <ng-template let-rowItem="rowItem" let-column="column">
            <div class="customized-editor edit-padding-fix">
              <d-input-number [(ngModel)]="rowItem[column.field]" class="input-number"></d-input-number>
            </div>
          </ng-template>
        </d-cell-edit>
      </d-column>
      <d-column field="gender" header="Gender" [width]="'100px'" [editable]="true">
        <d-cell>
          <ng-template let-cellItem="cellItem">
            {{ cellItem.label }}
          </ng-template>
        </d-cell>
        <d-cell-edit>
          <ng-template let-rowItem="rowItem" let-column="column">
            <div class="customized-editor edit-padding-fix">
              <d-select
                [options]="genderSource"
                isSearch="true"
                [filterKey]="'label'"
                autoFocus="true"
                toggleOnFocus="true"
                [(ngModel)]="rowItem[column.field]"
                (ngModelChange)="finishEdit()"
              >
                <ng-template let-option="option" let-filterKey="filterKey"> gender:{{ option[filterKey] }} </ng-template>
              </d-select>
            </div>
          </ng-template>
        </d-cell-edit>
      </d-column>
    </d-data-table>
  `,
})
class TestDataTableColumnEditComponent {
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;
  genderSource = genderSource;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(editableOriginSource.slice(0, 6)));

  thisCellEditEnd = jasmine.createSpy('cell edit end');

  finishEdit() {
    this.dataTable.cancelEditingStatus();
  }
}

// column: datatable with tree structure
@Component({
  template: `
    <d-data-table
      #dataTable
      [dataSource]="basicDataSource"
      [checkable]="true"
      [checkableRelation]="checkableRelation"
      [scrollable]="true"
      [loadChildrenTable]="loadChildrenTable"
      [loadAllChildrenTable]="loadAllChildrenTable"
    >
      <d-column [order]="1" field="title" header="title" [width]="'40%'" [nestedColumn]="true" [extraOptions]="extraOptions"></d-column>
      <d-column [order]="2" field="lastName" header="name" [width]="'20%'"></d-column>
      <d-column [order]="3" field="status" header="status" [width]="'20%'"></d-column>
      <d-column
        [order]="4"
        field="dob"
        header="date"
        [fieldType]="'date'"
        [extraOptions]="{ dateFormat: 'MM-dd-yyyy' }"
        [width]="'20%'"
      ></d-column>
    </d-data-table>
  `,
})
class TestDataTableColumnWithChildrenComponent {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(treeDataSource.slice(0, 6)));
}

// column: datatable multi header
@Component({
  template: `
    <d-data-table
      [type]="'striped'"
      [dataSource]="basicDataSource"
      [scrollable]="true"
      [resizeable]="resizable"
      [colDraggable]="colDraggable"
    >
      <d-column [order]="1" field="$index" header="#" [width]="'50px'"></d-column>
      <d-column
        [order]="3"
        field="firstName"
        header="First Name"
        [sortable]="true"
        [width]="'150px'"
        [advancedHeader]="[
          { header: 'Name', rowspan: 1, colspan: 2, $width: '300px' },
          { header: 'First Name', rowspan: 1, colspan: 1 }
        ]"
      >
      </d-column>
      <d-column
        [order]="5"
        field="lastName"
        header="Last Name"
        [sortable]="true"
        [width]="'150px'"
        [advancedHeader]="[
          { header: 'Name', rowspan: 1, colspan: 0 },
          { header: 'Last Name', rowspan: 1, colspan: 1 }
        ]"
      ></d-column>
      <d-column [order]="7" field="gender" header="Gender" [sortable]="true" [width]="'150px'"></d-column>
      <d-column
        [order]="2"
        field="dob"
        header="Date of birth"
        [fieldType]="'date'"
        [extraOptions]="{ dateFormat: 'MM-dd-yyyy' }"
        [width]="'200px'"
      ></d-column>
    </d-data-table>
  `,
})
class TestDataTableColumnMultiHeaderComponent {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  resizable = false;
  colDraggable = false;
}

// column: fix header
@Component({
  template: `
    <d-data-table
      #datatable1
      [dataSource]="maxHeightDataSource"
      fixHeader="true"
      maxHeight="400px"
      [scrollable]="true"
      [resizeable]="resizable"
    >
      <d-column field="$index" header="#" [width]="'100px'"></d-column>
      <d-column
        *ngFor="let colOption of dataTableOptions.columns"
        [field]="colOption.field"
        [header]="colOption.header"
        [sortable]="colOption.sortable"
        [fieldType]="colOption.fieldType"
        [width]="'150px'"
      >
      </d-column>
    </d-data-table>
  `,
})
class TestDataTableColumnFixHeaderComponent {
  resizable = false;
  dataTableOptions = dataTableOptions;
  maxHeightDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice()));
}

// column: column drag
@Component({
  template: `
    <d-data-table
      #datatable
      [dataSource]="basicDataSource"
      [fixHeader]="isHeaderFixed"
      colDraggable="true"
      maxHeight="400px"
      [scrollable]="true"
    >
      <d-column field="$index" header="#" [width]="'50px'"></d-column>
      <d-column
        *ngFor="let colOption of dataTableOptions.columns"
        [field]="colOption.field"
        [header]="colOption.header"
        [fieldType]="colOption.fieldType"
        [width]="'150px'"
      >
      </d-column>
    </d-data-table>
  `,
})
class TestDataTableColumnDragComponent {
  isHeaderFixed = false;
  dataTableOptions = dataTableOptions;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice()));
}

// expand row
@Component({
  template: `
    <d-data-table
      #dataTable
      [dataSource]="basicDataSource"
      [checkable]="true"
      [showExpandToggle]="true"
      [scrollable]="true"
      (detialToggle)="toggleChange($event)"
    >
      <d-column field="$index" header="#" [width]="'50px'"></d-column>
      <d-column field="firstName" header="First Name" [width]="'150px'"></d-column>
      <d-column field="lastName" header="Last Name" [width]="'150px'"></d-column>
      <d-column field="gender" header="Gender" [width]="'100px'"></d-column>
    </d-data-table>
    <ng-template #addSubRowContent let-rowIndex="rowIndex" let-rowItem="rowItem">
      <div class="edit-padding-fix">
        <div class="input-block">
          <input class="devui-form-control" [(ngModel)]="defaultRowData.firstName" placeholder="firstName" type="text" />
        </div>
        <div class="input-block">
          <input class="devui-form-control" [(ngModel)]="defaultRowData.lastName" placeholder="lastName" type="text" />
        </div>
      </div>
    </ng-template>
  `,
})
class TestDataTableExpandComponent implements OnInit {
  @ViewChild('addSubRowContent', { static: true }) addSubRowContent: ElementRef;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  defaultRowData = {
    firstName: '',
    lastName: '',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  };
  toggleChange = jasmine.createSpy('detail content toggle change');
  ngOnInit() {
    this.basicDataSource[0].$expandConfig = { expand: false, expandTemplateRef: this.addSubRowContent };
    (this.basicDataSource[1] as any).$isDetailOpen = true;
    this.basicDataSource[1].detail = 'show detail';
  }
}

describe('data-table column', () => {
  describe('basic & checkable', () => {
    let fixture: ComponentFixture<TestDataTableColumnBasicComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableColumnBasicComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, I18nModule, NoopAnimationsModule],
        declarations: [TestDataTableColumnBasicComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableColumnBasicComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should create correctly', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should mouse enter/leave change row hovered to be true/false', () => {
      fixture.detectChanges();
      const tbodyRows = debugEl.queryAll(By.directive(DataTableRowComponent));
      let item = tbodyRows[0].componentInstance;
      expect(item.rowItem.$hovered).toBeFalsy();
      expect(tbodyRows.length).toBe(component.basicDataSource.length);

      tbodyRows[0].nativeElement.dispatchEvent(new Event('mouseenter'));
      item = tbodyRows[0].componentInstance;
      expect(item.rowItem.$hovered).toBeTruthy();

      tbodyRows[0].nativeElement.dispatchEvent(new Event('mouseleave'));
      item = tbodyRows[0].componentInstance;
      expect(item.rowItem.$hovered).toBeFalsy();
    });

    it('should checkable bind function onRowCheckChange work', fakeAsync(() => {
      component.checkable = true;
      fixture.detectChanges();
      const tbodyRows = debugEl.queryAll(By.directive(DataTableRowComponent));
      let item = tbodyRows[0].componentInstance;
      expect(item.rowItem.$checked).toBeFalsy();

      const checkBoxElRow1 = tbodyRows[0].query(By.css('.devui-checkable-cell label'));
      checkBoxElRow1.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      item = tbodyRows[0].componentInstance;
      expect(item.rowItem.$checked).toBeTruthy();

      checkBoxElRow1.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      item = tbodyRows[0].componentInstance;
      expect(item.rowItem.$checked).toBeFalsy();
    }));

    it('should check all change header checkbox status to checked', fakeAsync(() => {
      component.checkable = true;
      fixture.detectChanges();
      const tbodyRows = debugEl.queryAll(By.directive(DataTableRowComponent));

      let checkBoxEl;
      for (let i = 0; i < tbodyRows.length; i++) {
        checkBoxEl = tbodyRows[i].query(By.css('.devui-checkable-cell label'));
        checkBoxEl.nativeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }
      tick(); // wait for head change
      fixture.detectChanges();

      const headerRowDebugEl = debugEl.query(By.directive(DataTableHeadComponent));
      const headerCheckBox = headerRowDebugEl.query(By.css('.devui-checkable-cell label input'));
      expect(headerCheckBox.properties.checked).toBeTruthy();
    }));

    it('should header checked will check all body checkbox', fakeAsync(() => {
      component.checkable = true;
      fixture.detectChanges();
      const headerRowDebugEl = debugEl.query(By.directive(DataTableHeadComponent));
      const headerCheckBoxLabel = headerRowDebugEl.query(By.css('.devui-checkable-cell label'));
      headerCheckBoxLabel.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const tbodyRows = debugEl.queryAll(By.directive(DataTableRowComponent));
      for (let i = 0; i < tbodyRows.length; i++) {
        expect(tbodyRows[i].componentInstance.rowItem.$checked).toBeTruthy();
      }
    }));

    it('should change column order', fakeAsync(() => {
      fixture.detectChanges();
      component.dataTableOptions.columns[0].order = 5;
      fixture.detectChanges();
      flush();
      const thTitle = debugEl.query(By.css('table th:nth-child(5) span.title span'));
      expect(thTitle.nativeElement.textContent).toEqual('#');
    }));

    it('should set header checkOptions work', fakeAsync(() => {
      component.checkable = true;
      fixture.detectChanges();
      const dropdownElement = debugEl.query(By.css('table .devui-checkable-cell .select-options'));
      dropdownElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false, cancelable: false }));
      fixture.detectChanges();
      tick(50); // debounce time
      fixture.detectChanges();
      tick(); // animation time
      fixture.detectChanges();
      const dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
      expect(dropdownMenuElement).toBeTruthy();
      const items = dropdownMenuElement.nativeElement.querySelectorAll('ul.devui-dropdown-menu li');
      items[0].dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(component.checkTotalData).toHaveBeenCalled();
    }));
  });

  describe('advanced', () => {
    let fixture: ComponentFixture<TestDataTableAdvancedColumnComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableAdvancedColumnComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, FormsModule, CheckBoxModule, TooltipModule, AvatarModule, NoopAnimationsModule],
        declarations: [TestDataTableAdvancedColumnComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableAdvancedColumnComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    describe('hideColumn', () => {
      it('should data-table hide columns work', () => {
        component.hideColumn = [];
        fixture.detectChanges();
        let thList = debugEl.queryAll(By.css('table th'));
        expect(thList.length).toEqual(7);

        component.hideColumn = ['hidden', 'gender'];
        fixture.detectChanges();
        thList = debugEl.queryAll(By.css('table th'));
        expect(thList.length).toEqual(5);
      });
    });

    describe('sortable', () => {
      it('should sortable data-table created correctly', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });

      it('should sortable can be click', () => {
        fixture.detectChanges();
        const sortClickEl = debugEl.query(By.css('.devui-table thead tr th:nth-child(4) .sort-clickable'));
        let sortIcon = sortClickEl.query(By.css('.datatable-svg.sort-icon-asc'));
        expect(sortIcon).toBeTruthy();

        sortClickEl.nativeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        sortIcon = sortClickEl.query(By.css('.datatable-svg.sort-icon-desc'));
        expect(sortIcon).toBeTruthy();

        sortClickEl.nativeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        sortIcon = sortClickEl.query(By.css('.datatable-svg.sort-icon-asc'));
        expect(sortIcon).toBeNull();
        sortIcon = sortClickEl.query(By.css('.datatable-svg.sort-icon-desc'));
        expect(sortIcon).toBeNull();
        expect(component.multiSortChange).toHaveBeenCalledTimes(2);

        sortClickEl.nativeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        sortIcon = sortClickEl.query(By.css('.datatable-svg.sort-icon-asc'));
        expect(sortIcon).toBeTruthy();
      });

      it('should sortable can be change type', () => {
        // multi sort
        component.onlyOneColumnSort = false;
        fixture.detectChanges();
        const sortClickEl = debugEl.query(By.css('.devui-table thead tr th:nth-child(3) .sort-clickable'));
        sortClickEl.nativeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        const sortIcon = debugEl.query(By.css('.devui-table thead tr th:nth-child(4) .sort-clickable .datatable-svg.sort-icon-asc'));
        expect(sortIcon).toBeTruthy();
      });
    });

    describe('filterable', () => {
      it('should filterable click can work', fakeAsync(() => {
        fixture.detectChanges();
        let trs = debugEl.queryAll(By.css('table.devui-table tbody tr'));
        expect(trs.length).toBe(6);

        const filter = debugEl.query(By.css('table.devui-table thead th:nth-child(3) d-table-filter'));
        const dropDownDebugEl = filter.query(By.directive(DropDownToggleDirective));
        dropDownDebugEl.nativeElement.dispatchEvent(new Event('click'));
        tick();
        fixture.detectChanges();

        const filterDropDownMenu = debugEl.query(By.directive(DropDownMenuDirective));
        let filterContent = filterDropDownMenu.query(By.css('.data-table-column-filter-content.filter-bg'));
        expect(filterContent).toBeTruthy();
        flush();

        // select first three should work
        let checkBoxes = filterContent.queryAll(By.css('d-checkbox .devui-checkbox.unchecked label'));
        for (let i = 1; i < 4; i++) {
          checkBoxes[i].nativeElement.dispatchEvent(new Event('click'));
          tick();
          fixture.detectChanges();
        }

        let btnOK = filterContent.query(By.css('d-button.button-style'));
        btnOK.nativeElement.dispatchEvent(new Event('click'));
        tick();
        fixture.detectChanges();

        trs = debugEl.queryAll(By.css('table.devui-table tbody tr'));
        expect(trs.length).toBe(3);

        // select all should work
        dropDownDebugEl.nativeElement.dispatchEvent(new Event('click'));
        tick();
        fixture.detectChanges();
        filterContent = filterDropDownMenu.query(By.css('.data-table-column-filter-content.filter-bg'));
        expect(filterContent).toBeTruthy();
        flush();

        checkBoxes = filterContent.queryAll(By.css('d-checkbox .devui-checkbox label'));
        checkBoxes[0].nativeElement.dispatchEvent(new Event('click'));
        tick();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        btnOK = filterContent.query(By.css('d-button.button-style'));
        btnOK.nativeElement.dispatchEvent(new Event('click'));
        tick();
        fixture.detectChanges();

        trs = debugEl.queryAll(By.css('table.devui-table tbody tr'));
        expect(trs.length).toBe(6);
      }));
    });

    describe('resizable', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should resize bar appear', () => {
        expect(debugEl.query(By.css('.resize-bar'))).toBeFalsy();
        const resizeHandleEl = debugEl.query(By.css('table.devui-table thead .resize-handle'));
        resizeHandleEl.nativeElement.dispatchEvent(
          new MouseEvent('mousedown', {
            bubbles: true,
          })
        );
        fixture.detectChanges();
        expect(debugEl.query(By.css('.resize-bar'))).toBeTruthy();
      });

      it('should mouse move can resize the column width', fakeAsync(() => {
        let resizeHandleEl = debugEl.query(By.css('table.devui-table thead .resize-handle'));
        let idxHeaderCell = debugEl.query(By.css('table.devui-table thead th:nth-child(2)'));
        expect(idxHeaderCell.nativeElement.getBoundingClientRect().width).toEqual(50);

        const { x, y } = resizeHandleEl.nativeElement.getBoundingClientRect();
        resizeHandleEl.nativeElement.dispatchEvent(
          new MouseEvent('mousedown', {
            bubbles: true,
          })
        );
        fixture.detectChanges();

        document.dispatchEvent(createMouseEvent('mousemove', x, y));
        document.dispatchEvent(createMouseEvent('mouseup'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        // column expand
        resizeHandleEl = debugEl.query(By.css('table.devui-table thead .resize-handle'));
        let xHandled = resizeHandleEl.nativeElement.getBoundingClientRect().x;
        expect(xHandled).toBeCloseTo(2 * x, 0);
        idxHeaderCell = debugEl.query(By.css('table.devui-table thead th:nth-child(2)'));
        expect(idxHeaderCell.nativeElement.getBoundingClientRect().width).toBeCloseTo(50 + x, 0);
        expect(component.resizeEvent).not.toBeNull();
        component.resizeEvent = null; // re-initialize

        resizeHandleEl.nativeElement.dispatchEvent(
          new MouseEvent('mousedown', {
            bubbles: true,
          })
        );
        fixture.detectChanges();

        document.dispatchEvent(createMouseEvent('mousemove', -x, y));
        document.dispatchEvent(createMouseEvent('mouseup'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        resizeHandleEl = debugEl.query(By.css('table.devui-table thead .resize-handle'));
        xHandled = resizeHandleEl.nativeElement.getBoundingClientRect().x;
        expect(xHandled).toEqual(x);
        idxHeaderCell = debugEl.query(By.css('table.devui-table thead th:nth-child(2)'));
        expect(idxHeaderCell.nativeElement.getBoundingClientRect().width).toEqual(50);
        expect(component.resizeEvent).not.toBeNull();
      }));

      it('should last name can not exceed max width or less than min width', fakeAsync(() => {
        let lastNameColumn = debugEl.query(By.css('table.devui-table thead th:nth-child(4)'));
        expect(lastNameColumn.nativeElement.getBoundingClientRect().width).toEqual(150);

        let resizeElNearByLastNameCol = debugEl.query(By.css('table.devui-table thead th:nth-child(4) .resize-handle'));
        const y = resizeElNearByLastNameCol.nativeElement.getBoundingClientRect().y;
        resizeElNearByLastNameCol.nativeElement.dispatchEvent(
          new MouseEvent('mousedown', {
            bubbles: true,
          })
        );
        fixture.detectChanges();

        document.dispatchEvent(createMouseEvent('mousemove', 2000, y));
        document.dispatchEvent(createMouseEvent('mouseup'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        lastNameColumn = debugEl.query(By.css('table.devui-table thead th:nth-child(4)'));
        expect(lastNameColumn.nativeElement.getBoundingClientRect().width).toEqual(200);

        resizeElNearByLastNameCol = debugEl.query(By.css('table.devui-table thead th:nth-child(4) .resize-handle'));
        resizeElNearByLastNameCol.nativeElement.dispatchEvent(
          new MouseEvent('mousedown', {
            bubbles: true,
          })
        );
        fixture.detectChanges();

        document.dispatchEvent(createMouseEvent('mousemove', -2000, y));
        document.dispatchEvent(createMouseEvent('mouseup'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        lastNameColumn = debugEl.query(By.css('table.devui-table thead th:nth-child(4)'));
        expect(lastNameColumn.nativeElement.getBoundingClientRect().width).toEqual(100);
      }));
    });

    describe('click related', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should cell click work', fakeAsync(() => {
        const cellEl = debugEl.query(By.css('.devui-data-table .devui-table tbody tr td:nth-child(2)'));
        cellEl.nativeElement.dispatchEvent(new Event('mouseup'));
        flush();
        expect(component.testCellClickEvent).not.toBeNull();
      }));

      it('should cell double click work', fakeAsync(() => {
        const cellEl = debugEl.query(By.css('.devui-data-table .devui-table tbody tr td:nth-child(2)'));
        cellEl.nativeElement.dispatchEvent(new Event('dblclick'));
        flush();
        expect(component.testCellDbClickEvent).not.toBeNull();
      }));

      it('should row click work', fakeAsync(() => {
        const rowEl = debugEl.query(By.css('.devui-data-table .devui-table tbody tr'));
        rowEl.nativeElement.dispatchEvent(new Event('mouseup'));
        flush();
        expect(component.testRowClickEvent).not.toBeNull();
        fixture.detectChanges();
        component.testRowClickEvent = null;
        // click twice
        rowEl.nativeElement.dispatchEvent(new Event('mouseup'));
        rowEl.nativeElement.dispatchEvent(new Event('mouseup'));
        expect(component.testRowClickEvent).toBeNull();
        flush();
      }));

      it('should row dblclick work', fakeAsync(() => {
        const rowEl = debugEl.query(By.css('.devui-data-table .devui-table tbody tr'));
        rowEl.nativeElement.dispatchEvent(new Event('dblclick'));
        flush();
        expect(component.testRowDblClickEvent).not.toBeNull();
      }));
    });
  });

  describe('edit', () => {
    let fixture: ComponentFixture<TestDataTableColumnEditComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableColumnEditComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, DataTableModule, I18nModule, DatepickerModule, InputNumberModule, SelectModule, NoopAnimationsModule],
        declarations: [TestDataTableColumnEditComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableColumnEditComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should edit input display', fakeAsync(() => {
      fixture.detectChanges();
      const lastNameEditDebugEl = debugEl.query(By.css('.devui-table tbody tr .cell-editable'));
      lastNameEditDebugEl.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const inputDebugEl = debugEl.query(By.css('.customized-editor.edit-padding-fix > input'));
      expect(inputDebugEl).toBeTruthy();
      expect(inputDebugEl.nativeElement.value).toEqual(component.basicDataSource[0].lastName);
      inputDebugEl.nativeElement.value = 'testLastName';
      inputDebugEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // emit global click, finish edit
      document.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const firstLastNameDebugEl = debugEl.query(By.css('.devui-table tbody tr td'));
      expect(firstLastNameDebugEl.nativeElement.textContent).toEqual('testLastName');
    }));

    it('should edit date work', fakeAsync(() => {
      fixture.detectChanges();
      let dateColumnDebugEl = debugEl.query(By.css('.devui-table tbody tr td:nth-child(2) .cell-editable'));
      let dateText = dateColumnDebugEl.nativeElement.textContent.trim();
      expect(dateText.substr(0, 10)).toBe('1991-01-01');

      dateColumnDebugEl.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const datePicker = debugEl.query(By.directive(DatepickerComponent));
      expect(datePicker).toBeTruthy(); // date picker pop out

      const date = datePicker.query(By.css('table.devui-table tbody tr:nth-child(2) td'));
      date.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();

      const dateConfirmBtn = datePicker.query(By.css('table.devui-table tfoot button.devui-btn'));
      dateConfirmBtn.nativeElement.dispatchEvent(new Event('click'));
      tick(); // wait for click event
      fixture.detectChanges();
      tick(); // wait for date confirm
      fixture.detectChanges();

      document.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      dateColumnDebugEl = debugEl.query(By.css('.devui-table tbody tr td:nth-child(2) .cell-editable'));
      dateText = dateColumnDebugEl.nativeElement.textContent.trim();
      expect(dateText.substr(8, 2)).toBe(date.nativeElement.textContent);
    }));

    it('should edit input-number work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      let ageColumnDebugEl = debugEl.query(By.css('.devui-table tbody tr td:nth-child(3) .cell-editable'));
      let ageText = ageColumnDebugEl.nativeElement.textContent.trim();
      expect(ageText).toBe('24');

      ageColumnDebugEl.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick(); // wait for number display
      fixture.detectChanges();

      const inputNumberDebugEl = debugEl.query(By.directive(InputNumberComponent));
      const increaseBtn = inputNumberDebugEl.query(By.css('.input-control-inc'));
      increaseBtn.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick(); // wait for number change
      fixture.detectChanges();

      document.dispatchEvent(new Event('click'));
      flush();
      fixture.detectChanges();
      ageColumnDebugEl = debugEl.query(By.css('.devui-table tbody tr td:nth-child(3) .cell-editable'));
      ageText = ageColumnDebugEl.nativeElement.textContent.trim();
      expect(ageText).toBe('25');
    }));

    it('should scroll cancel edit status', fakeAsync(() => {
      fixture.detectChanges();
      const lastNameEditDebugEl = debugEl.query(By.css('.devui-table tbody tr .cell-editable'));
      lastNameEditDebugEl.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let inputDebugEl = debugEl.query(By.css('.customized-editor.edit-padding-fix > input'));
      expect(inputDebugEl).toBeTruthy();

      const scrollViewEl = debugEl.query(By.css('.devui-scrollbar.scroll-view'));
      scrollViewEl.nativeElement.scrollTop = 2;
      scrollViewEl.nativeElement.dispatchEvent(new Event('scroll'));
      tick();
      fixture.detectChanges();
      scrollViewEl.nativeElement.scrollTop = 45;
      scrollViewEl.nativeElement.dispatchEvent(new Event('scroll'));
      tick();
      fixture.detectChanges();

      inputDebugEl = debugEl.query(By.css('.customized-editor.edit-padding-fix > input'));
      expect(inputDebugEl).toBeFalsy();
    }));
  });

  describe('with children', () => {
    let fixture: ComponentFixture<TestDataTableColumnWithChildrenComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableColumnWithChildrenComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule],
        declarations: [TestDataTableColumnWithChildrenComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableColumnWithChildrenComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should set row child toggle status function work', fakeAsync(() => {
      let checkBoxes = debugEl.queryAll(By.css('tbody .devui-checkbox.unchecked'));
      let togglers = debugEl.queryAll(By.css('.childtable-toggler'));
      let togglersShow = togglers.filter((item) => item.nativeElement.style.visibility === 'visible');
      expect(checkBoxes.length).toBe(component.basicDataSource.length);
      expect(togglersShow.length).toBe(2);

      const childTableToggler = debugEl.query(By.css('.devui-data-table table.devui-table tbody tr td .childtable-toggler'));
      childTableToggler.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      checkBoxes = debugEl.queryAll(By.css('tbody .devui-checkbox.unchecked'));
      togglers = debugEl.queryAll(By.css('.childtable-toggler'));
      togglersShow = togglers.filter((item) => item.nativeElement.style.visibility === 'visible');
      expect(checkBoxes.length).toBe(component.basicDataSource.length + 2); // 展开的子元素2个
      expect(togglersShow.length).toBe(3);
    }));
  });

  describe('fix header', () => {
    let fixture: ComponentFixture<TestDataTableColumnFixHeaderComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableColumnFixHeaderComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, I18nModule, NoopAnimationsModule],
        declarations: [TestDataTableColumnFixHeaderComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableColumnFixHeaderComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should create correctly', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should scroll work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const scrollViewEl = debugEl.query(By.css('.devui-scrollbar.scroll-view'));
      expect(scrollViewEl).toBeTruthy();

      const { top: scrollViewTop } = scrollViewEl.nativeElement.getBoundingClientRect();

      let tbodyTrs = debugEl.queryAll(
        By.css('.devui-data-table .devui-table-view .devui-scrollbar.scroll-view table.devui-table tbody tr')
      );
      let { top: tr1Top, height: trHeight } = tbodyTrs[0].nativeElement.getBoundingClientRect();
      expect(scrollViewTop).toBe(tr1Top);

      // scroll one tr height
      scrollViewEl.nativeElement.scrollTop = trHeight;
      scrollViewEl.nativeElement.dispatchEvent(new Event('scroll'));
      tick();
      fixture.detectChanges();

      tbodyTrs = debugEl.queryAll(By.css('.devui-data-table .devui-table-view .devui-scrollbar.scroll-view table.devui-table tbody tr'));
      ({ top: tr1Top, height: trHeight } = tbodyTrs[0].nativeElement.getBoundingClientRect());
      expect(Math.round(scrollViewTop - trHeight)).toBe(Math.round(tr1Top));

      // scroll two tr height
      scrollViewEl.nativeElement.scrollTop = 2 * trHeight;
      scrollViewEl.nativeElement.dispatchEvent(new Event('scroll'));
      tick();
      fixture.detectChanges();

      tbodyTrs = debugEl.queryAll(By.css('.devui-data-table .devui-table-view .devui-scrollbar.scroll-view table.devui-table tbody tr'));
      ({ top: tr1Top } = tbodyTrs[0].nativeElement.getBoundingClientRect());
      expect(scrollViewTop - 2 * trHeight).toBeLessThanOrEqual(Math.round(tr1Top)); // touch bottom, maybe tr2 part visible
      expect(Math.round(tr1Top)).toBeLessThan(Math.round(scrollViewTop));
    }));

    it('should resize work', fakeAsync(() => {
      component.resizable = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const thsOfRow1 = debugEl.queryAll(By.css('table.devui-table thead tr:first-child th'));
      const resizeBarOfIdx = thsOfRow1[0].query(By.css('.resize-handle'));
      const { x: resizeBarX, y: resizeBarY } = resizeBarOfIdx.nativeElement.getBoundingClientRect();

      const idxWidth = thsOfRow1[0].nativeElement.getBoundingClientRect().width;

      const mouseDownEvt = createMouseEvent('mousedown', resizeBarX, resizeBarY);
      resizeBarOfIdx.nativeElement.dispatchEvent(mouseDownEvt);
      fixture.detectChanges();

      const mouseMoveEvt = createMouseEvent('mousemove', resizeBarX + 10, resizeBarY);
      document.dispatchEvent(mouseMoveEvt);
      flush();
      fixture.detectChanges();

      document.dispatchEvent(createMouseEvent('mouseup', resizeBarX + 10, resizeBarY));
      flush();
      fixture.detectChanges();

      const idxEl = debugEl.queryAll(By.css('table.devui-table thead tr:first-child th'))[0];
      const idxElWidth = idxEl.nativeElement.getBoundingClientRect().width;
      expect(idxWidth).toBeLessThan(idxElWidth);
    }));
  });

  describe('multi header', () => {
    let fixture: ComponentFixture<TestDataTableColumnMultiHeaderComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableColumnMultiHeaderComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, I18nModule, NoopAnimationsModule],
        declarations: [TestDataTableColumnMultiHeaderComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableColumnMultiHeaderComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should create correctly', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should have multi header', () => {
      fixture.detectChanges();
      const thsOfRow1 = debugEl.queryAll(By.css('table.devui-table thead tr:first-child th'));
      expect(thsOfRow1[0].nativeElement.getBoundingClientRect().height).toBe(thsOfRow1[1].nativeElement.getBoundingClientRect().height);
      expect(thsOfRow1[1].nativeElement.getBoundingClientRect().height).toBe(thsOfRow1[3].nativeElement.getBoundingClientRect().height);
      expect(Math.round(thsOfRow1[0].nativeElement.getBoundingClientRect().height)).toBe(
        Math.round(thsOfRow1[2].nativeElement.getBoundingClientRect().height * 2)
      );

      const thsOfRow2 = debugEl.queryAll(By.css('table.devui-table thead tr:last-child th'));
      const firstNameWidth = thsOfRow2[0].nativeElement.getBoundingClientRect().width;
      const lastNameWidth = thsOfRow2[1].nativeElement.getBoundingClientRect().width;
      const nameWidth = thsOfRow1[2].nativeElement.getBoundingClientRect().width;

      expect(Math.round(firstNameWidth + lastNameWidth)).toBe(Math.round(nameWidth));
    });

    it('should multi header normal header can be resize', fakeAsync(() => {
      component.resizable = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const thsOfRow1 = debugEl.queryAll(By.css('table.devui-table thead tr:first-child th'));
      const resizeBarOfIdx = thsOfRow1[0].query(By.css('.resize-handle'));
      const { x: resizeBarX, y: resizeBarY } = resizeBarOfIdx.nativeElement.getBoundingClientRect();

      const idxWidth = thsOfRow1[0].nativeElement.getBoundingClientRect().width;

      const mouseDownEvt = createMouseEvent('mousedown', resizeBarX, resizeBarY);
      resizeBarOfIdx.nativeElement.dispatchEvent(mouseDownEvt);
      fixture.detectChanges();

      const mouseMoveEvt = createMouseEvent('mousemove', resizeBarX + 10, resizeBarY);
      document.dispatchEvent(mouseMoveEvt);
      flush();
      fixture.detectChanges();

      document.dispatchEvent(createMouseEvent('mouseup', resizeBarX + 10, resizeBarY));
      flush();
      fixture.detectChanges();

      const idxEl = debugEl.queryAll(By.css('table.devui-table thead tr:first-child th'))[0];
      const idxElWidth = idxEl.nativeElement.getBoundingClientRect().width;
      expect(idxWidth).toBeLessThan(idxElWidth);
    }));

    it('should advanced headers parent is resizable', fakeAsync(() => {
      component.resizable = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let nameEl = debugEl.queryAll(By.css('table.devui-table thead tr:first-child th'))[2].nativeElement;
      const nameElWidth = nameEl.getBoundingClientRect().width;
      const lastNameColumnDebugEl = debugEl.queryAll(By.css('table.devui-table thead tr:last-child th'))[1];
      const lastNameResizeBar = lastNameColumnDebugEl.query(By.css('.resize-handle'));
      const { x: resizeBarX, y: resizeBarY } = lastNameResizeBar.nativeElement.getBoundingClientRect();

      const mouseDownEvt = createMouseEvent('mousedown', resizeBarX, resizeBarY);
      lastNameResizeBar.nativeElement.dispatchEvent(mouseDownEvt);
      fixture.detectChanges();

      const mouseMoveEvt = createMouseEvent('mousemove', resizeBarX + 40, resizeBarY);
      document.dispatchEvent(mouseMoveEvt);
      flush();
      fixture.detectChanges();

      document.dispatchEvent(createMouseEvent('mouseup', resizeBarX + 40, resizeBarY));
      flush();
      fixture.detectChanges();

      nameEl = debugEl.queryAll(By.css('table.devui-table thead tr:first-child th'))[2].nativeElement;
      const nameElResizeWidth = nameEl.getBoundingClientRect().width;
      expect(nameElWidth).toBeLessThan(nameElResizeWidth);
    }));

    it('should drag column work', fakeAsync(() => {
      component.colDraggable = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const headerDebugEl = debugEl.query(By.directive(DataTableHeadComponent));
      const dragIcon = headerDebugEl.query(By.css('th.sindu_handle.operable .header-container .drag-icon'));
      expect(dragIcon).toBeTruthy();
    }));
  });

  describe('drag header', () => {
    let fixture: ComponentFixture<TestDataTableColumnDragComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableColumnDragComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, NoopAnimationsModule],
        declarations: [TestDataTableColumnDragComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableColumnDragComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should create correctly', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should header can be drag', fakeAsync(() => {
      fixture.detectChanges();
      headerDrag(fixture);
    }));

    it('should fixed header can be drag', fakeAsync(() => {
      component.isHeaderFixed = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      headerDrag(fixture);
    }));
  });

  describe('expand detail', () => {
    let fixture: ComponentFixture<TestDataTableExpandComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableExpandComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, NoopAnimationsModule, FormsModule],
        declarations: [TestDataTableExpandComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableExpandComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should create correctly', () => {
      fixture.detectChanges();
      const detailCell = debugEl.query(By.css('table.devui-table tbody tr td.devui-detail-cell'));
      expect(detailCell).toBeTruthy();
    });

    it('should show detail when click icon', fakeAsync(() => {
      fixture.detectChanges();
      const detailCell = debugEl.query(By.css('table.devui-table tbody tr td.devui-detail-cell div'));
      detailCell.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(component.toggleChange).toHaveBeenCalled();
      const svgIcon = detailCell.nativeElement.querySelector('svg');
      expect(svgIcon).toBeTruthy();
      // test other detail row
      fixture.detectChanges();
      const detailCell2 = debugEl.query(By.css('table.devui-table tbody tr:nth-child(3) td.devui-detail-cell div'));
      detailCell2.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(component.toggleChange).toHaveBeenCalled();
    }));
  });
});

function headerDrag(fixture: ComponentFixture<TestDataTableColumnDragComponent>) {
  const debugEl = fixture.debugElement;
  let dHeaderCells = debugEl.queryAll(By.css('.devui-data-table table.devui-table thead tr th'));
  expect(dHeaderCells[1].nativeElement.textContent).toContain('First Name');
  expect(dHeaderCells[2].nativeElement.textContent).toContain('Last Name');

  const columnFirstNameDragIcon = dHeaderCells[1].query(By.css('.drag-icon'));
  columnFirstNameDragIcon.nativeElement.style.visibility = 'visible';

  const { x: fromX, y: fromY } = columnFirstNameDragIcon.nativeElement.getBoundingClientRect();
  const { x: moveToX, y: moveToY, width, height } = dHeaderCells[2].nativeElement.getBoundingClientRect();
  const mouseDownEvt = createMouseEvent('mousedown', fromX, fromY);
  const mouseMoveEvt = createMouseEvent('mousemove', moveToX + width, moveToY + height / 2);
  const mouseUpEvt = createMouseEvent('mouseup');
  columnFirstNameDragIcon.nativeElement.dispatchEvent(mouseDownEvt);
  tick(); // emit onTap, setTimeout: wait for mousemove & mouseup addEventListener
  document.documentElement.dispatchEvent(mouseMoveEvt); // emit handleMouseMove, add event listener to grab
  tick();
  document.documentElement.dispatchEvent(mouseDownEvt); // emit grab
  tick(); // add event listener mouse move
  document.documentElement.dispatchEvent(mouseMoveEvt); // emit startBecauseMouseMoved
  tick();
  document.documentElement.dispatchEvent(mouseMoveEvt); // emit drag
  tick();
  document.documentElement.dispatchEvent(mouseUpEvt); // emit release
  flush();
  fixture.detectChanges();
  dHeaderCells = debugEl.queryAll(By.css('.devui-data-table table.devui-table thead tr th'));
  expect(dHeaderCells[1].nativeElement.textContent).toContain('Last Name');
  expect(dHeaderCells[2].nativeElement.textContent).toContain('First Name');
}
