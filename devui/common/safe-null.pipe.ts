import { Pipe, PipeTransform, inject } from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';

@Pipe({
  name: 'dSafeNullPipe',
  })
export class SafeNullPipe implements PipeTransform {
  @WithConfig() private placeholder = '--';
  private devConfigService: DevConfigService = inject(DevConfigService);

  transform(value: unknown, placeholder = this.placeholder): unknown {
    if (typeof value === 'undefined' || value === null || value === '') {
      return placeholder;
    }
    return value;
  }
}
