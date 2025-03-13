import { Component } from '@angular/core';
import { of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'd-auto-complete-demo-custom',
    templateUrl: './auto-complete-demo-custom.component.html',
    standalone: false
})
export class AutoDemoCustomComponent {
  selectItem4: any;
  isSearching = false;
  icons = ['icon-add', 'icon-bug', 'icon-filter', 'icon-gps'];
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  onSearchLocal(term) {
    this.isSearching = true;
    return timer(500).pipe(map(() => {
      this.isSearching = false;
      return this.languages.filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1);
    }));
  }

  getIcon(index) {
    return this.icons[index % this.icons.length];
  }
}
