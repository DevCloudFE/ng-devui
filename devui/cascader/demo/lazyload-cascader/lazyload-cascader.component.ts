import { Component } from '@angular/core';
import { of } from 'rxjs';
import { CascaderItem } from '../../cascader.type';

@Component({
  selector: 'd-demo-lazyload-cascader',
  templateUrl: './lazyload-cascader.component.html',
})
export class LazyloadCascaderComponent {
  options = [
    {
      label: '测试1',
      value : 1,
    },
    {
      label: '测试2',
      value : 2,
    },
    {
      label: '测试3',
      value : 3,
      children: [],
      isLeaf: true,
      disabled: true
    }
  ];

  children1 = [
    {
      label: '测试1-1',
      value : 4,
      isLeaf: true
    },
    {
      label: '测试1-2',
      value : 41,
      isLeaf: true
    },
    {
      label: '测试1-3',
      value : 42,
      isLeaf: true
    },
    {
      label: '测试1-4',
      value : 43,
      isLeaf: true
    }
  ];

  children2 = [
    {
      label: '测试2-1',
      value : 5,
    },
    {
      label: '测试2-2',
      value : 6,
      isLeaf: true
    },
    {
      label: '测试2-3',
      value : 712,
      isLeaf: true
    }
  ];

  children3 = [
    {
      label: '测试2-1-1',
      value : 51,
      isLeaf: true
    },
    {
      label: '测试2-1-2',
      value : 61,
      isLeaf: true,
      disabled: true
    }
  ];

  value: Array<string | number>;

  onChanges(value: any) {
    console.log(value);
  }

  loadChildren = (val: CascaderItem) => {
    if (val.value === 1) {
      return new Promise((resolve, rject) => {
        setTimeout(() => {
          resolve(this.children1);
        }, 1000);
      });
    } else if (val.value === 2) {
      return new Promise((resolve, rject) => {
        setTimeout(() => {
          resolve(this.children2);
        }, 1000);
      });
    } else {
      return of(this.children3);
    }
  }
}
