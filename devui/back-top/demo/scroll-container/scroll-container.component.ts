import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-back-top-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss']
})

export class ScrollContainerComponent implements OnInit {
  scrollElement;
  list = [];
  sentence = 'all work and no play make jack a dull boy';
  constructor() {}

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.list.push(this.sentence);
    }
    this.scrollElement = document.querySelector('.devui-scroll-container');
  }

  backTop(event) {
    console.log(event);
  }
}
