import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'd-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {
  @ViewChild('countArea') countArea: ElementRef;
  curLength: number;
  maxLength: number;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.curLength = 0;
      this.maxLength = this.countArea.nativeElement.maxLength;
    });
  }

  @HostListener('input') currentLength() {
    this.curLength = this.countArea.nativeElement.value.length;
  }
}
