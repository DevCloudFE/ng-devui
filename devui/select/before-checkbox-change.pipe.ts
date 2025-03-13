import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dBeforeCheckboxChangePipe',
    standalone: false
})
export class BeforeCheckboxChangePipe implements PipeTransform {
  transform(func: Function, option: any, index: number): any {
    return func ? () => func(index, option, 'checkbox') : undefined;
  }
}
