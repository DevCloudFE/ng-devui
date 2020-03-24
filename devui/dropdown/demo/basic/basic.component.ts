import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-demo-dropdown-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
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
