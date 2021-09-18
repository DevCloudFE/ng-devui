import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-lazy-load',
  templateUrl: './lazy-load.component.html',
  styleUrls: ['./lazy-load.component.scss']
})
export class LazyLoadComponent implements OnInit {
  list = [];
  sentence = 'all work and no play make jack a dull boy';
  total = 40;
  next = 1;
  complete = false;
  showLoading = false;

  next1 = 1;
  showLoading1 = false;
  list1 = [];
  target: any = window;
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.list.push(this.sentence);
      this.list1.push(this.sentence);
    }
  }

  onLoadMore(event) {
    if (this.next > this.total) {
      return;
    }
    this.showLoading = true;
    const end = this.next + 20;
    const tmpList = [];
    for (; this.next < end; this.next++) {
      tmpList.push(this.sentence);
    }
    setTimeout(() => {
        this.list = this.list.concat(tmpList);
        this.showLoading = false;
    }, 300);

    this.complete = this.next > this.total;
    console.log(`load more`, this.next, this.complete);
  }
  onLoadMore1(event) {
    if (this.next1 > this.total) {
      return;
    }
    this.showLoading1 = true;
    const end = this.next1 + 20;
    const tmpList = [];
    for (; this.next1 < end; this.next1++) {
      tmpList.push(this.sentence);
    }
    setTimeout(() => {
        this.list1 = this.list1.concat(tmpList);
        this.showLoading1 = false;
    }, 300);

    this.complete = this.next1 > this.total;
    console.log(`load more`, this.next, this.complete);
  }
}
