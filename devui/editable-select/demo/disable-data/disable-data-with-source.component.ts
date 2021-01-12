import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'd-disable-data-with-source',
  templateUrl: './disable-data-with-source.component.html',
  styles: [
    `
      section {
        width: 50%;
      }
    `
  ]
})
export class DisableDataWithSourceComponent implements OnInit {
  selectItem3;

  loading3 = false;

  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
  'LiveScript', 'CoffeeScript'].map(item => {
    const newItem = {label: item};
    if (item.indexOf('Script') !== -1) {
      newItem['disabled'] = true;
    }
    return newItem;
  });

  constructor() {
  }

  ngOnInit() {
  }

}
