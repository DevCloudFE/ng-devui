import { Pipe, PipeTransform } from '@angular/core';
import { TabComponent } from './tab.component';

@Pipe({
    name: 'dTabCloseablePipe',
    standalone: false
})
export class TabCloseablePipe implements PipeTransform {
  transform(tab: TabComponent, closeable: boolean, closeableIds: any[]): boolean {
    if (closeable) {
      tab.closeable = !tab.disabled && closeable && (closeableIds.length === 0 || closeableIds.includes(tab.id));
    }
    return closeable ? tab.closeable : false;
  }
}
