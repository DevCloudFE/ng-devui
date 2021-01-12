import { Component } from '@angular/core';

@Component({
  selector: 'd-user-limit-selected-number',
  templateUrl: './user-limit-selected-number.component.html',
  styleUrls: ['./user-limit-selected-number.component.css']
})
export class UserLimitSelectedNumberComponent {
  currentOption1;
  options2 = [{
    name: '选项1',
    value: 1
  }, {
    name: '选项2',
    value: 2
  }, {
    name: '选项3',
    value: 3
  }, {
    name: '选项4',
    value: 4
  }, {
    name: '选项5',
    value: 5
  }, {
    name: '选项6',
    value: 6
  }, {
    name: '选项7',
    value: 7
  }, {
    name: '选项8',
    value: 8
  }, {
    name: '选项9',
    value: 9
  }, {
    name: '选项10',
    value: 10,
    disabled : true,
    disabledAlways: true
  }];

  checkSelectionNumber (selection: Array<any>, originOptions: Array<any>, singleMaxNumber: number,
                        equalNumberFn: () => void, exccedNumberFn: () => void, restoreFn: () => void, exculeAllSelected = true) {
    if (exculeAllSelected && selection && selection.length === originOptions.length) {// 全选
      restoreFn();
    } else  if (selection && selection.length === singleMaxNumber) {
      equalNumberFn();
    } else if (selection && selection.length > singleMaxNumber) {
      exccedNumberFn();
    } else {
      restoreFn();
    }
  }
  checkSelectionNumberFunc = () => {
    this.checkSelectionNumber(this.currentOption1, this.options2, 2,
      this.equalNumberFunc, this.exccedNumberFunc, this.restoreFunc);
  }

  // equalNumberFn
  disabledOthers = (selection: Array<any>, originOptions: Array<any>, disabledKey: string) => {
    originOptions.filter(op => selection.indexOf(op) < 0).forEach(op => op[disabledKey] = true);
  }

  // exccedNumberFn
  acceptOptionByNumber = (selection: Array<any>, originOptions: Array<any>, maxNumber: number, disabledKey: string) => {
    this.currentOption1 =  // 此处需要手动改外部变量的地址
    selection = selection.filter((_, index) => (index < maxNumber));
    this.disabledOthers(selection, originOptions, disabledKey);
  }

  // restoreFn
  restoreOption = (originOptions: Array<any>, disabledKey: string, disabledAlwaysKey: string) => {
    originOptions.filter(op => op[disabledAlwaysKey] !== true).forEach(op => op[disabledKey] = false);
    originOptions.filter(op => op[disabledAlwaysKey] === true).forEach(op => op[disabledKey] = true);
  }

  equalNumberFunc = () => {
    const selection = this.currentOption1;
    const originOptions = this.options2;
    const disabledKey = 'disabled';
    this.disabledOthers(selection, originOptions, disabledKey);
  }

  exccedNumberFunc = () => {
    const selection = this.currentOption1;
    const originOptions = this.options2;
    const maxNumber = 2;
    const disabledKey = 'disabled';
    this.acceptOptionByNumber(selection, originOptions, maxNumber, disabledKey);
  }

  restoreFunc = () => {
    const originOptions = this.options2;
    const disabledKey = 'disabled';
    const disabledAlwaysKey = 'disabledAlways';
    this.restoreOption(originOptions, disabledKey, disabledAlwaysKey);
  }
}
