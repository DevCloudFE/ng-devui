import { Component } from '@angular/core';

@Component({
  selector: 'd-dropdown-demo-hover',
  templateUrl: './hover.component.html',
  styleUrls: ['./hover.component.css']
})
export class DropDownDemoHoverComponent {

    onToggle(event) {
        console.log(event);
    }
}
