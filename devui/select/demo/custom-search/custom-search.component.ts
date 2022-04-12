import { Component, ViewChild } from '@angular/core';
import { SelectComponent } from 'ng-devui/select';
import { of } from 'rxjs';

@Component({
  selector: 'd-custom-search',
  templateUrl: './custom-search.component.html',
  styleUrls: ['./custom-search.component.css']
})
export class CustomSearchComponent {
  @ViewChild('networkSearchSelect') selectComponent: SelectComponent;
  timer: any;
  currentOption1 = '';
  currentOption2 = [];
  currentOption3 = '';
  options1 = [{
    name: 'option 1',
    value: 1
  }, {
    name: 'option 2',
    value: 2
  }, {
    name: 'option 3',
    value: 3
  }, {
    name: 'option 4',
    value: 4
  }];
  options2 = [{
    name: 'option1',
    value: 1
  }, {
    name: 'option2',
    value: 2
  }, {
    name: 'option3',
    value: 3
  }, {
    name: 'option4',
    value: 4
  }, {
    name: 'option5',
    value: 5
  }, {
    name: 'option6',
    value: 6
  }, {
    name: 'option7',
    value: 7
  }, {
    name: 'option8',
    value: 8
  }, {
    name: 'option9',
    value: 9
  }, {
    name: 'option10',
    value: 10
  }];

  onSelectObject = (term) => {
    return of(
      this.options2
        .map((option, index) => ({ id: index, option: option }))
        .filter(item => item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  };

  /* searchFn 推荐返回 observable, 但也接受 PromiseLike<T> 类型
   * 例如使用 async 方法，请求接口后返回数组即可，注意数组需要封装为 [{ id: index, option: option }] 结构
   * 自定义 searchFn 时请勿使用 options
  onSelectObject = async (term) => {
    this.http.post('url/api', {keyword: term}).subscribe((res) => {
      const result = res.map((option, index) => ({ id: index, option: option }));
      return result;
    });
  };
  */
}
