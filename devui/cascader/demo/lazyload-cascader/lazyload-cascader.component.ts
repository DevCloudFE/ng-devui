import { Component } from '@angular/core';
import { CascaderItem } from 'ng-devui/cascader';

@Component({
    selector: 'd-demo-lazyload-cascader',
    templateUrl: './lazyload-cascader.component.html',
    standalone: false
})
export class LazyloadCascaderComponent {
  options = [
    {
      label: 'option1',
      value : 1,
    },
    {
      label: 'option2',
      value : 2,
    },
    {
      label: 'option3',
      value : 3,
      children: [],
      isLeaf: true,
      disabled: true
    }
  ];

  children1 = [
    {
      label: 'option1-1',
      value : 4,
      isLeaf: true
    },
    {
      label: 'option1-2',
      value : 41,
      isLeaf: true
    },
    {
      label: 'option1-3',
      value : 42,
      isLeaf: true
    },
    {
      label: 'option1-4',
      value : 43,
      isLeaf: true
    }
  ];

  children2 = [
    {
      label: 'option2-1',
      value : 5,
    },
    {
      label: 'option2-2',
      value : 6,
      isLeaf: true
    },
    {
      label: 'option2-3',
      value : 712,
      isLeaf: true
    }
  ];

  children3 = [
    {
      label: 'option2-1-1',
      value : 51,
      isLeaf: true
    },
    {
      label: 'option2-1-2',
      value : 61,
      isLeaf: true,
      disabled: true
    }
  ];

  value: Array<string | number> = [1, 41];
  value2: Array<string | number>[] = [];

  onChanges(value: any) {
    console.log(value);
  }

  loadChildren: (val: CascaderItem) => Promise<CascaderItem[]> = (val: CascaderItem) => {
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
      return new Promise((resolve, rject) => {
        setTimeout(() => {
          resolve(this.children3);
        }, 1000);
      });
    }
  };
}
