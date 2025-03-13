import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
    selector: 'd-back-top-scroll-container',
    templateUrl: './scroll-container.component.html',
    styleUrls: ['./scroll-container.component.scss'],
    standalone: false
})

export class ScrollContainerComponent implements OnInit {
  scrollElement;
  list = [];
  sentence = 'You know some birds are not meant to be caged, their feathers are just too bright.';
  constructor(@Inject(DOCUMENT) private doc: any) {}

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.list.push(this.sentence);
    }
    this.scrollElement = this.doc.querySelector('.devui-scroll-content');
  }

  backTop(event) {
    console.log(event);
  }
}
