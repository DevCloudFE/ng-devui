import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent, IconGroupComponent } from 'ng-devui/icon';
import { DropDownModule } from 'ng-devui/dropdown';

@Component({
  selector: 'd-icon-group-demo',
  standalone: true,
  imports: [IconComponent, IconGroupComponent, DropDownModule],
  templateUrl: './icon-group.component.html',
  styleUrls: ['./icon-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconGroupDemoComponent {
  watched = true;
}
