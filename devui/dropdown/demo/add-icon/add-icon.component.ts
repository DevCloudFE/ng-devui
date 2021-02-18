import { Component } from '@angular/core';

@Component({
  selector: 'd-dropdown-demo-add-icon',
  templateUrl: './add-icon.component.html',
  styleUrls: ['./add-icon.component.scss']
})
export class DropDownDemoAddIconComponent {
  items: any = ['New', 'Delete', 'Item 1', 'Item 2', 'Item 3', 'Item 4'];

  onToggle(event) {
    console.log(event);
  }
}
