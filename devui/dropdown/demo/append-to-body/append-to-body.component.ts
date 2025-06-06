import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'd-dropdown-appendtobody',
    templateUrl: './append-to-body.component.html',
    styleUrls: ['./append-to-body.component.scss'],
    standalone: false
})
export class DropDownDemoAppendToBodyComponent {
  @ViewChild('origin', { static: true }) originRef: ElementRef;

  onToggle(event) {
    console.log(event);
  }
}
