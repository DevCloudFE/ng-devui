import { Component } from '@angular/core';

@Component({
    selector: 'd-object-source',
    templateUrl: './object-source.component.html',
    standalone: false
})
export class ObjectSourceComponent {
  lang = {
    id: 8,
    label: 'Python',
  };
  bestLang = {
    id: 6,
    value: 'JavaScript',
  };
  dataWithLabel = [
    {
      id: 1,
      label: 'C',
    },
    {
      id: 2,
      label: 'C#',
    },
    {
      id: 3,
      label: 'C++',
    },
    {
      id: 4,
      label: 'CPython',
    },
    {
      id: 5,
      label: 'Java',
    },
    {
      id: 6,
      label: 'JavaScript',
    },
    {
      id: 7,
      label: 'Go',
    },
    {
      id: 8,
      label: 'Python',
    },
    {
      id: 9,
      label: 'Ruby',
    },
    {
      id: 10,
      label: 'F#',
    },
    {
      id: 11,
      label: 'TypeScript',
    },
    {
      id: 12,
      label: 'SQL',
    },
    {
      id: 13,
      label: 'LiveScript',
    },
    {
      id: 14,
      label: 'CoffeeScript',
    },
  ];
  dataWithOtherProperty = [
    {
      id: 1,
      value: 'C',
    },
    {
      id: 2,
      value: 'C#',
    },
    {
      id: 3,
      value: 'C++',
    },
    {
      id: 4,
      value: 'CPython',
    },
    {
      id: 5,
      value: 'Java',
    },
    {
      id: 6,
      value: 'JavaScript',
    },
    {
      id: 7,
      value: 'Go',
    },
    {
      id: 8,
      value: 'Python',
    },
    {
      id: 9,
      value: 'Ruby',
    },
    {
      id: 10,
      value: 'F#',
    },
    {
      id: 11,
      value: 'TypeScript',
    },
    {
      id: 12,
      value: 'SQL',
    },
    {
      id: 13,
      value: 'LiveScript',
    },
    {
      id: 14,
      value: 'CoffeeScript',
    },
  ];

  formatter = (obj: any) => {
    return obj && `${obj.id}. ${obj.value}`;
  };

  valueParser = (obj: any) => {
    return obj?.value ? `Best Language: ${obj?.value}` : obj;
  };

  selectItem(event) {
    console.log('select:', event);
  }

  toggleChange(event) {
    console.log('isOpen:', event);
  }
}
