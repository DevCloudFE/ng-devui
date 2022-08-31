import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dNumberTrans'
})
export class NumberTransPipe implements PipeTransform {

  getFlowStr(value: number, fixedNum: number) {
    if (value / (1024 * 1024 * 1024 * 1024) > 10) {
      value = value /  (1024 * 1024 * 1024 * 1024);
      return value.toFixed(fixedNum) + 'Tb';
    }else if (value / (1024 * 1024 * 1024) > 10) {
      value = value /  (1024 * 1024 * 1024);
      return value.toFixed(fixedNum) + 'Gb';
    } else if (value / (1024 * 1024) > 10) {
      value = value /  (1024 * 1024);
      return value.toFixed(fixedNum) + 'Mb';
    } else if (value / 1024 > 10) {
      value = value / 1024;
      return value.toFixed(fixedNum) + 'Kb';
    } else {
      return value + 'Byte';
    }
  }

  getUnitStr(value: number, fixedNum: number): string {
    if (value / (1000 * 1000 * 1000 * 1000) > 1) {
      value = value / (1000 * 1000 * 1000 * 1000);
      return value.toFixed(fixedNum) + 'T';
    } else if (value / (1000 * 1000 * 1000) > 1) {
      value = value / (1000 * 1000 * 1000);
      return value.toFixed(fixedNum) + 'G';
    } else if (value / (1000 * 1000) > 1) {
      value = value / (1000 * 1000);
      return value.toFixed(fixedNum) + 'M';
    } else if (value / (1000) > 1) {
      value = value / (1000);
      return value.toFixed(fixedNum) + 'k';
    } else {
      return String(value);
    }

  }

  transform(
    value: number | string, type: 'comma' | 'unit' | 'flow' | 'exponent' = 'comma', fixedNum = 2
  ): string {
    let number = Number(value);
    let numberStr = '';

    if (!number && number !== 0) {
      return numberStr;
    }

    if (Number(fixedNum) || fixedNum === 0) {
      number = Math.floor(number * Number(`1e${fixedNum}`)) / Number(`1e${fixedNum}`);
    }

    switch(type) {
    case 'comma':
      numberStr = number.toLocaleString();
      break;
    case 'flow':
      numberStr = this.getFlowStr(number, fixedNum);
      break;
    case 'unit':
      numberStr = this.getUnitStr(number, fixedNum);
      break;
    case 'exponent':
      numberStr = number.toExponential(fixedNum);
      break;
    }


    return numberStr;
  }
}
