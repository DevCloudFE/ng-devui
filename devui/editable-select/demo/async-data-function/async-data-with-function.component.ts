import { Component } from '@angular/core';
import { Observable, of, timer } from 'rxjs';

@Component({
  selector: 'd-async-data-with-function',
  templateUrl: './async-data-with-function.component.html',
  styles: [
    `
      d-editable-select {
        margin: 12px 0;
      }
    `,
  ],
})
export class AsyncDataWithFunctionComponent {
  selectItem: any;
  loading = false;
  onSearchLocal: (term: string) => Observable<any>;

  languages = [
    'C#',
    'C',
    'C++',
    'CPython',
    'Java',
    'JavaScript',
    'Go',
    'Python',
    'Ruby',
    'F#',
    'TypeScript',
    'SQL',
    'LiveScript',
    'CoffeeScript',
  ];

  getAsyncData() {
    this.loading = true;
    timer(3000).subscribe(() => {
      const languages = this.languages.slice();
      this.onSearchLocal = (term: string) => of(languages.filter((lang) => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1));
      this.loading = false;
    });
  }
}
