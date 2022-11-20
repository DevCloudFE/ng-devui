import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from 'ng-devui/icon';

@Component({
  selector: 'd-basic',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicComponent {

}
