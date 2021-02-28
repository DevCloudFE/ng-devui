import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {
  count = 0;

  constructor() { }

  ngOnInit() {
  }

  onChange(state) {
    console.log(state);
    this.count++;
  }

}
