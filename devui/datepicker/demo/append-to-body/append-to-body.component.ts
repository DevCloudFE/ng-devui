import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'd-append-to-body',
    styleUrls: [`./append-to-body.component.css`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './append-to-body.component.html'
})
export class DatepickerDemoAppendToBodyComponent {
  selectedDate1 = null;
  appendToBodyDirections = ['centerDown', 'centerUp'];

  getValue(value) {
    console.log(value);
  }
}
