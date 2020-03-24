import {
  Component,
  OnInit
} from '@angular/core';
import { of, timer, Observable } from 'rxjs';


@Component({
  selector: 'd-async-data-with-function',
  templateUrl: './async-data-with-function.component.html',
  styles: [
    `
      section {
        width: 50%;
      }
    `
  ]
})
export class AsyncDataWithFuncitionComponent implements OnInit {
  selectItem4;


  loading4 = false;

  onSearchLocal2: (term: string) => Observable<any>;

  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  constructor() {
  }

  ngOnInit() {
  }

  getAsyncData2() {
    this.loading4 = true;
    timer(3000).subscribe(() => {
      const languages = this.languages.slice();
      this.onSearchLocal2 = (term: string) => {
        return of(languages.filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1));
      };
      this.loading4 = false;
    });
  }
}
