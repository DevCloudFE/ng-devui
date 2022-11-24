import { Component } from '@angular/core';
import { DropDownModule } from 'ng-devui/dropdown';
import { IconComponent, IconGroupComponent } from 'ng-devui/icon';

@Component({
  selector: 'd-icon-group-demo',
  standalone: true,
  imports: [DropDownModule, IconComponent, IconGroupComponent],
  templateUrl: './icon-group.component.html',
  styleUrls: ['./icon-group.component.scss'],
})
export class IconGroupDemoComponent {
  watched = true;
}
