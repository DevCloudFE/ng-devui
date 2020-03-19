import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';
import { timer } from 'rxjs';



@Component({
  selector: 'd-editable-select-demo-async-data-with-source',
  templateUrl: './editable-select-demo-async-data-with-source.component.html',
  styles: [
    `
      section {
        width: 50%;
      }
    `
  ]
})
export class EditableSelectDemoAsyncDataWithSourceComponent implements OnInit {
  selectItem3;

  loading3 = false;

  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];
  languages2 = [];

  constructor() {
  }

  ngOnInit() {
  }

  getAsyncData() {
    this.loading3 = true;
    timer(3000).subscribe(() => {
      this.languages2 = this.languages.slice();
      this.loading3 = false;
      console.log('done');
    });
  }
}
