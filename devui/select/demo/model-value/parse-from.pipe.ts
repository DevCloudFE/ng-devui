import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'parseFrom' })
export class ParseFromPipe implements PipeTransform {
  transform(data, identifyKey, options): any {
    if (Array.isArray(data)) {
      return data.map(item => options.find(op => op[identifyKey] === item) || {identifyKey: item});
    } else {
      return options.find(op => op[identifyKey] === data) || {identifyKey: data };
    }
  }
}
