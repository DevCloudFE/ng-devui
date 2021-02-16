import { Component, ViewChild } from '@angular/core';
import { SelectComponent } from 'ng-devui/select';
import { of } from 'rxjs';

@Component({
  selector: 'd-user-search-n-lazyload',
  templateUrl: './user-search-n-lazyload.component.html',
  styleUrls: ['./user-search-n-lazyload.component.css']
})
export class UserSearchNLazyLoadComponent {
  @ViewChild('selectComponent', { static: true }) selectComponent: SelectComponent;
  currentOption1 = '';
  currentOption = '';
  currentIndex = 12;

  options2 = [
    {
      name: '这是一个用来测试的比较长的选项1',
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
    }
  ];

  options = [
    {
      name: '这是一个用来测试的非常长的选项1(This is the first option which is very very long to test whether the style setting works.)',
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
    },
    {
      name: '这是一个用来测试的非常长的选项5(This is the fifth option which is very very long to test whether the style setting works.)',
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
    },
    {
      name: '这是一个用来测试的非常长的选项9(This is the ninth option which is very very long to test whether the style setting works.)',
      value: 9
    }, {
      name: '选项10',
      value: 10
    }, {
      name: '选项11',
      value: 11
    }, {
      name: '选项12',
      value: 12
    },
  ];

  private searchString: any;

  onSelectObject = (term) => {
    return of(
      this.options2
        .map((option, index) => ({id: index, option: option}))
        .filter(item => item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  }

  searchFn = (term) => {
    if (this.searchString === term) {
      const newIndex = ++this.currentIndex;

      this.options = this.options.concat([{
        name: `新增选项 ${newIndex}`,
        value: newIndex
      }]);
      setTimeout(() => this.selectComponent.loadFinish(), 500);
      return of(
        this.options
          .map((option, index) => ({id: index, option: option}))
          .filter(item => item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
      );
    } else {
      this.searchString = term;
      this.selectComponent.loadFinish();
      return of(
        this.options
          .map((option, index) => ({id: index, option: option}))
          .filter(item => item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
      );
    }
  }

  loadMore(data: any) {
    console.log('load more');
    this.selectComponent.forceSearchNext();
  }
}
