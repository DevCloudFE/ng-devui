import { Component } from '@angular/core';

@Component({
  selector: 'd-user-limit-selected-number',
  templateUrl: './user-limit-selected-number.component.html',
})
export class UserLimitSelectedNumberComponent {
  currentOption: any;
  options = [
    {
      name: 'Option 1',
      value: 1,
    },
    {
      name: 'Option 2',
      value: 2,
    },
    {
      name: 'Option 3',
      value: 3,
    },
    {
      name: 'Option 4',
      value: 4,
    },
    {
      name: 'Option 5',
      value: 5,
    },
    {
      name: 'Option 6',
      value: 6,
    },
    {
      name: 'Option 7',
      value: 7,
    },
    {
      name: 'Option 8',
      value: 8,
    },
    {
      name: 'Option 9',
      value: 9,
    },
    {
      name: 'Option 10',
      value: 10,
      disabled: true,
      disabledAlways: true,
    },
  ];

  checkSelectionNumber(
    selection: Array<any>,
    originOptions: Array<any>,
    singleMaxNumber: number,
    equalNumberFn: () => void,
    exceedNumberFn: () => void,
    restoreFn: () => void,
    invertAllSelected = true
  ) {
    if (invertAllSelected && selection && selection.length === originOptions.length) {
      restoreFn();
    } else if (selection && selection.length === singleMaxNumber) {
      equalNumberFn();
    } else if (selection && selection.length > singleMaxNumber) {
      exceedNumberFn();
    } else {
      restoreFn();
    }
  }

  checkSelectionNumberFunc = () => {
    this.checkSelectionNumber(this.currentOption, this.options, 2, this.equalNumberFunc, this.exceedNumberFunc, this.restoreFunc);
  };

  disabledOthers = (selection: Array<any>, originOptions: Array<any>, disabledKey: string) => {
    originOptions
      .filter((op) => selection.indexOf(op) < 0)
      .forEach((op) => {
        op[disabledKey] = true;
      });
  };

  acceptOptionByNumber = (selection: Array<any>, originOptions: Array<any>, maxNumber: number, disabledKey: string) => {
    /* 此处需要手动改外部变量的地址 */
    this.currentOption = selection = selection.filter((_, index) => index < maxNumber);
    this.disabledOthers(selection, originOptions, disabledKey);
  };

  restoreOption = (originOptions: Array<any>, disabledKey: string, disabledAlwaysKey: string) => {
    originOptions.forEach((op) => {
      op[disabledKey] = !!op[disabledAlwaysKey];
    });
  };

  equalNumberFunc = () => {
    const selection = this.currentOption;
    const originOptions = this.options;
    const disabledKey = 'disabled';
    this.disabledOthers(selection, originOptions, disabledKey);
  };

  exceedNumberFunc = () => {
    const selection = this.currentOption;
    const originOptions = this.options;
    const maxNumber = 2;
    const disabledKey = 'disabled';
    this.acceptOptionByNumber(selection, originOptions, maxNumber, disabledKey);
  };

  restoreFunc = () => {
    const originOptions = this.options;
    const disabledKey = 'disabled';
    const disabledAlwaysKey = 'disabledAlways';
    this.restoreOption(originOptions, disabledKey, disabledAlwaysKey);
  };
}
