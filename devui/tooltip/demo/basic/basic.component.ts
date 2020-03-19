import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  message = 'I have animation!';
  position: 'left';

  constructor() { }

  ngOnInit() {
  }

}
