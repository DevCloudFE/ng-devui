import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import { of } from 'rxjs';


@Component({
  selector: 'd-editable-select-demo-with-search-function',
  templateUrl: './editable-select-demo-with-search-function.component.html',
  styles: [
    `
      section {
        width: 50%;
      }
    `
  ]
})
export class EditableSelectDemoWithSearchFunctionComponent implements OnInit {
  selectItem2;

  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  constructor() {
  }

  ngOnInit() {
  }

  onSearchLocal = (term) => {
    return of(this.languages.filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1));
  }

}
