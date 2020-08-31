import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'filterNodesPipe' })
export class FilterNodesPipe implements PipeTransform {

  constructor() {
  }

  transform(nodes, key) {
    return nodes.filter(item => !item.data[key]);
  }
}
