import {Component} from '@angular/core';

@Component({
  selector: 'd-demo-dropdown-close-scope',
  templateUrl: './close-scope.component.html',
  styleUrls: [ './close-scope.component.css']
})
export class DropDownDemoClickBlankComponent {

  onToggle(event) {
    console.log(event);
  }
}
