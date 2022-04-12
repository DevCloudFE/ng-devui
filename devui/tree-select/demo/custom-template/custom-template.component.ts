import { Component } from '@angular/core';
@Component({
  selector: 'd-tree-select-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss'],
})
export class TreeSelectCustomTemplateComponent {
  data = [
    {
      title: 'parent 1',
      data: { type: 'mix' },
      id: 1,
    },
    {
      title: 'parent 2',
      data: { type: 'mix' },
      children: [
        {
          title: 'parent 2-1',
          data: { type: 'mix' },
          children: [
            {
              title: 'leaf 2-1-1',
              data: { type: 'ppt' },
              id: 3,
            },
            {
              title: 'leaf 2-1-2',
              data: { type: 'xls' },
              id: 4,
            },
          ],
          id: 2,
        },
        {
          title: 'parent 2-2',
          data: { type: 'mix' },
          children: [
            {
              title: 'leaf 2-2-1',
              data: { type: 'ppt' },
              id: 6,
            },
            {
              title: 'leaf 2-2-2',
              data: { type: 'doc' },
              id: 7,
            },
          ],
          id: 5,
        },
      ],
      id: 18,
    },
    {
      title: 'parent 3',
      data: { type: 'ppt' },
      open: true,
      halfChecked: true,
      children: [
        {
          title: 'leaf 3-1',
          data: { type: 'ppt' },
          id: 9,
        },
        {
          title: 'leaf 3-2',
          data: { type: 'ppt' },
          disabled: true,
          isChecked: true,
          id: 10,
        },
        {
          title: 'leaf 3-3',
          data: { type: 'ppt' },
          disabled: true,
          id: 11,
        },
      ],
      id: 8,
    },
    {
      title: 'parent 4',
      data: { type: 'xls' },
      disabled: true,
      children: [
        {
          title: 'leaf 4-1',
          data: { type: 'xls' },
          id: 13,
        },
        {
          title: 'leaf 4-2',
          data: { type: 'xls' },
          id: 14,
        },
      ],
      id: 12,
    },
    {
      title: 'parent 5',
      data: { type: 'xls' },
      children: [
        {
          title: 'leaf 5-1',
          data: { type: 'xls' },
          id: 16,
        },
        {
          title: 'leaf 5-2',
          data: { type: 'xls' },
          id: 17,
        },
      ],
      id: 15,
    },
  ];

  value = [this.data[0]];
  recently = [this.data[0], this.data[1]];
  showSelected($event: Event) {
    console.log('event emitted: ', $event);
    console.log('this.value: ', this.value);
  }

  chooseRecent(e, index) {
    e.stopPropagation();
    const i = this.value.indexOf(this.recently[index]);
    const item = this.recently[index];
    const recentlyArr = this.traverseTree([item]);
    if (i === -1) {
      this.value = this.value.concat(recentlyArr);
      this.value = Array.from(new Set(this.value));
    } else {
      for (let j = 0; j < recentlyArr.length; j++) {
        const idx = this.value.indexOf(recentlyArr[j]);
        if (idx > -1) {
          this.value.splice(idx, 1);
        }
      }
    }
    /*
      ngModel is supported. The function writeValue(value: any) can be invoked only when the value of ngModel points to a new address,
      and the select-tree component can be refreshed.
    */
    this.value = [...this.value];
    console.log('this.value: ', this.value);
  }
  /*
    Recursively expands all key values. All key values are child subsets.
  */
  traverseTree(tree) {
    let results = [];
    for (let i = 0; i < tree.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(tree[i], 'children')) {
        results.push(tree[i]);
      } else if (Object.prototype.hasOwnProperty.call(tree[i], 'children')) {
        results.push(tree[i]);
        results = results.concat(this.traverseTree(tree[i].children));
      }
    }
    return results;
  }
}
