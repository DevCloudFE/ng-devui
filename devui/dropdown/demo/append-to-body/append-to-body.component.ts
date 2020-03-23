import {Component} from '@angular/core';

@Component({
  selector: 'd-dropdown-appendtobody',
  templateUrl: './append-to-body.component.html',
  styleUrls: ['./append-to-body.component.css']
})
export class DropDownDemoAppendToBodyComponent {

  onToggle(event) {
    console.log(event);
  }
}
