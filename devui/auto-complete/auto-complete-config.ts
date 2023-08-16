import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AutoCompleteConfig {
  autoComplete = {
    delay: 300,
    minLength: 1,
    itemTemplate: null,
    noResultItemTemplate: null,
    formatter: (item) => (item ? item.label || item.toString() : ''),
    valueParser: (item) => (item ? item.label || item.toString() : ''),
  };
}
