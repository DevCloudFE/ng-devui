import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapTo' })
export class MapToPipe implements PipeTransform {
  transform(data, identifyKey): any {
    if (!data) {return data; }
    if (Array.isArray(data)) {
      return data.map(item => item[identifyKey]);
    } else {
      return data[identifyKey];
    }
  }
}
