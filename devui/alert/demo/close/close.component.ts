import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-alert-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.css']
})
export class CloseComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  handleClose($event) {
    console.log($event);
  }

}
