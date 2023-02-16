import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  count = 0;
  percentage = 0;
  showContentConfig = {
    showInnerContent: false,
    showOuterContent: true,
    showCenterContent: false,
  };
  showSuccess = false;

  ngOnInit(): void {
    this.progressing(100);
  }

  progressing(time: number) {
    setTimeout(() => {
      if (this.count < time) {
        this.percentage += 1;
        this.count++;
        this.progressing(time);
      } else {
        setTimeout(() => {
          this.showSuccess = true;
        }, 550);
      }
    }, 100);
  }
}
