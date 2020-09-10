import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'd-multi-auto-complete-array',
  templateUrl: './multi-auto-complete-demo-array.component.html'
})
export class MultiAutoCompleteDemoArrayComponent implements OnInit {
  multiItems1: string[] = ['C#', 'C', 'C++', 'CPython', 'Java'];
  multiItems2: any;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  ngOnInit() {
    this.multiItems2 = this.multiItems1.map((lang, index) => ({ label: lang, id: index }));
  }

  onSearchMultiple2(term: any) {
    return of(this.languages
      .map((lang, index) => ({ label: lang, id: index }))
      .filter(lang => this.multiItems2.map(item => item.id).indexOf(lang.id) === -1
        && lang.label.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  }

  autoSubmit($event) {
    console.log($event);
  }
}
