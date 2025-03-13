import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterNodesPipe',
    standalone: false
})
export class FilterNodesPipe implements PipeTransform {

  constructor() {
  }

  transform(nodes, key) {
    return nodes.filter(item => !item.data[key]);
  }
}
