import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'd-multi-auto-complete-disabled',
  templateUrl: './multi-auto-complete-demo-disabled.component.html',
  styles: [
    `
      section {
        display: flex;
        align-items: center;
      }

      d-multi-auto-complete {
        flex-grow: 1;
        margin-right: 8px;
      }
    `,
  ],
})
export class MultiAutoCompleteDemoDisabledComponent {
  toggle: boolean;
  disabledKey = 'disabled';
  multiItems = [
    {
      label: 'C',
      id: 1,
    },
    {
      label: 'C++',
      id: 2,
    },
  ];
  languages = [
    {
      label: 'C#',
      id: 0,
      disabled: true,
    },
    {
      label: 'C',
      id: 1,
    },
    {
      label: 'C++',
      id: 2,
    },
    {
      label: 'Python',
      id: 3,
    },
    {
      label: 'Java',
      id: 4,
    },
  ];

  onSearchMultiple = (term: any) => {
    return of(this.languages.filter((lang) => lang.label.toLowerCase().indexOf(term.toLowerCase()) !== -1));
  };
}
