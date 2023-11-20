import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'd-alert-design',
  templateUrl: './alert-design.component.html',
})
export class AlertDesignComponent implements OnInit {
  imgSrc: string;

  ngOnInit(): void {
    this.imgSrc = `${environment.deployPrefix}assets/no-data.png`;
  }
}
