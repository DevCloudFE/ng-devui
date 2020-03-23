import { Component, OnInit, HostBinding } from '@angular/core';
import { treeDataSource, SourceType } from '../mock-data';
import { CheckableRelation } from 'ng-devui/data-table/data-table.model';


@Component({
  selector: 'd-tree-data',
  templateUrl: './tree-data.component.html',
  styles: ['.demo-margin { margin: 5px 5px 0 0;}']
})
export class TreeDataComponent implements OnInit {
  extraOptions: any;
  iconParentOpen = '<span class="icon icon-chevron-right"></span>';
  iconParentClose = '<span class="icon icon-chevron-down"></span>';
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(treeDataSource.slice(0, 6)));
  checkableRelation: CheckableRelation = {downward: true, upward: true};
  ngOnInit() {
    this.extraOptions = {showHeadTableToggler: true};
  }

  cellClick(e) {
      console.log('cell');
      console.log(e);
  }

  rowClick(e) {
      console.log('row');
      console.log(e);
  }

  loadChildrenTable = (rowItem) => {
    if (rowItem.title === 'vue组件') {
      rowItem.children.push({
        title: 'vue表格',
        lastName: '张三',
        status: '已关闭',
        dob: new Date(1989, 1, 1),
      },
      {
          title: 'vue富文本',
          lastName: '张三',
          status: '已关闭',
          dob: new Date(1991, 3, 1)
      });
    }
    return new Promise((resolve) => {
      resolve(rowItem);
    });
  }

  loadAllChildrenTable = () => {
    this.basicDataSource[0].children[0].children[1].children[0].children.push({
      title: 'vue表格',
      lastName: '张三',
      status: '已关闭',
      dob: new Date(1989, 1, 1),
    },
    {
        title: 'vue富文本',
        lastName: '张三',
        status: '已关闭',
        dob: new Date(1991, 3, 1)
    });
    return new Promise((resolve) => {
      resolve();
    });
  }

  getCheckedRows(e) {
    console.log('getCheckedRows');
    console.log(e);
  }

  setUnCheckableRelation(type) {
    if (type === 'upward') {
      this.checkableRelation.upward = false;
    } else {
      this.checkableRelation.downward = false;
    }
  }

  toggleIcon() {
    this.extraOptions = {iconUnFoldTable: this.iconParentOpen, iconFoldTable: this.iconParentClose, showHeadTableToggler: true};
  }

}
