import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { SelectComponent } from '../../select.component';

@Component({
  selector: 'd-custom-search',
  templateUrl: './custom-search.component.html',
  styleUrls: ['./custom-search.component.css']
})
export class CustomSearchComponent {
  @ViewChild('networkSearchSelect', { static: false }) selectComponent: SelectComponent;
  timer: any;
  currentOption1 = '';
  currentOption2 = [];
  currentOption3 = '';
  options1 = [{
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
  constructor(private cdr: ChangeDetectorRef) {}
  onSelectObject = (term) => {
    return of(
      this.options2
        .map((option, index) => ({ id: index, option: option }))
        .filter(item => item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  }
}
