import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'd-relative-time-design',
  templateUrl: './relative-time-design.component.html',
})

export class RelativeTimeDesignComponent implements OnInit {
  imgSrc;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/no-data.png';
  }
}
