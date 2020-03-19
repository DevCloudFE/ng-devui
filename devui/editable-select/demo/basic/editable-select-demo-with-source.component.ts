import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'd-editable-select-demo-with-source',
  templateUrl: './editable-select-demo-with-source.component.html',
  styles: [
    `
      section {
        width: 50%;
      }
    `
  ]
})
export class EditableSelectDemoWithSourceComponent implements OnInit {
  selectItem1;


  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  constructor() {
    for (let i = 0; i < 1000; i++) {
      this.languages.push('Test' + i);
    }
  }

  ngOnInit() {
  }
}
