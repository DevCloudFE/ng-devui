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
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.list.push(this.sentence);
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
}
