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
    { value: 914, name: 'Option 1', email: 'a@com' },
    { value: 915, name: 'Option 2', email: 'b@com' },
    { value: 916, name: 'Option 3', email: 'c@com' },
    { value: 917, name: 'Option 4', email: 'd@com' },
    { value: 918, name: 'Option 5', email: 'e@com' },
    { value: 919, name: 'Option 6', email: 'f@com' },
    { value: 920, name: 'Option 7', email: 'g@com' },
    { value: 921, name: 'Option 8', email: 'h@com' },
    { value: 922, name: 'Option 9', email: 'i@com' },
    { value: 923, name: 'Option 10', email: 'j@com' },
    { value: 924, name: 'Option 11', email: 'k@com' },
    { value: 925, name: 'Option 12', email: 'l@com' }
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
