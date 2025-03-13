import {Component} from '@angular/core';

@Component({
    selector: 'd-demo-dropdown-close-scope',
    templateUrl: './close-scope.component.html',
    styleUrls: ['./close-scope.component.scss'],
    standalone: false
})
export class DropDownDemoClickBlankComponent {

  onToggle(event) {
    console.log(event);
  }
}
