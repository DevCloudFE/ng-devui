import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dBeforeCheckboxChangePipe',
})
export class BeforeCheckboxChangePipe implements PipeTransform {
  transform(func: Function, option: any, index: number): any {
    return func ? () => func(index, option, 'checkbox') : undefined;
  }
}
