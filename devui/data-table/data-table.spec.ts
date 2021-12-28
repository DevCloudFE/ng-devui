import {
  ChangeDetectorRef,
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CheckBoxModule } from 'ng-devui/checkbox';
import {
  DataTableComponent,
  EditableTip,
  TableCheckOptions,
  TableWidthConfig
} from 'ng-devui/data-table';
import { DatepickerModule } from 'ng-devui/datepicker';
import {
  DropDownMenuDirective,
  DropDownModule
} from 'ng-devui/dropdown';
import { InputNumberModule } from 'ng-devui/input-number';
import { SelectModule } from 'ng-devui/select';
import { TooltipModule } from 'ng-devui/tooltip';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { I18nModule } from '../i18n';
import { DomHelper } from '../utils/testing/dom-helper';
import { DataTableModule } from './data-table.module';
import {
  editableOriginSource,
  genderSource,
  originSource,
  SourceType,
  treeDataSource
} from './demo/mock-data';

// basic
@Component({
  template: `
    <d-data-table
      #tableComp
      [dataSource]="basicDataSource"
      [scrollable]="scrollable"
      [checkable]="checkable"
      [type]="'striped'"
      [tableWidthConfig]="tableWidthConfig"
    >
      <thead dTableHead>
        <tr dTableRow>
          <th dHeadCell>#</th>
          <th dHeadCell *ngFor="let colOption of dataTableOptions.columns">{{ colOption.header }}</th>
        </tr>
      </thead>
      <tbody dTableBody>
        <ng-template let-rowItem="rowItem" let-rowIndex="rowIndex">
          <tr dTableRow>
            <td dTableCell>{{ rowIndex + 1 }}</td>
            <td dTableCell *ngFor="let colOption of dataTableOptions.columns">
              {{ colOption.fieldType === 'date' ? (rowItem[colOption.field] | i18nDate: 'short':false) : rowItem[colOption.field] }}
            </td>
          </tr>
        </ng-template>
      </tbody>
    </d-data-table>
  `,
})
class TestDataTableBasicComponent {
  @ViewChild('tableComp') tableComp;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  tableWidthConfig: TableWidthConfig[] = [
    {
      field: '#',
      width: '50px',
    },
    {
      field: 'firstName',
      width: '150px',
    },
    {
      field: 'lastName',
      width: '150px',
    },
    {
      field: 'gender',
      width: '150px',
    },
    {
      field: 'dob',
      width: '150px',
    },
  ];
  dataTableOptions = {
    columns: [
      {
        field: 'firstName',
        header: 'First Name',
        fieldType: 'text',
      },
      {
        field: 'lastName',
        header: 'Last Name',
        fieldType: 'text',
      },
    ],
  };
  checkable = false;
  checkAllChange = jasmine.createSpy('check all change');
}

