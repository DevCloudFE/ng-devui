import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-dropdown-set-is-open',
  templateUrl: './dropdown-set-is-open.component.html',
  styleUrls: ['./dropdown-set-is-open.component.scss'],
})
export class DropdownSetIsOpenComponent {
  isOpen = false;

  constructor() {}

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
