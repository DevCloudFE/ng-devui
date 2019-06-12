import {
  Component,
  Input,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'ave-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent {
  @Input() percentage = 0;
  @Input() percentageText: string;
  @Input() barbgcolor: string;
  @Input() height = '20px';
  constructor() {
  }
}