// data-table: checkable, sortable, filterable
@Component({
  template: `
    <d-data-table [dataSource]="sortableDataSource" [scrollable]="true" [tableWidthConfig]="tableWidthConfig" [onlyOneColumnSort]="true">
      <thead dTableHead [checkable]="true" [checkOptions]="checkOptions">
        <tr dTableRow>
          <th dHeadCell>#</th>
          <th
            dHeadCell
            [filterable]="true"
            [filterList]="filterList"
            [beforeFilter]="beforeFilter"
            (filterChange)="onFirstFilterChange($event)"
            [resizeEnabled]="true"
            (resizeEndEvent)="onResize($event, 'firstName')"
          >
            First Name
          </th>
          <th
            dHeadCell
            [minWidth]="'100px'"
            [maxWidth]="'200px'"
            [sortable]="true"
            [sortDirection]="lastNameSortDirection"
            (sortChange)="onSortChange($event, 'lastName')"
            [filterable]="true"
            [filterList]="filterList2"
            [filterIconActive]="filterIconActive"
            [customFilterTemplate]="customFilterTemplate"
            [resizeEnabled]="true"
            (resizeEndEvent)="onResize($event, 'lastName')"
          >
            Last Name
          </th>
          <th
            dHeadCell
            [sortable]="true"
            [sortDirection]="genderSortDirecticon"
            (sortChange)="onSortChange($event, 'Gender')"
            [filterable]="true"
            [filterMultiple]="false"
            [filterList]="filterListRadio"
            (filterChange)="filterChangeRadio($event)"
          >
            Gender
          </th>
          <th dHeadCell>Date of birth</th>
        </tr>
      </thead>
      <tbody dTableBody>
        <ng-template let-rowItem="rowItem" let-rowIndex="rowIndex" let-nestedIndex="nestedIndex">
          <tr dTableRow [ngClass]="{ 'table-row-selected': rowItem.$checked }">
            <td dTableCell class="devui-checkable-cell">
              <d-checkbox
                [ngModelOptions]="{ standalone: true }"
                (ngModelChange)="onRowCheckChange($event, rowIndex, nestedIndex, rowItem)"
                [ngModel]="rowItem.$checked"
                [halfchecked]="rowItem.$halfChecked"
                [disabled]="rowItem.$checkDisabled"
                dTooltip
                [content]="rowItem.$checkBoxTips"
                [position]="['top', 'right', 'bottom', 'left']"
                [showAnimation]="false"
              >
              </d-checkbox>
            </td>
            <td dTableCell>{{ rowItem?.id }}</td>
            <td dTableCell>
              <span *ngIf="!rowItem.firstNameEdit">{{ rowItem?.firstName }}</span>
              <input *ngIf="rowItem.firstNameEdit" [(ngModel)]="rowItem.firstName" type="text" />
            </td>
            <td dTableCell>{{ rowItem?.lastName }}</td>
            <td dTableCell>{{ rowItem?.gender }}</td>
            <td dTableCell>{{ rowItem?.dob | i18nDate: 'short':false }}</td>
          </tr>
        </ng-template>
      </tbody>
    </d-data-table>
  `,
})
class TestDataTableAdvancedComponent {
  @ViewChild(DataTableComponent) datatable: DataTableComponent;
  sortableDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  filterListMulti = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  filterList = [
    {
      name: 'Mark',
      value: 'Mark'
    },
    {
      name: 'Jacob',
      value: 'Jacob'
    },
    {
      name: 'Danni',
      value: 'Danni'
    }
  ];
  filterList2 = [
    {
      name: 'Clear',
      value: 'Clear'
    },
    {
      name: 'Male',
      value: 'Male'
    },
    {
      name: 'Female',
      value: 'Female'
    }
  ];
  filterListRadio = [
    {
      name: 'Clear',
      value: 'Clear',
    }, {
      name: 'Male',
      value: 'Male',
    }, {
      name: 'Female',
      value: 'Female',
    }
  ];

  onSortChange = jasmine.createSpy('on sort change');
  checkTotalData = jasmine.createSpy('call totalData function');

  checkOptions: TableCheckOptions[] = [
    {
      label: '全选所有数据',
      onChecked: this.checkTotalData.bind(this)
    },
    {
      label: '全选当前页数据',
      onChecked: undefined
    }
  ];

  constructor(private ref: ChangeDetectorRef) {}

  beforeFilter = (currentValue) => {
    this.filterListMulti = this.filterList;
    this.ref.detectChanges();
    return true;
  };

  onRowCheckChange(checked, rowIndex, nestedIndex, rowItem) {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked,
    });
  }
}

