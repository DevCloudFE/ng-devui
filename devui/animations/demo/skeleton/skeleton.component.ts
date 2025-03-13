import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'd-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    standalone: false
})
export class SkeletonComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
