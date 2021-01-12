import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-back-top-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss']
})

export class ScrollContainerComponent implements OnInit {
  scrollElement;
  list = [];
  sentence = 'You know some birds are not meant to be caged, their feathers are just too bright.';
  constructor() {}

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.list.push(this.sentence);
    }
    this.scrollElement = document.querySelector('.devui-scroll-content');
  }

  backTop(event) {
    console.log(event);
  }
}