// data-table: edit
@Component({
  template: `
    <d-data-table #dataTable [dataSource]="basicDataSource" (cellEditEnd)="thisCellEditEnd($event)" [scrollable]="true">
      <thead dTableHead>
        <tr dTableRow>
          <th dHeadCell>Last Name</th>
          <th dHeadCell>Date of birth</th>
          <th dHeadCell>Age</th>
          <th dHeadCell>Gender</th>
        </tr>
      </thead>
      <tbody dTableBody>
        <ng-template let-rowItem="rowItem" let-rowIndex="rowIndex">
          <tr dTableRow>
            <td dTableCell [editable]="true" [editableTip]="editableTip" [beforeEditStart]="beforeEditStart"
            [beforeEditEnd]="beforeEditEnd" (editStatusEvent)="onEditing($event, rowItem, 'nameEdit')">
              <span *ngIf="!rowItem['nameEdit']">{{ rowItem?.lastName }}</span>
              <form *ngIf="rowItem['nameEdit']" class="form-inline edit-padding-fix">
                <div class="devui-form-group">
                  <div class="devui-input-group">
                    <input
                      class="devui-form-control"
                      name="lastname"
                      [(ngModel)]="rowItem.lastName"
                      [attr.maxlength]="100"
                      [attr.minlength]="3"
                    />
                  </div>
                </div>
              </form>
            </td>
            <td dTableCell [editable]="true" (editStatusEvent)="onEditing($event, rowItem, 'dateEdit')">
              <span *ngIf="!rowItem['dateEdit']">{{ rowItem?.dob | i18nDate: 'short':false }}</span>
              <form *ngIf="rowItem['dateEdit']" class="form-inline edit-padding-fix">
                <div class="devui-form-group">
                  <div class="devui-input-group devui-dropdown-origin">
                    <input
                      class="devui-form-control search"
                      name="date"
                      [(ngModel)]="rowItem.dob"
                      dDatepicker
                      appendToBody
                      #datePicker="datepicker"
                      [autoOpen]="true"
                      (ngModelChange)="dateEditEnd(rowItem)"
                    />
                    <div class="devui-input-group-addon" (click)="datePicker.toggle($event, true)">
                      <i class="icon icon-calendar"></i>
                    </div>
                  </div>
                </div>
              </form>
            </td>
            <td dTableCell [editable]="true" (editStatusEvent)="onEditing($event, rowItem, 'ageEdit')">
              <span class="input-number" *ngIf="!rowItem['ageEdit']">{{ rowItem?.age }}</span>
              <div *ngIf="rowItem['ageEdit']" class="edit-padding-fix">
                <d-input-number [(ngModel)]="rowItem.age"></d-input-number>
              </div>
            </td>
            <td dTableCell [editable]="true" (editStatusEvent)="onEditing($event, rowItem, 'genderEdit')">
              <span *ngIf="!rowItem['genderEdit']">{{ rowItem?.gender?.label }}</span>
              <div *ngIf="rowItem['genderEdit']" class="customized-editor edit-padding-fix">
                <d-select
                  [options]="genderSource"
                  isSearch="true"
                  [filterKey]="'label'"
                  autoFocus="true"
                  toggleOnFocus="true"
                  [appendToBody]="true"
                  [(ngModel)]="rowItem.gender"
                  (ngModelChange)="genderEditEnd(rowItem)"
                >
                  <ng-template let-option="option" let-filterKey="filterKey"> gender:{{ option[filterKey] }} </ng-template>
                </d-select>
              </div>
            </td>
          </tr>
        </ng-template>
      </tbody>
    </d-data-table>
  `,
})
class TestDataTableEditComponent {
  genderSource = genderSource;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(editableOriginSource.slice(0, 6)));

  editableTip = EditableTip.btn;

  thisCellEditEnd = jasmine.createSpy('cellEditEnd');

  onEditing(editing, rowItem, editField) {
    rowItem[editField] = editing;
  }

  beforeEditStart = (rowItem, field): Boolean | Promise<boolean> | Observable<boolean> => {
    return Promise.resolve(true);
  };

  beforeEditEnd = (rowItem, field): Boolean | Promise<boolean> | Observable<boolean> => {
    return Promise.resolve(true);
  };
}

