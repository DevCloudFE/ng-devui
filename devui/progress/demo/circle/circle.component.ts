import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'd-circle',
  styleUrls: ['./circle.component.scss'],
  templateUrl: './circle.component.html',
})
export class CircleComponent implements OnInit {
  count = 0;
  percentage = 10;
  percentageText = '';
  strokeColor = '#fac20a';

  ngOnInit(): void {
    this.progressing(9);
  }

  progressing(time: number) {
    setTimeout(() => {
      if (this.count < time) {
        this.percentage += 10;
        this.count++;
        this.progressing(time);
      } else {
        this.percentageText = 'done';
      }
    }, 1000);
  }
}
