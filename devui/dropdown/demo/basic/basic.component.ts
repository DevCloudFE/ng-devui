import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-demo-dropdown-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {
  }

  onToggle(event) {
    console.log(event);
}

}