// data-table: has children
@Component({
  template: `
    <d-data-table
      #comp
      [dataSource]="basicDataSource"
      [checkableRelation]="checkableRelation"
      [tableWidthConfig]="tableWidthConfig"
      [loadChildrenTable]="loadChildrenTable"
      [loadAllChildrenTable]="loadAllChildrenTable"
      [scrollable]="true"
    >
      <thead dTableHead [checkable]="true">
        <tr dTableRow>
          <th dHeadCell [nestedColumn]="true" [iconFoldTable]="iconParentOpen" [iconUnFoldTable]="iconParentClose">title</th>
          <th dHeadCell>name</th>
        </tr>
      </thead>
      <tbody dTableBody>
        <ng-template let-rowItem="rowItem" let-rowIndex="rowIndex" let-nestedLayer="nestedLayer" let-nestedIndex="nestedIndex">
          <tr dTableRow [ngClass]="{ 'table-row-selected': rowItem.$checked }">
            <td dTableCell class="devui-checkable-cell">
              <d-checkbox
                [ngModelOptions]="{ standalone: true }"
                [ngModel]="rowItem.$checked"
                [halfchecked]="rowItem.$halfChecked"
                [disabled]="rowItem.$checkDisabled"
                (ngModelChange)="onRowCheckChange($event, rowIndex, nestedIndex, rowItem)"
                dTooltip
                [content]="rowItem.$checkBoxTips"
                [position]="['top', 'right', 'bottom', 'left']"
                [showAnimation]="false"
              >
              </d-checkbox>
            </td>
            <td
              dTableCell
              [nestedColumn]="true"
              [rowItem]="rowItem"
              [nestedLayer]="nestedLayer"
              [iconFoldTable]="iconParentOpen"
              [iconUnFoldTable]="iconParentClose"
              (toggleChildTableEvent)="onChildTableToggle($event, rowItem)"
            >
              {{ rowItem['title'] }}
            </td>
            <td dTableCell>{{ rowItem['lastName'] }}</td>
          </tr>
        </ng-template>
      </tbody>
    </d-data-table>
  `,
})
class TestDataTableWithChildrenComponent {
  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'checkbox',
      width: '4%',
    },
    {
      field: 'title',
      width: '60%',
    },
    {
      field: 'lastName',
      width: '46%',
    },
  ];
  @ViewChild('comp') comp: DataTableComponent;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(treeDataSource.slice(0, 6)));
  childTableToggleEvent = null;
  childTableToggleRow = null;

  loadAllChildrenTable = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.basicDataSource[0].children[0].children[1].children[0].children = [];
        this.basicDataSource[0].children[0].children[1].children[0].children.push(
          {
            title: 'table title01211',
            lastName: 'Mark',
            status: 'done',
            dob: new Date(1989, 1, 1),
          },
          {
            title: 'table title01212',
            lastName: 'Mark',
            status: 'done',
            dob: new Date(1991, 3, 1),
          }
        );
        resolve(undefined);
      }, 500);
    });
  };

  onChildTableToggle(event, rowItem) {
    this.childTableToggleEvent = event;
    this.childTableToggleRow = rowItem;
  }
}

// data-table: multi header
@Component({
  template: `
    <d-data-table [type]="'striped'" [scrollable]="true" [tableWidthConfig]="tableWidthConfig" [dataSource]="basicDataSource">
      <thead dTableHead>
        <tr dTableRow>
          <th dHeadCell rowspan="2">#</th>
          <th dHeadCell rowspan="2">Date of birth</th>
          <th dHeadCell colspan="2" [style.textAlign]="'center'">Name</th>
          <th dHeadCell rowspan="2" [sortable]="true">Gender</th>
        </tr>
        <tr dTableRow>
          <th dHeadCell [sortable]="true">First Name</th>
          <th dHeadCell [sortable]="true">Last Name</th>
        </tr>
      </thead>
      <tbody dTableBody>
        <ng-template let-rowItem="rowItem" let-rowIndex="rowIndex">
          <tr dTableRow>
            <td dTableCell>{{ rowIndex + 1 }}</td>
            <td dTableCell>{{ rowItem['dob'] | i18nDate: 'short':false }}</td>
            <td dTableCell>{{ rowItem['firstName'] }}</td>
            <td dTableCell>{{ rowItem['lastName'] }}</td>
            <td dTableCell>{{ rowItem['gender'] }}</td>
          </tr>
        </ng-template>
      </tbody>
    </d-data-table>
  `,
})
class TestDataTableMultiHeaderComponent {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
}

