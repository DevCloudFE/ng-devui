import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
    selector: 'd-user-mail-search',
    templateUrl: './user-mail-search.component.html',
  styleUrls: ['./user-mail-search.component.css']
})
export class UserMailSearchComponent {
  currentOption1 = '';
  options2 = [
    { value: 914, name: '选项1', email: 'a@com' },
    { value: 915, name: '选项2', email: 'b@com' },
    { value: 916, name: '选项3', email: 'c@com' },
    { value: 917, name: '选项4', email: 'd@com' },
    { value: 918, name: '选项5', email: 'e@com' },
    { value: 919, name: '选项6', email: 'f@com' },
    { value: 920, name: '选项7', email: 'g@com' },
    { value: 921, name: '选项8', email: 'h@com' },
    { value: 922, name: '选项9', email: 'i@com' },
    { value: 923, name: '选项10', email: 'j@com' },
    { value: 924, name: '选项11', email: 'k@com' },
    { value: 925, name: '选项12', email: 'l@com' }
  ];
  onSelectObject = (term) => {
    return of(
      this.options2
        .map((option, index) => ({ id: index, option: option }))
        .filter(item =>
          (item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
          || item.option.email.toLowerCase().indexOf(term.toLowerCase()) !== -1)
        )
    );
  }
}
