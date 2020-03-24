import { Component, HostBinding, ViewChild } from '@angular/core';
import { DataTableComponent } from 'ng-devui/data-table';


interface SourceType {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  detail?: string;
  $checked?: boolean;
}

@Component({
  selector: 'd-transfer-demo-custom',
  template: `
    <section>
    <div style="width:700px; ">
    <d-transfer [customSourceCheckedLen]="sourceCheckedLen"
    [customTargetCheckedLen]="targetCheckedLen"
    (transferToTarget)="transferToTarget()"
    (transferToSource)="transferToSource()"
    [titles]="{source:'源标题', target:'目标标题'}">
      <ng-template #sourceTemplate>
        <div class="title">
          自定义头部
        </div>
        <div class="line"></div>
          <div class="content" style="height:320px;overflow:auto;">
            <d-data-table #sourceTable [pager]="pager" [dataSource]="basicDataSource"
            [checkable]="true"
            (rowCheckChange)="sourceRowCheckChange(event)"  (checkAllChange)="sourceCheckAllChange()"
            (pageIndexChange)="sourceChangePageContent($event)" >
            <d-column [order]="1" field="id" header="ID" [width]="'50px'"></d-column>
            <d-column [order]="2" field="firstName" header="姓名" [width]="'80px'"></d-column>
            <d-column [order]="3" field="dob" header="生日" [fieldType]="'date'" [extraOptions]="{dateFormat: 'MM/DD/YYYY'}"
              [width]="'100px'"></d-column>
              <d-column [order]="4" field="gender" header="性别" [width]="'100px'"></d-column>
            </d-data-table>
          </div>
        </ng-template>
        <ng-template #targetTemplate>
          <div class="title">
          自定义头部
        </div>
        <div class="line"></div>
        <div class="content" style="height:320px;overflow:auto;">
          <d-data-table #targetTable [pager]="pager" [dataSource]="basicTargetSource"
          [checkable]="true"
          (pageIndexChange)="targetChangePageContent($event)"
          (rowCheckChange)="targetRowCheckChange(event)" (checkAllChange)="targetCheckAllChange()" >
          <d-column [order]="1" field="id" header="ID" [width]="'50px'"></d-column>
          <d-column [order]="2" field="firstName" header="姓名" [width]="'80px'"></d-column>
          <d-column [order]="3" field="dob" header="生日" [fieldType]="'date'" [extraOptions]="{dateFormat: 'MM/DD/YYYY'}"
            [width]="'100px'"></d-column>
            <d-column [order]="4" field="gender" header="性别"   [width]="'100px'"></d-column>
          </d-data-table>
        </div>
      </ng-template>
    </d-transfer>
    </div>
    </section>
  `,
  styles: [`
    .title {
      display: flex;
      height: 40px;
      line-height: 40px;
      align-items: center;
      -webkit-align-items: center;
      -moz-align-items: center;
      -ms-align-items: center;
      -o-align-items: center;
      margin-left: 20px;
    }

    .line {
      height: 1px;
      background: #E3E5E9;
      margin-bottom: 10px;
    }
`]
})
export class TransferDemoCustomComponent {
  originSource: Array<SourceType> = [
    {
      id: 1,
      firstName: 'Mark',
      lastName: 'Otto',
      dob: new Date(1990, 12, 1),
      gender: 'Male',
    },
    {
      id: 2,
      firstName: 'Jacob',
      lastName: 'Thornton',
      gender: 'Female',
      dob: new Date(1989, 1, 1),
    },
    {
      id: 3,
      firstName: 'Danni',
      lastName: 'Chen',
      gender: 'Female',
      dob: new Date(1991, 3, 1),
    },
    {
      id: 4,
      firstName: 'green',
      lastName: 'gerong',
      gender: 'Male',
      dob: new Date(1991, 3, 1),
    },
    {
      id: 5,
      firstName: 'po',
      lastName: 'lang',
      gender: 'Male',
      dob: new Date(1991, 3, 1),
      detail: '这是一个行详情',
    },
    {
      id: 6,
      firstName: 'john',
      lastName: 'li',
      gender: 'Female',
      dob: new Date(1991, 3, 1),
    },
    {
      id: 7,
      firstName: 'peng',
      lastName: 'li',
      gender: 'Female',
      dob: new Date(1991, 3, 1),
    },
    {
      id: 8,
      firstName: 'Danni',
      lastName: 'Yu',
      gender: 'Female',
      dob: new Date(1991, 3, 1),
    },
    {
      id: 9,
      firstName: 'Danni',
      lastName: 'Yu',
      gender: 'Female',
      dob: new Date(1991, 3, 1),
      detail: '这是另外一个行详情'
    },
    {
      id: 10,
      firstName: 'Danni',
      lastName: 'Yu',
      gender: 'Female',
      dob: new Date(1991, 3, 1),
    },
    {
      id: 11,
      firstName: 'Danni',
      lastName: 'Yu',
      gender: 'Female',
      dob: new Date(1991, 3, 1),
    },
    {
      id: 12,
      firstName: 'Danni',
      lastName: 'Yu',
      gender: 'Female',
      dob: new Date(1991, 3, 1),
    },
  ];