// data-table: fixed column
@Component({
  template: `
    <d-data-table [dataSource]="basicDataSource" [scrollable]="true" [tableWidthConfig]="tableWidthConfig">
  <thead dTableHead [checkable]="true">
    <tr dTableRow>
      <th
        dHeadCell
        *ngFor="let colOption of dataTableOptions.columns"
        [fixedLeft]="colOption.fixedLeft"
        [fixedRight]="colOption.fixedRight"
      >
        {{ colOption.header }}
      </th>
    </tr>
  </thead>
  <tbody dTableBody>
    <ng-template let-rowItem="rowItem" let-rowIndex="rowIndex">
      <tr dTableRow>
        <td
          dTableCell
          *ngFor="let colOption of dataTableOptions.columns"
          [fixedLeft]="colOption.fixedLeft"
          [fixedRight]="colOption.fixedRight"
        >
          {{ colOption.fieldType === 'date' ? (rowItem[colOption.field] | i18nDate: 'short':false) : rowItem[colOption.field] }}
        </td>
      </tr>
    </ng-template>
  </tbody>
</d-data-table>
  `,
})
class TestDataFixedColumnComponent {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'firstName',
        header: 'First Name',
        fieldType: 'text',
        fixedLeft: '0px'
      },
      {
        field: 'lastName',
        header: 'Last Name',
        fieldType: 'text'
      },
      {
        field: 'gender',
        header: 'gender',
        fieldType: 'text'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date',
        fixedRight: '0px'
      }
    ]
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'firstName',
      width: '150px'
    },
    {
      field: 'lastName',
      width: '150px'
    },
    {
      field: 'gender',
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    }
  ];
}
describe('data-table', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<TestDataTableBasicComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableBasicComponent;
    let domHelper: DomHelper<TestDataTableBasicComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, I18nModule, NoopAnimationsModule],
        declarations: [TestDataTableBasicComponent]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableBasicComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    it('should data table can be created', () => {
      expect(component).toBeTruthy();
    });

    it('should data table can be created without dataSource', () => {
      component.basicDataSource = null;
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });

  describe('checkable', () => {
    let fixture: ComponentFixture<TestDataTableAdvancedComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableAdvancedComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, DataTableModule, CheckBoxModule, TooltipModule, I18nModule, DropDownModule, NoopAnimationsModule],
        declarations: [TestDataTableAdvancedComponent]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableAdvancedComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should header checkbox selected work', fakeAsync(() => {
      const checkBoxLabel = debugEl.query(By.css('.devui-data-table .devui-table thead tr .devui-checkable-cell label'));
      checkBoxLabel.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const inputEl = checkBoxLabel.query(By.css('input'));
      expect(inputEl.properties.checked).toBeTruthy();

      tick();
      fixture.detectChanges();
      const checkBoxLabels = debugEl.queryAll(By.css('.devui-data-table .devui-table .devui-checkable-cell input'));
      expect(checkBoxLabels.every((item) => item.properties.checked)).toBeTruthy();

      const pageAllChecked = component.datatable.pageAllChecked;
      expect(pageAllChecked).toBeTruthy();
    }));

    it('should data row checkbox checked show header half checked', fakeAsync(() => {
      const checkBoxLabels = debugEl.queryAll(By.css('.devui-data-table .devui-table tbody tr .devui-checkable-cell label'));
      const checkBoxInputs = debugEl.queryAll(By.css('.devui-data-table .devui-table tbody tr .devui-checkable-cell label input'));
      checkBoxLabels[0].nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(checkBoxInputs[0].properties.checked).toBeTruthy();
      let halfChecked = debugEl.query(By.css('.devui-data-table .devui-table thead tr .devui-checkable-cell .devui-checkbox.halfchecked'));
      expect(halfChecked).toBeTruthy();

      for (let i = 1; i < checkBoxLabels.length - 1; i++) {
        checkBoxLabels[i].nativeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(checkBoxInputs[i].properties.checked).toBeTruthy();
        halfChecked = debugEl.query(By.css('.devui-data-table .devui-table thead tr .devui-checkable-cell .devui-checkbox.halfchecked'));
        expect(halfChecked).toBeTruthy();
      }

      checkBoxLabels[checkBoxLabels.length - 1].nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(checkBoxInputs[checkBoxLabels.length - 1].properties.checked).toBeTruthy();
    }));

    it('should set row check status work', fakeAsync(() => {
      component.datatable.setTableCheckStatus({
        pageAllChecked: true,
      });
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const checkBoxLabels = debugEl.queryAll(By.css('.devui-data-table .devui-table .devui-checkable-cell input'));
      const checkRows = component.datatable.getCheckedRows();
      expect(checkBoxLabels.every((item) => item.properties.checked)).toBeTruthy();
      expect(checkRows.length).toBe(6);

      component.datatable.setTableCheckStatus({
        pageAllChecked: false,
        pageHalfChecked: true,
      });

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const halfChecked = debugEl.queryAll(
        By.css('.devui-data-table .devui-table thead tr .devui-checkable-cell .devui-checkbox.halfchecked')
      );
      expect(halfChecked).toBeTruthy();
    }));

    it('should set header checkOptions work', fakeAsync(() => {
      const dropdownElement = debugEl.query(By.css('.devui-data-table .devui-table .devui-checkable-cell .select-options'));
      dropdownElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter', {'bubbles': false, 'cancelable': false}));
      fixture.detectChanges();
      tick(50); // debounce time
      fixture.detectChanges();
      tick(); // animation time
      fixture.detectChanges();
      const dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
      expect(dropdownMenuElement).toBeTruthy();
      const items = dropdownMenuElement.nativeElement.querySelectorAll('ul.devui-dropdown-menu li');
      // empty handler
      items[1].dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(debugEl.query(By.css('.devui-data-table .devui-table .devui-checkable-cell .devui-checkbox.unchecked'))).toBeTruthy();
      // select all handler
      items[0].dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(component.checkTotalData).toHaveBeenCalled();
    }));
  });

  describe('edit', () => {
    let fixture: ComponentFixture<TestDataTableEditComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableEditComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, DataTableModule, DatepickerModule, I18nModule, InputNumberModule, SelectModule, NoopAnimationsModule],
        declarations: [TestDataTableEditComponent]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableEditComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should created correctly', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should click edit icon work', fakeAsync(() => {
      fixture.detectChanges();
      let row1Column1 = debugEl.query(By.css('table.devui-table tbody tr td .cell-container .cell-container-inner span'));
      expect(row1Column1.nativeElement.textContent).toBe('Otto');

      const editIconRow1Column1 = debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify'));
      editIconRow1Column1.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick(); // wait for origin data display
      fixture.detectChanges();

      const inputRow1Column1 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column1).toBeTruthy();

      inputRow1Column1.nativeElement.value = 'Otto_test';
      inputRow1Column1.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      row1Column1 = debugEl.query(By.css('table.devui-table tbody tr td .cell-container .cell-container-inner span'));
      expect(row1Column1.nativeElement.textContent).toBe('Otto_test');
    }));

    it('should beforeEditStart work', fakeAsync(() => {
      fixture.detectChanges();
      const editIconRow1Column1 = debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify'));
      // boolean能够拦截
      component.beforeEditStart = (rowItem, field) => {
        return true;
      };
      fixture.detectChanges();
      editIconRow1Column1.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column1 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column1).toBeTruthy();
      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      flush();
      // observable能够拦截
      component.beforeEditStart = (rowItem, field) => {
        return of(true);
      };
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column12 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column12).toBeTruthy();
      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
    }));

    it('should beforeEditEnd observable value work', fakeAsync(() => {
      component.beforeEditEnd = (rowItem, field) => {
        return true;
      };
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column1 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column1).toBeFalsy();
      flush();
      // observable test
      component.beforeEditEnd = (rowItem, field) => {
        return of(true);
      };
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column12 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column12).toBeFalsy();
    }));

    it('should beforeEditStart null or return undefined edit also work', fakeAsync(() => {
      component.beforeEditStart = null;
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column1 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column1).toBeTruthy();
      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      flush();
      // test return undefined
      component.beforeEditStart = (rowItem, field) => {
        return undefined;
      };
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column12 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column12).toBeTruthy();
    }));
    it('should beforeEditStart return false edit not work', fakeAsync(() => {
      component.beforeEditStart = (rowItem, field) => {
        return false;
      };
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column1 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column1).toBeFalsy();
    }));

    it('should beforeEditEnd null or return undefined edit also work', fakeAsync(() => {
      component.beforeEditEnd = null;
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column1 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column1).toBeFalsy();
      flush();
      // test return undefined
      component.beforeEditEnd = (rowItem, field) => {
        return undefined;
      };
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column12 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column12).toBeFalsy();
    }));

    it('should beforeEditEnd return false edit not finish', fakeAsync(() => {
      component.beforeEditEnd = (rowItem, field) => {
        return false;
      };
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column1 = debugEl.query(
        By.css('table.devui-table tbody tr td .devui-input-group input.devui-form-control')
      );
      expect(inputRow1Column1).toBeTruthy();
    }));

    it('should finish edit after click other td element', fakeAsync(() => {
      fixture.detectChanges();
      debugEl.query(By.css('table.devui-table tbody tr td:nth-child(3) div.cell-editable')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column1 = debugEl.query(
        By.css('table.devui-table tbody tr td:nth-child(3) d-input-number')
      );
      expect(inputRow1Column1).toBeTruthy();
      flush();
      debugEl.query(By.css('table.devui-table tbody tr td span.cell-modify')).nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const inputRow1Column12 = debugEl.query(
        By.css('table.devui-table tbody tr td:nth-child(3) d-input-number')
      );
      expect(inputRow1Column12).toBeFalsy();
    }));
  });

  describe('sortable & filterable', () => {
    let fixture: ComponentFixture<TestDataTableAdvancedComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableAdvancedComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, DataTableModule, CheckBoxModule, TooltipModule, I18nModule, DropDownModule, NoopAnimationsModule],
        declarations: [TestDataTableAdvancedComponent]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableAdvancedComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should sort icon click work', fakeAsync(() => {
      const sortClickEl = debugEl.query(By.css('.devui-table thead tr th:nth-child(4) .sort-clickable'));
      sortClickEl.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      let sortIcon = sortClickEl.query(By.css('.datatable-svg.sort-icon-asc'));
      expect(sortIcon).toBeTruthy();

      sortClickEl.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      sortIcon = sortClickEl.query(By.css('.sort-icon-desc'));
      fixture.detectChanges();
      expect(sortIcon).toBeTruthy();

      sortClickEl.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      sortIcon = sortClickEl.query(By.css('datatable-svg.sort-icon-asc'));
      expect(sortIcon).toBeNull();
      sortIcon = sortClickEl.query(By.css('datatable-svg.sort-icon-desc'));
      expect(sortIcon).toBeNull();

      const sortableIcon = sortClickEl.query(By.css('.datatable-svg'));
      expect(sortableIcon.nativeElement.classList).toContain('sort-icon-default');
    }));

    it('should filterable work', fakeAsync(() => {
      const filterIcon = debugEl.query(By.css('.devui-table thead tr th:nth-child(3) .filter-icon'));
      filterIcon.nativeElement.style.visibility = 'visible';

      const filterClickEl = filterIcon.parent;
      filterClickEl.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      let filterBox = document.querySelector('.data-table-column-filter-content.filter-bg.filter-font-color');
      expect(filterBox).toBeTruthy();

      document.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      filterBox = document.querySelector('.data-table-column-filter-content.filter-bg.filter-font-color');
      expect(filterBox).toBeFalsy();
    }));
  });

  describe('data-table has children', () => {
    let fixture: ComponentFixture<TestDataTableWithChildrenComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableWithChildrenComponent;
    let checkBoxes: DebugElement[];
    let togglers: DebugElement[];
    let togglersShow: DebugElement[];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, CheckBoxModule, FormsModule, TooltipModule],
        declarations: [TestDataTableWithChildrenComponent]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableWithChildrenComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkBoxes = debugEl.queryAll(By.css('tbody .devui-checkbox.unchecked'));
      togglers = debugEl.queryAll(By.css('.childtable-toggler'));
      togglersShow = togglers.filter((item) => item.nativeElement.style.visibility === 'visible');
    });

    it('should tree table create correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should expand all work', fakeAsync(() => {
      expect(checkBoxes.length).toBe(component.basicDataSource.length);
      expect(togglersShow.length).toBe(2);

      component.comp.setTableChildrenToggleStatus(true);
      tick(500);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      flush();
      checkBoxes = debugEl.queryAll(By.css('tbody .devui-checkbox.unchecked'));
      expect(checkBoxes.length).toBe(13);
    }));

    it('should set row child toggle status function work', fakeAsync(() => {
      const childTableToggler = debugEl.query(By.css('.devui-data-table table.devui-table tbody tr td .childtable-toggler'));
      childTableToggler.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.childTableToggleEvent).toBeTruthy();
      expect(component.childTableToggleRow.$isChildTableOpen).toBeTruthy();
    }));

    it('should click + icon of header expand all and - icon of header collapse all', fakeAsync(() => {
      expect(checkBoxes.length).toBe(component.basicDataSource.length);
      expect(togglersShow.length).toBe(2);

      let foldIcon = debugEl.query(By.css('.devui-data-table thead th:nth-child(2) .childtable-toggler'));
      foldIcon.nativeElement.dispatchEvent(new Event('click'));
      tick(500);
      fixture.detectChanges();
      flush();
      checkBoxes = debugEl.queryAll(By.css('tbody .devui-checkbox.unchecked'));
      expect(checkBoxes.length).toBe(13);

      foldIcon = debugEl.query(By.css('.devui-data-table thead th:nth-child(2) .childtable-toggler'));
      foldIcon.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      checkBoxes = debugEl.queryAll(By.css('tbody .devui-checkbox.unchecked'));
      expect(checkBoxes.length).toBe(component.basicDataSource.length);
    }));

    it('should all checkboxes checked after header checkbox checked', fakeAsync(() => {
      const checkboxHeaderLabel = debugEl.query(By.css('.devui-data-table .devui-table thead tr .devui-checkable-cell label'));
      checkboxHeaderLabel.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const checkboxBodyLabels = debugEl.queryAll(By.css('.devui-data-table .devui-table tbody tr .devui-checkable-cell label > input'));
      expect(checkboxBodyLabels.every((item) => item.properties.checked)).toBeTruthy();
    }));
  });

  describe('multi header', () => {
    let fixture: ComponentFixture<TestDataTableMultiHeaderComponent>;
    let debugEl: DebugElement;
    let component: TestDataTableMultiHeaderComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, I18nModule],
        declarations: [TestDataTableMultiHeaderComponent]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataTableMultiHeaderComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should have multi header', () => {
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
  });
  describe('fixed column', () => {
    let fixture: ComponentFixture<TestDataFixedColumnComponent>;
    let debugEl: DebugElement;
    let component: TestDataFixedColumnComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DataTableModule, I18nModule],
        declarations: [TestDataFixedColumnComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataFixedColumnComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create correctly', () => {
      expect(component).toBeTruthy();
    });
  });
});
