import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'd-status-design',
  templateUrl: './status-design.component.html',
})

export class StatusDesignComponent implements OnInit {
  imgSrc;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/no-data.png';
  }
}