  pager = {
    total: 12,
    pageSize: 6,
    componentSize: 'sm'
  };
  targetSource = [];
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(this.originSource.slice(0, this.pager.pageSize)));
  basicTargetSource: Array<SourceType> = JSON.parse(JSON.stringify(this.targetSource.slice(0, this.pager.pageSize)));
  sourceCheckedLen = 0;
  targetCheckedLen = 0;
  @ViewChild('sourceTable', { static: false }) sourceTable: DataTableComponent;
  @ViewChild('targetTable', { static: false }) targetTable: DataTableComponent;

  sourceChangePageContent(event: any) {
    this.basicDataSource = this.originSource.slice((event.pageIndex - 1) * event.pageSize, event.pageIndex * event.pageSize);
  }

  targetChangePageContent(event: any) {
    this.basicTargetSource = this.targetSource.slice((event.pageIndex - 1) * event.pageSize, event.pageIndex * event.pageSize);
  }

  sourceRowCheckChange(event: any) {
    this.sourceCheckedLen = this.sourceTable.getCheckedRows().length;
  }

  targetRowCheckChange(event: any) {
    this.targetCheckedLen = this.targetTable.getCheckedRows().length;
  }

  sourceCheckAllChange() {
    this.sourceCheckedLen = this.sourceTable.getCheckedRows().length;
  }

  targetCheckAllChange() {
    this.targetCheckedLen = this.targetTable.getCheckedRows().length;
  }

  transferToTarget() {
    const checkedRows = this.sourceTable.getCheckedRows();
    const ids = checkedRows.map(item => item.id);
    this.originSource = this.originSource.filter(item => {
      return !ids.find(id => id === item.id);
    });
    this.basicDataSource = JSON.parse(JSON.stringify(this.originSource));
    checkedRows.forEach(item => item.$checked = false);
    this.targetSource = this.basicTargetSource.concat(checkedRows);
    this.basicTargetSource = JSON.parse(JSON.stringify(this.targetSource));

    // 要置0
    this.sourceCheckedLen = 0;
  }

  transferToSource() {
    const checkedRows = this.targetTable.getCheckedRows();
    const ids = checkedRows.map(item => item.id);
    this.targetSource = this.targetSource.filter(item => {
      return !ids.find(id => id === item.id);
    });
    this.basicTargetSource = JSON.parse(JSON.stringify(this.targetSource));

    checkedRows.forEach(item => item.$checked = false);
    this.originSource = this.basicDataSource.concat(checkedRows);
    this.basicDataSource = JSON.parse(JSON.stringify(this.originSource));
    // 要置0
    this.targetCheckedLen = 0;
  }

  onDrop(event: any) {
    console.log(event);
  }
}
