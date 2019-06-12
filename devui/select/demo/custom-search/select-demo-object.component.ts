import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'ave-select-object',
  templateUrl: './select-demo-object.component.html'
})
export class SelectDemoObjectComponent {
  currentOption1 = '';
  languages2 = [{
    name: 'ccc',
    value: 1
  }, {
    name: 'ddd',
    value: 2
  }, {
    name: 'aaa',
    value: 3
  }, {
    name: 'bbb',
    value: 4
  }];
  onSelectObject = (term) => {
    return of(
      this.languages2
        .map((option, index) => ({ id: index, option: option }))
        .filter(item => item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  }
}
