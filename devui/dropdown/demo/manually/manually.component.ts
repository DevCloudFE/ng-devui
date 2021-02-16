import { Component } from '@angular/core';

@Component({
  selector: 'd-dropdown-demo-manually',
  templateUrl: './manually.component.html',
  styleUrls: ['./manually.component.scss']
})
export class DropDownDemoManuallyComponent {
  clickOutsideClose = false;
  isOpen = false;
  onToggle(event) {
    if (this.isOpen !== event) {
      // 需要判断isOpen是不是不同值，防止重复设置
      this.isOpen = event;
      console.log(event);
    }
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
