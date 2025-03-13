import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppendToBodyDirection } from 'ng-devui/utils';

@Component({
    selector: 'd-append-to-body',
    styleUrls: [`./append-to-body.component.scss`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './append-to-body.component.html',
    standalone: false
})
export class DatepickerDemoAppendToBodyComponent {
  selectedDate1 = null;
  appendToBodyDirections: AppendToBodyDirection[] = ['centerDown', 'centerUp'];

  getValue(value) {
    console.log(value);
  }
}
